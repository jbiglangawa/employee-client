<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment';
	import Fa from 'svelte-fa';
	import {
		faAngleDoubleLeft,
		faAngleDoubleRight,
		faAngleLeft,
		faAngleRight,
		faFlag
	} from '@fortawesome/free-solid-svg-icons';
	import { calculateAge, getLengthOfStay } from './util';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type GetEmployee from '$lib/models/GetEmployee';
	import type Contact from '$lib/models/Contact';
	import type Address from '$lib/models/Address';

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'registerModal'
	};

	/* States */
	let employees: GetEmployee[] = [];
	let currentPage = 0;
	let lastPage = 0;

	onMount(() => {
		getEmployees();
	});

	$: navForward = currentPage == 0;
	$: navBackward = currentPage == lastPage;

	const getEmployees = () => {
		fetch(`/api/employee?page=${currentPage}`)
			.then((res) => res.json())
			.then((res) => {
				employees = res.employees;
				lastPage = res.totalCount > 0 ? Math.trunc(res.totalCount / 10) : 0;
			});
	};

	const navigate = (page: number) => {
		currentPage = page;
		getEmployees();
	};

	const onAddEmployee = () => {
		modalStore.trigger(modal);
	};
</script>

<div class="flex justify-center">
	<div class="employee-wrapper">
		<section class="flex w-full mb-2">
			<button type="button" class="btn variant-filled-surface" on:click={onAddEmployee}>
				<span>Add</span>
			</button>
		</section>
		<div class="table-container">
			<table class="table table-hover table-comfortable">
				<thead>
					<tr>
						<th>Name</th>
						<th>Primary Address</th>
						<th>Primary Contact Info</th>
						<th>Age</th>
						<th># of Years in the Company</th>
					</tr>
				</thead>
				<tbody>
					{#each employees as row, i}
						{@const primaryAddress = row.addresses.filter((a) => a.isPrimary)[0]}
						{@const primaryContact = row.contacts.filter((a) => a.isPrimary)[0]}
						<tr>
							<td>{[row.firstName, row.middleName, row.lastName].join(' ')}</td>
							<td
								>{primaryAddress
									? [primaryAddress.address1, primaryAddress.address2].join(' ')
									: ''}</td
							>
							<td>{primaryContact ? primaryContact.contactInfo : ''}</td>
							<td>{calculateAge(row.birthDate)}</td>
							<td>{getLengthOfStay(moment(row.hireDate))}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="flex align-items-end mt-4 self-end">
			<button class="btn mx-2" id="nav-start" disabled={navForward} on:click={() => navigate(0)}
				><Fa icon={faAngleDoubleLeft} /></button
			>
			<button
				class="btn mx-2"
				id="nav-backward"
				disabled={navForward}
				on:click={() => navigate(currentPage - 1)}><Fa icon={faAngleLeft} /></button
			>
			<button
				class="btn mx-2"
				id="nav-forward"
				disabled={navBackward}
				on:click={() => navigate(currentPage + 1)}><Fa icon={faAngleRight} /></button
			>
			<button
				class="btn mx-2"
				id="nav-end"
				disabled={navBackward}
				on:click={() => navigate(lastPage)}><Fa icon={faAngleDoubleRight} /></button
			>
		</div>
	</div>
</div>

<style>
	.employee-wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		margin-top: 30px;
		flex-direction: column;
		max-width: 1200px;
	}
</style>
