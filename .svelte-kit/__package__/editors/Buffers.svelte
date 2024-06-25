<script>import { ListBox, ListBoxItem, Tab, TabGroup } from "@skeletonlabs/skeleton";
import { popup } from "@skeletonlabs/skeleton";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
import { storePopup } from "@skeletonlabs/skeleton";
import { onMount } from "svelte";
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
let comboboxValue;
const popupCombobox = {
  event: "click",
  target: "popupCombobox",
  placement: "bottom",
  closeQuery: ".listbox-item"
};
const popupComboboxClose = {
  event: "click",
  target: "popupCombobox",
  placement: "bottom",
  closeQuery: ".listbox-item"
};
export let params;
export let schema;
export let value;
let buffersVals;
let buffersText;
let objects;
let givenVariablesObj;
$:
  givenVariablesObj = [...schema.givenVariablesObj];
let id = params.path.join(".");
let tabSet = 0;
$:
  buffersVals = schema.buffersText.map((_, index) => index) || schema.enum;
$:
  buffersText = schema.buffersText;
$:
  objects = schema.objects;
$:
  flexDirection = schema.direction || "column";
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
$:
  currentValVar = null;
let finalOutput = "";
onMount(() => {
  currentValVar = givenVariablesObj[0].value;
});
const handleChange = (currentText, currentInputVal, type) => {
  if (currentInputVal === null)
    currentInputVal = 0;
  finalOutput = `${type}:${currentText}[${currentInputVal}]`;
  console.log(finalOutput);
  if (currentText == "")
    finalOutput = `${type}:${currentInputVal}`;
  params.pathChanged(params.path, finalOutput || void 0);
};
const handleClick = () => {
  comboboxValue = finalOutput;
};
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<button class="btn flex items-center variant-filled w-48 justify-between" use:popup={popupCombobox}>
		<span class="capitalize">{comboboxValue ?? 'Choose buffer'}</span>
		<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
	</button>
	<div class="p-4 w-48 card shadow-xl" data-popup="popupCombobox">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>Buffers</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Objects</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>Constants</Tab>
			<Tab bind:group={tabSet} name="tab4" value={3}>Variables</Tab>
	
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
				<div role="radiogroup"
					class="flex flex-col gap-2"
					aria-labelledby={`label-${id}`}
					style="flex-direction:{flexDirection}"
					id={`group-${id}`}
				>
				<input id={params.path.join('.')} name={params.path.join('.')}
					type="number" bind:value={currentBufferInputVal} class="input px-4 py-2"
					placeholder="0"
					disabled={schema.readOnly || params.containerReadOnly}
					on:input={handleChange(currentBuffer, currentBufferInputVal, "b")}
				/>
					{#each buffersText as bufferText, idx}
						<label for={`${id}-${idx}`} class="flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								id={`${id}-${idx}`}
								on:change={ev => {currentBuffer = ev.currentTarget.value; handleChange(currentBuffer, currentBufferInputVal, "b")}}
								value={bufferText}
								name={id}
								checked={currentBuffer === value}
							/>
	
							<p>{(bufferText || "")}</p>
						</label>
					{/each}
				</div>
				<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
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
						on:input={handleChange(currentObject, currentObjectInputVal, "o")}
					/>
						{#each objects as object, idx}
							<label for={`${id}-${idx}`} class="flex items-center space-x-2"> 
								<input
									class="radio"
									type="radio"
									id={`${id}-${idx}`}
									on:change={ev => {currentObject = ev.currentTarget.value; handleChange(currentObject, currentObjectInputVal, "o")}}
									value={object.name}
									name={id}
									checked={object.name === value}
								/>
	
								<p>{(object.name || "")}</p>
							</label>
						{/each}
					</div>
					<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
				{:else if tabSet === 2}
					<div>
						<input id={params.path.join('.')} name={params.path.join('.')}
							type="number" bind:value={currentConstantInputVal} class="input px-4 py-2"
							placeholder="0"
							disabled={schema.readOnly || params.containerReadOnly}
							on:input={handleChange("", currentConstantInputVal, "c")}
						/>
					</div>
					<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
				{:else if tabSet === 3}
					<div>
						{#if Object.entries(givenVariablesObj).length > 0}
							<select name="vals" id="vals" class="input mt-1" style="background-color: #2E395A;" bind:value={currentValVar} on:change={handleChange("", currentValVar, "v")}>
								{#each givenVariablesObj as variableObj, index (index)}
									<option value={variableObj.value}>{variableObj.name}</option>
								{/each}
							</select>
						{:else}
							<p>No variables created.</p>
						{/if}
						
					</div>
					<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
				{/if}
			</svelte:fragment>
		</TabGroup>
		<div class="arrow bg-surface-100-800-token" />
	</div>
</svelte:component>