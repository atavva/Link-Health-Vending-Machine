<script lang="ts">
	import { goto } from '$app/navigation';
	import Loading from '$lib/Components/Loading.svelte';
	import { API_URL } from '$lib/api';
	import { user } from '$lib/stores';
	import { ProgressBar, RadioItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { RadioGroup } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	let question: {
		maxRemainingQuestions: number;
		questionInfo: { Question: any; expected_type: string; field_name: string; description: string };
	} | null = null;
	let questionsAsked = 0;
	let questionsRemaining = 0;
	let loadingNextQuestion = false;
	let ineligiblePrograms: number[] = [];
	let percentageCompleted = 0;
	let answer: any;
	let isChecked = false;

	let userObj: {};
	$: {
		userObj = $user;
	}

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	function updateAll() {
		const newData: { [key: string]: any } = {};
		if (answer == 'Yes') {
			answer = true;
		} else if (answer == 'No') {
			answer = false;
		}
		newData[question?.questionInfo.field_name!] = answer;
		userObj.eligibility = { ...userObj.eligibility, ...newData };
		console.log(userObj);
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
			console.log(result);
			if (result.data.maxRemaningQuestions == 0 || result.data.maxRemaningQuestions == null) {
			}
			question = result.data;
			questionsAsked += 1;
			questionsRemaining = questionsAsked + question.maxRemainingQuestions;
			percentageCompleted = question.percentageCompleted;
			if (questionsAsked == questionsRemaining || question?.maxRemainingQuestions == null) {
				// updateUser();
				window.location.href = '/User';
			}
			loadingNextQuestion = false;
		} else {
			alert('error');
		}
	}

	onMount(getNextQuestion);
</script>

<div class="h-full flex flex-col justify-center items-center">
	{#if loadingNextQuestion == false}
	{#if question}
		<div class="m-4 flex flex-col card w-fit p-8 text-token space-y-4">
			<button class="btn variant-filled [&>*]:pointer-events-none" use:popup={popupHover}>
				<Icon icon="mdi:information-outline" />
			</button>

			<h1 class="text-center">{question.questionInfo.Question}</h1>
			<div class="card p-4 variant-filled" data-popup="popupHover">
				<p>{question.questionInfo.description}</p>
				<div class="arrow variant-filled" />
			</div>

			{#if question.questionInfo.expected_type == 'Number'}
				<input type="number" class="input" bind:value={answer} />
			{:else if question.questionInfo.expected_type == 'Boolean'}
				<div>
					<RadioGroup display="flex">
						<RadioItem bind:group={answer} name="yes" value={true}>Yes</RadioItem>
						<RadioItem bind:group={answer} name="no" value={false}>No</RadioItem>
					</RadioGroup>
				</div>
			{:else if question.questionInfo.expected_type.startsWith('Option')}
				<select class="select" bind:value={answer}>
					{#each question.questionInfo.expected_type.split('Option ')[1].split('|') as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			{:else}
				<input type="text" bind:value={answer} />
			{/if}
			<button class="btn variant-outline-secondary" on:click={updateAll}>Next</button>
			{#if questionsAsked != 0}
				<ProgressBar
					transition="transition-all"
					label="Progress Bar"
					max={1}
					value={percentageCompleted}
				/>
			{:else}
				<ProgressBar transition="transition-all" label="Progress Bar" max={1} value={1} />
			{/if}
		</div>
		<div />
	{:else}
		<Loading />
	{/if}
{:else}
		<Loading />
	{/if}

</div>
