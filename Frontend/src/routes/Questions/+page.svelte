<script>
	import { onMount } from 'svelte';
	import { Stepper, Step, ProgressBar, ProgressRadial } from '@skeletonlabs/skeleton';
	let dataE = {
		Question: 'Hello World',
		Answered: 0
	};
	let dataA = {
		Question: 'buebue bue',
		Answered: 'lorem upsium'
	};
	let data = [dataE, dataE, dataA];

	let questionsAsked = 0;
	let questionsRemaining = 10;

	function updateQuestion() {
		questionsAsked += 1;
	}

	let question = null;
	// Total Max question is 0 -> USer page
	async function getNextQuestion() {
		const response = await fetch('http://127.0.0.1:3000/api/eligibility', {
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

<div class="h-screen flex flex-col justify-center items-center">
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
		<ProgressRadial />
	{/if}
</div>
