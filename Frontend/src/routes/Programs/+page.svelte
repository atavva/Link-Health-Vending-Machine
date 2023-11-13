<script>
	import { onMount } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import Loading from '$lib/Components/Loading.svelte';
	let programs = null;

	onMount(async () => {
		const response = await fetch('http://127.0.0.1:3000/api/programs');
		if (response.ok) {
			const result = await response.json();
			programs = result.data.filteredPrograms;
		}
	});
</script>

{#if programs}
	<div class ="flex flex-wrap m-3">
		{#each programs as program (program.program_id)}
			<div class="card w-1/5 m-3 p-3">
				<h1 class="text-xl text-center">{program.program_name}</h1>
				<p>Status: {program.status}</p>
				<p>Jurisdiction: {program.jurisdiction}</p>
				<p>Short Description: {program.short_desc}</p>
				<p>Long Description: {program.long_desc}</p>
				<img src={program.image_path} alt={program.program_name} />
				<h2>Eligibility</h2>
				{#each program.eligibility as eligibility, i}
					<div>
						<h3>Condition {i + 1}: {eligibility.condition}</h3>
						<ul>
							{#each eligibility.rules as rule}
								<li>{rule.fieldName} {rule.comparisonOperator} {rule.value}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{:else}
<Loading></Loading>
{/if}
