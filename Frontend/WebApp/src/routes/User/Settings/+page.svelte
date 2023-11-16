<script lang="ts">
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL, fetchFields } from '$lib/api';
	import { user } from '$lib/stores';
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let isFocused: boolean = true;
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
	let userObj: {};
	$: {
		userObj = $user;
	}

	onMount(() => console.log(userObj));

	async function deleteUser() {
		const response = await fetch(API_URL + '/users', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${userObj.jwt}`,
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error('Failed to delete user');
		}
		alert('Bye Bye');
		window.location.href = '/';
	}
</script>

<div class="h-full flex flex-col justify-center items-center">
	{#if userObj.eligibility != {}}
		<div class="flex w-4/5 flex-col bg-surface-800 p-3">
			{#each Object.entries(userObj.eligibility) as [field, value]}
				<h1 class="m-2">{field.toUpperCase()}: {value === null ? 'No data' : value}</h1>
			{/each}
			<button on:click={deleteUser} class="btn variant-filled-error">Delete Account</button>
		</div>
	{:else}
		<Loading />
	{/if}
</div>
