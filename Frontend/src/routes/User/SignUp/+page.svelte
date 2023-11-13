<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	let isFocused: boolean = true;
// Same 
// Passowrd Strentgh 
// Repeate 
</script>
<div class="h-screen flex justify-center items-center">
	<form class="h-fit w-fit m-4 card p-8 text-token space-y-4" use:focusTrap={isFocused}>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Enter name..." />
		</label>
		<label class="label">
			<span>Email</span>
			<input class="input" type="email" placeholder="Enter email address..." />
		</label>
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" placeholder="Enter password..." />
		</label>
		<div class="text-center">
			<button class="btn variant-filled">Sign Up</button>
		</div>
	</form>
</div>

