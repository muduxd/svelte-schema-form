<svelte:options accessors />

<script>import { createEventDispatcher, onMount } from "svelte";
import SubSchemaForm from "./SubSchemaForm.svelte";
import String from "./editors/String.svelte";
import FieldWrapper from "./editors/FieldWrapper.svelte";
import ObjectEditor from "./editors/Object.svelte";
import set from "lodash-es/set";
import get from "lodash-es/get";
import { validator } from "@exodus/schemasafe";
import { FileNone } from "./types/CommonComponentParameters";
import Enum from "./editors/Enum.svelte";
import Array from "./editors/Array.svelte";
import { incr, nullOptionalsAllowed } from "./utilities.js";
import Boolean from "./editors/Boolean.svelte";
import Number from "./editors/Number.svelte";
import { errorMapper } from "./errorMapper";
import Upload from "./editors/Upload.svelte";
import TextArea from "./editors/TextArea.svelte";
import ArrayBlocks from "./editors/ArrayBlocks.svelte";
import Autocomplete from "./editors/Autocomplete.svelte";
import Hidden from "./editors/Hidden.svelte";
import ListDetail from "./editors/ListDetail.svelte";
import Currency from "./editors/Currency.svelte";
import Radio from "./editors/Radio.svelte";
export let schema;
export let value;
export let uploadFiles = {};
export let dirty = false;
export let showErrors = true;
export let collapsible = false;
export let components = {};
export let componentContext = {};
const dispatch = createEventDispatcher();
let validationErrors = {};
const revalidate = (newValue) => {
  const validate = validator(nullOptionalsAllowed(schema), { includeErrors: true, allErrors: true, allowUnusedKeywords: true });
  const validatorResult = validate(newValue || value);
  validationErrors = Object.fromEntries(
    (validate.errors || []).map((ve) => errorMapper(schema, value, ve.keywordLocation, ve.instanceLocation))
  );
};
onMount(() => {
  revalidate();
  if (Object.keys(validationErrors).length > 0) {
    dispatch("value", {
      path: [],
      value,
      errors: validationErrors
    });
  }
});
let params;
$:
  params = {
    value,
    files: uploadFiles,
    path: [],
    components: Object.assign({
      string: String,
      password: String,
      email: String,
      time: String,
      "date-time": String,
      date: String,
      number: Number,
      integer: Number,
      boolean: Boolean,
      fieldWrapper: FieldWrapper,
      object: ObjectEditor,
      array: Array,
      enum: Enum,
      upload: Upload,
      textarea: TextArea,
      hidden: Hidden,
      blocks: ArrayBlocks,
      autocomplete: Autocomplete,
      "list-detail": ListDetail,
      currency: Currency,
      radio: Radio
    }, components),
    componentContext,
    pathChanged,
    validationErrors,
    containerParent: "none",
    containerReadOnly: schema.readOnly || false,
    showErrors,
    collapsible,
    idx: incr()
  };
const pathChanged = (path, val, op) => {
  let changed = false;
  if (val instanceof FileList) {
    uploadFiles[path.join(".")] = val;
    dirty = true;
    return val;
  } else if (val === FileNone) {
    delete uploadFiles[path.join(".")];
    dirty = true;
    return val;
  }
  const curr = path.length === 0 ? params.value : get(params.value, path);
  if (val === curr && op !== "innerSubmit")
    return;
  if (val === void 0 && path.length > 0) {
    const pathFront = path.slice(0, -1);
    const parent = pathFront.length ? get(params.value, path.slice(0, -1)) : params.value;
    delete parent[path[path.length - 1]];
  } else {
    if (path.length === 0) {
      params.value = val;
    } else {
      set(params.value, path, val);
    }
  }
  revalidate(params.value);
  const succeeded = dispatch("value", {
    path,
    pathValue: val,
    value: params.value,
    errors: validationErrors,
    op
  }, { cancelable: true });
  console.log(`dispatch value path: ${path.join(".")} val: ${JSON.stringify(val)},${op ? " op: " + op : ""} errors: ${JSON.stringify(validationErrors)}, succeeded: ${succeeded}`);
  if (succeeded) {
    value = params.value;
    dirty = true;
  } else {
    revalidate(value);
  }
  return val;
};
</script>

<SubSchemaForm {params} {value} bind:schema />
