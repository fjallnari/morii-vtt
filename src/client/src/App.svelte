<script lang="ts">
	import axios from "axios";
	import Router, { replace } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import Chat from "./routes/Chat.svelte";
	import Home from "./routes/Home.svelte";
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";
	import { onMount } from 'svelte';

	export let accessToken: string = "";

	const loadSecurePage = async (path: string) => {
		try {
			const response = await axios.get(path, {
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			});

			return response.status === 200;
		}
		catch {
			return false;
		}
	}

	const routes = {
		"/auth": Home,
		"/chat": Chat,
		"/": wrap({
			component: Dashboard,
			conditions: [
				async () => {
					return await loadSecurePage('/api/welcome');
				}
			]
		}),
		"*": NotFound
	}

	const refreshAccessToken = async () => {
		try {
			const response = await axios.post('/api/auth/refresh-token');
			console.log(response);
			accessToken = response.data.accessToken;
		}
		catch (err) {
			console.log(err);
		}
	}

	onMount(async () => {
		await refreshAccessToken();
	});

</script>

<main>
	<Router {routes} />
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