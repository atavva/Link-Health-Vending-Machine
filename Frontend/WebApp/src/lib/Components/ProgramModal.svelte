<script lang="ts">
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	let userObj: {};
	$: {
		userObj = $user;
	}
	export let programID: number;
	export let name: string = '';
	export let jurisdiction: string = '';
	export let image: string = '';
	export let description: string = '';

	async function signUpToProgram() {
		console.log(userObj)
		let temp = userObj.registeredPrograms.slice(); // Logic needs to be put in
		temp.push(programID);
		const response = await fetch(API_URL + '/users/registered-programs', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization' : `Bearer ${userObj.jwt}`
			},
			body: JSON.stringify({
				registeredPrograms: temp
			})
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Signed up for program' + programID);
			userObj.registeredPrograms.push(programID);
			console.log(userObj);
			return data;
		} else {
			throw new Error('Failed to register to program');
		}

		// Some post method
	}
</script>

<div
	class="flex flex-col justify-between m-4 card card-hover overflow-hidden block w-1/5 shrink-0 w-[28%] snap-start"
>
	<header class="overflow-hidden" height="10%">
		<h1 class="h3 m-2 text-center">
			{name}
		</h1>

		<img
			src="data:image/jpeg;base64,{image}"
			class=" object-scale-down w-full aspect-[21/9] rounded-t rounded-b-lg"
			alt={name}
		/>
	</header>
	<div class="m-4 p">
		<b>Jurisdiction: {jurisdiction}</b>
		<p>{description}</p>
	</div>
	<footer class="card-footer flex justify-center">
		<button on:click={signUpToProgram} class="btn variant-outline-secondary">Sign Up</button>
	</footer>
</div>
