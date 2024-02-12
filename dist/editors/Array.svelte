<script>import { emptyValue, schemaLabel } from "../types/schema.js";
import SubSchemaForm from "../SubSchemaForm.svelte";
import { stringToHtml } from "../utilities.js";
import { arrayDelete, arrayAdd, arrayUp, arrayDown, arrayDuplicate } from "../arrayOps.js";
export let params;
export let schema;
export let value;
let collapserOpenState = params.path.length === 0 || !params.collapsible ? "open" : "closed";
const toggle = () => {
  collapserOpenState = collapserOpenState === "open" ? "closed" : "open";
};
$:
  legendText = schemaLabel(schema, params.path);
$:
  showWrapper = value && value.length > 0 || schema.emptyDisplay !== false;
$:
  emptyText = (!value || value.length === 0) && typeof schema.emptyDisplay === "string" && schema.emptyDisplay;
$:
  readOnly = params.containerReadOnly || schema.readOnly || false;
$:
  controls = schema.controls === void 0 ? readOnly ? "" : "add, reorder, delete, duplicate" : schema.controls;
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
					<button type="button" class="list-control delete btn-icon w-[35px] variant-filled-primary !mx-2" title="delete" on:click={arrayDelete(idx, params, value)}>Delete</button>
				{/if}

				{#if controls.includes('duplicate')}
					<button type="button" class="list-control duplicate btn-icon w-[35px] variant-filled-primary !mx-2" title="duplicate" on:click={arrayDuplicate(idx, params, value)}>Duplicate</button>
				{/if}

				{#if controls.includes('reorder') && idx > 0}
					<button type="button" class="list-control up btn-icon w-[35px] variant-filled-primary !mx-2" title="move up" on:click={arrayUp(idx, params, value)}>Up</button>
				{/if}

				{#if controls.includes('reorder') && idx < (value || []).length - 1}
					<button type="button" class="list-control down btn-icon w-[35px] variant-filled-primary !mx-2" title="move down" on:click={arrayDown(idx, params, value)}>Down</button>
				{/if}
			</div>

			{/each}
		{:else}
			<div class="emptyText">{emptyText}</div>
		{/if}
		{#if controls.includes('add')}
			<button type="button" class="list-control add btn-icon w-[35px] variant-filled-primary !mx-2" title="add item" on:click={arrayAdd(schema, params, value)}>Add</button>
		{/if}
	{/if}
</fieldset>
{/if}