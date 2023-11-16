<script>
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	import Loading from '$lib/Components/Loading.svelte';
	import { goto } from '$app/navigation';

	// Noah if your looking at this or anyone
	// This Needs to be styled and the modal class needs to be linked
	let programs = null;

	function signUp(){
		goto('/User')
	}
	onMount(async () => {
		const response = await fetch(API_URL + '/programs');
		if (response.ok) {
			const result = await response.json();
			programs = result.data.filteredPrograms;
			console.log("Okay res")
		}
	});
</script>

{#if programs}
	<div class="flex flex-wrap justify-between">
		{#each programs as program (program.program_id)}
			<div
				class="flex flex-col justify-between m-4 card card-hover overflow-hidden block w-1/5"
			>
				<header class="overflow-hidden" height="10%">
					<h1 class="h3 m-2 text-center">
						{program.program_name}
					</h1>

					<img
						src="data:image/jpeg;base64,{program.image}"
						class=" object-scale-down w-full aspect-[21/9] rounded-t rounded-b-lg"
						alt={program.program_name}
					/>
				</header>
				<div class="m-4 p">
					<b>Jurisdiction: {program.jurisdiction}</b>
					<p>{program.long_desc}</p>
				</div>
				<footer class="card-footer flex justify-center">
					<button on:click={signUp} class="btn variant-outline-secondary">Sign Up</button>
				</footer>
			</div>
		{/each}
	</div>
{:else}
	<Loading />
{/if}

<!-- <h2>Eligibility</h2> -->
<!-- {#each program.eligibility as eligibility, i} -->
<!-- <div> -->
<!-- <h3>Condition {i + 1}: {eligibility.condition}</h3> -->
<!-- <ul> -->
<!-- {#each eligibility.rules as rule} -->
<!-- <li>{rule.fieldName} {rule.comparisonOperator} {rule.value}</li> -->
<!-- {/each} -->
<!-- </ul> -->
<!-- </div> -->
<!-- {/each} -->
