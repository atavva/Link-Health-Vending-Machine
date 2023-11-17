<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	import Loading from '$lib/Components/Loading.svelte';
	import { goto } from '$app/navigation';

	// Noah if your looking at this or anyone
	// This Needs to be styled and the modal class needs to be linked
	let programs = null;

	onMount(async () => {
		const response = await fetch(API_URL + '/programs');
		if (response.ok) {
			const result = await response.json();
			programs = result.data.filteredPrograms;
			console.log('Okay res');
		}
	});
</script>

{#if programs}{:else}
	<Loading />
{/if}
