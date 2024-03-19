<script lang="ts">
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: boolean = false;

	import { SlideToggle } from "@skeletonlabs/skeleton"
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