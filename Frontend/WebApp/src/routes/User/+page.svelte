<script lang="ts">
	import Loading from '$lib/Components/Loading.svelte';
	import { user } from '$lib/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	let SignedIn = false;
	let userObj = $user;
	$: userObj = $user;
	console.log(userObj, $user);
	if (userObj.jwt.length > 0) {
		SignedIn = true;
	}

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
	Please Sign in
	<Loading />
{/if}
