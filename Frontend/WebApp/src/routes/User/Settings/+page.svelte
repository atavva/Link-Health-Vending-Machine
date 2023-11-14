<script lang="ts">
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL, fetchFields } from '$lib/api';
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let isFocused: boolean = true;
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
	let fields;
	onMount(async () => {
		try {
			const data = await fetchFields();
			fields = data;
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	});

	async function deleteUser() {
		// const response = await fetch(API_URL + '/users', {
			// method: 'DELETE',
			// headers: {
				// Authorization: `Bearer ${jwt}`,
				// 'Content-Type': 'application/json'
			// }
		// });
// 
		// if (response.ok) {
			// const data = await response.json();
			// return data;
		// } else {
			// throw new Error('Failed to delete user');
		// }
		alert("Bye Bye")
		window.location.href = "/"
	}
</script>

<div class="h-full flex flex-col justify-center items-center">
	<div class="flex flex-col bg-surface-700 p-3">
		{#if fields}
			{#each Object.entries(fields) as [field, value]}
				<h1 class="m-2">{field.toUpperCase()}: {value === null ? 'No data' : value}</h1>
			{/each}
			<button on:click={deleteUser} class="btn variant-filled-warning">Delete Account</button>
		{:else}
			<Loading />
		{/if}
	</div>
</div>
