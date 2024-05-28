<script>import { Tab, TabGroup } from "@skeletonlabs/skeleton";
export let params;
export let schema;
export let value;
let buffersVals;
let buffersText;
let objectsVals;
let objectsText;
let id = params.path.join(".");
let tabSet = 0;
$:
  buffersVals = schema.buffersText.map((_, index) => index) || schema.enum;
$:
  buffersText = schema.buffersText;
$:
  objectsVals = schema.objectsText.map((_, index) => index) || schema.enum;
$:
  objectsText = schema.objectsText;
$:
  flexDirection = schema.direction || "row";
$:
  currentBuffer = "";
$:
  currentObject = "";
$:
  currentBufferInputVal = null;
$:
  currentObjectInputVal = null;
$:
  currentConstantInputVal = null;
const handleChange = (currentText, currentInputVal) => {
  if (currentInputVal === null)
    currentInputVal = 0;
  let finalOutput = `${currentText} | S${currentInputVal}`;
  if (currentText == "")
    finalOutput = `${currentInputVal}`;
  params.pathChanged(params.path, finalOutput || void 0);
};
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
				type="number" bind:value={currentBufferInputVal} class="input px-4 py-2"
				placeholder="0"
				disabled={schema.readOnly || params.containerReadOnly}
				on:input={handleChange(currentBuffer, currentBufferInputVal)}
			/>
				{#each buffersText as bufferText, idx}
					<label for={`${id}-${idx}`} class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							id={`${id}-${idx}`}
							on:change={ev => {currentBuffer = ev.currentTarget.value; handleChange(currentBuffer, currentBufferInputVal)}}
							value={bufferText}
							name={id}
							checked={currentBuffer === value}
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
				<input id={params.path.join('.')} name={params.path.join('.')}
					type="number" bind:value={currentObjectInputVal} class="input px-4 py-2"
					placeholder="0"
					disabled={schema.readOnly || params.containerReadOnly}
					on:input={handleChange(currentObject, currentObjectInputVal)}
				/>
					{#each objectsText as objectText, idx}
						<label for={`${id}-${idx}`} class="flex items-center space-x-2"> 
							<input
								class="radio"
								type="radio"
								id={`${id}-${idx}`}
								on:change={ev => {currentObject = ev.currentTarget.value; handleChange(currentObject, currentObjectInputVal)}}
								value={objectText}
								name={id}
								checked={objectText === value}
							/>

							<p>{(objectText || "")}</p>
						</label>
					{/each}
				</div>
			{:else if tabSet === 2}
			<div>
				<input id={params.path.join('.')} name={params.path.join('.')}
					type="number" bind:value={currentConstantInputVal} class="input px-4 py-2"
					placeholder="0"
					disabled={schema.readOnly || params.containerReadOnly}
					on:input={handleChange("", currentConstantInputVal)}
				/>
			</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</svelte:component>