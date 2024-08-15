<script>
	const tableArr = [
		{
			position: 30,
			name: "test",
			symbol: "test",
			weight: "test"
		}
	]
	const totalWeight = 10
</script>

<div class="login-wrapper">
	<div class="table-container">
		<!-- Native Table Element -->
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
				{#each tableArr as row, i}
					<tr>
						<td>{row.position}</td>
						<td>{row.name}</td>
						<td>{row.symbol}</td>
						<td>{row.weight}</td>
						<td>{row.weight}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.login-wrapper {
		height: 100%;
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}

	.table-container {
		max-width: 1200px;
	}
</style>