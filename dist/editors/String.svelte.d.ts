import { SvelteComponent } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
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
export type StringProps = typeof __propDef.props;
export type StringEvents = typeof __propDef.events;
export type StringSlots = typeof __propDef.slots;
export default class String extends SvelteComponent<StringProps, StringEvents, StringSlots> {
}
export {};
