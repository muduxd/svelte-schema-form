<script>export let params;
export let schema;
export let value = false;
import { SlideToggle } from "@skeletonlabs/skeleton";
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<SlideToggle 
		id={params.path.join('.')} 
		name={params.path.join('.')} 
		bind:checked={value} 
		on:change={() => params.pathChanged(params.path, value)} 
		size="sm" 
	/>
</svelte:component>