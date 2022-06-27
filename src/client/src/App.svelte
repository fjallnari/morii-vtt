<script lang="ts">
	import axios from "axios";
	import Router, { location, params, push, replace } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";
	import Auth from "./routes/Auth.svelte";
	import { accessToken, user } from "./stores";
	import Game from "./routes/Game.svelte";
	import { onMount } from "svelte";	

	onMount(() => {
		(async () => {
			await refreshAccessToken();
		})();
	});

	const loadDashboard = async () => {
		// prevents race condition in case loading finishes before access token is refresh (e.g. on reload)
		// TODO: refactor the "refresh token/load secure route" flow
		await new Promise(res => setTimeout(res, 500));
		try {
			const response = await axios.get('/api/dashboard', {
				headers: {
					'Authorization': `Bearer ${$accessToken}`
				}
			});

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

	const refreshAccessToken = async () => {
		try {
			const response = await axios.post('/api/auth/refresh-token');
			accessToken.set(response.data.accessToken);
			if (response.status === 200 && $location === '/auth') {
				replace('/');
			}

			setTimeout(() => {
				refreshAccessToken();				
			}, 600000 - 500);
			return response.status === 200;
		}
		catch (err) {
			return false;
		}
	}

	const conditionsFailed = () => {
		replace('/auth');
	}
	
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
	}

	@media only screen and (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>