<script lang="ts">
	import '../app.postcss';
	import Navagation from '$lib/Components/Navagation.svelte';
	import {
		AppShell,
		AppBar,
		autoModeWatcher,
		Drawer,
		Avatar,
		LightSwitch,
		TabAnchor,
		TabGroup,
		getDrawerStore,
		type DrawerSettings,

		type AutocompleteOption

	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	// svgs
	const languageSVG = "m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z"
	// Drawer
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	const drawerStrore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		position: 'right',
		width: 'fit',
		transitions: slide,
		padding: 'p-2'
		// blur: "blur"
	};
	function triggerDrawer() {
		drawerStrore.open(drawerSettings);
	}
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let currentTile: number = 0;

	// Language Settings
	const languageOptions: AutocompleteOption<string>[] = [
		{ label: 'Español', value: 'spanish' },
		{ label: 'Français', value: 'french' },
		{ label: '简体中文', value: 'chinese(simp)' },
		{ label: '繁體中文', value: 'chinese(traditional)' }
	];
	// onMount(drawerStrore.open(drawerSettings));
</script>

<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/"><img src="" alt="Link Health Icon" /></a>
			</svelte:fragment>
			{$page.url.pathname.slice(1)}
			<svelte:fragment slot="trail">
				<LightSwitch />
				
				<!-- <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> -->
					<!-- <path d={languageSVG}></path> -->
					<!-- </svg> -->
				<button on:click={triggerDrawer}>=</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<Drawer>
		<div class="m-3 flex flex-col">
			<Avatar class="items-center justify-center ">
				<h1>Name</h1>
			</Avatar>
			<ul>
				<li><a href="/Programs">View All Programs</a></li>
				<li><a href="/Questions">Take Questionnaire</a></li>
				<li><a href="/User">View Your Programs</a></li>
				<li><a href="/User/Settings">Edit Settings</a></li>
				<li><a href="/User/SignUp">Sigh Up</a><a href="/User/SignIn">Sign in</a></li>
			</ul>
		</div>
	</Drawer>
	<slot />
	<svelte:fragment slot="footer">
		<h1 class="text-right m-3">© Link Health 2023</h1>
	</svelte:fragment>
</AppShell>
