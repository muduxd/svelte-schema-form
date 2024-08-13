<script lang="ts">
  	import { ListBox, ListBoxItem, Tab, TabGroup } from "@skeletonlabs/skeleton";
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
  	import { onMount } from "svelte";
	import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique identifiers

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	

	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
	let buffers: any[];
	let objects: any[];
	let givenVariablesObj: any[] = [];
	let internalVariables: any[] = [];
	let contextVariables: any[] = [];
	let runtimeVariables: any[] = [];
	let finalOutput = ""

	$: {
		if (Array.isArray(schema.internalVariables)) {
			internalVariables = [...schema.internalVariables];
		} else {
			internalVariables = [];
		}
	}
	$: {
		if (Array.isArray(schema.contextVariables)) {
			contextVariables = [...schema.contextVariables];
		} else {
			contextVariables = [];
		}
	}
	$: {
		if (Array.isArray(schema.runtimeVariables)) {
			runtimeVariables = [...schema.runtimeVariables];
		} else {
			runtimeVariables = [];
		}
	}
	
	$: givenVariablesObj = [...internalVariables, ...contextVariables, ...runtimeVariables];
	let id = params.path.join('.');
	let tabSet: number = 0
	$: {
		if (Array.isArray(schema.buffers)) {
			buffers = [...schema.buffers];
		} else {
			buffers = [];
		}
	}
	$: {
		if (Array.isArray(schema.objects)) {
			objects = [...schema.objects];
		} else {
			objects = [];
		}
	}
	$: flexDirection = schema.direction || 'column';

	$: currentBuffer = ""
	$: currentObject = ""
	$: currentBufferInputVal = null as number | null //ev => {let val = parseFloat(ev.currentTarget.value); params.pathChanged(params.path, isNaN(val) ? undefined : val); }
	$: currentObjectInputVal = null as number | null
	$: currentConstantInputVal = null as number | string | boolean | null
	$: currentValVar = null as number | string | boolean | null
	$: finalOutput = schema.finalOutput;

	$: comboboxValue = finalOutput as string;

	let uniqueCategories:any[] = []

	$: if(Array.isArray(buffers))
	{
		uniqueCategories = [...new Set(buffers.map(buffer => buffer.category))];
	}

	let uniqueId = uuidv4();

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: `popupCombobox-${uniqueId}`,
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};


	$: if(givenVariablesObj.length > 0 && currentValVar == null){
		currentValVar = givenVariablesObj[0].value
	}

	const handleChange = (currentText:string, currentInputVal:number|string|boolean|null, type:string) =>{
		if (currentInputVal === null)
			currentInputVal = 0

		finalOutput = `${type}:${currentText}[${currentInputVal}]`

		if (currentText == "")
			finalOutput = `${type}:${currentInputVal}`

			params.pathChanged(params.path, finalOutput || undefined)
	}

	const handleClick = () => {
		comboboxValue = finalOutput;
	}

	function capitalizeFirstLetter(string:string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<button class="btn flex items-center variant-filled w-48 justify-between" use:popup={popupCombobox}>
		<span class="capitalize">{comboboxValue ?? 'Choose buffer'}</span>
		<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
	</button>
	<div class="p-4 w-48 card shadow-xl z-10" data-popup={`popupCombobox-${uniqueId}`}>
		<TabGroup>
			<Tab bind:group={tabSet} class="font-bold" name="tab1" value={0}>Buffers</Tab>
			<Tab bind:group={tabSet} class="font-bold" name="tab2" value={1}>Objects</Tab>
			<Tab bind:group={tabSet} class="font-bold" name="tab3" value={2}>Constants</Tab>
			<Tab bind:group={tabSet} class="font-bold" name="tab4" value={3}>Variables</Tab>
	
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div role="radiogroup"
						class="flex flex-col gap-2"
						aria-labelledby={`label-${id}-${uniqueId}`}
						style="flex-direction:{flexDirection}"
						id={`group-${id}-${uniqueId}`}
					>
						<input id={`${params.path.join('.')}-${uniqueId}`} name={`${params.path.join('.')}-${uniqueId}`}
							type="number" bind:value={currentBufferInputVal} class="input px-4 py-2"
							placeholder="0"
							disabled={schema.readOnly || params.containerReadOnly}
							on:input={handleChange(currentBuffer, currentBufferInputVal, "b")}
						/>
						<div class="overflow-y-auto max-h-48">
						{#each uniqueCategories as categ, idx (idx)}
							<div class="mb-4">
								<p class="mb-2 font-bold">{capitalizeFirstLetter(categ)+"s"}</p>
								{#each buffers.filter((buffer)=>buffer.category === categ) as buffer, idx (categ + idx)}
									<label for={`${id}-${idx}-${uniqueId}-${categ}`} class="flex items-center space-x-2">
										<input
											class="radio"
											type="radio"
											id={`${id}-${idx}-${uniqueId}-${categ}`}
											on:change={ev => {currentBuffer = ev.currentTarget.value; handleChange(currentBuffer, currentBufferInputVal, "b")}}
											value={buffer.text}
											name={`${id}-${uniqueId}-${categ}`}
											bind:group={currentBuffer}
										/>
				
										<p>{(buffer.text || "")}</p>
									</label>
								{/each}
							</div>
						{/each}
						</div>
					</div>
					<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
				{:else if tabSet === 1}
					<div role="radiogroup"
						class="flex flex-col gap-2"
						aria-labelledby={`label-${id}-${uniqueId}`}
						style="flex-direction:{flexDirection}"
						id={`group-${id}-${uniqueId}`}
					>
						<input id={`${params.path.join('.')}-${uniqueId}`} name={`${params.path.join('.')}-${uniqueId}`}
							type="number" bind:value={currentObjectInputVal} class="input px-4 py-2"
							placeholder="0"
							disabled={schema.readOnly || params.containerReadOnly}
							on:input={handleChange(currentObject, currentObjectInputVal, "o")}
						/>
						<div class="overflow-y-auto max-h-48">
						{#each objects as object, idx (idx)}
							<label for={`${id}-${idx}-${uniqueId}`} class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									id={`${id}-${idx}-${uniqueId}`}
									on:change={ev => {currentObject = ev.currentTarget.value; handleChange(currentObject, currentObjectInputVal, "o")}}
									value={object.name}
									name={`${object.name}-${id}-${uniqueId}`}
									bind:group={currentObject}
								/>

								<p>{(object.name || "")}</p>
							</label>
						{/each}
						</div>
					</div>
					<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
				{:else if tabSet === 2}
					<div>
						<input id={`${params.path.join('.')}-${uniqueId}`} name={`${params.path.join('.')}-${uniqueId}`}
							type="number" bind:value={currentConstantInputVal} class="input px-4 py-2"
							placeholder="0"
							disabled={schema.readOnly || params.containerReadOnly}
							on:input={handleChange("", currentConstantInputVal, "c")}
						/>
					</div>
					<button class="listbox-item btn variant-filled-primary mt-2 w-full" on:click={handleClick} type="button">Done</button>
				{:else if tabSet === 3}
					<div>
						{#if givenVariablesObj.length > 0}
							<select name="vals" id={`vals-${uniqueId}`} class="input mt-1" style="background-color: #2E395A;" bind:value={currentValVar} on:change={handleChange("", currentValVar, "v")}>
								{#if internalVariables && internalVariables.length > 0}
									<optgroup label="Internal Variables">
										{#each internalVariables as variableObj, index (index)}
											<option value={variableObj.value}>{variableObj.name}</option>
										{/each}
									</optgroup>
								{/if}
								{#if contextVariables && contextVariables.length > 0}
									<optgroup label="Context Variables">
										{#each contextVariables as variableObj, index (index)}
											<option value={variableObj.value}>{variableObj.name}</option>
										{/each}
									</optgroup>
								{/if}
								{#if runtimeVariables && runtimeVariables.length > 0}
									<optgroup label="Runtime Variables">
										{#each runtimeVariables as variableObj, index (index)}
											<option value={variableObj.value}>{variableObj.name}</option>
										{/each}
									</optgroup>
								{/if}
							</select>
						{:else}
							<p>No variables created.</p>
						{/if}
					</div>
					<button disabled={!(givenVariablesObj.length > 0)} class={`listbox-item btn variant-filled-primary mt-2 w-full ${!(givenVariablesObj.length > 0) ? "not-dirty":""}`} on:click={handleClick} type="button">Done</button>
				{/if}
			</svelte:fragment>
		</TabGroup>
		<div class="arrow bg-surface-100-800-token" />
	</div>
</svelte:component>
