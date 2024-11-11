<script>import { editorForSchema } from "./types/schema";
export let params;
export let schema;
export let value;
export let allInputsValid;
let { components } = params;
let typeComponent;
let component;
$:
  component = components[editorForSchema(schema)];
</script>

<div>
<svelte:component this={component} {params} {value} bind:allInputsValid bind:schema class="h-[40px]" />
</div>