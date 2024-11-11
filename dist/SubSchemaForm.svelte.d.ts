import { SvelteComponent } from "svelte";
import type { CommonComponentParameters } from "./types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any;
        allInputsValid: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SubSchemaFormProps = typeof __propDef.props;
export type SubSchemaFormEvents = typeof __propDef.events;
export type SubSchemaFormSlots = typeof __propDef.slots;
export default class SubSchemaForm extends SvelteComponent<SubSchemaFormProps, SubSchemaFormEvents, SubSchemaFormSlots> {
}
export {};
