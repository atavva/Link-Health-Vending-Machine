<script>
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Loading from '$lib/Components/Loading.svelte';
	let programs = null;

	onMount(async () => {
		const response = await fetch(API_URL + '/programs');
		if (response.ok) {
			const result = await response.json();
			programs = result.data.filteredPrograms;
		}
	});
	function openModal(){
		alert("Temp holder for model")
	}
</script>

{#if programs}
	<div class="flex flex-wrap m-3">
		{#each programs as program (program.program_id)}
			<a on:click={openModal} class=" m-4 card w-1/5">
				<header height="10%">
					<h1 class="relative w-fit m-auto p-2 z-10 text-xl font-bold bg-surface-100-800-token ">
						{program.program_name}
					</h1>

					<img
						src="data:image/jpeg;base64,{program.image}"
						class=" h-auto overflow-hidden w-full rounded-t rounded-b-lg"
						alt={program.program_name}
					/>
				</header>
				<p>{program.jurisdiction}</p>
				<p>{program.short_desc}</p>
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
			</a>
		{/each}
	</div>
{:else}
	<Loading />
{/if}
