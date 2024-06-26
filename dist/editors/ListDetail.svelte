<script>import { emptyValue, schemaLabel } from "../types/schema";
import SubSchemaForm from "../SubSchemaForm.svelte";
import { stringToHtml } from "../utilities.js";
import { arrayDelete, arrayAdd, arrayUp, arrayDown, arrayDuplicate } from "../arrayOps";
import { tick } from "svelte";
export let params;
export let schema;
export let value;
import Icon from "svelte-icons-pack/Icon.svelte";
import FaSolidPlus from "svelte-icons-pack/fa/FaSolidPlus";
import FaSolidArrowUp from "svelte-icons-pack/fa/FaSolidArrowUp";
import FaSolidArrowDown from "svelte-icons-pack/fa/FaSolidArrowDown";
import FaSolidTrash from "svelte-icons-pack/fa/FaSolidTrash";
import FaCopy from "svelte-icons-pack/fa/FaCopy";
$:
  value = value || [];
$:
  itemSchema = schema.items || {};
$:
  listProps = Array.isArray(itemSchema.headings) && typeof itemSchema.headings[0] === "string" && itemSchema.headings || Object.keys(itemSchema.properties);
$:
  listFields = listProps.map((prop) => schemaLabel(itemSchema.properties[prop], [...params.path, "0", prop]));
$:
  sort = itemSchema.defaultSort || null;
let collapserOpenState = params.path.length === 0 || !params.collapsible ? "open" : "closed";
let selectedIdx = -1;
let mode = "list";
let rowView = [];
let toListButton;
let ignoreKeyUp = false;
let selectedValue = null;
if (schema.type !== "array" || schema.items.type !== "object") {
  throw new Error("ListDetail editor can only be used on an array with items of type=object");
}
const toggle = () => {
  collapserOpenState = collapserOpenState === "open" ? "closed" : "open";
};
const onSelect = (idx) => async () => {
  mode = "detail";
  selectedIdx = value.findIndex((v) => v === rowView[idx]);
  selectedValue = value[selectedIdx];
  await tick();
  toListButton?.focus();
};
const onSort = (fieldName) => () => {
  if (sort?.field === fieldName && sort.direction === "desc") {
    sort = null;
  } else {
    sort = {
      field: fieldName,
      direction: sort?.field === fieldName ? "desc" : "asc"
    };
  }
};
const onSortKey = (fieldName) => (ev) => {
  if (ev.key === "Enter") {
    if (sort?.field === fieldName && sort.direction === "desc") {
      sort = null;
    } else {
      sort = {
        field: fieldName,
        direction: sort?.field === fieldName ? "desc" : "asc"
      };
    }
  }
};
const onKey = async (ev) => {
  if (mode === "list" && !ignoreKeyUp) {
    const targ = ev.target;
    if (ev.key === "ArrowDown" && selectedIdx + 1 < value.length) {
      selectedIdx += 1;
      await tick();
    } else if (ev.key === "ArrowUp" && selectedIdx > 0) {
      selectedIdx -= 1;
    } else if (ev.key === "Enter") {
      onSelect(selectedIdx)();
    }
  }
  ignoreKeyUp = false;
};
const onClick = (ev) => {
  if (mode === "list") {
    ev.currentTarget.focus();
  }
};
const onSubmit = () => {
  params.pathChanged(
    [...params.path, selectedIdx.toString()],
    selectedValue,
    "innerSubmit"
  );
};
const onModeList = async () => {
  mode = "list";
  ignoreKeyUp = true;
  await tick();
  selectedIdx = rowView.findIndex((v) => v === selectedValue);
};
const sortFunc = (sort2) => (a, b) => {
  if (a[sort2.field] < b[sort2.field])
    return sort2.direction === "asc" ? -1 : 1;
  if (a[sort2.field] > b[sort2.field])
    return sort2.direction === "desc" ? -1 : 1;
  return 0;
};
const headingClass = (idx, sort2) => {
  const sortClass = listProps[idx] !== sort2?.field ? "" : sort2?.direction;
  return "heading " + sortClass;
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
$:
  gridTemplateColumns = mode === "list" ? `repeat(${listFields.length}, auto) 50px` : null;
$: {
  rowView = [...value];
  if (sort) {
    rowView.sort(sortFunc(sort));
  }
}
const buttonClasses = " !mx-2 bg-primary-500 p-2 rounded-full self-start text-center";
const iconSize = 16;
</script>

{#if showWrapper}
<fieldset name={params.path.join('.')} class="subset array list-detail depth-{params.path.length} flex flex-col grow gap-[5px]">
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
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div class="table-container" tabindex="0" style:grid-template-columns={gridTemplateColumns} on:keyup={onKey} on:click={onClick}>
			{#if mode === "list"}
				{#each listFields as fieldName, idx}
					<div class={headingClass(idx, sort)} on:click|stopPropagation={onSort(listProps[idx])} on:keyup|stopPropagation={onSortKey(listProps[idx])} tabIndex="0">{fieldName}</div>
				{/each}
				{#if !readOnly}
					<div class="buttons-header">&nbsp;</div>
				{/if}
				{#each rowView as item, idx (idx)}
					<div class="row-wrapper" class:selected={idx === selectedIdx} on:click={onSelect(idx)}>
					{#each listProps as propName}
						<div class="item">{item[propName] === undefined ? '\u00A0' : item[propName]}</div>
					{/each}
					</div>
					{#if !readOnly}
					<div class="array-buttons">
						<div class="row-buttons">
							{#if controls.includes('delete')}
								<button type="button" class="list-control delete {buttonClasses}" title="delete" on:click|stopPropagation={arrayDelete(idx, params, value)} on:keyup|stopPropagation>
									<Icon src={FaSolidTrash} color="white" size={iconSize} />
								</button>
							{/if}
							{#if controls.includes('duplicate')}
								<button type="button" class="list-control duplicate {buttonClasses}" title="duplicate" on:click|stopPropagation={arrayDuplicate(idx, params, value)} on:keyup|stopPropagation>
									<Icon src={FaCopy} color="white" size={iconSize} />
								</button>
							{/if}
							{#if controls.includes('reorder') && sort === null &&  idx > 0}
								<button type="button" class="list-control up {buttonClasses}" title="move up" on:click|stopPropagation={arrayUp(idx, params, value)} on:keyup|stopPropagation>
									<Icon src={FaSolidArrowUp} color="white" size={iconSize} />
								</button>
							{/if}
							{#if controls.includes('reorder') && sort === null && idx < (value || []).length - 1}
								<button type="button" class="list-control down {buttonClasses}" title="move down" on:click|stopPropagation={arrayDown(idx, params, value)} on:keyup|stopPropagation>
									<Icon src={FaSolidArrowDown} color="white" size={iconSize} />
								</button>
							{/if}
						</div>
					</div>
					{/if}
				{/each}
			{:else}
				<button class="to-list" type="button" on:click={onModeList} bind:this={toListButton}>List</button>
				<div class="element">
					<SubSchemaForm
						params={{
							...params,
							path: [ ...params.path, selectedIdx.toString() ],
							containerParent: "array",
							containerReadOnly: params.containerReadOnly || schema.readOnly || false
						}}
						value={selectedValue}
						bind:schema={schema.items}
					/>
					{#if schema.submit}
					<button type="button" class="submit-button" on:click={onSubmit}>{schema.submit}</button>
					{/if}
				</div>
			{/if}
			</div>
		{:else}
			<div class="emptyText">{emptyText}</div>
		{/if}
		{#if controls.includes('add')}
		<button type="button" class="list-control add {buttonClasses}" title="add item" on:click={arrayAdd(schema, params, value)}>
			<Icon src={FaSolidPlus} color="white" size={iconSize} />
		</button>
		{/if}
	{/if}
</fieldset>
{/if}



<style>
	.list-control.add {
		align-self: flex-start;
		margin-top: 10px;
	}

	fieldset.subset.array {
		flex-grow: 1 !important;
	}
</style>