<script lang="ts">
import type { CommonComponentParameters } from "./types/CommonComponentParameters";
	import { editorForSchema } from "./types/schema";
	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
	export let allInputsValid
	let { components } = params;

	let typeComponent: any;
	
	let component: new (...args: any[]) => any;
	$: component = components[editorForSchema(schema)];
</script>

<div>
<svelte:component this={component} {params} {value} bind:allInputsValid bind:schema class="h-[40px]" />
</div>