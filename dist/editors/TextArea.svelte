<script>export let params;
export let schema;
export let value;
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<textarea
        id={params.path.join('.')}
        name={params.path.join('.')}
        disabled={schema.readOnly || params.containerReadOnly}
        on:input={ev => params.pathChanged(params.path, ev.currentTarget.value || undefined)}
    >{value || ''}</textarea>
</svelte:component>

<style>
    textarea {
        background-color: white;
    }
</style>