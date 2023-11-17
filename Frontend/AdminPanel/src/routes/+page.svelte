<!-- Statistics for Admin to View -->
<!-- 
		total pending requests
		total enrolled in each program
		money being saved 
	-->

<script>
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import Loading from '$lib/Components/Loading.svelte';
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
	let GetStats = [];
	onMount(async () => {
		try {
			const response = await fetch(API_URL + '/users');
			const data = await response.json();
			GetStats = data; //  data is a list?
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<!-- <ul>
{#each GetStats as stat (stat.value)}
	<li>{stat.name}: {stat.value}</li>
{/each}
</ul> -->
