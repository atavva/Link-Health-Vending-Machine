<script lang="ts">
	import { focusTrap, ProgressBar, Stepper, Step } from '@skeletonlabs/skeleton';
	import { API_URL } from '$lib/api';
	let isFocused: boolean = true;
	let firstName: string = '';
	let lastName: string = '';
	let email: string = '';
	let password: string = '';

	let passwordFeedback = {
		length: false,
		lowercase: false,
		uppercase: false,
		number: false,
		specialCharacter: false
	};

	function checkPasswordStrength(password) {
		passwordFeedback.length = password.length >= 8;
		passwordFeedback.lowercase = /[a-z]/.test(password);
		passwordFeedback.uppercase = /[A-Z]/.test(password);
		passwordFeedback.number = /[0-9]/.test(password);
		passwordFeedback.specialCharacter = /[!@#\$%\^&\*]/.test(password);
	}
	$: {
		passwordFeedback.length = password.length >= 8;
		passwordFeedback.lowercase = /[a-z]/.test(password);
		passwordFeedback.uppercase = /[A-Z]/.test(password);
		passwordFeedback.number = /[0-9]/.test(password);
		passwordFeedback.specialCharacter = /[!@#\$%\^&\*]/.test(password);
	}

	async function signup(e: CustomEvent) {
		checkPasswordStrength(password);

		if (!Object.values(passwordFeedback).every(Boolean)) {
			console.error('Password does not fulfill all requirements');
			return;
		}

		const response = await fetch(API_URL + '/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password
			})
		});
		console.log(
			JSON.stringify({
				firstName,
				lastName,
				email,
				password
			})
		);

		if (response.ok) {
			const data = await response.json();
			console.log(data);
            window.location.href = "/User"

		} else {
			alert('Signup failed, please try again');
		}
	}
</script>

<div class="h-full flex justify-center items-center">
	<form class="h-3/5 w-2/5 m-auto card p-8 text-token space-y-4" use:focusTrap={isFocused}>
		<Stepper on:complete={signup}>
			<Step>
				<svelte:fragment slot="header">Please Input First and Last Name</svelte:fragment>
				<label class="label">
					<span>First Name</span>
					<input
						bind:value={firstName}
						class="input"
						type="text"
						placeholder="Enter first name..."
					/>
				</label>

				<label class="label">
					<span>Last Name</span>
					<input
						bind:value={lastName}
						class="input"
						type="text"
						placeholder="Enter last name..."
					/>
				</label>
			</Step>
			<Step>
				<svelte:fragment slot="header">Please Input Email</svelte:fragment>
				<label class="label">
				<label class="label">
					<input
						bind:value={email}
						class="input"
						type="email"
						placeholder="Enter email address..."
					/>
				</label>
			</Step>
			<Step buttonCompleteLabel="Sign Up">
				<svelte:fragment slot="header">Please Input a Strong Password</svelte:fragment>
				<label class="label">
					<span>Password</span>
					<input
						bind:value={password}
						on:change={checkPasswordStrength}
						class="input"
						type="password"
						placeholder="Enter password..."
					/>
				</label>
				<ul>
					<li class={passwordFeedback.length ? 'text-green-500' : 'text-red-500'}>
						At least 8 characters
						<ProgressBar
							value={password.length}
							max={8}
							transition="transition-all transition-colors"
						/>
					</li>
					<li class={passwordFeedback.lowercase ? 'text-green-500' : 'text-red-500'}>
						Contains lowercase letter
					</li>
					<li class={passwordFeedback.uppercase ? 'text-green-500' : 'text-red-500'}>
						Contains uppercase letter
					</li>
					<li class={passwordFeedback.number ? 'text-green-500' : 'text-red-500'}>
						Contains a number
					</li>
					<li class={passwordFeedback.specialCharacter ? 'text-green-500' : 'text-red-500'}>
						Contains a special character
					</li>
				</ul>
			</Step>
		</Stepper>
	</form>
</div>
