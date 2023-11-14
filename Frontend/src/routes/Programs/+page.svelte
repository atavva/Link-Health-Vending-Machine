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
</script>

{#if programs}
	<div class="flex flex-wrap m-3">
		{#each programs as program (program.program_id)}
			<a class="card w-1/5 m-3 p-3">
				<header>
					<h1 class="text-xl text-center">{program.program_name}</h1>
					<img src="data:image/jpeg;base64,{program.image}" class="w-1/7" alt={program.program_name} />
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
