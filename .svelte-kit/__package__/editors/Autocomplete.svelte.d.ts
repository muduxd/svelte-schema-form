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
export type AutocompleteProps = typeof __propDef.props;
export type AutocompleteEvents = typeof __propDef.events;
export type AutocompleteSlots = typeof __propDef.slots;
export default class Autocomplete extends SvelteComponent<AutocompleteProps, AutocompleteEvents, AutocompleteSlots> {
}
export {};
