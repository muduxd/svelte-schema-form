<script lang="ts">
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
</script>


<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<input id={params.path.join('.')} name={params.path.join('.')}
		type="color" value={value || 'blue'} class="input"
		disabled={schema.readOnly || params.containerReadOnly}
		on:input={ev => {
			let val = ev.currentTarget.value
			params.pathChanged(params.path, val)
		}}
	/>
</svelte:component>