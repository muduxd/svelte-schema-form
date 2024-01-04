<script>export let params;
export let schema;
export let value;
</script>


<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<input id={params.path.join('.')} name={params.path.join('.')}
		type="color" value={value || ''} class="input"
		disabled={schema.readOnly || params.containerReadOnly}
		on:input={ev => {
			let val = ev.currentTarget.value
			params.pathChanged(params.path, val)
		}}
	/>
</svelte:component>