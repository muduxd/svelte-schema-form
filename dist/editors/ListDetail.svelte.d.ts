import { SvelteComponent } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any[];
    };
    events: {
        keyup: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ListDetailProps = typeof __propDef.props;
export type ListDetailEvents = typeof __propDef.events;
export type ListDetailSlots = typeof __propDef.slots;
export default class ListDetail extends SvelteComponent<ListDetailProps, ListDetailEvents, ListDetailSlots> {
}
export {};
