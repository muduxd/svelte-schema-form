<script lang="ts">
  	import { ListBox, ListBoxItem, Tab, TabGroup } from "@skeletonlabs/skeleton";
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

    import { afterUpdate, onMount } from "svelte"
	import { v4 as uuidv4 } from 'uuid';
	import Fa from 'svelte-fa'
	import { faClose } from '@fortawesome/free-solid-svg-icons'















    interface Buffer {
        type: "buffer",
        value: string,
        color: "red",
        position: number | null,
        category: "string"
    }

    interface Value {
        type: "value",
        value: number,
        color: "blue"
    }

    interface Operator {
        type: "operator",
        value: string,
        color: "#ffcc00"
    }









    const operators: Operator[] = [
        { type: "operator", color: "#ffcc00", value: "(" },
        { type: "operator", color: "#ffcc00", value: ")" },
        { type: "operator", color: "#ffcc00", value: "+" },
        { type: "operator", color: "#ffcc00", value: "-" },
        { type: "operator", color: "#ffcc00", value: "*" },
        { type: "operator", color: "#ffcc00", value: "/" },
    ]


    let buffers: Buffer[] = []
    let bufferCategories: string[] = []
    let expressionElements: (Operator | Buffer | Value)[] = []
    let inputValue: string = ""
    let selectedElement: number = 0
    let error: string = ""























	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let comboboxValue: string;

	

	export let params: CommonComponentParameters;
	export let schema: any;
	export let value: any;
	let objects: any[];
	let givenVariablesObj: any[] = [];
	let internalVariables: any[] = [];
	let contextVariables: any[] = [];
	let runtimeVariables: any[] = [];
	$: {
		if (Array.isArray(schema.internalVariables)) {
			internalVariables = [...schema.internalVariables];
		} else {
			internalVariables = [];
		}
	}
	$: {
		if (Array.isArray(schema.contextVariables)) {
			contextVariables = [...schema.contextVariables];
		} else {
			contextVariables = [];
		}
	}
	$: {
		if (Array.isArray(schema.runtimeVariables)) {
			runtimeVariables = [...schema.runtimeVariables];
		} else {
			runtimeVariables = [];
		}
	}
	
	$: givenVariablesObj = [...internalVariables, ...contextVariables, ...runtimeVariables];
	let id = params.path.join('.');

	$: {
		if (Array.isArray(schema.buffers)) {
			buffers = [...schema.buffers];
		} else {
			buffers = [];
		}
	}
	$: {
		if (Array.isArray(schema.objects)) {
			objects = [...schema.objects];
		} else {
			objects = [];
		}
	}


	$: flexDirection = schema.direction || 'column';
	$: currentBuffer = ""
	$: currentObject = ""
	$: currentBufferInputVal = null as number | null //ev => {let val = parseFloat(ev.currentTarget.value); params.pathChanged(params.path, isNaN(val) ? undefined : val); }
	$: currentObjectInputVal = null as number | null
	$: currentConstantInputVal = null as number | string | boolean | null
	$: currentValVar = null as number | string | boolean | null

	let uniqueCategories:any[] = []

	$: if(Array.isArray(buffers))
	{
		uniqueCategories = [...new Set(buffers.map(buffer => buffer.category))];
	}

	let uniqueId = uuidv4();



	let finalOutput = ""

	$: if(givenVariablesObj.length > 0 && currentValVar == null){
		currentValVar = givenVariablesObj[0].value
	}

	const handleChange = (currentText:string, currentInputVal:number|string|boolean|null, type:string) =>{
		if (currentInputVal === null)
			currentInputVal = 0

		finalOutput = `${type}:${currentText}[${currentInputVal}]`

		if (currentText == "")
			finalOutput = `${type}:${currentInputVal}`

			params.pathChanged(params.path, finalOutput || undefined)
	}

	const handleClick = () => {
		comboboxValue = finalOutput;
	}

	function capitalizeFirstLetter(string:string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}





    const validateExpression = (): void => {
        // if ("+-*/(".indexOf(expressionElements[expressionElements.length - 1].value) !== -1) {
        //     error = "Invalid expression!"
        // }
        // else {
        //     error = ""
        // }

        let result = ""

        for (let i = 0; i < expressionElements.length; i++) {
            result += expressionElements[i].value
        }

        console.log(result)
    }



    const addExpression = (element: Operator | Buffer | Value): void => {
        if (element.type === "buffer") {
            showPosition = true
        }

        expressionElements = [...expressionElements, element]
        inputValue = ""
    }




    const removeExpression = (index: number): void => {
		expressionElements.splice(index, 1)
		expressionElements = expressionElements
    }

    
    const isNumeric = (value: string): boolean => {
        return /^-?\d+$/.test(value)
    }


    function submit(event) {
        if (event.key === 'Enter') {
            if (isNumeric(inputValue)) {
                addExpression({
                    type: "value",
                    color: "blue",
                    value: +inputValue
                })
            }
        }
    }



    let tabSet: number = 0
    let showPosition: boolean = false
    let inputRef: HTMLInputElement | null = null







    function positionSubmit(event) {
        if (event.key === 'Enter') {
            showPosition = false
        }
    }


    function moveArrows(event) {
        if (event.key === 'Enter') {
            
            if (tabSet === 0) {
                addExpression(buffers[selectedElement])
            }

            if (tabSet === 1) {
                addExpression(operators[selectedElement])
            }
        }


        if (event.code === 'ArrowDown') {
            selectedElement++

            if (tabSet === 0) {
                const buffersLength = buffers.map(e => e.value).filter(e => e.includes(inputValue)).length

                if (selectedElement + 1 > buffersLength) {
                    selectedElement--
                }
            }

            if (tabSet === 1) {
                const operatorsLength = operators.map(e => e.value).filter(e => e.includes(inputValue)).length 

                if (selectedElement + 1 > operatorsLength) {
                    selectedElement--
                }
            }
        }

        if (event.code === 'ArrowUp') {
            selectedElement--

            if (selectedElement < 0) selectedElement = 0
        }


        if (event.code === 'ArrowLeft') {
            tabSet = 0
        }

        if (event.code === 'ArrowRight') {
            tabSet = 1
        }

    }




    afterUpdate(() => {
        if (showPosition && inputRef) {
            inputRef.focus()
        }
    })


    $: {
        if (tabSet === 0) {
            const buffersLength = buffers.map(e => e.value).filter(e => e.includes(inputValue)).length

            if (selectedElement >= buffersLength) {
                selectedElement = buffersLength - 1
            }
        }

        if (tabSet === 1) {
            const operatorsLength = operators.map(e => e.value).filter(e => e.includes(inputValue)).length 

            if (selectedElement >= operatorsLength) {
                selectedElement = operatorsLength - 1
            }
        }
    }




</script>











<!-- event which calls pathChanged should be after all bindings so 'value' will have been updated -->
<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
    {#if !showPosition}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="bg-surface-600 p-5 rounded-md gap-[20px] flex flex-col" on:keydown={moveArrows}>
            <div class="flex align-center gap-[10px] flex-wrap">
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
            </div>


            <div class="flex align-center gap-[10px]">
                <input class="input" type="search" name="search" bind:value={inputValue} placeholder="Search..." on:keydown={submit} autocomplete="off" />
                <button class="btn variant-filled-primary !text-white" on:click={validateExpression}>Done</button>
            </div>

            <span class="text-rose-600 text-center font-bold h-[30px]">{error}</span>


            <TabGroup>
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
