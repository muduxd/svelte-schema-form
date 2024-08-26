<svelte:options accessors />

<script>import SchemaForm from "./SchemaForm.svelte";
import { createEventDispatcher, setContext } from "svelte";
import { ProgressContext } from "./types/CommonComponentParameters";
import { substituteProperties } from "./utilities.js";
import { writable } from "svelte/store";
import set from "lodash-es/set";
export let schema;
export let value;
export let cancelButton = () => {
};
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
    dispatch("submit", { value });
    dirty = false;
  }
  showErrors = true;
};
componentContext.doUploads = doUploads;
</script>

<div id="tailwind-scope">
	<form class='svelte-schema-form' {action} class:dirty>
		<SchemaForm bind:schema bind:value on:value={change} bind:dirty bind:uploadFiles {showErrors} {components} {collapsible} {componentContext} />

		<div class="button-container flex justify-between space-x-4">
			<button class="btn variant-ghost-surface mt-5" on:click={cancelButton}>Close</button>
			<button type={action ? "submit" : "button"} class="btn variant-filled-primary background-submit !text-white mt-5" on:click={submit} class:not-dirty={!dirty && submitRequiresDirty}>{submitText}</button>
		</div>
	</form>
</div>

<style>
	.not-dirty {
		background-color: rgb(var(--color-surface-300)) !important;
		color: rgb(var(--color-surface-500)) !important;
	}

	.background-submit {
		background-color: rgb(var(--color-primary-600));
	}
</style>