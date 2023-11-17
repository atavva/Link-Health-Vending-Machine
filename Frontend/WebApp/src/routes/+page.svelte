<script lang="ts">
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import Loading from '$lib/Components/Loading.svelte';
	import Fade from '$lib/Components/Fade.svelte';
	import vendingMachine from '$lib/assets/vending-machine.png';
	let isFocused: boolean = true;
	let fadeInterval = 800;
	// For Log in
	// Pass in Email Password
	// Ret Json Web token
</script>

<div class="flex flex-row items-center">
	<div class="flex flex-col align-left justify-center items-start pl-20 h-screen w-full gap-8">
		<div class="hero">
			<Fade fadeTime={fadeInterval}>
				<h1 class="h1 font-bold">Link Health Vending Machine</h1>
			</Fade>
		</div>
		<div class="hero">
			<Fade fadeTime={2 * fadeInterval}>
				<h3 class="h3 font-bold">Quick and Easy.</h3>
			</Fade>
		</div>
		<div class="p text-lg">
			<Fade fadeTime={2 * fadeInterval}>
				<p class="leading-9">
					Take our questionnaire and discover what welfare programs you are eligible for!
					<br />
					We will show you all the programs you are eligible for, and Link Health members will help get you signed up.
				</p>
			</Fade>
		</div>
		<Fade fadeTime={3 * fadeInterval}>
			<div>
				<div class="flex flex-row justify-between items-center gap-7">
					<a class="btn py-4 h3 variant-outline-primary border-2 rounded-md" href="/Questions">Take Questionnaire</a>
					<h5 class="text-xl">OR</h5>
					<a class="btn py-4 h3 variant-outline-primary border-2 rounded-md" href="/User">Create an Account</a>
				</div>
				<p class="py-1">Fast and Secure</p>
			</div>
		</Fade>
	</div>
	<div class="w-full flex justify-center items-center">
		<Fade fadeTime={4 * fadeInterval}>
			<img src={vendingMachine} alt="Vending Machine"/>
		</Fade>
	</div>
</div>

<style>
	h1, h3, a {
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
