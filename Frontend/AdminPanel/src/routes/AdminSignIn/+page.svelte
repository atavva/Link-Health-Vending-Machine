<!-- sign in page from WebApp -->
<script lang="ts">
	import { goto } from '$app/navigation';
	// import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	let isFocused: boolean = true;
    let API_URL = 'http://127.0.0.1:3000/api';
	let email = '';
	let password = '';
	async function SignIn() {
		const response = await fetch(API_URL + '/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		if (response.ok) {
			const data = await response.json();
			console.log("user")
			user.update((current) => {
				return { ...current, jwt: data.jwt };
			});

			goto('/+layout');
		} else {
			alert('Login failed');
		}
	}

</script>

<div class="h-full flex justify-center items-center">
	<form class="h-fit w-fit m-4 card p-8 text-token space-y-4" use:focusTrap={isFocused}>
		<label class="label">
			<span class="flex items-center"><Icon icon="ic:round-email" /> &nbsp Email</span>
			<input bind:value={email} class="input" type="email" placeholder="Enter email address..." />
		</label>
		<label class="label">
			<span class="flex items-center"><Icon icon="mdi:password" /> &nbsp Password</span>
			<input bind:value={password} class="input" type="password" placeholder="Enter password..." />
		</label>
		<div class="flex justify-between">
			<button on:click={SignIn} class="btn variant-filled">Sign In</button>
		</div>
	</form>
</div>
