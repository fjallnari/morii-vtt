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
		console.log($querystring);
		replace(`/auth${$querystring ? `?${$querystring}` : ''}`);
	}

	const memoizedRefreshToken = mem(refreshAccessToken, { maxAge });
	
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

	$scheme-salmon: #FCC8B2, #EFA48B, #E9805D, #875343, url('../static/bg/waves-salmon-b.svg');
	$scheme-rajah: #F6D0A7, #F2A654, #BF864A, #8C663F, url('../static/bg/waves-rajah.svg');	
	$scheme-blue: #78A1BB, #5A77A1, #3C4C87, #2C3863, url('../static/bg/waves-blue.svg');
	$scheme-cyan: #AAD5DA, #5AB1BB, #457179, #3B5158, url('../static/bg/waves-cyan.svg');
	$scheme-sea: #79B1A3, #5F9B8D, #417D71, #335E57, url('../static/bg/waves-sea.svg');
	$scheme-viridian: #8BBBA7, #549C7E, #1C7C54, #21513F, url('../static/bg/waves-viridian.svg');
	$scheme-cordovan: #C5A4A7,#AB797E, #904E55, #603F46, url('../static/bg/waves-cordovan.svg');
	$scheme-rose: #CFA394, #C17C74, #BA6E65, #B35F56, url('../static/bg/waves-salmon-b.svg');
	$scheme-auburn: #CE9391, #B8605D, #A22C29, #642929, url('../static/bg/waves-auburn.svg');
	$scheme-forest: #A68A64, #936639, #7F4F24, #582F0E, url('../static/bg/waves-forest.svg');
	

	$scheme-bg-default: #1B1B1E, #212125, #252529, #303036, #F9F9F9;
	$scheme-bg-rose: #141414, #1F1F1F, #272727, #333333, #ECE1D5;
	$scheme-bg-sea: #041F1E, #0B2323, #112627, #1E2D2F, #FAF6EF;
	$scheme-bg-forest: #1F2518, #333D29, #414833, #656D4A, #C2C5AA;

	@mixin color-scheme($accent-light, $accent-normal, $accent-dark, $accent-darker, $bg-image) {
		--clr-accent-light: #{$accent-light};
		--clr-accent-normal: #{$accent-normal};
		--clr-accent-dark: #{$accent-dark};
		--clr-accent-darker: #{$accent-darker};
		--clr-contrast-normal: #BC4B51;
		--clr-contrast-dark: #A43D42;
		--bg-waves: #{$bg-image};
	}

	@mixin color-scheme-bg($bg, $box-bg-dark, $box-bg-normal, $box-bg-light, $text) {
		--clr-bg: #{$bg};
		--clr-box-bg-dark: #{$box-bg-dark};
		--clr-box-bg-normal: #{$box-bg-normal};
		--clr-box-bg-light: #{$box-bg-light};
		--clr-text: #{$text};
	}

	:root {
		--semi-bold: 600;

		@include color-scheme-bg($scheme-bg-default ...);
		@include color-scheme($scheme-blue ...);
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
        transition-duration: 200ms;
        transition-property: color;
    }

    :global(sendable:active) {
        color: var(--clr-accent-normal);
        transition-duration: 200ms;
        transition-property: color;
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
	}

	:global(.mdc-dialog .mdc-dialog__surface) {
		background-color: var(--clr-box-bg-dark);
	}

	:global(.mdc-text-field .mdc-text-field__input) {
		caret-color: var(--clr-accent-normal) !important;
	}

	:global(.mdc-slider .mdc-slider__value-indicator) {
        color: var(--clr-text) !important;
        background-color: var(--clr-bg) !important;
        opacity: 1 !important;
    }

    :global(.mdc-slider__track .mdc-slider__tick-mark--inactive) {
        background-color: var(--clr-accent-normal) !important;
    }

    :global(.mdc-slider .mdc-slider__thumb-knob) {
        background-color: var(--clr-accent-dark) !important;
        border-color: var(--clr-accent-normal) !important;
    }

    :global(.mdc-slider .mdc-slider__track--active_fill) {
        background-color: var(--clr-accent-dark) !important;
        border-color: var(--clr-accent-dark) !important;
    }

	:global(.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading, 
	.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch, 
	.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing) {
		border-color: var(--clr-accent-normal) !important;
	}

	:global(.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label) {
		color: var(--clr-accent-normal) !important;
	}

	:global(.mdc-deprecated-list-item--selected, .mdc-deprecated-list-item--activated) {
		color: var(--clr-accent-normal) !important;
	}

	:global(.mdc-circular-progress__determinate-circle, .mdc-circular-progress__indeterminate-circle-graphic) {
		stroke: var(--clr-accent-normal) !important;
	}

	@media only screen and (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>