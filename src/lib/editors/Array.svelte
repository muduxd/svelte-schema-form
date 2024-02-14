<script lang="ts">
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	import { emptyValue, schemaLabel } from "../types/schema.js";
	import SubSchemaForm from "../SubSchemaForm.svelte";
    import { stringToHtml } from "../utilities.js";
    import { arrayDelete, arrayAdd, arrayUp, arrayDown, arrayDuplicate } from "../arrayOps.js";
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any[];

	
	import Icon from 'svelte-icons-pack/Icon.svelte'
  	import FaSolidPlus from 'svelte-icons-pack/fa/FaSolidPlus'
  	import FaSolidArrowUp from 'svelte-icons-pack/fa/FaSolidArrowUp'
  	import FaSolidArrowDown from 'svelte-icons-pack/fa/FaSolidArrowDown'
  	import FaSolidTrash from 'svelte-icons-pack/fa/FaSolidTrash'
  	import FaCopy from 'svelte-icons-pack/fa/FaCopy'


	let collapserOpenState: "open" | "closed" = params.path.length === 0 || !params.collapsible ? "open" : "closed";

	const toggle = () => {
		collapserOpenState = collapserOpenState === "open" ? "closed" : "open";
	}

	$: legendText = schemaLabel(schema, params.path);
	$: showWrapper = (value && value.length > 0) || schema.emptyDisplay !== false;
	$: emptyText = (!value || value.length === 0) && typeof schema.emptyDisplay === 'string' && schema.emptyDisplay;
	$: readOnly = params.containerReadOnly || schema.readOnly || false;
	$: controls = schema.controls === undefined ? (readOnly ? '' : 'add, reorder, delete, duplicate') : schema.controls;


	const buttonClasses = "!mx-2 bg-primary-500 p-2 rounded-full self-start text-center"
	const iconSize = 16
</script>

{#if showWrapper}
<fieldset name={params.path.join('.')} class="subset array depth-{params.path.length} flex flex-col gap-[5px]">
	{#if params.collapsible || legendText}
	<legend class="subset-label array-label">
		{#if params.collapsible }
		<span class="collapser {collapserOpenState}" on:click={toggle}></span>
		{/if}
		<span class="subset-label-title object-label-title">{@html stringToHtml(legendText)}</span>
		{#if schema.description}
		<span class="subset-label-description object-label-description">{@html stringToHtml(schema.description)}</span>
		{/if}
	</legend>
	{/if}

	{#if collapserOpenState === "open"}
		{#if !emptyText}
			{#each value || [] as item, idx (idx)}
			<svelte:component this={SubSchemaForm}
				params={{
					...params,
					path: [ ...params.path, idx.toString() ],
					containerParent: "array",
					containerReadOnly: params.containerReadOnly || schema.readOnly || false
				}}
				value={item}
				bind:schema={schema.items}
			/>
			<div class="list-controls">
				{#if controls.includes('delete')}
					<button type="button" class="list-control delete {buttonClasses}" title="delete" on:click={arrayDelete(idx, params, value)}>
						<Icon src={FaSolidTrash} color="white" size={iconSize} />
					</button>
				{/if}

				{#if controls.includes('duplicate')}
					<button type="button" class="list-control duplicate {buttonClasses}" title="duplicate" on:click={arrayDuplicate(idx, params, value)}>
						<Icon src={FaCopy} color="white" size={iconSize} />
					</button>
				{/if}

				{#if controls.includes('reorder') && idx > 0}
					<button type="button" class="list-control up {buttonClasses}" title="move up" on:click={arrayUp(idx, params, value)}>
						<Icon src={FaSolidArrowUp} color="white" size={iconSize} />
					</button>
				{/if}

				{#if controls.includes('reorder') && idx < (value || []).length - 1}
					<button type="button" class="list-control down {buttonClasses}" title="move down" on:click={arrayDown(idx, params, value)}>
						<Icon src={FaSolidArrowDown} color="white" size={iconSize} />
					</button>
				{/if}
			</div>

			{/each}


			{#if controls.includes('add')}
				<button type="button" class="list-control add {buttonClasses}" title="add item" on:click={arrayAdd(schema, params, value)}>
					<Icon src={FaSolidPlus} color="white" size={iconSize} />
				</button>
			{/if}

		{:else}
			<div class="emptyText">{emptyText}</div>
		{/if}
	{/if}
</fieldset>
{/if}

<style>
	.list-controls {
		margin: 10px;
	}

	.list-control.add {
		align-self: flex-start;
	}
</style>