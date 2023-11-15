<script lang="ts">
    export let programID:number
    export let name = ""
    export let jurisdiction = ""
    export let image = ""
    export let description = ""
    // Still need to set up program offering

    async function signUpToProgram() {
       // Logic needs to be put in 
    }
</script>

<div class="card">
	<header class="card-header">{name}</header>
	<section class="p-4">{description}</section>
	<footer class="card-footer">
        <button class="btn variant-outline-secondary">Sign Up</button>
    </footer>
</div>