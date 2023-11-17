<!-- 
	send to log in page
	once authenticated, show layout 

-->
<script lang="ts">
	import '../app.postcss';
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
	
	import { onMount } from 'svelte';
	import { user } from '$lib/stores';
	
	import { navigateTo } from "@svelte-routing/core";

	// onMount(() => {
	// 	const authToken = localStorage.getItem("authToken");
	// 	if (!authToken) {
	// 		// User is not authenticated, redirect to the login page
	// 		navigateTo("/login");
	// 	}
	// });
	
	let userObj: {};
	$: {
		userObj = $user;
	}

	onMount(() => console.log(userObj));
	async function deleteUser() {
		const response = await fetch(API_URL + '/users', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${userObj.jwt}`, // authorization?
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			navigateTo("/AdminSignIn");
		} 
	}

	import { page } from '$app/stores';
	// Icons
	import Icon from '@iconify/svelte';
	// Drawer
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	import { API_URL } from '$lib/api';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	

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

	// Testing functions
	function a() {
		alert('Not Implemented');
	}
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
                <div class="flex justify-between">
                    <a href="/"> Stats </a> 
                    <a href="/Programs"> Programs </a>
                    <a href="/Users"> Users </a>
                </div>
                <a href="/"><img src="" alt="Link Health Icon" /></a>
            </svelte:fragment>
			{$page.url.pathname.slice(1)}
			<svelte:fragment slot="trail">
				<LightSwitch />
				<button class="btn card-hover" on:click={a}><Icon icon="ion:language-outline" /></button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<h1 class="text-right m-3">© Link Health 2023</h1>
	</svelte:fragment>
</AppShell>
