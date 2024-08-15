<script lang="ts">
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let username: string = '';
	let password: string = '';

	async function login() {
		fetch('/api/token', {
			method: 'POST',
			body: JSON.stringify({username, password}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			if(res.status == 200) {
				return res.json()
			}
			// Exception handling
		}).then(res => {
			if(res.token) {
				toastStore.trigger({
					message: "Logged in successfully",
					background: 'variant-filled-success'
				})
				goto('/employee')
			}
		})
	}
</script>

<div class="flex justify-center items-center mt-3">
	<form class="card min-w-40 p-4 text-token space-y-4" on:submit={login}>
		<label class="label">
			<span>Username</span>
			<input class="input" type="text" placeholder="Username" bind:value={username} />
		</label>
		
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" placeholder="Password" bind:value={password} />
		</label>

		<button type="submit" class="btn variant-filled-primary w-full">Login</button>
	</form>
</div>
