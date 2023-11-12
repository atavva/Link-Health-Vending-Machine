<script lang="ts">
	import '../app.postcss';
	import Navagation from '$lib/Components/Navagation.svelte';
	import { AppShell, AppBar, Drawer, Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let currentTile: number = 0;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<img src="" alt="Link Health Icon" />
			</svelte:fragment>
			{$page.url.pathname.slice(1)}
			<svelte:fragment slot="trail">
				<img src="" alt="language">
				<img src="" alt="menu">
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">
		<h1 class="float-left">ad</h1>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
	</svelte:fragment>
</AppShell>
