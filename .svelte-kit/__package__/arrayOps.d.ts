import type { CommonComponentParameters } from "./types/CommonComponentParameters";
export declare const arrayAdd: (schema: any, params: CommonComponentParameters, value: any[]) => () => void;
export declare const arrayDelete: (idx: number, params: CommonComponentParameters, value: any[]) => () => void;
export declare const arrayDuplicate: (idx: number, params: CommonComponentParameters, value: any[]) => () => void;
export declare const arrayUp: (idx: number, params: CommonComponentParameters, value: any[]) => () => void;
export declare const arrayDown: (idx: number, params: CommonComponentParameters, value: any[]) => () => void;
