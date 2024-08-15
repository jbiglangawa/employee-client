<script>
    import moment from 'moment'
    /** @type {import('./$types').PageData} */
	export let data;

    let employees = []
    if(data.post.employees.length > 0) {
        employees.push(...data.post.employees)
    }

    console.log(employees)

    const init = () => {
        fetch('/api/employee?page=1')
    }

    const calculateAge = (date) => {
        return Math.trunc(moment().diff(date, 'years'))
    }

    const getLengthOfStay = (date) => {
        const yearsDiff = moment().diff(date, 'years')
        const monthsDiff = moment().diff(date, 'months')
        let formatted = []
        if(yearsDiff > 0) {
            formatted.push(yearsDiff.toFixed(0) + 'y')
        }
        if(monthsDiff > 0) {
            const subtractor = Math.trunc(Number(yearsDiff.toFixed(0))) * 12
            formatted.push((monthsDiff.toFixed(0) - subtractor) + 'm')
        }
        if(formatted.length == 0) return '0m'
        return formatted.join(' ')
    }
</script>

<div class="employee-wrapper">
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
                    {@const primaryAddress = row.addresses.filter(a => a.isPrimary)[0]}
                    {@const primaryContact = row.contacts.filter(a => a.isPrimary)[0]}
					<tr>
						<td>{[row.firstName, row.middleName, row.lastName].join(' ')}</td>
						<td>{primaryAddress ? [primaryAddress.address1, primaryAddress.address2].join(' ') : ''}</td>
						<td>{primaryContact ? primaryContact.contactInfo : ''}</td>
						<td>{calculateAge(row.birthDate)}</td>
						<td>{getLengthOfStay(moment(row.hireDate))}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.employee-wrapper {
		height: 100%;
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}

	.table-container {
		max-width: 1200px;
	}
</style>