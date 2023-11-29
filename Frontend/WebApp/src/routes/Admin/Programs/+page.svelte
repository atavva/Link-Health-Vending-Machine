<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	import Loading from '$lib/Components/Loading.svelte';
	import { goto } from '$app/navigation';
	import AdminLayout from '$lib/Components/adminLayout.svelte';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	// Noah if your looking at this or anyone
	// This Needs to be styled and the modal class needs to be linked
	let programs = null;
	let tableSimple: TableSource
	onMount(async () => {
		const response = await fetch(API_URL + '/programs');
		if (response.ok) {
			const result = await response.json();
			programs = result.data.filteredPrograms;
			console.log(programs[0])
		}
		tableSimple = {
			// A list of heading labels.
			head: ['id', 'Name', 'Jurisdiction', 'Description'],
			// The data visibly shown in your table body UI.
			body: tableMapperValues(programs, ['program_id', 'program_name', 'jurisdiction', 'short_desc']),
			// Optional: The data returned when interactive is enabled and a row is clicked.

			meta: tableMapperValues(programs, ['program_id', 'program_name', 'jurisdiction', 'short_desc']),
			// foot: ['Total', '', '<code class="code">5</code>']
		};
	});
	function openUserCard(meta: unknown): void {
		console.log(meta);
	}
</script>

<AdminLayout />
{#if programs}
	<div class="h-full m-3 flex flex-col items-center">
		<Table source={tableSimple} interactive={true} on:selected={openUserCard} />
	</div>
{:else}
	<Loading />
{/if}
