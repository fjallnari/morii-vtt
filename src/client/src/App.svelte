<script lang="ts">
	import axios from "axios";
	import Router, { location, replace, querystring } from "svelte-spa-router";
	import { wrap } from 'svelte-spa-router/wrap';
	import NotFound from "./routes/NotFound.svelte";
	import Dashboard from "./routes/Dashboard.svelte";
	import Auth from "./routes/Auth.svelte";
	import { accessToken, user } from "./stores";
	import Game from "./routes/Game.svelte";
	import { axiosPublic } from "./axiosPublic";
	import mem from "mem";
    import { onMount } from "svelte";
    import { cssVarTheme } from "./util/util";
    import THEMES from "./enum/Themes";

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
		replace(`/auth${$querystring ? `?${$querystring}` : ''}`);
	}

	const memoizedRefreshToken = mem(refreshAccessToken, { maxAge });

	onMount(() => {
		const colorThemeID = localStorage.theme || "default";
		document.getElementById("root").setAttribute("style", cssVarTheme(THEMES.find(theme => theme.id === colorThemeID) ?? THEMES[0]));
	});
	
</script>


<main>
	<Router {routes} on:conditionsFailed={conditionsFailed}/>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		padding-top: 0px;
		max-width: 240px;
		margin: 0 auto;
		color: var(--clr-text);
	}

	$scheme-salmon: #FCC8B2, #EFA48B, #E9805D, #875343, #E9805D29, url('../static/bg/waves-salmon-b.svg');
	$scheme-rajah: #F6D0A7, #F2A654, #BF864A, #8C663F, #BF864A29, url('../static/bg/waves-rajah.svg');	
	$scheme-blue: #78A1BB, #5A77A1, #3C4C87, #2C3863, #3C4C8729, url('../static/bg/waves-blue.svg');
	$scheme-cyan: #AAD5DA, #547B81, #457179, #3B5158, #45717929, url('../static/bg/waves-cyan.svg');
	$scheme-sea: #79B1A3, #5F9B8D, #417D71, #335E57, #417D7129, url('../static/bg/waves-sea.svg');
	$scheme-viridian: #8BBBA7, #549C7E, #1C7C54, #21513F, #1C7C5429, url('../static/bg/waves-viridian.svg');
	$scheme-cordovan: #C5A4A7,#AB797E, #904E55, #603F46, #904E5529, url('../static/bg/waves-cordovan.svg');
	$scheme-rose: #CFA394, #C17C74, #BA6E65, #B35F56, #BA6E6529, url('../static/bg/waves-salmon-b.svg');
	$scheme-auburn: #CE9391, #B8605D, #A22C29, #642929, #A22C2929, url('../static/bg/waves-auburn.svg');
	$scheme-forest: #A68A64, #936639, #7F4F24, #582F0E, #7F4F2429, url('../static/bg/waves-forest.svg');

	$scheme-bg-default: #1B1B1E, #212125, #252529, #303036,#56565D, #F9F9F9;
	$scheme-bg-rose: #141414, #1F1F1F, #272727, #333333,#4B4948 #ECE1D5;
	$scheme-bg-sea: #041F1E, #0B2323, #112627, #1E2D2F,#3A4747, #FAF6EF;
	$scheme-bg-forest: #1F2518, #333D29, #414833, #535B3F,#717856, #CBCDB6;

	// @mixin color-scheme($accent-light, $accent-normal, $accent-dark, $accent-darker, $accent-muted, $bg-image) {
	// 	--clr-accent-light: #{$accent-light};
	// 	--clr-accent-normal: #{$accent-normal};
	// 	--clr-accent-dark: #{$accent-dark};
	// 	--clr-accent-darker: #{$accent-darker};
	// 	--clr-accent-muted: #{$accent-muted};
	// 	--bg-waves: #{$bg-image};
	// }

	// @mixin color-scheme-bg($bg, $box-bg-dark, $box-bg-normal, $box-bg-light, $box-bg-lighter, $text) {
	// 	--clr-bg: #{$bg};
	// 	--clr-box-bg-dark: #{$box-bg-dark};
	// 	--clr-box-bg-normal: #{$box-bg-normal};
	// 	--clr-box-bg-light: #{$box-bg-light};
	// 	--clr-box-bg-lighter: #{$box-bg-lighter};
	// 	--clr-text: #{$text};
	// }

	:root {
		--semi-bold: 600;
		--clr-contrast-normal: #BC4B51;
		--clr-contrast-dark: #A43D42;
		--clr-icon-owner: #E2C044;
		--clr-icon-player: #6CD4FF;

		//@include color-scheme-bg($scheme-bg-default ...);
		//@include color-scheme($scheme-cyan ...);
	}
	
	:global(tab-container) {
        height: inherit;
        flex: 5;

        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 400;
        font-family: Quicksand;
    }

    :global(box) {
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    :global(mod) {
        font-weight: var(--semi-bold);
        border-bottom: 1px #F2E8CF dotted;
        min-width: 1.2em;
        margin: 0em 0.3em;
    }

    :global(sendable) {
        cursor: pointer;
		transition: color 100ms ease-in;
		display: inline-grid;
		align-self: center;
    }

    :global(sendable:active) {
        color: var(--clr-accent-normal);
    }

    :global(textarea) {
        width: 100%;
        padding: 0.5em 0.5em;
        box-sizing: border-box;
        border: 1px solid #ffffff8a;
        border-radius: 4px;
        background-color: transparent;
        font-size: 1em;
        font-family: Athiti;
        color: var(--clr-text);
        resize: none;
        scrollbar-width: thin;
    }

    :global(textarea:focus) {
        outline: none !important;
        border: 2px solid var(--clr-accent-normal) !important;
        caret-color: var(--clr-accent-normal) !important;
    }

	:global(textarea:hover) {
        outline: none !important;
        border: 2px solid #ffffffb4;
    }

    :global(select) {
        background-color: var(--clr-box-bg-light);
        color: inherit;
        border: none;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        border-radius: 4px;
    }

	:global(svg.medi-icon) {
       font-size: 1.25em;
   	}

	:global(svg.big-icon) {
       font-size: 1.5em;
   	}

	:global(svg.bigger-icon) {
       font-size: 2em;
   	}

	:global(svg.biggest-icon) {
       font-size: 2.5em;
   	}

	:global(pfp) {
		fill: var(--clr-text);
	}

    :global(.box-with-label) {
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    :global(.box-main-text) {
        margin-top: auto;
        margin-bottom: -0.6vw;
    }

    :global(.box-justify-filler) {
        margin-top: auto; 
        height: 0;
    }
    
    :global(.box-label) {
        font-size: 0.6vw;
        font-weight: 400;
        font-family: Athiti;
        text-transform: uppercase;
    }

	:global(.pulse) {
        animation: color-change 3s infinite;
    }

	:global(.error) {
        border: 2px dashed var(--clr-contrast-normal);
    }

	:global(.error-pulse) {
		border: 2px dashed transparent;
		border-radius: 4px;
		animation: border-color-change 3s infinite;
	}

	/* Icon Ripple effect */
	:global(.icon-ripple) {
        background-position: center;
        transition: background 0.8s;
    }

    :global(.icon-ripple:hover) {
        background: #404044aa;
    }

    :global(.icon-ripple:active) {
        background-color: #5a5a5fca;
        transition: background 0s;
    }

    @keyframes color-change {
        0% { color: var(--clr-text); }
        50% { color: var(--clr-contrast-normal); }
        100% { color: var(--clr-text); }
    }

	@keyframes border-color-change {
        0% { border-color: transparent; }
        50% { border-color: var(--clr-contrast-normal); }
        100% { border-color: transparent; }
    }
	
	:global(.svelecte-control) {
		box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
		--sv-bg: var(--clr-box-bg-normal) !important;
		--sv-color: var(--clr-text) !important;
		--sv-border: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
		--sv-item-color: var(--clr-text) !important;
		--sv-item-active-bg: var(--clr-accent-dark) !important;
		--sv-dropdown-height: 400px !important;
		z-index: 4;
	}

	:global(.tooltip.dark-tooltip) {
        --tooltip-background-color: var(--clr-box-bg-dark);
        --tooltip-border-radius: 4px;
        --tooltip-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        --tooltip-font-family: Quicksand !important;
        --tooltip-line-height: 1em;
        --tooltip-padding: 12px;
		--tooltip-color: var(--clr-text);
    }

    :global(.tooltip.blurred) {
        --tooltip-background-color: #212125BA;
        --tooltip-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        --tooltip-border-radius: 4px;
        --tooltip-font-family: Quicksand !important;
        --tooltip-padding: 12px;
		--tooltip-line-height: 1.2em;
        backdrop-filter: blur(6px);
        text-transform: none;
    }

	:global(.tooltip h4) {
        margin: 0.25rem 0em 0.5rem 0em;
        font-size: 1.1em;
        font-weight: var(--semi-bold);
    }

	@media only screen and (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>