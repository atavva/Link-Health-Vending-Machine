<script lang="ts">
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import Loading from '$lib/Components/Loading.svelte';
	let isFocused: boolean = true;
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
</script>

<div class="h-full flex m-5 flex-col justify-center items-center">
	<h1 class="text-xl">Link Health Vending Machine</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum odio esse aspernatur aliquam
		dolorem quas! Deleniti voluptate nisi modi veniam, quae quas odio molestiae rem, harum saepe,
		asperiores temporibus qui. Dolorum, quasi sapiente nesciunt placeat, ratione animi assumenda
		tempore ducimus numquam, harum beatae quos neque laudantium reprehenderit illum inventore
		labore.
	</p>

				<a class="btn m-3 variant-outline-primary" href="/Questions">Take Questionnaire</a>
</div>
<Loading />
