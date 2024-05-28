<script lang="ts">
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
  import Object from "./Object.svelte";
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
	let buffersVals: string[];
	let buffersText: string[];
	let objectsVals: string[];
	let objectsText: string[];
	let id = params.path.join('.');
	let tabSet: number = 0
	$: buffersVals = schema.buffersText.map((_:any, index:number) => index) || schema.enum;
	$: buffersText = schema.buffersText;
	$: objectsVals = schema.objectsText.map((_:any, index:number) => index) || schema.enum;
	$: objectsText = schema.objectsText;
	$: flexDirection = schema.direction || 'row';

	$: buffersText.forEach(el => {
		console.log(el)
	});
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>Buffers</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Objects</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>Constants</Tab>

		<svelte:fragment slot="panel">
			{#if tabSet === 0}
			<div role="radiogroup"
				class="space-y-2"
				aria-labelledby={`label-${id}`}
				style="flex-direction:{flexDirection}" 
				id={`group-${id}`}
			>
			<input id={params.path.join('.')} name={params.path.join('.')}
				type="number" value={value || ''} class="input px-4 py-2"
				placeholder="0"
				disabled={schema.readOnly || params.containerReadOnly}
				on:input={ev => {
					let val = parseFloat(ev.currentTarget.value);
					params.pathChanged(params.path, isNaN(val) ? undefined : val);
				}}
			/>
				{#each buffersText as bufferText, idx}
					<label for={`${id}-${idx}`} class="flex items-center space-x-2"> 
						<input
							class="radio"
							type="radio"
							id={`${id}-${idx}`}
							on:change={ev => params.pathChanged(params.path, ev.currentTarget.value || undefined)}
							value={bufferText}
							name={id}
							checked={bufferText === value}
						/>

						<p>{(bufferText || "")}</p>
					</label>
				{/each}
			</div>
			{:else if tabSet === 1}
				<div role="radiogroup" 
					class="space-y-2"
					aria-labelledby={`label-${id}`}
					style="flex-direction:{flexDirection}" 
					id={`group-${id}`}
				>

					{#each objectsText as objectText, idx}
						<label for={`${id}-${idx}`} class="flex items-center space-x-2"> 
							<input
								class="radio"
								type="radio"
								id={`${id}-${idx}`}
								on:change={ev => params.pathChanged(params.path, ev.currentTarget.value || undefined)}
								value={objectText}
								name={id}
								checked={objectText === value}
							/>

							<p>{(objectText || "")}</p>
						</label>
					{/each}
				</div>
			{:else if tabSet === 2}
			<div></div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</svelte:component>