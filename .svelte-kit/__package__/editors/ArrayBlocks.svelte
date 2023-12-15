<script>import { emptyValue } from "../types/schema";
import SubSchemaForm from "../SubSchemaForm.svelte";
import _, { max } from "lodash-es";
import { pathCombine } from "../utilities.js";
export let params;
export let schema;
export let value;
$:
  value = value || [];
if (schema.type !== "array" || schema.items.type !== "object") {
  throw new Error("ArrayBlocks editor can only be used on an array with items of type=object");
}
let adding = false;
let hovering = false;
const onAdd = () => {
  params.pathChanged(
    params.path,
    [
      ...value || [],
      emptyValue(schema.items)
    ]
  );
  adding = true;
};
const onAddUpdate = async () => {
  const idx = value.length - 1;
  const newPath = [...params.path, idx.toString()];
  const doUploads = params.componentContext?.["doUploads"];
  if (doUploads) {
    await doUploads(newPath.join("."));
  }
  params.pathChanged(newPath, value[idx]);
  adding = false;
};
const onDelete = (idx) => () => {
  params.pathChanged(
    params.path,
    [
      ...value.slice(0, idx),
      ...value.slice(idx + 1)
    ]
  );
};
const onDuplicate = (idx) => () => {
  params.pathChanged(
    params.path,
    [
      ...value.slice(0, idx),
      value[idx],
      JSON.parse(JSON.stringify(value[idx])),
      ...value.slice(idx + 1)
    ]
  );
};
const onUp = (idx) => () => {
  if (idx > 0) {
    params.pathChanged(
      params.path,
      [
        ...value.slice(0, idx - 1),
        value[idx],
        value[idx - 1],
        ...value.slice(idx + 1)
      ]
    );
  }
};
const onDown = (idx) => () => {
  if (idx < value.length - 1) {
    params.pathChanged(
      params.path,
      [
        ...value.slice(0, idx),
        value[idx + 1],
        value[idx],
        ...value.slice(idx + 2)
      ]
    );
  }
};
const onDragstart = (i) => (ev) => {
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.dropEffect = "move";
  ev.dataTransfer.setData("text/plain", i.toString());
};
const onDrop = (i) => (ev) => {
  ev.dataTransfer.dropEffect = "move";
  const start = parseInt(ev.dataTransfer.getData("text/plain"));
  if (start < i) {
    params.pathChanged(
      params.path,
      [
        ...value.slice(0, start),
        ...value.slice(start + 1, i),
        value[start],
        ...value.slice(i)
      ]
    );
  } else if (i < start) {
    params.pathChanged(
      params.path,
      [
        ...value.slice(0, i),
        value[start],
        ...value.slice(i, start),
        ...value.slice(start + 1)
      ]
    );
  }
  hovering = false;
};
let currentUrl = schema.effectiveUrl || location.href;
if (currentUrl.includes("#"))
  currentUrl = currentUrl.split("#")[0];
if (currentUrl.includes("?"))
  currentUrl = currentUrl.split("?")[0];
const getUrl = (item, idx) => {
  let pathEl = "";
  if (schema.itemPathPattern) {
    let itemPathPattern = schema.itemPathPattern;
    pathEl = itemPathPattern.replace(
      /\$\{([^}]*)\}/gi,
      (_substring, p1) => encodeURIComponent((p1 === "" ? item : _.get(item, p1.split("."))) || "")
    );
  }
  if (!pathEl) {
    pathEl = encodeURIComponent(item.name || item.title || "");
  }
  return pathCombine(currentUrl, pathEl);
};
const getName = (item) => item.name || item.title || "";
const getArrayBlockClasses = (item) => {
  const name = getName(item);
  const nameParts = name.split(" ");
  const maxWidth = nameParts.reduce((currMax, word) => word.length > currMax ? word.length : currMax, 0);
  const maxHeight = nameParts.length;
  if (maxWidth > 18 || maxHeight > 13) {
    return "array-block xlarge";
  }
  if (maxWidth > 14 || maxHeight > 9) {
    return "array-block large";
  }
  if (maxWidth > 10 || maxHeight > 6) {
    return "array-block medium";
  }
  return "array-block small";
};
let addItemSchema;
$: {
  const nonArrayProperties = Object.fromEntries(Object.entries(schema.items.properties).filter(([propName, subschema]) => subschema.type !== "array"));
  addItemSchema = {
    ...schema.items,
    type: "object",
    properties: nonArrayProperties,
    required: schema.items.required?.filter((prop) => Object.keys(nonArrayProperties).includes(prop)) || []
  };
}
$:
  lastIdx = (value || []).length;
</script>

<div id="{params.path.join('.')}" class="subset array-blocks depth-{params.path.length}">
	<ol>
		{#each value || [] as item, idx (item)}
		<li class={getArrayBlockClasses(item)}
			style:background-image={item.thumbnail ? `url('${item.thumbnail}')`: ''}
			draggable={true} 
			on:dragstart={onDragstart(idx)}
			on:drop|preventDefault={onDrop(idx)}
			on:dragover|preventDefault={() => false}
			on:dragenter|preventDefault={() => hovering = idx}
			on:dragleave={() => hovering = false}
			class:drag-over={hovering === idx}>
			<a href={getUrl(item, idx)}>
				<h2>
					{getName(item)}
				</h2>
			</a>
			<div class="actions">
				<span class="duplicate" on:click={onDuplicate(idx)} title="Duplicate this"></span>
				<span class="delete" on:click={onDelete(idx)} title="Delete this"></span>
			</div>
		</li>
		{/each}

		{#if !adding}
		<li class="array-block add" on:click={onAdd}
			on:drop|preventDefault={onDrop(lastIdx)}
			on:dragover|preventDefault={() => false}
			on:dragenter|preventDefault={() => hovering = lastIdx}
			on:dragleave={() => hovering = false}
			class:drag-over={hovering === lastIdx}>
		</li>
		{/if}
	</ol>
	{#if adding}
	<SubSchemaForm
		params={{
			...params,
			path: [ ...params.path, (value.length - 1).toString() ],
			containerParent: "array"
		}}
		value={value[value.length - 1]}
		bind:schema={addItemSchema}
	/>
	<button type="button" class="submit-button new-item-submit" on:click={onAddUpdate}>Add</button>
	{/if}
</div>