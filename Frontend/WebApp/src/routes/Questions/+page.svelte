<script lang="ts">
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let question = null;
	let questionsAsked = 0;
	let questionsRemaining = 0;
	let userObj = $user;
	let ineligiblePrograms: number[] = [];
	let answer: any;
	let isChecked = false;
	function updateUser(fieldName: any) {
		console.log(fieldName);
		// user.update((current)=> {
		//     return {...current, eligibility.fieldName:answer}
		// });
	}

	async function getNextQuestion() {
		const response = await fetch(API_URL + '/eligibility', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				eligiblePrograms: userObj.eligiblePrograms,
				ineligiblePrograms: ineligiblePrograms,
				eligibility: userObj.eligibility
			})
		});

		if (response.ok) {
			// if (question) {
			// 	updateUser(question);
			// }
			const result = await response.json();
			question = result.data;
			questionsAsked += 1;
			questionsRemaining = questionsAsked + question.maxRemaningQuestions;

			console.log(result);
		} else {
			alert('error');
		}
	}

	onMount(getNextQuestion);
</script>

<div class="h-full flex flex-col justify-center items-center">
	{#if question}
		<div class="m-4 flex flex-col card w-fit p-8 text-token space-y-4">

			<h1 class="text-center">{question.questionInfo.Question}</h1>
			{#if question.questionInfo.expected_type == 'Number'}
				<input type="number" class="input" bind:value={answer} />
			{:else if question.questionInfo.expected_type == 'Boolean'}
			<p>
				<input class="checkbox" type="checkbox" bind:checked={isChecked} />{isChecked
					? '\tYes'
					: '\tNo'}
			</p>
			{:else}
				<input type="text" bind:value={answer} />
			{/if}
			<button class="btn variant-outline-secondary">Next</button>
			<ProgressBar
				transition="transition-all"
				label="Progress Bar"
				max={questionsRemaining}
				value={questionsAsked}
			/>
		</div>
	{:else}
		<Loading />
	{/if}
</div>
