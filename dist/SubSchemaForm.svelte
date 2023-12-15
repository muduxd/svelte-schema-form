<script>import { editorForSchema } from "./types/schema";
export let params;
export let schema;
export let value;
let { components } = params;
let typeComponent;
let component;
$:
  component = components[editorForSchema(schema)];
</script>

<svelte:component this={component} {params} {value} bind:schema />



