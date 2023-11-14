<script>
	import { onMount } from 'svelte';
  import { API_URL } from '$lib/api';
	import Loading from '$lib/Components/Loading.svelte';
	import { Stepper, Step, ProgressBar, ProgressRadial } from '@skeletonlabs/skeleton';
	let question = null;
	let questionsAsked = 0;
	let questionsRemaining = 0;
	// Total Max question is 0 -> USer page
	async function getNextQuestion() {
		const response = await fetch(API_URL + '/eligibility', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				eligiblePrograms: [], // List of program IDs
				ineligiblePrograms: [], // List of program IDs
				eligibility: {
					// User eligibility info
					agi: 35000
				}
			})
		});

		if (response.ok) {
			const result = await response.json();
			question = result.data;
		}
	}

	onMount(getNextQuestion);
</script>

<div class="h-full flex flex-col justify-center items-center">
	{#if question}
		<div class="m-4 card p-8 text-token space-y-4">
			<h1>{question.Question}</h1>
			<p>Field Name: {question['Field Name']}</p>
			<p>Expected Type: {question['Expected Type']}</p>
			<button on:click={updateQuestion}>Update</button>
			<ProgressBar
				transition="transition-all"
				label="Progress Bar"
				value={questionsAsked}
				max={questionsRemaining}
			/>
		</div>
	{:else}
		<Loading />
	{/if}
</div>
