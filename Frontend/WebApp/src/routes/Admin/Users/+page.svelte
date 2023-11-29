<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { Modal, TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { API_URL } from '$lib/api';
	import { onMount } from 'svelte';
	import AdminLayout from '$lib/Components/adminLayout.svelte';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	let id;
	let name;
	let email;
	let programs;
	let eligibility;

	let getstats = {};


	function openUserCard(meta: unknown): void {
		name = meta.detail
		console.log(meta.detail)
		modalStore.trigger(modal);
	}
	const modal: ModalSettings = {
		type: 'alert',
		// Data
		title: 'name ' + name,
		body: 'Filler For Now',
		image: 'https://i.imgur.com/WOgTG96.gif'
	};
	const sourceData = [
		{ id: 1, name: 'John Applesead', email: 'goodEmail@proton.com', programs: '1,3,4,9' },
		{ id: 2, name: 'John Applesead', email: 'goodEmail@proton.com', programs: '2,4,9' },
		{ id: 3, name: 'John Applesead', email: 'goodEmail@proton.com', programs: '1,4,6,7' },
		{ id: 4, name: 'John Applesead', email: 'goodEmail@proton.com', programs: '1,2,4,9' },
		{ id: 5, name: 'John Applesead', email: 'goodEmail@proton.com', programs: '1,2,4,9' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['id', 'Name', 'Email', 'Programs'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['id', 'name', 'email', 'programs']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['id', 'name', 'email', 'programs'])
		// Optional: A list of footer labels.
		// foot: ['Total', '', '<code class="code">5</code>']
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

<AdminLayout />
<div class="h-full m-3 flex flex-col items-center">
	<Table source={tableSimple} interactive={true} on:selected={openUserCard} />
</div>

<Modal>
	<h1>skahdf</h1>
</Modal>
