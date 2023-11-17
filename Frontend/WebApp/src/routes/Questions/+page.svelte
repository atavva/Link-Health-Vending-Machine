<script lang="ts">
	import { goto } from '$app/navigation';
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let question: {
		maxRemainingQuestions: number;
		questionInfo: { Question: any; expected_type: string; field_name: string };
	} | null = null;
	let questionsAsked = 0;
	let questionsRemaining = 0;
	let loadingNextQuestion = false;
	let ineligiblePrograms: number[] = [];
	let answer: any;
	let isChecked = false;

	let userObj: {};
	$: {
		userObj = $user;
	}

	function updateAll() {
		const newData: { [key: string]: any } = {};
		newData[question?.questionInfo.field_name!] = answer;
		userObj.eligibility = { ...userObj.eligibility, ...newData };
		getNextQuestion();
		answer = '';
	}

	async function updateUser() {
		if (userObj.jwt.length > 0) {
			const response = await fetch(API_URL + '/Users/eligibility', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userObj.jwt
				},

				body: JSON.stringify({
					eligibility: userObj.eligibility
				})
			});
			if (response.ok) {
				console.log('User Updated on DB');
			} else {
				console.log(
					JSON.stringify({
						eligibility: userObj.eligibility
					})
				);
				alert('Failed to update user');
			}
		}
	}
	async function getNextQuestion() {
		loadingNextQuestion = true;
		const response = await fetch(API_URL + '/eligibility', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				eligibility: userObj.eligibility
			})
		});

		if (response.ok) {
			// if (question) {
			// 	updateUser(question);
			// }
			const result = await response.json();
			if (result.data.maxRemaningQuestions == 0 || result.data.maxRemaningQuestions == null) {
			}
			loadingNextQuestion = false;
			question = result.data;
			questionsAsked += 1;
			questionsRemaining = questionsAsked + question.maxRemainingQuestions;
			if (questionsAsked == questionsRemaining) {
				updateUser();
				goto('/User');
			}

			console.log({ QA: questionsAsked, QR: questionsRemaining });
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
			<button class="btn variant-outline-secondary" on:click={updateAll}>Next</button>
			{#if questionsAsked != 0}
				<ProgressBar
					transition="transition-all"
					label="Progress Bar"
					max={questionsRemaining}
					value={questionsAsked}
				/>
			{:else}
				<ProgressBar transition="transition-all" label="Progress Bar" max={1} value={1} />
			{/if}
		</div>
	{:else}
		<Loading />
	{/if}
</div>
