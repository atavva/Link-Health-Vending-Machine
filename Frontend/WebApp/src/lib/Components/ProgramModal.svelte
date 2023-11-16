<script lang="ts">
	export let programID: number;
	export let name : string = '';
	export let jurisdiction : string = '';
	export let image : string = '';
	export let description : string = '';
	// Still need to set up program offering

	async function signUpToProgram() {
		// Logic needs to be put in
	}
</script>

<div class="flex flex-col justify-between m-4 card card-hover overflow-hidden block w-1/5 shrink-0 w-[28%] snap-start">
	<header class="overflow-hidden" height="10%">
		<h1 class="h3 m-2 text-center">
			{name}
		</h1>

		<img
			src="data:image/jpeg;base64,{image}"
			class=" object-scale-down w-full aspect-[21/9] rounded-t rounded-b-lg"
			alt={name}
		/>
	</header>
	<div class="m-4 p">
		<b>Jurisdiction: {jurisdiction}</b>
		<p>{description}</p>
	</div>
	<footer class="card-footer flex justify-center">
		<button class="btn variant-outline-secondary">Sign Up</button>
	</footer>
</div>
