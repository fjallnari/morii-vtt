<script lang="ts">
	import axios from "axios";
	import Router, { replace } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import Chat from "./routes/Chat.svelte";
	import Home from "./routes/Home.svelte";
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";


	const routes = {
		"/": Home,
		"/chat": Chat,
		"/dashboard": wrap({
			component: Dashboard,
			conditions: [
				async () => {
					try {
						const response = await axios.get('/api/welcome', {
							headers: {
								'X-Auth-Token': "super-secret-token"
							}
						});
						// console.log(response);
						return response.status === 200;
					}
					catch {
						return false;
					}

				}
			]
		}),
		"*": NotFound
	}

	function conditionsFailed(event) {
		console.error('conditionsFailed event', event.detail);
		replace('/');
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