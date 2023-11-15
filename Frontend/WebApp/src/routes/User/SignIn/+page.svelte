<script lang="ts">
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import { focusTrap } from '@skeletonlabs/skeleton';
	let isFocused: boolean = true;
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

			user.update((current) => {
				return { ...current, jwt: data.jwt };
			});

			goto('/User')
		} else {
			alert('Login failed');
		}
	}

	// Same
	// Passowrd Strentgh
	// Repeate
</script>

<div class="h-screen flex justify-center items-center">
	<form class="h-fit w-fit m-4 card p-8 text-token space-y-4" use:focusTrap={isFocused}>
		<label class="label">
			<span>Email</span>
			<input bind:value={email} class="input" type="email" placeholder="Enter email address..." />
		</label>
		<label class="label">
			<span>Password</span>
			<input bind:value={password} class="input" type="password" placeholder="Enter password..." />
		</label>
		<div class="text-center">
			<button on:click={SignIn} class="btn variant-filled">Sign In</button>
		</div>
	</form>
</div>
