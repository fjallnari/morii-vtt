<script lang="ts">
	import axios from "axios";
	import Router, { location, replace } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";
	import Auth from "./routes/Auth.svelte";
	import { accessToken, user } from "./stores";
	import Game from "./routes/Game.svelte";
	import { axiosPublic } from "./axiosPublic";
	import mem from "mem";

	const maxAge = 10000; // for memoizing refresh token

	$: memoizedRefreshToken();

	axios.interceptors.request.use(
		async (config) => {
			if ($accessToken) {
				config.headers = {
					...config.headers,
					authorization: `Bearer ${$accessToken}`,
				};
			}

			return config;
		},
		(error) => Promise.reject(error)
	);

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const config = error?.config;

			if (error?.response?.status === 403 && !config?.sent) {
				config.sent = true;

				const isTokenRefreshed = await memoizedRefreshToken();

				if (isTokenRefreshed) {
					config.headers = {
						...config.headers,
						authorization: `Bearer ${$accessToken}`,
					};
				}

				return axios(config);
			}
			return Promise.reject(error);
		}
	);

	const refreshAccessToken = async () => {
		try {
			const response = await axiosPublic.post('/auth/refresh-token');
			accessToken.set(response.data.accessToken);

			setTimeout(() => {
				memoizedRefreshToken();				
			}, 600000 - 500);

			if (response.status === 200 && $location === '/auth') {
				replace('/');
			}
			return response.status === 200;
		}
		catch {
			return false;
		}
	}

	const loadDashboard = async () => {
		try {
			const response = await axios.get('/api/dashboard');
			user.set(response.data.userInfo);
			return response.status === 200;
		}
		catch {
			return false;
		}
	}

	const routes = {
		"/auth": wrap({
			component: Auth,

		}),
		"/game/:id": Game,
		"/": wrap({
			component: Dashboard,
			conditions: [
				async () => {
					return await loadDashboard();
				}
			]
		}),
		"*": NotFound
	}

	const conditionsFailed = () => {
		replace('/auth');
	}

	const memoizedRefreshToken = mem(refreshAccessToken, { maxAge });
	
</script>


<main>
	<Router {routes} on:conditionsFailed={conditionsFailed}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		padding-top: 0px;
		max-width: 240px;
		margin: 0 auto;
	}

	:root {
		--primary-box-background-color: #252529;
		--secondary-box-background-color: #303036;
  		--delete-button-background-color: #BC4B51;
		--primary-text-color: #FCF7F8;
		--primary-accent-color: #EFA48B;
		--semi-bold: 600;
	}

	@media only screen and (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>