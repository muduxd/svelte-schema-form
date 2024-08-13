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
export type AdvancedBuffersProps = typeof __propDef.props;
export type AdvancedBuffersEvents = typeof __propDef.events;
export type AdvancedBuffersSlots = typeof __propDef.slots;
export default class AdvancedBuffers extends SvelteComponent<AdvancedBuffersProps, AdvancedBuffersEvents, AdvancedBuffersSlots> {
}
export {};
