<script>import { Tab, TabGroup } from "@skeletonlabs/skeleton";
import { SortableList } from "@sonderbase/svelte-sortablejs";
import { afterUpdate, onMount } from "svelte";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Fa from "svelte-fa";
const operators = [
  { type: "operator", color: "#ffcc00", value: "(" },
  { type: "operator", color: "#ffcc00", value: ")" },
  { type: "operator", color: "#ffcc00", value: "+" },
  { type: "operator", color: "#ffcc00", value: "-" },
  { type: "operator", color: "#ffcc00", value: "*" },
  { type: "operator", color: "#ffcc00", value: "/" }
];
let buffers = [];
let bufferCategories = [];
let expressionElements = [];
let inputValue = "";
let selectedElement = 0;
let error = "";
export let params;
export let schema;
export let value = "";
$:
  console.log("BUFFERS", buffers);
const isDigit = (char) => char >= "0" && char <= "9";
const isNumeric = (value2) => /^-?\d+$/.test(value2);
const isValidChar = (char) => char.toLowerCase() != char.toUpperCase() || char === ":";
const capitalizeFirstLetter = (value2) => value2.charAt(0).toUpperCase() + value2.slice(1);
const convertValueToExpression = (formValue) => {
  for (let i = 0; i < formValue.length; i++) {
    if ("+-*/()".includes(formValue[i])) {
      expressionElements = [...expressionElements, { type: "operator", color: "#ffcc00", value: formValue[i] }];
    } else if (isDigit(formValue[i])) {
      let numberValue = formValue[i++];
      while (isDigit(formValue[i])) {
        numberValue += formValue[i++];
      }
      i--;
      expressionElements = [...expressionElements, { type: "value", value: +numberValue, color: "blue" }];
    } else if (isValidChar(formValue[i])) {
      let stringValue = formValue[i++];
      while (isValidChar(formValue[i])) {
        stringValue += formValue[i++];
      }
      i--;
      expressionElements = [...expressionElements, { type: "buffer", value: stringValue, color: "red", position: 0, category: "indicator" }];
    }
  }
};
const convertExpressionToValue = () => {
  let result = "";
  for (let i = 0; i < expressionElements.length; i++) {
    result += expressionElements[i].value;
  }
  return result;
};
let tabSet = 0;
let showPosition = false;
let inputRef = null;
const addExpression = (element) => {
  if (element.type === "buffer") {
    showPosition = true;
  }
  expressionElements = [...expressionElements, element];
  inputValue = "";
  value = convertExpressionToValue();
  params.pathChanged(params.path, value || void 0);
};
const removeExpression = (index) => {
  expressionElements.splice(index, 1);
  expressionElements = expressionElements;
  value = convertExpressionToValue();
  params.pathChanged(params.path, value || void 0);
};
function submit(event) {
  if (event.key === "Enter") {
    if (isNumeric(inputValue)) {
      addExpression({
        type: "value",
        color: "blue",
        value: +inputValue
      });
    }
  }
}
function moveItem(array, fromIndex, toIndex) {
  if (fromIndex >= 0 && fromIndex < array.length && toIndex >= 0 && toIndex < array.length) {
    const [item] = array.splice(fromIndex, 1);
    array.splice(toIndex, 0, item);
  } else {
    console.error("Invalid indices");
  }
  return array;
}
const changeOrder = (event) => {
  const { newIndex, oldIndex } = event;
  expressionElements = moveItem(expressionElements, oldIndex, newIndex);
  value = convertExpressionToValue();
  params.pathChanged(params.path, value || void 0);
};
function positionSubmit(event) {
  if (event.key === "Enter") {
    showPosition = false;
  }
}
function moveArrows(event) {
  if (event.key === "Enter") {
    if (tabSet === 0) {
      addExpression(buffers[selectedElement]);
    }
    if (tabSet === 1) {
      addExpression(operators[selectedElement]);
    }
  }
  if (event.code === "ArrowDown") {
    selectedElement++;
    if (tabSet === 0) {
      const buffersLength = buffers.map((e) => e.value).filter((e) => e.includes(inputValue)).length;
      if (selectedElement + 1 > buffersLength) {
        selectedElement--;
      }
    }
    if (tabSet === 1) {
      const operatorsLength = operators.map((e) => e.value).filter((e) => e.includes(inputValue)).length;
      if (selectedElement + 1 > operatorsLength) {
        selectedElement--;
      }
    }
  }
  if (event.code === "ArrowUp") {
    selectedElement--;
    if (selectedElement < 0)
      selectedElement = 0;
  }
  if (event.code === "ArrowLeft") {
    tabSet = 0;
  }
  if (event.code === "ArrowRight") {
    tabSet = 1;
  }
}
const validateExpression = () => {
};
afterUpdate(() => {
  if (showPosition && inputRef) {
    inputRef.focus();
  }
});
onMount(() => {
  convertValueToExpression(value);
});
$: {
  if (tabSet === 0) {
    const buffersLength = buffers.map((e) => e.value).filter((e) => e.includes(inputValue)).length;
    if (selectedElement >= buffersLength) {
      selectedElement = buffersLength - 1;
    }
  }
  if (tabSet === 1) {
    const operatorsLength = operators.map((e) => e.value).filter((e) => e.includes(inputValue)).length;
    if (selectedElement >= operatorsLength) {
      selectedElement = operatorsLength - 1;
    }
  }
}
</script>











<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
    {#if !showPosition}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="bg-surface-600 p-5 rounded-md gap-[20px] flex flex-col" on:keydown={moveArrows}>

            {#key expressionElements}
                <SortableList class="flex align-center gap-[10px] flex-wrap" onSort={changeOrder}>
                    {#each expressionElements as element, index (index)}
                        <span class="bg-primary-500 px-2 rounded-md flex align-center justify-center gap-[7px]"  style="background-color: {element.color}">
                            {#if element.type === "buffer" && element.position !== null}
                                {element.value} 
                                <span class="text-surface-100 flex align-center justify-center">[{element.position}]</span>
                            {:else}
                                {element.value} 
                            {/if}

                            <button class="hover:cursor-pointer" on:click={() => removeExpression(index)}>
                                <Fa icon={faClose} size="1.4px" primaryColor="white" />
                            </button>
                        </span>
                    {/each}
                </SortableList>
            {/key}



            <div class="flex align-center gap-[10px]">
                <input class="input" type="search" name="search" placeholder="Search..." autocomplete="off" bind:value={inputValue} on:keydown={submit} />
                <button class="btn variant-filled-primary !text-white" on:click={validateExpression}>Done</button>
            </div>

            <span class="text-rose-600 text-center font-bold h-[30px]">{error}</span>


            <TabGroup class="max-h-[500px] overflow-auto">
                <Tab bind:group={tabSet} name="tab1" value={0}>Buffers</Tab>
                <Tab bind:group={tabSet} name="tab2" value={1}>Operators</Tab>

                <svelte:fragment slot="panel">
                    {#if tabSet === 0}
                        {#if buffers.map(e => e.value).filter(e => e.includes(inputValue)).length > 0}
                            <div class="flex flex-col gap-[10px]">
                                {#each buffers.filter(e => e.value.includes(inputValue)) as element, index}
                                        {#if index === 0 || (index > 0 && buffers[index].category !== buffers[index - 1].category)}
                                            <h1 class="font-bold text-xl">
                                                {capitalizeFirstLetter(element.category)}
                                            </h1>
                                        {/if}

                                    <button on:click={() => addExpression(element)} class="text-left btn hover:bg-surface-800 !text-white h-[35px]" class:bg-primary-500={index === selectedElement}>
                                        {element.value}
                                    </button>
                                {/each}
                            </div>
                        {:else}
                            <h1 class="text-center text-xl font-bold">No buffers found!</h1>
                        {/if}
                    {:else if tabSet === 1}
                            {#if operators.map(e => e.value).filter(e => e.includes(inputValue)).length > 0}
                                <div class="flex flex-col gap-[10px]">
                                    {#each operators as element, index}
                                        {#if element.value.includes(inputValue)}
                                            <button on:click={() => addExpression(element)} class="text-left btn hover:bg-surface-800 !text-white h-[35px]" class:bg-primary-500={index === selectedElement}>
                                                {element.value}
                                            </button>
                                        {/if}
                                    {/each}
                                </div>
                            {:else}
                                <h1 class="text-center text-xl font-bold">No operators found!</h1>
                            {/if}
                    {/if}
                </svelte:fragment>
            </TabGroup>



        </div>
    {:else}
        <label class="label">
            <span>Position of {expressionElements[expressionElements.length - 1].value}</span>
            <input type="number" placeholder="Position" class="input" bind:value={expressionElements[expressionElements.length - 1].position} on:keydown={positionSubmit} bind:this={inputRef} autocomplete="off">
        </label>
    {/if}
</svelte:component>
