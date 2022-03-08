<script lang="ts">
	import axios from "axios";
	import Router, { location, push, replace } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import Chat from "./routes/Chat.svelte";
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";
	import Auth from "./routes/Auth.svelte";
	import { accessToken, user } from "./stores";

	$: refreshAccessToken();

	const loadDashboard = async (path: string) => {
		// prevents race condition in case loading finishes before access token is refresh (e.g. on reload)
		// TODO: refactor the "refresh token/load secure route" flow
		await new Promise(res => setTimeout(res, 500));
		try {
			const response = await axios.get(path, {
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
		"/chat": wrap({
			component: Chat,
			conditions: [
				async () => {
					console.log('loading game');
					return true;
				}
			]
		}),
		"/": wrap({
			component: Dashboard,
			conditions: [
				async () => {
					return await loadDashboard('/api/dashboard');
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

	@media only screen and (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>