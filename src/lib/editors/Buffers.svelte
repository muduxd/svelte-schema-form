<script lang="ts">
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	import { ListBox, ListBoxItem, Tab, TabGroup, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
	let tabSet: number = 0
	let bufferInputValue = "";
	let bufferValue = '';
	let objectInputValue = "";
	let objectValue = "";
  	let comboboxValue = '';
    let enumVals: string[];
	export let buffersStrings: string[] = []; // Default value
	export let objectsStrings: string[] = []; // Default value
	let id = params.path.join('.');
	$: enumVals = schema.enum;
	$: flexDirection = schema.direction || 'row';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>



<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>Buffers</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Objects</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>Constants</Tab>

		<svelte:fragment slot="panel">
			{#if tabSet === 0}
			  <button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
				<span class="capitalize">{`${comboboxValue} | ${bufferInputValue}`}</span>
				<span>↓</span>
			  </button>
			  <div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
				<input id={params.path.join('.')} name={params.path.join('.')} placeholder={params.path.join('.')} class="input px-4 py-2"
					type="text" value={bufferInputValue}
					disabled={schema.readOnly || params.containerReadOnly}
					on:input={(e)=>{console.log(e)}}
				/>
				<ListBox rounded="rounded-none">
					{#each buffersStrings as bufferString, index}
						<ListBoxItem class="flex gap-3" bind:group={comboboxValue} name="medium" value={bufferValue}>{bufferString}</ListBoxItem>
					{/each}
				</ListBox>
				<div class="arrow bg-surface-100-800-token" />
			  </div>
			{:else if tabSet === 1}
			  <button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
				<span class="capitalize">{`${comboboxValue} | ${objectInputValue}`}</span>
				<span>↓</span>
			  </button>
			  <div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
				<input id={params.path.join('.')} name={params.path.join('.')} placeholder={params.path.join('.')} class="input px-4 py-2"
					type="text" value={objectInputValue}
					disabled={schema.readOnly || params.containerReadOnly}
					on:input={(e)=>{console.log(e)}}
				/>
				<ListBox rounded="rounded-none">
					{#each objectsStrings as objectString, index}
						<ListBoxItem class="flex gap-3" bind:group={comboboxValue} name="medium" value={objectValue}>{objectString}</ListBoxItem>
					{/each}
				</ListBox>
				<div class="arrow bg-surface-100-800-token" />
			  </div>
			{:else if tabSet === 2}
				<div>asd</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</svelte:component>