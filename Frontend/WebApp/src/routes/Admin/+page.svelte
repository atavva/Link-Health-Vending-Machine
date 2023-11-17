<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	let stats = null;
	onMount(async () => {
		try {
			const response = await fetch(API_URL + '/users');
			const data = await response.json();
			stats = data; //  data is a list?
		} catch (error) {
			alert('error fetching data:', error);
		}
	});
</script>

{#if stats}
	<h1 class="logo-item p-3 variant-filled-error">No permission</h1>
{:else}
	<h1 class="logo-item p-3 variant-filled-error">No permission</h1>
{/if}
