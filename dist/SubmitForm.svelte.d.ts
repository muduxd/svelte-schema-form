import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        schema: any;
        value: any;
        uploadFiles?: Record<string, FileList> | undefined;
        uploadBaseUrl?: string | undefined;
        uploadNamePattern?: string | undefined;
        dirty?: boolean | undefined;
        action?: string | undefined;
        components?: Record<string, new (...args: any[]) => any> | undefined;
        collapsible?: boolean | undefined;
        submitText?: string | undefined;
        submitRequiresDirty?: boolean | undefined;
        componentContext?: Record<string, unknown> | undefined;
    };
    events: {
        value: CustomEvent<any>;
        submit: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SubmitFormProps = typeof __propDef.props;
export type SubmitFormEvents = typeof __propDef.events;
export type SubmitFormSlots = typeof __propDef.slots;
export default class SubmitForm extends SvelteComponent<SubmitFormProps, SubmitFormEvents, SubmitFormSlots> {
    get schema(): any;
    /**accessor*/
    set schema(_: any);
    get value(): any;
    /**accessor*/
    set value(_: any);
    get uploadFiles(): Record<string, FileList> | undefined;
    /**accessor*/
    set uploadFiles(_: Record<string, FileList> | undefined);
    get uploadBaseUrl(): string | undefined;
    /**accessor*/
    set uploadBaseUrl(_: string | undefined);
    get uploadNamePattern(): string | undefined;
    /**accessor*/
    set uploadNamePattern(_: string | undefined);
    get dirty(): boolean | undefined;
    /**accessor*/
    set dirty(_: boolean | undefined);
    get action(): string | undefined;
    /**accessor*/
    set action(_: string | undefined);
    get components(): Record<string, new (...args: any[]) => any> | undefined;
    /**accessor*/
    set components(_: Record<string, new (...args: any[]) => any> | undefined);
    get collapsible(): boolean | undefined;
    /**accessor*/
    set collapsible(_: boolean | undefined);
    get submitText(): string | undefined;
    /**accessor*/
    set submitText(_: string | undefined);
    get submitRequiresDirty(): boolean | undefined;
    /**accessor*/
    set submitRequiresDirty(_: boolean | undefined);
    get componentContext(): Record<string, unknown> | undefined;
    /**accessor*/
    set componentContext(_: Record<string, unknown> | undefined);
}
export {};
