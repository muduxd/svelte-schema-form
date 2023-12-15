export type ValidationErrors = Record<string, string>;
export declare const FileNone: unique symbol;
export declare const ProgressContext: unique symbol;
export interface CommonComponentParameters {
    path: string[];
    pathChanged: (path: string[], val: any, op?: string) => boolean;
    components: Record<string, new (...args: any[]) => any>;
    componentContext?: Record<string, unknown>;
    value: any;
    validationErrors: ValidationErrors;
    required?: boolean;
    containerParent: "none" | "array" | "object";
    containerReadOnly: boolean;
    showErrors: boolean;
    collapsible: boolean;
    idx: number;
}
export declare const childComponentParameters: (params: CommonComponentParameters, propName: string) => {
    path: string[];
    pathChanged: (path: string[], val: any, op?: string) => boolean;
    components: Record<string, new (...args: any[]) => any>;
    componentContext?: Record<string, unknown> | undefined;
    value: any;
    validationErrors: ValidationErrors;
    required?: boolean | undefined;
    containerParent: "none" | "array" | "object";
    containerReadOnly: boolean;
    showErrors: boolean;
    collapsible: boolean;
    idx: number;
};
