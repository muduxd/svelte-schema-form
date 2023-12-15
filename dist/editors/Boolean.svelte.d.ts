import { SvelteComponent } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BooleanProps = typeof __propDef.props;
export type BooleanEvents = typeof __propDef.events;
export type BooleanSlots = typeof __propDef.slots;
export default class Boolean extends SvelteComponent<BooleanProps, BooleanEvents, BooleanSlots> {
}
export {};
