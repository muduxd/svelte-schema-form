<script>import { schemaLabel } from "../types/schema";
import { stringToHtml } from "../utilities.js";
export let params;
export let schema;
const title = schemaLabel(schema, params.path);
const id = params.path.join(".");
$:
  error = params.validationErrors[params.path.join(".")];
</script>

{#if params.containerParent !== "array"}
	<label id={`label-${id}`} for={id} class:required={params.required} class:readonly={schema.readOnly || params.containerReadOnly}>
		{@html stringToHtml(title)}
		{#if schema.description}
			<span class="info" title={schema.description}></span>
		{/if}
	</label>
{/if}
<slot></slot>
{#if error && params.showErrors}
	<div class="error">{error}</div>
{/if}