<script lang="ts">
	import Router from "svelte-spa-router";
	import Chat from "./routes/Chat.svelte";
	import Home from "./routes/Home.svelte";
	import NotFound from "./routes/NotFound.svelte";

	const routes = {
		"/": Home,
		"/chat": Chat,
		"*": NotFound
	}
	
</script>

<main>
	<Router {routes}/>
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