<script>import SubSchemaForm from "../SubSchemaForm.svelte";
import { schemaLabel } from "../types/schema.js";
import { stringToHtml } from "../utilities.js";
export let params;
export let schema;
export let value;
let propnames;
$:
  propNames = Object.keys(schema.properties);
let collapserOpenState = params.path.length === 0 || params.containerParent === "array" || !params.collapsible ? "open" : "closed";
const toggle = () => {
  collapserOpenState = collapserOpenState === "open" ? "closed" : "open";
};
$:
  legendText = schemaLabel(schema, params.path);
$:
  showLegend = params.collapsible || params.containerParent !== "array" && !!legendText;
$:
  legendClasses = showLegend ? "my-4 p-4 border-2 border-white !rounded-xl" : "";
</script>


<fieldset name={params.path.join('.')} class="subset object depth-{params.path.length} flex flex-col gap-[5px] {legendClasses}">
	{#if showLegend }
	<legend class="subset-label object-label">
		{#if params.collapsible }
			<span class="collapser {collapserOpenState}" on:click={toggle}></span>
		{/if}

		{#if params.containerParent !== "array" || schema.title}
			<span class="subset-label-title object-label-title !mx-2 text-lg font-bold">{@html stringToHtml(schemaLabel(schema, params.path))}</span>
			{#if schema.description}
				<span class="subset-label-description object-label-description mx-2 text-lg font-bold">{@html stringToHtml(schema.description)}</span>
			{/if}
		{/if}
	</legend>
	{/if}

	{#if collapserOpenState === "open"}
		{#each propNames as propName (propName)}
			<SubSchemaForm
				params={{
					...params,
					path: [ ...params.path, propName ],
					required: (schema?.required || []).includes(propName),
					containerParent: "object",
					containerReadOnly: params.containerReadOnly || schema.readOnly || false,
				}}
				value={value?.[propName]}
				bind:schema={schema.properties[propName]}
			/>
		{/each}
	{/if}
</fieldset>