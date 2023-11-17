<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { API_URL } from '$lib/api';
	import { onMount } from 'svelte';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	let getstats = {};


    function openUserCard(meta: unknown):void {
        console.log(meta)
    }

	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['id', 'Name', 'Email', 'Programs'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">5</code>']
	};

	onMount(async () => {
		try {
			const response = await fetch(API_URL + '/users');
			const data = await response.json();
			getstats = data; //  data is a list?
		} catch (error) {
			console.error('error fetching data:', error);
		}
	});
</script>

<div class="h-full m-3 flex flex-col  items-center">
	<Table source={tableSimple} interactive={true} on:selected={openUserCard} />
</div>
