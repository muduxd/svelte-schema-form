<script lang="ts">
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
    let enumVals: string[];
	let enumText: string[];
	let id = params.path.join('.');
	$: enumVals = schema.enum;
	$: enumText = schema.enumText || schema.enum;
	$: flexDirection = schema.direction || 'row';
</script>


<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<input id={params.path.join('.')} name={params.path.join('.')}
		type="number" value={value || ''} class="input px-4 py-2"
		placeholder="0"
		disabled={schema.readOnly || params.containerReadOnly}
		on:input={ev => {
			let val = parseFloat(ev.currentTarget.value);
			params.pathChanged(params.path, isNaN(val) ? undefined : val);
		}}
	/>
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