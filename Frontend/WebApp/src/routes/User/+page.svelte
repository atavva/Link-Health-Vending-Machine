<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores';
	import { Avatar } from '@skeletonlabs/skeleton';

	import ProgramModal from '$lib/Components/ProgramModal.svelte';
	import Icon from '@iconify/svelte';
	import { API_URL } from '$lib/api';

	// For carousel
	let elemCarousel: HTMLDivElement;

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}

	let SignedIn = false;
	// let SignedIn = true
	let filteredPrograms;
	let userObj: {};
	$: {
		userObj = $user;
	}
	
	onMount(async () => {
		if (userObj.email!= ''){
			SignedIn = true
		}
		const loginResponse = await fetch(`${API_URL}/users`, {
			headers: {
				Authorization: `Bearer ${userObj.jwt}`,
			}
		});

		if (loginResponse.ok) {
			const { data } = await loginResponse.json();
		} else {
		}

		const queryParams = new URLSearchParams(userObj.eligibility).toString();
		const response = await fetch(`${API_URL}/programs?${queryParams}`);

		if (response.ok) {
			const { data } = await response.json();

			userObj.eligiblePrograms = data.filteredPrograms;
			console.log(userObj.eligiblePrograms) 
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
		<div class="m-4 flex  items-center">
			<Avatar width="w-16" initials="{userObj.firstName[0]}{userObj.lastName[0]}" />

			<h1 class="h1 mx-3">Hello, <b>{userObj.firstName} {userObj.lastName}</b></h1>
		</div>
		<div>
			{#if userObj.eligiblePrograms.length === 0}
				<h1 class="h3 m-3 ">No Eligible Programs</h1>
			{:else}
				<h1 class="h3 m-3 ">Eligible Programs:</h1>
				<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
					<!-- Button: Left -->
					<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
						&lt
					</button>
					<!-- Full Images -->
					<div
						bind:this={elemCarousel}
						class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto"
					>
						{#each userObj.eligiblePrograms as p}
							<ProgramModal
								name={p.program_name}
								jurisdiction={p.jurisdiction}
								image={p.image}
								description={p.long_desc}
								programID={p.program_id}

							/>
						{/each}
					</div>
					<!-- Button: Right -->
					<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
						&gt
					</button>
				</div>
			{/if}
		</div>
		<div>
			{#if userObj.pendingPrograms.length === 0}
				<h1 class="h3 m-3 ">No Pending Programs</h1>
				
			{:else}
				{userObj.pendingPrograms}
			{/if}
		</div>
		<div>
			{#if userObj.registeredPrograms.length === 0}
				<h1 class="h3 m-3 ">No Registered Programs</h1>
			{:else}
				{userObj.registeredPrograms}
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
			<br />
			<a href="/User/SignIn" class="btn variant-filled">Sign In</a>
		</div>
	</div>
{/if}
