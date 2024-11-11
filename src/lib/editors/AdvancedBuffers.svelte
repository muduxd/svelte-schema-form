<script lang="ts">
  	import { Tab, TabGroup } from "@skeletonlabs/skeleton";
	import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
    import { SortableList } from "@sonderbase/svelte-sortablejs"
    import { afterUpdate, onMount } from "svelte"
	import { faClose } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'



    interface Buffer {
        type: "buffer",
        value: string,
        color: "red",
        position: number | null,
        category: string
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
    let isError: boolean = true

    


    let runOneTime: boolean = true
    export let params: CommonComponentParameters;
	export let schema: any;
    export let value: string = ""
    $: { 
        value = value
        convertValueToExpression(value)
    }

    


    // - AUXILIARY FUNCTIONS -


    const isDigit = (char: string) => char >= "0" && char <= "9"
    const isNumeric = (value: string): boolean => /^-?\d+$/.test(value)
    const isValidChar = (char: string) => typeof char === "string" && (char.toLowerCase() != char.toUpperCase() || char === ":")
	const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)






    // - CONVERSION FUNCTIONS -

    const convertValueToExpression = (formValue: string): void => {
        if (!formValue || formValue.length <= 0) return

        if (runOneTime) {
            runOneTime = false
        }
        else {
            return
        }


        for (let i = 0; i < formValue.length; i++) {
            if ("+-*/()".includes(formValue[i])) {
                expressionElements = [...expressionElements, { type: "operator", color: "#ffcc00", value: formValue[i] }]
            }

            else if (isDigit(formValue[i])) {
                let numberValue = formValue[i++]

                while (isDigit(formValue[i])) {
                    numberValue += formValue[i++]
                }

                i--
                expressionElements = [...expressionElements, { type: "value", value: +numberValue, color: "blue" }]
            }

            else if (isValidChar(formValue[i])) {
                let stringValue = formValue[i++]
                let position = ""
                let addingPosition = false

                
                while (isValidChar(formValue[i]) || formValue[i] === "[" || formValue[i] === "]" || isDigit(formValue[i])) {
                    if (formValue[i] === "[" && addingPosition === false) {
                        addingPosition = true
                        i++
                        continue
                    }
                
                    if (formValue[i] === "]" && addingPosition === true) {
                        break
                    }

                    if (isDigit(formValue[i]) && addingPosition === true) {
                        position += formValue[i++]
                        continue
                    }


                    stringValue += formValue[i++]
                }

                i--
                expressionElements = [...expressionElements, { type: "buffer", value: stringValue, color: "red", position: +position, category: "indicator" }]
            }
        }
    }



    const convertExpressionToValue = (): string => {
        let result = ""

        for (let i = 0; i < expressionElements.length; i++) {
            result += expressionElements[i].value
        }

        return result
    }










    let tabSet: number = 0
    let showPosition: boolean = false
    let inputRef: HTMLInputElement | null = null
    let isFocused: boolean = false





    const addExpression = (element: Operator | Buffer | Value | undefined): void => {
        if (!element) return

        if (element.type === "buffer") {
            showPosition = true
        }


        expressionElements = [...expressionElements, element];


        inputValue = ""



        value = convertExpressionToValue()
        params.pathChanged(params.path, value || undefined)
    }




    const removeExpression = (index: number): void => {
        expressionElements = expressionElements.filter((_, i) => i !== index);

        value = convertExpressionToValue()
        params.pathChanged(params.path, value || undefined)
    }

    




    function submit(event: any) {
        if (event.key === 'Enter') {
            if (isNumeric(inputValue)) {
                addExpression({
                    type: "value",
                    color: "blue",
                    value: +inputValue
                })
            }

            event.preventDefault();
        }
    }







    function moveItem(array, fromIndex, toIndex) {
        if (fromIndex >= 0 && fromIndex < array.length && toIndex >= 0 && toIndex < array.length) {
            const [item] = array.splice(fromIndex, 1); // Remove the item from the fromIndex position
            array.splice(toIndex, 0, item);           // Insert the item at the toIndex position
        } else {
            console.error('Invalid indices');
        }

        return array
    }


    const changeOrder = (event: any): void => {
        const { newIndex, oldIndex } = event
        expressionElements = moveItem(expressionElements, oldIndex, newIndex)
        value = convertExpressionToValue()
        params.pathChanged(params.path, value || undefined)
    }









    function positionSubmit(event) {
        if (event.key === 'Enter') {
            showPosition = false
        }
    }


    let buttonRefs: any = []
    function scrollToButton(index) {
        const element = buttonRefs[index]

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

            scrollToButton(selectedElement)
        }

        if (event.code === 'ArrowUp') {
            selectedElement--

            if (selectedElement < 0) selectedElement = 0
            scrollToButton(selectedElement)
        }


        if (event.code === 'ArrowLeft') {
            tabSet = 0
        }

        if (event.code === 'ArrowRight') {
            tabSet = 1
        }
    }



    
    
    function clickOutside(node: HTMLElement): { destroy: () => void } {
        const handleClick = (event: MouseEvent): void => {
            if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('click_outside', { detail: node })
                )
            }
        }
    
        document.addEventListener('click', handleClick, true)
        
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        }
    }




    const validateExpression = (): void => {
        console.log(expressionElements)
        if(expressionElements.length <= 0){
            error = "An expression is needed!"
            isError = true
            return
        }
        if (expressionElements[0].type === "operator" && expressionElements[0].value !== "(") {
            error = "An expression cannot start with an operator!"
            isError = true
            return
        }

        if (expressionElements[expressionElements.length - 1].type === "operator" && expressionElements[expressionElements.length - 1].value !== ")") {
            error = "An expression cannot finish with an operator!"
            isError = true
            return
        }




        let opened: number = 0
        for (let i = 0 ; i < expressionElements.length; i++) {
            if (expressionElements[i].value === "(") opened++
            if (expressionElements[i].value === ")") opened--

            if (opened < 0) {
                error = "Paranthesis closed more then opened!"
            isError = true
                return
            }
        }

        if (opened !== 0) {
            error = "Not enough paranthesis are closed as they are opened!"
            isError = true
            return
        }



        for (let i = 1; i < expressionElements.length; i++) {
            if (expressionElements[i - 1].type === "buffer" || expressionElements[i - 1].type === "value") {
                if (expressionElements[i].value === "(" && expressionElements[i].type === "operator") {
                    error = "Invalid expression!"
                    isError = true
                    return
                }

                if (expressionElements[i].type === "value" || expressionElements[i].type === "buffer") {
                    error = "Invalid expression!"
                    isError = true
                    return
                }
            }


            if (expressionElements[i - 1].type === "operator") {
                if (expressionElements[i].type === "operator") {
                    if ((expressionElements[i - 1].value === "(" && expressionElements[i].value === ")") ||
                        (expressionElements[i - 1].value === "(" && expressionElements[i].value === "(") || 
                        (expressionElements[i - 1].value === ")" && expressionElements[i].value === ")") ||
                        ((expressionElements[i - 1].value !== ")" && expressionElements[i - 1].value !== "(") && expressionElements[i].value === "(") ||
                        ((expressionElements[i].value !== ")" && expressionElements[i].value !== "(") && expressionElements[i - 1].value === ")")
                    ) {
                        continue
                    }
                    else {
                        error = "Invalid expression!"
                        isError = true
                        return
                    }
                }

                if (expressionElements[i - 1].value === ")" && (expressionElements[i].type === "value" || expressionElements[i].type === "buffer")) {
                    error = "Invalid expression!"
                    isError = true
                    return 
                }
            }
        }

        error = "Expression is valid!"
        isError = false
    }



    afterUpdate(() => {
        if (showPosition && inputRef) {
            inputRef.focus()
        }
    })






	$: {
		if (Array.isArray(schema.buffers)) {
			const results = [...schema.buffers]

            for (let i = 0; i < results.length; i++) {
                buffers = [...buffers, { type: "buffer", color: "red", position: null, value: results[i].text, category: results[i].category }]
            }
            
            buffers = buffers.sort((a, b) => a.category.localeCompare(b.category))
            bufferCategories = [...new Set(buffers.map(e => e.category))].sort()

		} else {
			buffers = []
		}
	}




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
        <div class="bg-surface-600 p-5 rounded-md gap-[20px] flex flex-col" on:keydown={moveArrows} use:clickOutside on:click_outside={() => isFocused = false} on:click={() => isFocused = true}>

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
                <button class="btn variant-filled-primary !text-white" on:click={validateExpression}>Validate</button>
            </div>
            {#if error != ""}
                <span class="{isError ? "text-rose-600" : "text-green-500"} text-center font-bold h-[30px]">{error}</span>
            {/if}



            {#if isFocused}
            <TabGroup class="w-full">
                <Tab class="w-1/2" bind:group={tabSet} name="tab1" value={0}>Buffers</Tab>
                <Tab class="w-1/2" bind:group={tabSet} name="tab2" value={1}>Operators</Tab>
            </TabGroup>
            <TabGroup class="max-h-[200px] overflow-auto">
                <svelte:fragment slot="panel">
                    {#if tabSet === 0}
                        {#if buffers.map(e => e.value).filter(e => e.includes(inputValue)).length > 0}
                            <div class="flex flex-col gap-[10px]">
                                {#each buffers.filter(e => e.value.includes(inputValue)) as element, index (index)}
                                        {#if index === 0 || (index > 0 && buffers[index].category !== buffers[index - 1].category)}
                                            <h1 class="font-bold text-xl">
                                                {capitalizeFirstLetter(element.category)}
                                            </h1>
                                        {/if}

                                    <button bind:this={buttonRefs[index]} on:click={() => addExpression(element)} class="text-left btn hover:bg-surface-800 !text-white h-[35px]" class:bg-primary-500={index === selectedElement}>
                                        {element.value}
                                    </button>
                                {/each}
                            </div>
                        {:else if buffers.length === 0}
                            <h1 class="text-center text-xl font-bold">No chart found!</h1>
                        {:else}
                            <h1 class="text-center text-xl font-bold">No buffers found!</h1>
                        {/if}
                    {:else if tabSet === 1}
                            {#if operators.map(e => e.value).filter(e => e.includes(inputValue)).length > 0}
                                <div class="flex flex-col gap-[10px]">
                                    {#each operators as element, index (index)}
                                        {#if element.value.includes(inputValue)}
                                            <button bind:this={buttonRefs[index]} on:click={() => addExpression(element)} class="text-left btn hover:bg-surface-800 !text-white h-[35px]" class:bg-primary-500={index === selectedElement}>
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
            {/if}


        </div>
    {:else}
        <label class="label">
            <span>Position of {expressionElements[expressionElements.length - 1].value}</span>
            <input type="number" placeholder="Position" class="input" bind:value={expressionElements[expressionElements.length - 1].position} on:keydown={positionSubmit} bind:this={inputRef} autocomplete="off">
        </label>
    {/if}
</svelte:component>
