<script>export let params;
export let schema;
export let value;
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<input id={params.path.join('.')} name={params.path.join('.')}
		type="number" value={value || ''}
		disabled={schema.readOnly || params.containerReadOnly}
		on:input={ev => {
			let val = parseFloat(ev.currentTarget.value);
			params.pathChanged(params.path, isNaN(val) ? undefined : val);
		}}
	/>
</svelte:component>