export declare const upTo: (str: string, match: string, start?: number) => string;
export declare const upToLast: (str: string, match: string, end?: number) => string;
export declare const after: (str: string, match: string, start?: number) => string;
export declare const afterLast: (str: string, match: string, end?: number) => string;
export declare function camelToWords(camel: string): string;
export declare function camelToTitle(camel: string): string;
/** manipulate the schema to allow any optional property to have a null value
 * which is appropriate for form input */
export declare function nullOptionalsAllowed(schema: object): object;
export declare function deepCopy(obj: object): object;
export declare const incr: () => number;
export declare const substituteProperties: (subsPattern: string, value: any) => string;
export declare function slashTrim(s: string): string;
export declare function slashTrimLeft(s: string): string;
export declare function pathToArray(path: string): string[];
export declare function getExtension(s: string): string;
export declare function getFirstLine(s: string): string;
export declare function getTailLines(s: string): string;
export declare function pathCombine(...args: string[]): string;
export declare function stringToHtml(s: string): string;
