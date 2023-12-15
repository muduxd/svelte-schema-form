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
export type ColorProps = typeof __propDef.props;
export type ColorEvents = typeof __propDef.events;
export type ColorSlots = typeof __propDef.slots;
export default class Color extends SvelteComponent<ColorProps, ColorEvents, ColorSlots> {
}
export {};
