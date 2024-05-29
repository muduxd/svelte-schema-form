<script lang="ts">
  	import { ListBox, ListBoxItem, Tab, TabGroup } from "@skeletonlabs/skeleton";
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

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

	$: currentBuffer = ""
	$: currentObject = ""
	$: currentBufferInputVal = null as number | null //ev => {let val = parseFloat(ev.currentTarget.value); params.pathChanged(params.path, isNaN(val) ? undefined : val); }
	$: currentObjectInputVal = null as number | null
	$: currentConstantInputVal = null as number | null

	let finalOutput = ""

	const handleChange = (currentText:string, currentInputVal:number|null) =>{
		if (currentInputVal === null)
			currentInputVal = 0

		finalOutput = `${currentText}[${currentInputVal}]`

		if (currentText == "")
			finalOutput = `${currentInputVal}`
		
			params.pathChanged(params.path, finalOutput || undefined)
	}

	const handleClick = () => {
		comboboxValue = finalOutput;
	}
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<button class="btn flex items-center variant-filled w-48 justify-between" use:popup={popupCombobox}>
		<span class="capitalize">{comboboxValue ?? 'Trigger'}</span>
		<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
	</button>
	<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
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
			<button on:click={handleClick} use:popup={popupCombobox} type="button">Done</button>
		</TabGroup>
		<div class="arrow bg-surface-100-800-token" />
	</div>
</svelte:component>