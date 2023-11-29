<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import AdminLayout from '$lib/Components/adminLayout.svelte';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	let stats = null;

	const states: ConicStop[] = [
		{ label: 'MA', color: 'rgba(255,255,255,1)', start: 0, end: 10 },
		{ label: 'CA', color: 'rgba(255,255,255,0.5)', start: 10, end: 35 },
		{ label: 'WA', color: 'rgba(255,255,255,0.25)', start: 35, end: 100 }
	];

	onMount(async () => {
		try {
			const response = await fetch(API_URL + '/users');
			const data = await response.json();
			console.log(stats);
			stats = data; //  data is a list?
		} catch (error) {
			alert('error fetching data:', error);
		}
	});
</script>

<!-- {#if stats}
	<h1 class="logo-item p-3 variant-filled-error">No permission</h1>
{:else}
	<h1 class="logo-item p-3 variant-filled-error">No permission</h1>
{/if} -->

<AdminLayout />
<div class=" h-full flex m-3 justify-center items-center">
	<div class="card p-3 flex mx-3 flex-col f-fit">
		<ConicGradient stops={states} legend>States</ConicGradient>
	</div>
	<div class="card p-3 text-xl mx-3 h-fit">
		<h1>Money Saved $59,999</h1>
		<h1>People Served 1,000</h1>
	</div>
</div>
