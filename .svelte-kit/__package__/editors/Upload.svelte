<script>import { after, afterLast } from "../utilities.js";
import { entries, keys } from "lodash-es";
import { getContext } from "svelte";
import { FileNone, ProgressContext } from "../types/CommonComponentParameters";
import Number from "./Number.svelte";
import String from "./String.svelte";
export let params;
export let schema;
export let value;
export let highlight = false;
const isMultiple = schema.multiple || false;
let inp;
let dropArea;
let pathProgress = getContext(ProgressContext);
let progress;
$:
  progress = $pathProgress[params.path.join(".")] || {};
let renderedThumbnails = [];
let details = {};
let mode = "uploader";
$: {
  if (value && (value.startsWith("http") || value.startsWith("/")) && renderedThumbnails.length > 0) {
    renderedThumbnails.forEach((rt) => rt.remove());
    renderedThumbnails = [];
  }
}
$:
  readOnly = schema.readOnly || params.containerReadOnly || false;
const chooseFile = () => {
  if (!isMultiple) {
    if ((inp.files?.length || 0) > 1) {
      alert("Please only upload one file");
      inp.files = null;
      return;
    }
    const file = inp.files?.item(0);
    if (!file)
      return;
    if (schema.warningKb && file.size > schema.warningKb * 1024) {
      alert(`The file is larger than the recommended maximum size of ${schema.warningKb}KB - consider compressing it`);
    }
    if (schema.maximumKb && file.size > schema.maximumKb * 1024) {
      alert(`The file is larger than the allowed maximum of ${schema.maximumKb}KB - please compress it first`);
      inp.files = null;
      return;
    }
    params.pathChanged(params.path, inp.files);
    renderThumbnail(file);
    details[file.name] = {
      mimeType: file.type,
      size: file.size
    };
  }
};
const onInput = (ev) => {
  chooseFile();
};
const dragEnter = (ev) => {
  if (readOnly || ev.dataTransfer?.types[0] !== "Files")
    return;
  highlight = true;
  ev.preventDefault();
};
const dragOver = (ev) => {
  if (readOnly || ev.dataTransfer?.types[0] !== "Files")
    return;
  ev.preventDefault();
};
const dragLeave = (ev) => {
  if (readOnly)
    return;
  highlight = false;
};
const renderThumbnail = (file) => {
  if (file.type.startsWith("image")) {
    const img = document.createElement("img");
    img.classList.add("sf-upload-thumb");
    img.file = file;
    dropArea.append(img);
    renderedThumbnails.push(img);
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    const div = document.createElement("div");
    div.classList.add("sf-upload-file");
    div.title = file.name;
    div.innerText = afterLast(file.name, ".") || after(file.type, "/");
    dropArea.append(div);
    renderedThumbnails.push(div);
  }
};
const drop = (ev) => {
  if (schema.readOnly)
    return;
  ev.preventDefault();
  highlight = false;
  if (!ev.dataTransfer)
    return;
  const { files } = ev.dataTransfer;
  inp.files = files;
  chooseFile();
};
const deleteUploads = (ev) => {
  ev.stopPropagation();
  inp.files = null;
  renderedThumbnails.forEach((n) => n.remove());
  renderedThumbnails = [];
  details = {};
  value = "";
  params.pathChanged(params.path, FileNone);
  params.pathChanged(params.path, value);
};
const changeMode = (ev) => {
  ev.stopPropagation();
  mode = mode === "uploader" ? "link" : "uploader";
};
const openFile = () => {
  if (readOnly)
    return;
  inp.click();
};
const isImage = (url) => {
  return ["jpg", "jpeg", "png", "gif", "svg", "ico"].includes(afterLast(url, ".").toLowerCase());
};
</script>

<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
	<input bind:this={inp} id={params.path.join('.')} name={params.path.join('.')}
		type="file"
		readonly={readOnly}
		on:input={onInput}
		style="display: none" />
	<div class="sf-drop-area {mode}"
		class:highlight
		tabIndex="0"
		on:dragenter={dragEnter}
		on:dragover={dragOver}
		on:dragleave={dragLeave}
		on:drop={drop}
		on:click={openFile}
		bind:this={dropArea}>
		{#if mode === "uploader" && !readOnly}
			<div class="sf-upload-caption">
				Drop files or click to upload
			</div>
		{/if}
		{#if value && isImage(value) && mode === "uploader"}
			<img class="sf-upload-thumb" src={value} alt="upload file"/>
		{/if}
		{#if value && !isImage(value) && mode === "uploader"}
			<div class="sf-upload-file" title={value}>{afterLast(value, ".")}</div>
		{/if}
		{#if mode === "link"}
			<input type="text"
				id={params.path.join('.')}
				name={params.path.join('.')}
				disabled={readOnly}
				class="sf-upload-input"
				value={value || ''}
				on:click|stopPropagation={() => {}}
				on:input={ev => params.pathChanged(params.path, ev.currentTarget.value || undefined)} />
		{/if}
		<div class="sf-upload-controls">
			{#if !(readOnly)}
				<button type="button" class="sf-upload-deleter" on:click={deleteUploads}></button>
			{/if}
			<button type="button"
				class:sf-upload-to-link={mode === "uploader"}
				class:sf-upload-to-uploader={mode === "link"}
				on:click={changeMode}>
			</button>
		</div>
	</div>
	{#if Object.keys(progress).length > 0}
	<div class="sf-progress-bars">
		{#each Object.entries(progress) as [name, percent]}
			<div class="sf-progress-bar">
				<div class="sf-progress-done" style="width: {percent}%"></div>
				{name}
			</div>
		{/each}
	</div>
	{/if}
</svelte:component>