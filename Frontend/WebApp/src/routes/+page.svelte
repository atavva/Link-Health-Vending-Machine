<script lang="ts">
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import Loading from '$lib/Components/Loading.svelte';
	let isFocused: boolean = true;
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
</script>

<div class="h-full flex flex-col justify-center items-center">
	<div class="hero">
		<h1 class="h1">Link Health Vending Machine</h1>
	</div>
	<div class="m-5 p">
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum odio esse aspernatur aliquam
			dolorem quas! Deleniti voluptate nisi modi veniam, quae quas odio molestiae rem, harum saepe,
			asperiores temporibus qui. Dolorum, quasi sapiente nesciunt placeat, ratione animi assumenda
			tempore ducimus numquam, harum beatae quos neque laudantium reprehenderit illum inventore
			labore.
		</p>
	</div>
	<a class="btn m-3 variant-outline-primary" href="/Questions">Take Questionnaire</a>
</div>
