<script>export let params;
export let schema;
export let value;
let enumVals;
let enumText;
let id = params.path.join(".");
$:
  enumVals = schema.enum;
$:
  enumText = schema.enumText || schema.enum;
$:
  flexDirection = schema.direction || "row";
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<div role="radiogroup" 
		class="space-y-2"
		aria-labelledby={`label-${id}`}
		style="flex-direction:{flexDirection}" 
		id={`group-${id}`}
	>

		{#each enumVals as enumVal, idx}
			<label for={`${id}-${idx}`} class="flex items-center space-x-2"> 
				<input
					class="radio"
					type="radio"
					id={`${id}-${idx}`}
					on:change={ev => params.pathChanged(params.path, ev.currentTarget.value || undefined)}
					value={enumVal}
					name={id}
					checked={enumVal === value}
				/>

				<p>{(enumText || [])[idx]}</p>
			</label>
		{/each}
	</div>
</svelte:component>