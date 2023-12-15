import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        schema: any;
        value: any;
        uploadFiles?: Record<string, FileList> | undefined;
        dirty?: boolean | undefined;
        showErrors?: boolean | undefined;
        collapsible?: boolean | undefined;
        components?: Record<string, new (...args: any[]) => any> | undefined;
        componentContext?: Record<string, unknown> | undefined;
    };
    events: {
        value: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SchemaFormProps = typeof __propDef.props;
export type SchemaFormEvents = typeof __propDef.events;
export type SchemaFormSlots = typeof __propDef.slots;
export default class SchemaForm extends SvelteComponent<SchemaFormProps, SchemaFormEvents, SchemaFormSlots> {
    get schema(): any;
    /**accessor*/
    set schema(_: any);
    get value(): any;
    /**accessor*/
    set value(_: any);
    get uploadFiles(): Record<string, FileList> | undefined;
    /**accessor*/
    set uploadFiles(_: Record<string, FileList> | undefined);
    get dirty(): boolean | undefined;
    /**accessor*/
    set dirty(_: boolean | undefined);
    get showErrors(): boolean | undefined;
    /**accessor*/
    set showErrors(_: boolean | undefined);
    get collapsible(): boolean | undefined;
    /**accessor*/
    set collapsible(_: boolean | undefined);
    get components(): Record<string, new (...args: any[]) => any> | undefined;
    /**accessor*/
    set components(_: Record<string, new (...args: any[]) => any> | undefined);
    get componentContext(): Record<string, unknown> | undefined;
    /**accessor*/
    set componentContext(_: Record<string, unknown> | undefined);
}
export {};
