<svelte:options accessors />

<script>import SchemaForm from "./SchemaForm.svelte";
import { createEventDispatcher, setContext } from "svelte";
import { ProgressContext } from "./types/CommonComponentParameters";
import { substituteProperties } from "./utilities.js";
import { writable } from "svelte/store";
import set from "lodash-es/set";
export let schema;
export let value;
export let uploadFiles = {};
export let uploadBaseUrl = "";
export let uploadNamePattern = "";
export let dirty = false;
export let action = "";
export let components = {};
export let collapsible = false;
export let submitText = "Submit";
export let submitRequiresDirty = true;
export let componentContext = {};
const dispatch = createEventDispatcher();
let pathProgress = writable({});
setContext(ProgressContext, pathProgress);
let currentErrors = {};
let showErrors = false;
const change = (e) => {
  currentErrors = e.detail.errors;
  dispatch("value", e.detail);
  value = e.detail.value;
};
const progress = (path, name, percent) => {
  let newVal;
  if (percent === -1) {
    delete ($pathProgress[path] || {})[name];
    newVal = { ...$pathProgress[path] };
  } else {
    newVal = { ...$pathProgress[path] || {}, [name]: percent };
  }
  $pathProgress = { ...$pathProgress, [path]: newVal };
};
const doUploads = async (pathPrefix = "") => {
  if (Object.keys(uploadFiles).length > 0 && uploadBaseUrl) {
    const itemNamePattern = uploadNamePattern || schema.pathPattern;
    if (!itemNamePattern) {
      alert("No uploadNamePattern given or pathPattern property on schema to determine file save url base");
      return;
    }
    const itemName = substituteProperties(itemNamePattern, value);
    const uploadPromises = Object.entries(uploadFiles).filter(([path]) => path.startsWith(pathPrefix)).flatMap(([path, files]) => {
      const pathPromises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const destinationUrl = uploadBaseUrl + (uploadBaseUrl.endsWith("/") ? "" : "/") + itemName + "/" + path + "/" + file.name;
        console.log(`Uploading to ${destinationUrl}`);
        const itemPromise = new Promise((resolve, reject) => {
          try {
            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = (ev) => progress(path, file.name, ev.loaded / ev.total * 100);
            xhr.upload.onloadend = (ev) => {
              progress(path, file.name, xhr.status === 200 || xhr.status === 0 ? -1 : -xhr.status);
              resolve([path, destinationUrl]);
            };
            xhr.withCredentials = true;
            xhr.open("PUT", destinationUrl);
            xhr.send(file);
          } catch (err) {
            reject(err);
          }
        }).then(([path2, destinationUrl2]) => {
          if (path2 === "") {
            value = destinationUrl2;
          } else {
            set(value, path2.split("."), destinationUrl2);
          }
          value = value;
          delete uploadFiles[path2];
        });
        ;
        pathPromises.push(itemPromise);
      }
      return pathPromises;
    });
    await Promise.all(uploadPromises);
  }
};
const submit = async () => {
  if ((dirty || !submitRequiresDirty) && Object.keys(currentErrors).length === 0) {
    await doUploads();
    dispatch("submit", { value });
    dirty = false;
  }
  showErrors = true;
};
componentContext.doUploads = doUploads;
</script>

<form class='svelte-schema-form' {action} class:dirty>
	<SchemaForm bind:schema {value} on:value={change} bind:dirty bind:uploadFiles {showErrors} {components} {collapsible} {componentContext} />
	<div class="button-container">
		<button type={action ? "submit" : "button"} class="submit-button" on:click={submit} class:dirty={dirty}>{submitText}</button>
	</div>
</form>