<script lang="ts">
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	let question = null;
	let questionsAsked = 0;
	let questionsRemaining = 0;
	let userObj = $user;
	let ineligiblePrograms = [];
	let answer: any;
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
				eligbility: userObj.eligibility
			})
		});

		if (response.ok) {
			if (question) {
				updateUser(question);
			}
			const result = await response.json();
			question = result.data;
			questionsAsked += 1;
			questionsRemaining = questionsAsked + question.maxRemaningQuestions;

			console.log(result);
		} else {
			alert('error');
		}
	}
</script>

<div class="h-full flex flex-col justify-center items-center">
	{#if question}
		<div class="m-4 card w-3/5 p-8 text-token space-y-4">
			<h1>{question.Question}</h1>
			<!-- <input bind:value={answer} class="" type={question.questionInfo.expectedType} /> -->
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
