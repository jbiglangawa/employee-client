<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { sendRequest } from '$lib/connector';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	/** @type {import('./$types').PageData} */
	export let data;

	let username: string = '';
	let password: string = '';

	async function login() {
		invalidateAll() // Reset data from layout.svelte
		sendRequest('/api/token', 'POST', { username, password }).then((res) => {
			if (res.token) {
				toastStore.trigger({
					message: 'Logged in successfully',
					background: 'variant-filled-success'
				});
				goto('/employee');
			}
		});
	}
</script>

<div class="flex justify-center items-center mt-3">
	<form class="card min-w-40 p-4 text-token space-y-4" on:submit={login}>
		<label class="label">
			<span>Username</span>
			<input
				class="input"
				type="text"
				placeholder="Username"
				bind:value={username}
				autocomplete="username"
			/>
		</label>

		<label class="label">
			<span>Password</span>
			<input
				class="input"
				type="password"
				placeholder="Password"
				autocomplete="current-password"
				bind:value={password}
			/>
		</label>

		<button type="submit" class="btn variant-filled-primary w-full">Login</button>
	</form>
</div>
