<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores';
	import { Avatar } from '@skeletonlabs/skeleton';

	import Icon from '@iconify/svelte';
	import { API_URL } from '$lib/api';
	let SignedIn = false;
	let filteredPrograms;
	let userObj: {};
	$: {
		userObj = $user;
	}
	onMount(async () => {
		if (Object.keys(userObj.eligibility).length !== 0) {
			console.log(JSON.stringify(userObj.eligibility));
		}

		const queryParams = new URLSearchParams(userObj.eligibility).toString();
		const response = await fetch(`${API_URL}/programs?${queryParams}`);

		if (response.ok) {
			const { data } = await response.json();
			filteredPrograms = data.filteredPrograms;
			console.log(filteredPrograms);
		} else {
			console.error('Failed to fetch programs');
		}
	});
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
</script>

{#if SignedIn}
	<div class="h-screen flex flex-col m-4">
		<div class="m-4">
			<Avatar width="w-16" initials="{userObj.firstName[0]}{userObj.lastName[0]}" />
		</div>
		<h1>Hello, <b>{userObj.firstName} {userObj.lastName}</b></h1>
		<h1>Email: <b>{userObj.email}</b></h1>
		<div>
			{#if userObj.eligiblePrograms.length === 0}
				<h1>No Eligible Programs</h1>
			{:else}
				{userObj.eligiblePrograms}
			{/if}
		</div>
		<div>
			{#if userObj.registeredPrograms.length === 0}
				<h1>No Registered Programs</h1>
			{:else}
				{userObj.registeredPrograms}
			{/if}
		</div>
		<div>
			{#if userObj.pendingPrograms.length === 0}
				<h1>No Pending Programs</h1>
			{:else}
				{userObj.pendingPrograms}
			{/if}
		</div>
	</div>
{:else}
	<div class="h-full flex flex-col justify-center items-center">
		<a class="btn m-3 variant-outline-primary" href="/Questions">
			<Icon icon="mdi:file-question" />
			<p>Take Questionnaire</p></a
		>
		<p class="p">or Sign in to see your programs</p>
		<div class="text-center">
		<br>
			<a href="/User/SignIn" class="btn variant-filled">Sign In</a>
		</div>
	</div>
{/if}
