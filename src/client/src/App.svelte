<script lang="ts">
	import axios from "axios";
	import Router, { replace } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import { onMount } from 'svelte';
	import Chat from "./routes/Chat.svelte";
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";
	import Auth from "./routes/Auth.svelte";
	import { accessToken, user } from "./stores";
	import { get } from 'svelte/store';
	import ProgressCircle from "./components/ProgressCircle.svelte";

	$: refreshAccessToken();

	const loadSecurePage = async (path: string) => {
		await new Promise(res => setTimeout(res, 1000));
		try {
			const response = await axios.get(path, {
				headers: {
					'Authorization': `Bearer ${$accessToken}`
				}
			});

			return response;
		}
		catch {
			return null;
		}
	}

	const routes = {
		"/auth": wrap({
			component: Auth,

		}),
		"/chat": Chat,
		"/": wrap({
			component: Dashboard,
			conditions: [
				async () => {
					const response = await loadSecurePage('/api/dashboard');
					if( ! response ) {
						return false
					}

					console.log(response.data.userInfo);

					user.set(response.data.userInfo);

					return response.status === 200;
				}
			]
		}),
		"*": NotFound
	}

	const refreshAccessToken = async () => {
		try {
			const response = await axios.post('/api/auth/refresh-token');
			accessToken.set(response.data.accessToken);
		}
		catch (err) {
			console.log(err);
		}
	}

	function conditionsFailed(event) {
		console.error('conditionsFailed event', event.detail);
		replace('/auth');
	}

	// onMount(async () => {
	// 	await refreshAccessToken();
	// });
	
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