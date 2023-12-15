import { SvelteComponent } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ArrayBlocksProps = typeof __propDef.props;
export type ArrayBlocksEvents = typeof __propDef.events;
export type ArrayBlocksSlots = typeof __propDef.slots;
export default class ArrayBlocks extends SvelteComponent<ArrayBlocksProps, ArrayBlocksEvents, ArrayBlocksSlots> {
}
export {};
