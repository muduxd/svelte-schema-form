<script>import { ListBox, ListBoxItem, popup } from "@skeletonlabs/skeleton";
export let params;
export let schema;
export let value;
let inputValue = "";
let comboboxValue = "";
let enumVals;
let enumText;
let id = params.path.join(".");
$:
  enumVals = schema.enum;
$:
  enumText = schema.enumText || schema.enum;
$:
  flexDirection = schema.direction || "row";
const popupCombobox = {
  event: "click",
  target: "popupCombobox",
  placement: "bottom",
  closeQuery: ".listbox-item"
};
$:
  console.log(value);
$:
  console.log(inputValue);
</script>



<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
  <button class="btn variant-filled w-48 justify-between" use:popup={popupCombobox}>
    <span class="capitalize">{`${comboboxValue} | ${inputValue}`}</span>
    <span>↓</span>
  </button>
  <div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
    <input id={params.path.join('.')} name={params.path.join('.')} placeholder={params.path.join('.')} class="input px-4 py-2"
		type="text" value={inputValue}
		disabled={schema.readOnly || params.containerReadOnly}
		on:input={(e)=>{console.log(e)}}
	/>
    <ListBox rounded="rounded-none">
		{#each enumText as enumVal, index}
			<ListBoxItem class="flex gap-3" bind:group={comboboxValue} name="medium" value={enumVal}>{enumVal}</ListBoxItem>
		{/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
  </div>
</svelte:component>