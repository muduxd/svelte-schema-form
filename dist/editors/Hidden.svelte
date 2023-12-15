<script>export let params;
export let value;
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
	<input id={params.path.join('.')} name={params.path.join('.')}
		type="hidden" value={value || ''}
		/>