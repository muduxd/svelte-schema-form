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
export type EnumProps = typeof __propDef.props;
export type EnumEvents = typeof __propDef.events;
export type EnumSlots = typeof __propDef.slots;
export default class Enum extends SvelteComponent<EnumProps, EnumEvents, EnumSlots> {
}
export {};
