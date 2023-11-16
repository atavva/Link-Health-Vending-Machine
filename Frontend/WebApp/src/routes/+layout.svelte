<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		autoModeWatcher,
		Drawer,
		Avatar,
		LightSwitch,
		getDrawerStore,
		type DrawerSettings,
		type AutocompleteOption
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { user } from '$lib/stores';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	// Icons
	import Icon from '@iconify/svelte';
	// User Object
	let userObj: {};
	$: {
		userObj = $user;
	}
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

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let currentTile: number = 0;

	// Language Settings
	const languageOptions: AutocompleteOption<string>[] = [
		{ label: 'Español', value: 'spanish' },
		{ label: 'Français', value: 'french' },
		{ label: '简体中文', value: 'chinese(simp)' },
		{ label: '繁體中文', value: 'chinese(traditional)' }
	];

	// Testing functions
	function a() {
		alert('Not Implemented');
	}

	let SignedIn: bool = false;
	onMount(() => {
		// drawerStrore.open(drawerSettings)
		if (userObj.jwt.length > 0) {
			SignedIn = true;
		}
	});
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
				<button class="btn card-hover" on:click={a}><Icon icon="ion:language-outline" /></button>
				<!-- <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> -->
				<!-- <path d={languageSVG}></path> -->
				<!-- </svg> -->
				<button on:click={triggerDrawer}>
					<Icon icon="material-symbols:density-medium-rounded" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<Drawer>
		<div class="w-full flex flex-col items-center justify-center p-3">
			<a href="/User/Settings">
				<Avatar class="m-4" 
				initials="{userObj.firstName[0]}{userObj.lastName[0]}" />
			</a>
			<div class="flex flex-col">
				<a class="btn m-3 variant-outline-primary" href="/Programs">
					<Icon icon="foundation:page-filled" />
					<p>All Programs</p></a
				>
				<a class="btn m-3 variant-outline-primary" href="/User">
					<Icon class="justify-between" icon="mdi:user" />
					<p>Your Programs</p></a
				>
				<a class="btn m-3 variant-outline-primary" href="/Questions">
					<Icon icon="mdi:file-question" />
					<p>Take Questionnaire</p></a
				>
				{#if !SignedIn}
					<div class="flex m-auto">
						<a class="btn variant-ringed m-3" href="/User/SignUp">Sigh Up</a>
						<a class="btn variant-ringed m-3" href="/User/SignIn">Sign in</a>
					</div>
				{:else}
					<a class="btn m-3 variant-outline-primary" href="/User/Settings">
						<Icon icon="uil:setting" />
						<p>Edit Profile</p></a
					>
				{/if}
			</div>
		</div>
	</Drawer>
	<slot />
	<svelte:fragment slot="footer">
		<h1 class="text-right m-3">© Link Health 2023</h1>
	</svelte:fragment>
</AppShell>
