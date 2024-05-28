import { SvelteComponent } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters.ts";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BuffersProps = typeof __propDef.props;
export type BuffersEvents = typeof __propDef.events;
export type BuffersSlots = typeof __propDef.slots;
export default class Buffers extends SvelteComponent<BuffersProps, BuffersEvents, BuffersSlots> {
}
export {};
