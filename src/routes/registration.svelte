<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faClose, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
	import moment from 'moment';
	import type Contact from '$lib/models/Contact';
	import type Address from '$lib/models/Address';
	import { sendRequest } from '$lib/connector';
	import { lastEmployeeId } from '$lib/store';

	/** @type {import('./$types').PageData} */
	import { page } from '$app/stores';

	const modalStore = getModalStore();

	let employeeId = 0;
	let firstName = '';
	let lastName = '';
	let middleName = '';
	let birthDate = '';
	let gender = '';
	let maritalStatus = '';
	let currentPosition = '';
	let hireDate = '';
	let contacts: Contact[] = [{}];
	let addresses: Address[] = [{}];

	// Update Scenario will occur if an employee ID is detected
	if ($modalStore[0].value) {
		sendRequest(
			'/api/employee/byId?id=' + $modalStore[0].value.employeeId
		).then((res) => {
			employeeId = res.employeeId;
			firstName = res.firstName;
			lastName = res.lastName;
			middleName = res.middleName;
			gender = res.gender;
			maritalStatus = res.maritalStatus;
			currentPosition = res.currentPosition;
			contacts = res.contacts;
			addresses = res.addresses;
			birthDate = moment(res.birthDate).format('yyyy-MM-DD');
			hireDate = moment(res.hireDate).format('yyyy-MM-DD');
		});
	}

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(firstName);

		if (employeeId) {
			sendRequest('/api/employee', 'PATCH', {
				employeeId,
				firstName,
				lastName,
				middleName,
				gender,
				maritalStatus,
				currentPosition,
				contacts,
				addresses,
				clearContacts: contacts.length == 0,
				clearAddresses: addresses.length == 0,
				birthDate: formatDate(birthDate),
				hireDate: formatDate(hireDate)
			}).then((res) => {
				modalStore.close();
				lastEmployeeId.update(() => res.data.updateEmployee);
			});
		} else {
			sendRequest('/api/employee', 'POST', {
				firstName,
				lastName,
				middleName,
				birthDate: formatDate(birthDate),
				gender,
				maritalStatus,
				currentPosition,
				hireDate: formatDate(hireDate),
				contacts,
				addresses
			}).then((res) => {
				modalStore.close();
				lastEmployeeId.update(() => res.data.createEmployee);
			});
		}
	}

	const formatDate = (date: string) => {
		return moment(date).format();
	};

	const addNew = (field: string) => {
		if (field == 'contact') {
			contacts.push({
				contactInfo: '',
				isPrimary: false
			});
			contacts = contacts;
		} else if (field == 'address') {
			addresses.push({
				address1: '',
				address2: '',
				isPrimary: false
			});
			addresses = addresses;
		}
	};

	const removeFromArray = (field: string, i: number) => {
		if (field == 'contact') {
			contacts.splice(i, 1);
			contacts = contacts;
		} else if (field == 'address') {
			addresses.splice(i, 1);
			addresses = addresses;
		}
	};

	const deleteEmployee = () => {
		sendRequest('/api/employee/byId?id=' + employeeId, 'DELETE').then((res) =>
			lastEmployeeId.set(res)
		);
	};
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
		<article class="edit-form-dialog">
			<header class="text-2xl font-bold ml-5">
				<button aria-label="Close" id="close-dialog"></button>
				<h3 id="edit-employee-dialog-title" class="mb-2">
					{#if employeeId == 0}
						NEW EMPLOYEE REGISTRATION
					{:else}
						UPDATE EMPLOYEE INFORMATION
					{/if}
				</h3>
			</header>
			<section class="ml-5">
				{#if $page.data.post.isUserAndAdmin}
					<button
						class="btn variant-filled-primary"
						id="save"
						on:click={onFormSubmit}
					>
						<Fa icon={faSave}></Fa> &nbspSave
					</button>
				{#if employeeId > 0}
					<button
						id="delete"
						class="btn variant-ghost"
						on:click={deleteEmployee}
					>
						<Fa icon={faTrash} /> &nbspDelete
					</button>
				{/if}
				{/if}
			</section>
			<form id="regis-form" class="modal-form flex mt-5">
				<div class="regis-form contact-form form-left">
					<input type="text" id="employeeId" name="employeeId" class="hidden" />
					<label>
						First Name
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							aria-label="First Name"
							maxlength="255"
							aria-describedby="firstNameHelper"
							id="firstName"
							class="input"
							bind:value={firstName}
							required
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="firstName-helper"></small>
					</label>
					<label>
						Last Name
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							aria-label="Last Name"
							maxlength="255"
							data-static-disabled
							class="input"
							bind:value={lastName}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="lastName-helper"></small>
					</label>
					<label>
						Middle Name
						<input
							type="text"
							name="middleName"
							placeholder="Middle Name"
							aria-label="Middle Name"
							maxlength="255"
							class="input"
							bind:value={middleName}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="middleName-helper"></small>
					</label>
					<label>
						Birth Date
						<input
							type="date"
							name="birthDate"
							placeholder="Birth Date"
							aria-label="Birth Date"
							class="input"
							bind:value={birthDate}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="birthDate-helper"></small>
					</label>
					<label>
						Gender
						<input
							type="text"
							name="gender"
							placeholder="Gender"
							aria-label="Gender"
							maxlength="255"
							class="input"
							bind:value={gender}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="gender-helper"></small>
					</label>
					<label>
						Marital Status
						<input
							type="text"
							name="maritalStatus"
							placeholder="Marital Status"
							aria-label="Marital Status"
							maxlength="255"
							class="input"
							bind:value={maritalStatus}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="maritalStatus-helper"></small>
					</label>
					<label>
						Position
						<input
							type="text"
							name="currentPosition"
							placeholder="Position"
							aria-label="Position"
							maxlength="255"
							class="input"
							bind:value={currentPosition}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="currentPosition-helper"></small>
					</label>
					<label>
						Date Hired
						<input
							type="date"
							name="hireDate"
							placeholder="Date Hired"
							aria-label="Date Hired"
							class="input"
							bind:value={hireDate}
							disabled={!$page.data.post.isUserAndAdmin}
						/>
						<small id="hireDate-helper"></small>
					</label>
				</div>
				<div class="contact-form form-right">
					<h6 class="mb-2">Contact Info:</h6>
					<table class="table table-hover">
						<thead>
							<th scope="col">Value</th>
							<th scope="col">Primary</th>
							<th></th>
						</thead>
						<tbody id="contact-info-table-body">
							{#each contacts as contact, i}
								<tr id="contact-{i}">
									<th scope="row">
										<input
											type="text"
											maxlength="100"
											class="input"
											placeholder="Contact Information"
											aria-label="Contact Information"
											bind:value={contact.contactInfo}
											disabled={!$page.data.post.isUserAndAdmin}
										/>
										<small id="contact-info-{i}-helper"></small>
									</th>
									<td
										><input
											type="checkbox"
											class="checkbox"
											bind:checked={contact.isPrimary}
											disabled={!$page.data.post.isUserAndAdmin}
										/>
									</td>
									<td>
										{#if $page.data.post.isUserAndAdmin}
											<button
												class="btn"
												on:click={() => removeFromArray('contact', i)}
											>
												<Fa icon={faClose} />
											</button>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
					{#if $page.data.post.isUserAndAdmin}
					<div class="text-right">
						<button on:click={() => addNew('contact')}>Add new</button>
					</div>
					{/if}
					<h6 class="mt-5 mb-2">Address Info:</h6>
					<table class="table table-hover">
						<thead>
							<th scope="col">Address 1</th>
							<th scope="col">Address 2</th>
							<th scope="col">Primary</th>
							<th scope="col"></th>
						</thead>
						<tbody id="address-info-table-body">
							{#each addresses as address, i}
								<tr id="address-{i}">
									<th scope="row">
										<input
											type="text"
											maxlength="500"
											class="input"
											placeholder="Address 1"
											aria-label="Address 1"
											bind:value={address.address1}
											disabled={!$page.data.post.isUserAndAdmin}
										/>
										<small id="address1-{i}-helper"></small>
									</th>
									<td>
										<input
											type="text"
											maxlength="500"
											class="input"
											placeholder="Address 2"
											aria-label="Address 2"
											bind:value={address.address2}
											disabled={!$page.data.post.isUserAndAdmin}
										/>
										<small id="address2-{i}-helper"></small>
									</td>
									<td
										><input
											type="checkbox"
											class="checkbox"
											bind:checked={address.isPrimary}
											disabled={!$page.data.post.isUserAndAdmin}
										/></td
									>
									<td>
										{#if $page.data.post.isUserAndAdmin}
											<button class="btn">
												<Fa
													icon={faClose}
													on:click={() => removeFromArray('address', i)}
												/>
											</button>
										{/if}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
					{#if $page.data.post.isUserAndAdmin}
					<div class="text-right">
							<button on:click={() => addNew('address')}>Add new</button>
					</div>
					{/if}
				</div>
			</form>
		</article>
	</div>
{/if}

<style>
	.w-modal {
		max-width: 1200px;
	}
	article.edit-form-dialog {
		max-width: 1200px;
	}

	.regis-form label {
		margin-bottom: 20px;
	}

	.contact-form {
		width: 50%;
		padding: 0 20px;
	}
</style>
