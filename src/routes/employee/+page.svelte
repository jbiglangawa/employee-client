<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment';
	import Fa from 'svelte-fa';
	import {
		faAngleDoubleLeft,
		faAngleDoubleRight,
		faAngleLeft,
		faAngleRight,
		faEdit,
		faTrash
	} from '@fortawesome/free-solid-svg-icons';
	import { calculateAge, getLengthOfStay } from './util';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type GetEmployee from '$lib/models/GetEmployee';
	import { sendRequest } from '$lib/connector/apiconnector';
	import { lastEmployeeId } from '$lib/store';
	import { browser } from '$app/environment';

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
		sendRequest(`/api/employee?page=${currentPage}`).then((res) => {
			employees = res.employees;
			lastPage = res.totalCount > 0 ? Math.trunc(res.totalCount / 10) : 0;
		});
	};

	const navigate = (page: number) => {
		currentPage = page;
		getEmployees();
	};

	const onAddEmployee = (employeeId?: Number) => {
		let modalSettings = { ...modal };
		if (employeeId) {
			modalSettings.value = { employeeId };
		}
		modalStore.trigger(modalSettings);
	};

	const onDeleteEmployee = (employeeId: Number) => {
		sendRequest('/api/employee/byId?id=' + employeeId, 'DELETE').then((res) =>
			lastEmployeeId.set(res)
		);
	};

	lastEmployeeId.subscribe((value) => {
		if (browser && value > 0) {
			getEmployees();
			currentPage = 0;
			lastEmployeeId.set(0);
		}
	});
</script>

<div class="flex justify-center">
	<div class="employee-wrapper">
		<section class="flex w-full mb-2">
			<button type="button" class="btn variant-filled-surface" on:click={() => onAddEmployee()}>
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
						<th class="table-cell-fit"></th>
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
							<td class="table-cell-fit">
								<button class="btn" on:click={() => onAddEmployee(row.employeeId)}
									><Fa icon={faEdit} /></button
								>
								<button class="btn" on:click={() => onDeleteEmployee(row.employeeId)}
									><Fa icon={faTrash} /></button
								>
							</td>
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
