<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL, fetchFields } from '$lib/api';
	import { user } from '$lib/stores';
	import { Avatar, focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	const languageOptions = [
		{ id: '0', label: 'English', value: 'english' },
		{ id: '1', label: 'Español', value: 'spanish' },
		{ id: '2', label: 'Français', value: 'french' },
		{ id: '3', label: '简体中文', value: 'chinese(simp)' },
		{ id: '4', label: '繁體中文', value: 'chinese(traditional)' }
	];

	let isFocused: boolean = true;
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
	let userObj: {};
	$: {
		userObj = $user;
		console.log(userObj);
	}

	onMount(() => {
		if (userObj.jwt.length < 0) {
			console.log('hello');
			if (browser) {
				goto('/SignIn');
			}
		}
	});
	async function updateUser() {
		console.log("poo")
	}
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
		<div class="flex w-4/5 m-2 flex-col variant-form-material
		 p-3">
			<!-- <Avatar class="m-auto" initials="{userObj.firstName[0]}{userObj.lastName[0]}" /> -->
			<!-- {#each Object.entries(userObj) as [field, value]}
				<h1 class="m-2">{field.toUpperCase()}: {value === null ? 'No data' : value}</h1>
			{/each} -->

			<form>
				<hr />
				<br />
				<legend class="h3">User Info:</legend>
				<label class="label">
					Email:
					<input
						type="email"
						class="input"
						placeholder={userObj.email}
						bind:value={userObj.email}
					/>
				</label>
				<label class="label">
					First Name:
					<input
						type="text"
						class="input"
						placeholder={userObj.firstName}
						bind:value={userObj.firstName}
					/>
				</label>
				<label class="label">
					Last Name:
					<input
						type="text"
						class="input"
						placeholder={userObj.lastName}
						bind:value={userObj.lastName}
					/>
				</label>
				<label class="label">
					Language:
					<select class="select">
						{#each languageOptions as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</label>
				<br />
				<div class="flex">
					<button on:click={updateUser} class="btn variant-filled-success m-auto"
						>Update Account</button
					>
				</div>
				<br />
				<hr />
				<br />
				<fieldset>
					<legend class="h3">Eligibility Info:</legend>
					<label class="label">
						AGI:
						<input
							type="number"
							class="input"
							placeholder={userObj.eligibility.agi}
							bind:value={userObj.eligibility.agi}
						/>
					</label>
					<label class="label">
						Poverty Level:
						<input
							type="number"
							class="input"
							step="0.1"
							placeholder={userObj.eligibility.poverty_level}
							bind:value={userObj.eligibility.poverty_level}
						/>
					</label>
					<label class="label">
						Age:
						<input
							type="number"
							class="input"
							placeholder={userObj.eligibility.age}
							bind:value={userObj.eligibility.age}
						/>
					</label>
					<label class="label">
						Dependents:
						<input
							type="number"
							class="input"
							placeholder={userObj.eligibility.dependents}
							bind:value={userObj.eligibility.dependents}
						/>
					</label>
				</fieldset>
				<br />
				<hr />
				<br />
				<div class="flex">
					<button on:click={deleteUser} class="btn variant-filled-success m-auto"
						>Update Account</button
					>
				</div>
				<br />
				<hr />
				<br />
			</form>
			<button on:click={updateUser} class="btn variant-filled-error">Delete Account</button>
			<br />
		</div>
	{:else}
		<Loading />
	{/if}
</div>
