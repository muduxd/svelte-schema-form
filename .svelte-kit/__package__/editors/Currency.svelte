<script>import { editorForSchema } from "../types/schema";
export let params;
export let schema;
export let value;
let type = "text";
let context = params.componentContext;
const currencySymbol = context && context["currencySymbol"] || "$";
let formatCurrency;
if (context && context["formatCurrency"]) {
  formatCurrency = context["formatCurrency"];
} else {
  formatCurrency = (value2) => {
    if (!value2 && value2 !== 0)
      return "";
    return value2 === Math.round(value2) ? `${currencySymbol}${value2}` : `${currencySymbol}${value2.toFixed(2)}`;
  };
}
let holdString = "";
const onInput = (ev) => {
  let str = ev.currentTarget.value;
  if (str === "" || str == currencySymbol) {
    holdString = "";
    params.pathChanged(params.path, null);
  } else {
    const numStr = str.replace(currencySymbol, "");
    const num = parseFloat(numStr);
    const fmt = formatCurrency(num);
    const fmtNoSymbol = fmt.replace(currencySymbol, "");
    holdString = fmt === str || fmtNoSymbol === str ? "" : str;
    if (!isNaN(num)) {
      params.pathChanged(params.path, num);
    }
  }
};
$:
  formattedString = holdString ? holdString : formatCurrency(value || "");
</script>

<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<input id={params.path.join('.')} name={params.path.join('.')} class="currency"
		type={type} value={formattedString}
		disabled={schema.readOnly || params.containerReadOnly}
		on:input={onInput} />
</svelte:component>