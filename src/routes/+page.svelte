<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton'
	import SubmitForm from "../lib/SubmitForm.svelte";
	import "$lib/css/layout.scss";
	import "$lib/css/basic-skin.scss";

	let buffersText:any = [
    {
        text: "TrendSR1:main:1",
        category: "TrendSR1"
    },
    {
        text: "TrendSR1:main:2",
        category: "TrendSR1"
    },
    {
        text: "TrendSR1:main:3",
        category: "TrendSR1"
    },
    {
        text: "mma:MA16",
        category: "mma"
    },
    {
        text: "ma:main",
        category: "ma"
    },
    {
        text: "trade:price",
        category: "trade"
    },
    {
        text: "trade:tp",
        category: "trade"
    },
    {
        text: "trade:sl",
        category: "trade"
    },
    {
        text: "trade:vsl",
        category: "trade"
    },
    {
        text: "trade:vtp",
        category: "trade"
    },
    {
        text: "trade:priceBuys",
        category: "trade"
    },
    {
        text: "trade:priceSells",
        category: "trade"
    },
    {
        text: "trade:tpBuys",
        category: "trade"
    },
    {
        text: "trade:tpSells",
        category: "trade"
    },
    {
        text: "trade:slBuys",
        category: "trade"
    },
    {
        text: "trade:slSells",
        category: "trade"
    },
    {
        text: "trade:nrOfOpenTrades",
        category: "trade"
    },
    {
        text: "trade:nrOfOpenBuys",
        category: "trade"
    },
    {
        text: "trade:nrOfOpenSells",
        category: "trade"
    },
    {
        text: "candle:open",
        category: "candle"
    },
    {
        text: "candle:high",
        category: "candle"
    },
    {
        text: "candle:low",
        category: "candle"
    },
    {
        text: "candle:close",
        category: "candle"
    }
]

	let schema: any = {
		type:"object",
        properties: {
            x: { type: "advancedBuffers", title: "Test", buffers: 
				buffersText
			 },
        }
	}

	
	let jsonInvalid = false;

	let value = {
		buffers: "asd asdfasdf"
	};
	let valueJson = '';
	let collapsible = false;


	const submit = (e: CustomEvent) => {
		valueJson = JSON.stringify(e.detail.value, undefined, 2).trim();
	};

	const change = (e: CustomEvent) => {
		if (e.detail.op === "innerSubmit") {
			valueJson = JSON.stringify(e.detail.value, undefined, 2).trim();
		}
	}

	const componentContext = { currencySymbol: '£' };
</script>






<div class="h-full w-full flex flex-col justify-start">
	<h1 class="text-2xl font-bold text-center m-3">Cylex Trading</h1>


	<div class="container">
	<div class="schema" class:jsonInvalid>
		<div class="control">
			<input type="checkbox" id="collapsible" bind:checked={collapsible} />
			<label for="collapsible">Collapsible</label>
		</div>
		<textarea id="schema">test {JSON.stringify(schema, undefined, 2)}</textarea>
	</div>
	<div class="form">
		<SubmitForm {schema} {value} on:submit={submit} on:value={change} uploadBaseUrl="https://restspace.local:3131/files" {collapsible} {componentContext} />
	</div>
	<div class="output">
		<pre>
			{valueJson}
		</pre>
	</div>
</div>
</div>



<style>
	* {
		box-sizing: border-box;
	}

	.container {
		display: flex;
		position: relative;
	}
	.schema, .form, .output {
		width: 32%;
		border: solid 1px black;
		height: 99vh;
		position: relative;
	}
	.schema {
		border: none;
		display: flex;
		flex-direction: column;
	}
	.form, .output {
		margin-left: 1%;
		padding: 1em;
	}
	#schema {
		width: 100%;
		height: 100%;
		gap: 1em;
	}
	.schema.jsonInvalid #schema {
		color: darkred;
	}

	#collapsible {
		margin-bottom: 6px;
	}
	
	.control {
		margin-bottom: 6px;
	}



:global(form.svelte-schema-form .subset) {
	display: grid;
	grid-template-rows: auto;
	grid-gap: 1em;
	align-items: flex-start;
	padding-left: 1em;
	box-sizing: border-box;
	border: none;
}

:global(form.svelte-schema-form .depth-0) {
	padding-left: 0;
}

:global(.svelte-schema-form .object) {
	grid-template-columns: max-content 1fr;
	border-left: 1px solid #999;
	grid-column: span 2;
}


:global(form.svelte-schema-form .array > .object) {
	grid-column: span 1;
}
:global(form.svelte-schema-form .object.depth-0) {
	border-left: none;
}
:global(form.svelte-schema-form .array) {
	grid-column: span 2;
	grid-template-columns: 1fr max-content;
}
:global(form.svelte-schema-form .subset > .subset-label) {
	margin-bottom: 1em;
}
:global(form.svelte-schema-form .subset > .subset-label .subset-label-title) {
	display: block;
}
:global(form.svelte-schema-form .array > legend) {
	margin-left: -1em;
}
:global(form.svelte-schema-form .array > .object) {
	margin-left: -1em;
}
:global(form.svelte-schema-form .list-item) {
	display: flex;
}
:global(form.svelte-schema-form input[type="checkbox"]) {
	justify-self: start;
}
:global(form.svelte-schema-form .error) {
	grid-column: 1 / span 2;
}
:global(form.svelte-schema-form .sf-drop-area) {
	width: 100%;
	display: flex;
}
:global(form.svelte-schema-form .sf-drop-area .sf-upload-caption) {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: -1;
}
:global(form.svelte-schema-form .sf-drop-area .sf-upload-controls) {
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding: 4px;
	box-sizing: border-box;
}
:global(form.svelte-schema-form .sf-drop-area .sf-upload-controls button) {
	border: 0;
	padding: 0;
	height: 20px;
	width: 20px;
	cursor: pointer;
}
:global(form.svelte-schema-form .sf-drop-area .sf-upload-controls .sf-upload-deleter) {
	width: 20px;
	height: 20px;
	cursor: pointer;
}
:global(form.svelte-schema-form .sf-drop-area .sf-upload-input) {
	align-self: center;
	width: calc(100% - 30px);
	margin: 0 10px;
}
:global(form.svelte-schema-form .sf-drop-area.link .sf-upload-thumb, form.svelte-schema-form .sf-drop-area.link .sf-upload-file) {
	display: none;
}
:global(form.svelte-schema-form .sf-drop-area .sf-upload-file) {
	font-size: 1.4em;
	font-weight: bold;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.4em;
	color: white;
	background-color: #ddd;
}
:global(form.svelte-schema-form .sf-progress-bars) {
	grid-column: 2;
	display: flex;
	flex-direction: column;
	gap: 3px;
	box-sizing: border-box;
}
:global(form.svelte-schema-form .sf-progress-bars .sf-progress-bar) {
	width: 100%;
	position: relative;
	box-sizing: border-box;
}
:global(form.svelte-schema-form .sf-progress-bars .sf-progress-bar .sf-progress-done) {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
}
:global(form.svelte-schema-form .sf-autocomplete) {
	width: 100%;
	position: relative;
}
:global(form.svelte-schema-form .sf-autocomplete .sf-items) {
	z-index: 1;
	position: absolute;
	right: 0;
	left: 0;
	max-height: 12em;
	overflow-y: auto;
	overflow-x: hidden;
}
:global(form.svelte-schema-form .sf-autocomplete .sf-items > div, form.svelte-schema-form .sf-autocomplete .sf-selected-item) {
	display: flex;
	align-items: center;
}
:global(form.svelte-schema-form .list-detail) {
	width: 100%;
}
:global(form.svelte-schema-form .list-detail .table-container) {
	display: grid;
}
:global(form.svelte-schema-form .list-detail .row-wrapper) {
	display: contents;
}
:global(form.svelte-schema-form .list-detail .item) {
	display: flex;
}
:global(form.svelte-schema-form .list-detail .table-container > .element) {
	grid-column: span 3;
}
:global(form.svelte-schema-form .list-detail .add-button-container) {
	grid-column: span 3;
}

</style>