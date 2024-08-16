<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import LegalMatchIcon from '$lib/images/legalmatch-icon.png';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';
	import Registration from './registration.svelte';
	import { sendRequest } from '$lib/connector';
	import { goto, invalidateAll } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		registerModal: { ref: Registration }
	};

	const logout = () => {
		sendRequest('/api/logout', 'POST').then((res) => {
			if (res.success) {
				invalidateAll()
				goto('/');
			}
		});
	};
</script>

<Modal components={modalRegistry} />
<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="app-bar">
			<svelte:fragment slot="lead">
				<img class="header-icon" src={LegalMatchIcon} alt="legalmatch-icon" />
			</svelte:fragment>
			
			<svelte:fragment slot="trail">
				{#if data?.post?.isTokenReady}
					<button class="btn" on:click={logout}>logout</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>

<style>
	.header-icon {
		height: 50px;
	}
</style>
