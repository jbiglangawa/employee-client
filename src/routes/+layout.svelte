<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import LegalMatchIcon from '$lib/images/legalmatch-icon.png';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

</script>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="app-bar">
			<svelte:fragment slot="lead">
				<img class="header-icon" src={LegalMatchIcon} alt='legalmatch-icon'>
			</svelte:fragment>
			<svelte:fragment slot="trail">

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