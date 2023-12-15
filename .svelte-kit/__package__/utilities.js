import { get } from "lodash-es";
export const upTo = (str, match, start) => {
    const pos = str.indexOf(match, start);
    return pos < 0 ? str.substring(start || 0) : str.substring(start || 0, pos);
};
export const upToLast = (str, match, end) => {
    const pos = str.lastIndexOf(match, end);
    return pos < 0 ? str.substring(0, end || str.length) : str.substring(0, pos);
};
export const after = (str, match, start) => {
    const pos = str.indexOf(match, start);
    return pos < 0 ? '' : str.substring(pos + match.length);
};
export const afterLast = (str, match, end) => {
    const pos = str.lastIndexOf(match, end);
    return pos < 0 ? '' : str.substring(pos + match.length, end || str.length);
};
export function camelToWords(camel) {
    camel = camel.trim();
    const words = [];
    let start = 0;
    for (let end = 1; end < camel.length; end++) {
        if ('A' <= camel[end] && camel[end] <= 'Z') {
            words.push(camel.substring(start, end).toLowerCase());
            start = end;
        }
    }
    words.push(camel.substring(start, camel.length).toLowerCase());
    return words.join(' ');
}
export function camelToTitle(camel) {
    return camelToWords(camel).replace(/[a-z]/i, (ltr) => ltr.toUpperCase());
}
/** manipulate the schema to allow any optional property to have a null value
 * which is appropriate for form input */
export function nullOptionalsAllowed(schema) {
    if (schema === null || schema === undefined)
        schema = {};
    let newSchema = deepCopy(schema);
    nullOptionalsAllowedApply(newSchema);
    return newSchema;
}
function nullOptionalsAllowedApply(schema) {
    let req = (schema['required'] || []);
    if (schema['$ref'])
        return;
    switch (schema['type']) {
        case 'object':
            const properties = (schema['properties'] || {});
            for (let prop in properties) {
                if (req.indexOf(prop) < 0) {
                    nullOptionalsAllowedApply(properties[prop]);
                }
            }
            break;
        case 'array':
            const items = (schema['items'] || {});
            nullOptionalsAllowedApply(items);
            if (items['oneOf'] && !items['oneOf'].some(subschema => subschema["type"] == "null")) {
                items['oneOf'].push({ type: 'null' });
            }
            break;
        default:
            if (Array.isArray(schema['type'])) {
                if (schema['type'].indexOf('null') < 0) {
                    schema['type'].push('null');
                }
            }
            else if (schema['type'] != 'null') {
                schema['type'] = [schema['type'], 'null'];
            }
            break;
    }
    const defns = schema['definitions'];
    if (defns) {
        for (let defn in defns) {
            nullOptionalsAllowedApply(defns[defn]);
        }
    }
}
export function deepCopy(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj)
        return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        const recObj = obj;
        for (var attr in recObj) {
            if (recObj.hasOwnProperty(attr))
                copy[attr] = deepCopy(recObj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}
let incrVal = 0;
export const incr = () => incrVal++;
export const substituteProperties = (subsPattern, value) => {
    if (!subsPattern || !value)
        return subsPattern;
    const parts = subsPattern.split('${');
    const partsOut = [];
    partsOut.push(parts.shift());
    for (let part of parts) {
        if (part.includes('}')) {
            const path = upTo(part, '}');
            const subsVal = (path === '' ? value : get(value, path)) || '';
            partsOut.push(`${subsVal}${after(part, '}')}`);
        }
    }
    return partsOut.join('');
};
export function slashTrim(s) {
    let start = 0;
    let end = s.length;
    if (s[start] === '/')
        start++;
    if (s[end - 1] === '/')
        end--;
    if (end <= start)
        return '';
    return s.substring(start, end);
}
export function slashTrimLeft(s) {
    return s.startsWith('/') ? s.substr(1) : s;
}
export function pathToArray(path) {
    return slashTrim(path).split('/').filter(s => !!s);
}
export function getExtension(s) {
    let extStart = s.lastIndexOf('.');
    return extStart < 0 ? '' : s.substr(extStart + 1);
}
export function getFirstLine(s) {
    let lineEnd = s.indexOf('\n');
    if (lineEnd < 0)
        return s;
    if (lineEnd > 0 && s[lineEnd - 1] === '\r')
        lineEnd--;
    return s.substring(0, lineEnd);
}
export function getTailLines(s) {
    return s.substring(s.indexOf('\n') + 1);
}
export function pathCombine(...args) {
    const stripped = args.filter(a => !!a);
    if (stripped.length === 0)
        return '';
    const startSlash = stripped[0].startsWith('/');
    const endSlash = stripped[stripped.length - 1].endsWith('/');
    let joined = stripped.map(a => slashTrim(a)).filter(a => !!a).join('/');
    if (startSlash)
        joined = '/' + joined;
    if (endSlash && joined !== '/')
        joined += '/';
    return joined;
}
export function stringToHtml(s) {
    return (s || '').replace("\n", "<br/>");
}
