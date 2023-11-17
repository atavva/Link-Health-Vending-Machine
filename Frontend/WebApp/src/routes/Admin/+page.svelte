<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/api';
let stats = {}
	onMount(async () => {
		try {
			const response = await fetch(API_URL + '/users');
			const data = await response.json();
			getstats = data; //  data is a list?
		} catch (error) {
			console.error('error fetching data:', error);
		}
	});
</script>
