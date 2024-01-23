import { c as create_ssr_component, v as validate_component, m as missing_component, b as add_attribute, e as escape, d as each, g as getContext, a as subscribe, f as add_classes, h as add_styles, i as createEventDispatcher, s as setContext, j as set_store_value } from "../../chunks/ssr.js";
import _, { get } from "lodash-es";
import set from "lodash-es/set.js";
import get$1 from "lodash-es/get.js";
import "@exodus/schemasafe";
import "@exodus/schemasafe/src/pointer.js";
import { w as writable } from "../../chunks/index.js";
const upTo = (str, match, start) => {
  const pos = str.indexOf(match, start);
  return pos < 0 ? str.substring(start || 0) : str.substring(start || 0, pos);
};
const after = (str, match, start) => {
  const pos = str.indexOf(match, start);
  return pos < 0 ? "" : str.substring(pos + match.length);
};
const afterLast = (str, match, end) => {
  const pos = str.lastIndexOf(match, end);
  return pos < 0 ? "" : str.substring(pos + match.length, end || str.length);
};
function camelToWords(camel) {
  camel = camel.trim();
  const words = [];
  let start = 0;
  for (let end = 1; end < camel.length; end++) {
    if ("A" <= camel[end] && camel[end] <= "Z") {
      words.push(camel.substring(start, end).toLowerCase());
      start = end;
    }
  }
  words.push(camel.substring(start, camel.length).toLowerCase());
  return words.join(" ");
}
function camelToTitle(camel) {
  return camelToWords(camel).replace(/[a-z]/i, (ltr) => ltr.toUpperCase());
}
let incrVal = 0;
const incr = () => incrVal++;
const substituteProperties = (subsPattern, value) => {
  if (!subsPattern || !value)
    return subsPattern;
  const parts = subsPattern.split("${");
  const partsOut = [];
  partsOut.push(parts.shift());
  for (let part of parts) {
    if (part.includes("}")) {
      const path = upTo(part, "}");
      const subsVal = (path === "" ? value : get(value, path)) || "";
      partsOut.push(`${subsVal}${after(part, "}")}`);
    }
  }
  return partsOut.join("");
};
function slashTrim(s) {
  let start = 0;
  let end = s.length;
  if (s[start] === "/")
    start++;
  if (s[end - 1] === "/")
    end--;
  if (end <= start)
    return "";
  return s.substring(start, end);
}
function pathCombine(...args) {
  const stripped = args.filter((a) => !!a);
  if (stripped.length === 0)
    return "";
  const startSlash = stripped[0].startsWith("/");
  const endSlash = stripped[stripped.length - 1].endsWith("/");
  let joined = stripped.map((a) => slashTrim(a)).filter((a) => !!a).join("/");
  if (startSlash)
    joined = "/" + joined;
  if (endSlash && joined !== "/")
    joined += "/";
  return joined;
}
function stringToHtml(s) {
  return (s || "").replace("\n", "<br/>");
}
function editorForSchema(schema) {
  let type2 = schema["type"];
  if (schema["enum"])
    type2 = "enum";
  if (schema["format"])
    type2 += "-" + schema["format"];
  if (schema["hidden"])
    type2 = "hidden";
  if (schema["editor"])
    type2 = schema["editor"];
  switch (type2) {
    case "string-date-time":
    case "string-date":
    case "string-time":
    case "string-email":
    case "string-password":
    case "number-currency":
      return schema["format"];
    default:
      return type2;
  }
}
function schemaLabel(schema, path) {
  return schema.title || camelToTitle(path.slice(-1)?.[0] || "");
}
const SubSchemaForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let { components } = params;
  let component;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    component = components[editorForSchema(schema)];
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render(
      $$result,
      { params, value, schema },
      {
        schema: ($$value) => {
          schema = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const String = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let type2 = "text";
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  {
    {
      const editor = editorForSchema(schema);
      type2 = editor === "password" ? "password" : editor === "email" ? "email" : editor === "time" ? "time" : editor === "date-time" ? "datetime-local" : editor === "date" ? "date" : "text";
    }
  }
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)}${add_attribute("placeholder", params.path.join("."), 0)} class="input px-4 py-2"${add_attribute("type", type2, 0)}${add_attribute("value", value || "", 0)} ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>`;
    }
  })}`;
});
const FieldWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let error;
  let { params } = $$props;
  let { schema } = $$props;
  const title = schemaLabel(schema, params.path);
  const id = params.path.join(".");
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  error = params.validationErrors[params.path.join(".")];
  return `${params.containerParent !== "array" ? `<label${add_attribute("id", `label-${id}`, 0)}${add_attribute("for", id, 0)} class="${[
    "label mt-2",
    (params.required ? "required" : "") + " " + (schema.readOnly || params.containerReadOnly ? "readonly" : "")
  ].join(" ").trim()}"><!-- HTML_TAG_START -->${stringToHtml(title)}<!-- HTML_TAG_END --> ${schema.description ? `<span class="info"${add_attribute("title", schema.description, 0)}></span>` : ``}</label>` : ``} ${slots.default ? slots.default({}) : ``} ${error && params.showErrors ? `<div class="error">${escape(error)}</div>` : ``}`;
});
const Object_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let propNames;
  let legendText;
  let showLegend;
  let legendClasses;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let collapserOpenState = params.path.length === 0 || params.containerParent === "array" || !params.collapsible ? "open" : "closed";
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    propNames = Object.keys(schema.properties);
    legendText = schemaLabel(schema, params.path);
    showLegend = params.collapsible || params.containerParent !== "array" && !!legendText;
    legendClasses = showLegend ? "!my-4 p-4 border-2 border-white !rounded-xl !overflow-hidden" : "";
    $$rendered = `<fieldset${add_attribute("name", params.path.join("."), 0)} class="${"subset object depth-" + escape(params.path.length, true) + " flex flex-col gap-[5px] " + escape(legendClasses, true)}">${showLegend ? `<legend class="subset-label object-label">${params.collapsible ? `<span class="${"collapser " + escape(collapserOpenState, true)}"></span>` : ``} ${params.containerParent !== "array" || schema.title ? `<span class="subset-label-title object-label-title !mx-2 text-lg font-bold"><!-- HTML_TAG_START -->${stringToHtml(schemaLabel(schema, params.path))}<!-- HTML_TAG_END --></span> ${schema.description ? `<span class="subset-label-description object-label-description mx-2 text-lg font-bold"><!-- HTML_TAG_START -->${stringToHtml(schema.description)}<!-- HTML_TAG_END --></span>` : ``}` : ``}</legend>` : ``} ${collapserOpenState === "open" ? `${each(propNames, (propName) => {
      return `${validate_component(SubSchemaForm, "SubSchemaForm").$$render(
        $$result,
        {
          params: {
            ...params,
            path: [...params.path, propName],
            required: (schema?.required || []).includes(propName),
            containerParent: "object",
            containerReadOnly: params.containerReadOnly || schema.readOnly || false
          },
          value: value?.[propName],
          schema: schema.properties[propName]
        },
        {
          schema: ($$value) => {
            schema.properties[propName] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}` : ``}</fieldset>`;
  } while (!$$settled);
  return $$rendered;
});
const FileNone = Symbol();
const ProgressContext = Symbol();
const Enum = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let enumVals;
  let enumText;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  enumVals = schema.enum;
  enumText = schema.enumText || schema.enum;
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<select${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)}${add_attribute("value", value, 0)} class="select" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>${each(enumVals, (enumVal, idx) => {
        return `<option${add_attribute("value", enumVal, 0)} ${idx === 0 ? "selected" : ""}>${escape((enumText || [])[idx])}</option>`;
      })}</select>`;
    }
  })}`;
});
const Array$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let legendText;
  let showWrapper;
  let emptyText;
  let readOnly;
  let controls;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let collapserOpenState = params.path.length === 0 || !params.collapsible ? "open" : "closed";
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    legendText = schemaLabel(schema, params.path);
    showWrapper = value && value.length > 0 || schema.emptyDisplay !== false;
    emptyText = (!value || value.length === 0) && typeof schema.emptyDisplay === "string" && schema.emptyDisplay;
    readOnly = params.containerReadOnly || schema.readOnly || false;
    controls = schema.controls === void 0 ? readOnly ? "" : "add, reorder, delete, duplicate" : schema.controls;
    $$rendered = `${showWrapper ? `<fieldset${add_attribute("name", params.path.join("."), 0)} class="${"subset array depth-" + escape(params.path.length, true) + " flex flex-col gap-[5px]"}">${params.collapsible || legendText ? `<legend class="subset-label array-label">${params.collapsible ? `<span class="${"collapser " + escape(collapserOpenState, true)}"></span>` : ``} <span class="subset-label-title object-label-title"><!-- HTML_TAG_START -->${stringToHtml(legendText)}<!-- HTML_TAG_END --></span> ${schema.description ? `<span class="subset-label-description object-label-description"><!-- HTML_TAG_START -->${stringToHtml(schema.description)}<!-- HTML_TAG_END --></span>` : ``}</legend>` : ``} ${collapserOpenState === "open" ? `${!emptyText ? `${each(value || [], (item, idx) => {
      return `${validate_component(SubSchemaForm || missing_component, "svelte:component").$$render(
        $$result,
        {
          params: {
            ...params,
            path: [...params.path, idx.toString()],
            containerParent: "array",
            containerReadOnly: params.containerReadOnly || schema.readOnly || false
          },
          value: item,
          schema: schema.items
        },
        {
          schema: ($$value) => {
            schema.items = $$value;
            $$settled = false;
          }
        },
        {}
      )} <div class="list-controls">${controls.includes("delete") ? `<button type="button" class="list-control delete" title="delete"></button>` : ``} ${controls.includes("duplicate") ? `<button type="button" class="list-control duplicate" title="duplicate"></button>` : ``} ${controls.includes("reorder") && idx > 0 ? `<button type="button" class="list-control up" title="move up"></button>` : ``} ${controls.includes("reorder") && idx < (value || []).length - 1 ? `<button type="button" class="list-control down" title="move down"></button>` : ``} </div>`;
    })}` : `<div class="emptyText">${escape(emptyText)}</div>`} ${controls.includes("add") ? `<button type="button" class="list-control add" title="add item"></button>` : ``}` : ``}</fieldset>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const Boolean = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} type="checkbox" ${value || false ? "checked" : ""} class="checkbox" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>`;
    }
  })}`;
});
const Color = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} type="color"${add_attribute("value", value, 0)} class="input" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>`;
    }
  })}`;
});
const Number = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} type="number"${add_attribute("value", value || "", 0)} class="input px-4 py-2" placeholder="0" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>`;
    }
  })}`;
});
const Upload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let readOnly;
  let $pathProgress, $$unsubscribe_pathProgress;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let { highlight = false } = $$props;
  schema.multiple || false;
  let dropArea;
  let pathProgress = getContext(ProgressContext);
  $$unsubscribe_pathProgress = subscribe(pathProgress, (value2) => $pathProgress = value2);
  let progress;
  let renderedThumbnails = [];
  let mode = "uploader";
  const isImage = (url) => {
    return ["jpg", "jpeg", "png", "gif", "svg", "ico"].includes(afterLast(url, ".").toLowerCase());
  };
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.highlight === void 0 && $$bindings.highlight && highlight !== void 0)
    $$bindings.highlight(highlight);
  progress = $pathProgress[params.path.join(".")] || {};
  {
    {
      if (value && (value.startsWith("http") || value.startsWith("/")) && renderedThumbnails.length > 0) {
        renderedThumbnails.forEach((rt) => rt.remove());
        renderedThumbnails = [];
      }
    }
  }
  readOnly = schema.readOnly || params.containerReadOnly || false;
  $$unsubscribe_pathProgress();
  return `${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} type="file" ${readOnly ? "readonly" : ""} style="display: none"> <div class="${["sf-drop-area " + escape(mode, true), highlight ? "highlight" : ""].join(" ").trim()}" tabindex="0"${add_attribute("this", dropArea, 0)}>${!readOnly ? `<div class="sf-upload-caption" data-svelte-h="svelte-1gcaypz">Drop files or click to upload</div>` : ``} ${value && isImage(value) && mode === "uploader" ? `<img class="sf-upload-thumb"${add_attribute("src", value, 0)} alt="upload file">` : ``} ${value && !isImage(value) && mode === "uploader" ? `<div class="sf-upload-file"${add_attribute("title", value, 0)}>${escape(afterLast(value, "."))}</div>` : ``} ${``} <div class="sf-upload-controls">${!readOnly ? `<button type="button" class="sf-upload-deleter"></button>` : ``} <button type="button"${add_classes("sf-upload-to-link ".trim())} data-svelte-h="svelte-9b32df"></button></div></div> ${Object.keys(progress).length > 0 ? `<div class="sf-progress-bars">${each(Object.entries(progress), ([name, percent]) => {
        return `<div class="sf-progress-bar"><div class="sf-progress-done" style="${"width: " + escape(percent, true) + "%"}"></div> ${escape(name)} </div>`;
      })}</div>` : ``}`;
    }
  })}`;
});
const css$2 = {
  code: "textarea.svelte-vofknr{background-color:white}",
  map: null
};
const TextArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$2);
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<textarea${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} class="textarea svelte-vofknr" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>${escape(value || "", false)}</textarea>`;
    }
  })}`;
});
const ArrayBlocks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lastIdx;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  if (schema.type !== "array" || schema.items.type !== "object") {
    throw new Error("ArrayBlocks editor can only be used on an array with items of type=object");
  }
  let hovering = false;
  let currentUrl = schema.effectiveUrl || location.href;
  if (currentUrl.includes("#"))
    currentUrl = currentUrl.split("#")[0];
  if (currentUrl.includes("?"))
    currentUrl = currentUrl.split("?")[0];
  const getUrl = (item, idx) => {
    let pathEl = "";
    if (schema.itemPathPattern) {
      let itemPathPattern = schema.itemPathPattern;
      pathEl = itemPathPattern.replace(/\$\{([^}]*)\}/gi, (_substring, p1) => encodeURIComponent((p1 === "" ? item : _.get(item, p1.split("."))) || ""));
    }
    if (!pathEl) {
      pathEl = encodeURIComponent(item.name || item.title || "");
    }
    return pathCombine(currentUrl, pathEl);
  };
  const getName = (item) => item.name || item.title || "";
  const getArrayBlockClasses = (item) => {
    const name = getName(item);
    const nameParts = name.split(" ");
    const maxWidth = nameParts.reduce((currMax, word) => word.length > currMax ? word.length : currMax, 0);
    const maxHeight = nameParts.length;
    if (maxWidth > 18 || maxHeight > 13) {
      return "array-block xlarge";
    }
    if (maxWidth > 14 || maxHeight > 9) {
      return "array-block large";
    }
    if (maxWidth > 10 || maxHeight > 6) {
      return "array-block medium";
    }
    return "array-block small";
  };
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    value = value || [];
    {
      {
        const nonArrayProperties = Object.fromEntries(Object.entries(schema.items.properties).filter(([propName, subschema]) => subschema.type !== "array"));
        ({
          ...schema.items,
          type: "object",
          properties: nonArrayProperties,
          required: schema.items.required?.filter((prop) => Object.keys(nonArrayProperties).includes(prop)) || []
        });
      }
    }
    lastIdx = (value || []).length;
    $$rendered = `<div${add_attribute("id", params.path.join("."), 0)} class="${"subset array-blocks depth-" + escape(params.path.length, true)}"><ol>${each(value || [], (item, idx) => {
      return `<li class="${[
        escape(getArrayBlockClasses(item), true),
        hovering === idx ? "drag-over" : ""
      ].join(" ").trim()}"${add_attribute("draggable", true, 0)}${add_styles({
        "background-image": item.thumbnail ? `url('${item.thumbnail}')` : ""
      })}><a${add_attribute("href", getUrl(item), 0)}><h2>${escape(getName(item))} </h2></a> <div class="actions"><span class="duplicate" title="Duplicate this"></span> <span class="delete" title="Delete this"></span></div> </li>`;
    })} ${`<li class="${["array-block add", hovering === lastIdx ? "drag-over" : ""].join(" ").trim()}" data-svelte-h="svelte-110qdmq"></li>`}</ol> ${``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Autocomplete = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let readOnly;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let inputState = "showing-value";
  let match = "";
  let selected = void 0;
  let options = [];
  let input;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  schema["url"] || "";
  readOnly = params.containerReadOnly || schema.readOnly || false;
  selected = options.find((opt) => opt.id === value);
  inputState = selected ? inputState : "searching";
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<div class="${["sf-autocomplete", readOnly ? "readonly" : ""].join(" ").trim()}"><div class="sf-selected-item input">${inputState === "searching" ? `<input type="text"${add_attribute("value", match, 0)}${add_attribute("this", input, 0)}>` : `${selected?.image ? `<img${add_attribute("src", selected.image, 0)}${add_attribute("alt", selected.text, 0)}>` : ``} ${escape(selected?.text || "")}`}</div> <div class="sf-items"${add_styles({
        "display": "none"
      })}>${each(options, (item) => {
        return `<div${add_classes((value === item.text ? "selected" : "").trim())}>${item.image ? `<img${add_attribute("src", item.image, 0)}${add_attribute("alt", item.text, 0)}>` : ``} ${escape(item.text)} </div>`;
      })}</div></div>`;
    }
  })}`;
});
const Hidden = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { value } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return ` <input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} type="hidden"${add_attribute("value", value || "", 0)}>`;
});
const ListDetail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemSchema;
  let listProps;
  let listFields;
  let sort;
  let legendText;
  let showWrapper;
  let emptyText;
  let readOnly;
  let controls;
  let gridTemplateColumns;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let collapserOpenState = params.path.length === 0 || !params.collapsible ? "open" : "closed";
  let selectedIdx = -1;
  let rowView = [];
  if (schema.type !== "array" || schema.items.type !== "object") {
    throw new Error("ListDetail editor can only be used on an array with items of type=object");
  }
  const sortFunc = (sort2) => (a, b) => {
    if (a[sort2.field] < b[sort2.field])
      return sort2.direction === "asc" ? -1 : 1;
    if (a[sort2.field] > b[sort2.field])
      return sort2.direction === "desc" ? -1 : 1;
    return 0;
  };
  const headingClass = (idx, sort2) => {
    const sortClass = listProps[idx] !== sort2?.field ? "" : sort2?.direction;
    return "heading " + sortClass;
  };
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    value = value || [];
    itemSchema = schema.items || {};
    listProps = Array.isArray(itemSchema.headings) && typeof itemSchema.headings[0] === "string" && itemSchema.headings || Object.keys(itemSchema.properties);
    listFields = listProps.map((prop) => schemaLabel(itemSchema.properties[prop], [...params.path, "0", prop]));
    sort = itemSchema.defaultSort || null;
    legendText = schemaLabel(schema, params.path);
    showWrapper = value && value.length > 0 || schema.emptyDisplay !== false;
    emptyText = (!value || value.length === 0) && typeof schema.emptyDisplay === "string" && schema.emptyDisplay;
    readOnly = params.containerReadOnly || schema.readOnly || false;
    controls = schema.controls === void 0 ? readOnly ? "" : "add, reorder, delete, duplicate" : schema.controls;
    gridTemplateColumns = `repeat(${listFields.length}, auto) 50px`;
    {
      {
        rowView = [...value];
        if (sort) {
          rowView.sort(sortFunc(sort));
        }
      }
    }
    $$rendered = `${showWrapper ? `<fieldset${add_attribute("name", params.path.join("."), 0)} class="${"subset array list-detail depth-" + escape(params.path.length, true) + " flex flex-col gap-[5px]"}">${params.collapsible || legendText ? `<legend class="subset-label array-label">${params.collapsible ? `<span class="${"collapser " + escape(collapserOpenState, true)}"></span>` : ``} <span class="subset-label-title object-label-title"><!-- HTML_TAG_START -->${stringToHtml(legendText)}<!-- HTML_TAG_END --></span> ${schema.description ? `<span class="subset-label-description object-label-description"><!-- HTML_TAG_START -->${stringToHtml(schema.description)}<!-- HTML_TAG_END --></span>` : ``}</legend>` : ``} ${collapserOpenState === "open" ? `${!emptyText ? `<div class="table-container" tabindex="0"${add_styles({
      "grid-template-columns": gridTemplateColumns
    })}>${`${each(listFields, (fieldName, idx) => {
      return `<div${add_attribute("class", headingClass(idx, sort), 0)} tabindex="0">${escape(fieldName)}</div>`;
    })} ${!readOnly ? `<div class="buttons-header" data-svelte-h="svelte-1ufcg2c"> </div>` : ``} ${each(rowView, (item, idx) => {
      return `<div class="${["row-wrapper", idx === selectedIdx ? "selected" : ""].join(" ").trim()}">${each(listProps, (propName) => {
        return `<div class="item">${escape(item[propName] === void 0 ? " " : item[propName])}</div>`;
      })}</div> ${!readOnly ? `<div class="array-buttons"><div class="row-buttons">${controls.includes("delete") ? `<button type="button" class="list-control delete" title="delete"></button>` : ``} ${controls.includes("duplicate") ? `<button type="button" class="list-control duplicate" title="duplicate"></button>` : ``} ${controls.includes("reorder") && sort === null && idx > 0 ? `<button type="button" class="list-control up" title="move up"></button>` : ``} ${controls.includes("reorder") && sort === null && idx < (value || []).length - 1 ? `<button type="button" class="list-control down" title="move down"></button>` : ``}</div> </div>` : ``}`;
    })}`}</div>` : `<div class="emptyText">${escape(emptyText)}</div>`} ${controls.includes("add") ? `<button type="button" class="list-control add" title="add item"></button>` : ``}` : ``}</fieldset>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
let type = "text";
const Currency = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedString;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let context = params.componentContext;
  const currencySymbol = context && context["currencySymbol"] || "$";
  let formatCurrency;
  if (context && context["formatCurrency"]) {
    formatCurrency = context["formatCurrency"];
  } else {
    formatCurrency = (value2) => {
      if (!value2 && value2 !== 0)
        return "";
      return value2 === Math.round(value2) ? `${currencySymbol}${value2}` : `${currencySymbol}${value2.toFixed(2)}`;
    };
  }
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  formattedString = formatCurrency(value || "");
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<input${add_attribute("id", params.path.join("."), 0)}${add_attribute("name", params.path.join("."), 0)} class="currency"${add_attribute("type", type, 0)}${add_attribute("value", formattedString, 0)} ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}>`;
    }
  })}`;
});
const Radio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let flexDirection;
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let enumVals;
  let enumText;
  let id = params.path.join(".");
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  enumVals = schema.enum;
  enumText = schema.enumText || schema.enum;
  flexDirection = schema.direction || "row";
  return ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
    default: () => {
      return `<div role="radiogroup" class="group-container"${add_attribute("aria-labelledby", `label-${id}`, 0)} style="${"flex-direction:" + escape(flexDirection, true)}"${add_attribute("id", `group-${id}`, 0)}>${each(enumVals, (enumVal, idx) => {
        return `<input class="sr-only" type="radio"${add_attribute("id", `${id}-${idx}`, 0)}${add_attribute("value", enumVal, 0)}${add_attribute("name", id, 0)} ${enumVal === value ? "checked" : ""}> <label${add_attribute("for", `${id}-${idx}`, 0)} class="label mt-2">${escape((enumText || [])[idx])} </label>`;
      })}</div>`;
    }
  })}`;
});
const SchemaForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { schema } = $$props;
  let { value } = $$props;
  let { uploadFiles = {} } = $$props;
  let { dirty = false } = $$props;
  let { showErrors = true } = $$props;
  let { collapsible = false } = $$props;
  let { components = {} } = $$props;
  let { componentContext = {} } = $$props;
  createEventDispatcher();
  let validationErrors = {};
  let params;
  const pathChanged = (path, val, op) => {
    if (val instanceof FileList) {
      uploadFiles[path.join(".")] = val;
      dirty = true;
      return val;
    } else if (val === FileNone) {
      delete uploadFiles[path.join(".")];
      dirty = true;
      return val;
    }
    const curr = path.length === 0 ? params.value : get$1(params.value, path);
    if (val === curr && op !== "innerSubmit")
      return;
    if (val === void 0 && path.length > 0) {
      const pathFront = path.slice(0, -1);
      const parent = pathFront.length ? get$1(params.value, path.slice(0, -1)) : params.value;
      delete parent[path[path.length - 1]];
    } else {
      if (path.length === 0) {
        params.value = val;
      } else {
        set(params.value, path, val);
      }
    }
    value = params.value;
    dirty = true;
    return val;
  };
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.uploadFiles === void 0 && $$bindings.uploadFiles && uploadFiles !== void 0)
    $$bindings.uploadFiles(uploadFiles);
  if ($$props.dirty === void 0 && $$bindings.dirty && dirty !== void 0)
    $$bindings.dirty(dirty);
  if ($$props.showErrors === void 0 && $$bindings.showErrors && showErrors !== void 0)
    $$bindings.showErrors(showErrors);
  if ($$props.collapsible === void 0 && $$bindings.collapsible && collapsible !== void 0)
    $$bindings.collapsible(collapsible);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.componentContext === void 0 && $$bindings.componentContext && componentContext !== void 0)
    $$bindings.componentContext(componentContext);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    params = {
      value,
      files: uploadFiles,
      path: [],
      components: Object.assign(
        {
          string: String,
          password: String,
          email: String,
          time: String,
          "date-time": String,
          date: String,
          number: Number,
          color: Color,
          integer: Number,
          boolean: Boolean,
          fieldWrapper: FieldWrapper,
          object: Object_1,
          array: Array$1,
          enum: Enum,
          upload: Upload,
          textarea: TextArea,
          hidden: Hidden,
          blocks: ArrayBlocks,
          autocomplete: Autocomplete,
          "list-detail": ListDetail,
          currency: Currency,
          radio: Radio
        },
        components
      ),
      componentContext,
      pathChanged,
      validationErrors,
      containerParent: "none",
      containerReadOnly: schema.readOnly || false,
      showErrors,
      collapsible,
      idx: incr()
    };
    $$rendered = `  ${validate_component(SubSchemaForm, "SubSchemaForm").$$render(
      $$result,
      { params, value, schema },
      {
        schema: ($$value) => {
          schema = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const css$1 = {
  code: ".not-dirty.svelte-1mg8fxn{background-color:rgb(var(--color-surface-300)) !important;color:rgb(var(--color-surface-500)) !important}.background-submit.svelte-1mg8fxn{background-color:rgb(var(--color-primary-600))}",
  map: null
};
const SubmitForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pathProgress, $$unsubscribe_pathProgress;
  let { schema } = $$props;
  let { value } = $$props;
  let { cancelButton = () => {
  } } = $$props;
  let { uploadFiles = {} } = $$props;
  let { uploadBaseUrl = "" } = $$props;
  let { uploadNamePattern = "" } = $$props;
  let { dirty = false } = $$props;
  let { action = "" } = $$props;
  let { components = {} } = $$props;
  let { collapsible = false } = $$props;
  let { submitText = "Submit" } = $$props;
  let { submitRequiresDirty = true } = $$props;
  let { componentContext = {} } = $$props;
  createEventDispatcher();
  let pathProgress = writable({});
  $$unsubscribe_pathProgress = subscribe(pathProgress, (value2) => $pathProgress = value2);
  setContext(ProgressContext, pathProgress);
  let showErrors = false;
  const progress = (path, name, percent) => {
    let newVal;
    if (percent === -1) {
      delete ($pathProgress[path] || {})[name];
      newVal = { ...$pathProgress[path] };
    } else {
      newVal = {
        ...$pathProgress[path] || {},
        [name]: percent
      };
    }
    set_store_value(pathProgress, $pathProgress = { ...$pathProgress, [path]: newVal }, $pathProgress);
  };
  const doUploads = async (pathPrefix = "") => {
    if (Object.keys(uploadFiles).length > 0 && uploadBaseUrl) {
      const itemNamePattern = uploadNamePattern || schema.pathPattern;
      if (!itemNamePattern) {
        alert("No uploadNamePattern given or pathPattern property on schema to determine file save url base");
        return;
      }
      const itemName = substituteProperties(itemNamePattern, value);
      const uploadPromises = Object.entries(uploadFiles).filter(([path]) => path.startsWith(pathPrefix)).flatMap(([path, files]) => {
        const pathPromises = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const destinationUrl = uploadBaseUrl + (uploadBaseUrl.endsWith("/") ? "" : "/") + itemName + "/" + path + "/" + file.name;
          const itemPromise = new Promise((resolve, reject) => {
            try {
              const xhr = new XMLHttpRequest();
              xhr.upload.onprogress = (ev) => progress(path, file.name, ev.loaded / ev.total * 100);
              xhr.upload.onloadend = (ev) => {
                progress(path, file.name, xhr.status === 200 || xhr.status === 0 ? -1 : -xhr.status);
                resolve([path, destinationUrl]);
              };
              xhr.withCredentials = true;
              xhr.open("PUT", destinationUrl);
              xhr.send(file);
            } catch (err) {
              reject(err);
            }
          }).then(([path2, destinationUrl2]) => {
            if (path2 === "") {
              value = destinationUrl2;
            } else {
              set(value, path2.split("."), destinationUrl2);
            }
            value = value;
            delete uploadFiles[path2];
          });
          pathPromises.push(itemPromise);
        }
        return pathPromises;
      });
      await Promise.all(uploadPromises);
    }
  };
  componentContext.doUploads = doUploads;
  if ($$props.schema === void 0 && $$bindings.schema && schema !== void 0)
    $$bindings.schema(schema);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.cancelButton === void 0 && $$bindings.cancelButton && cancelButton !== void 0)
    $$bindings.cancelButton(cancelButton);
  if ($$props.uploadFiles === void 0 && $$bindings.uploadFiles && uploadFiles !== void 0)
    $$bindings.uploadFiles(uploadFiles);
  if ($$props.uploadBaseUrl === void 0 && $$bindings.uploadBaseUrl && uploadBaseUrl !== void 0)
    $$bindings.uploadBaseUrl(uploadBaseUrl);
  if ($$props.uploadNamePattern === void 0 && $$bindings.uploadNamePattern && uploadNamePattern !== void 0)
    $$bindings.uploadNamePattern(uploadNamePattern);
  if ($$props.dirty === void 0 && $$bindings.dirty && dirty !== void 0)
    $$bindings.dirty(dirty);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.collapsible === void 0 && $$bindings.collapsible && collapsible !== void 0)
    $$bindings.collapsible(collapsible);
  if ($$props.submitText === void 0 && $$bindings.submitText && submitText !== void 0)
    $$bindings.submitText(submitText);
  if ($$props.submitRequiresDirty === void 0 && $$bindings.submitRequiresDirty && submitRequiresDirty !== void 0)
    $$bindings.submitRequiresDirty(submitRequiresDirty);
  if ($$props.componentContext === void 0 && $$bindings.componentContext && componentContext !== void 0)
    $$bindings.componentContext(componentContext);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  <form class="${["svelte-schema-form", dirty ? "dirty" : ""].join(" ").trim()}"${add_attribute("action", action, 0)}>${validate_component(SchemaForm, "SchemaForm").$$render(
      $$result,
      {
        value,
        showErrors,
        components,
        collapsible,
        componentContext,
        schema,
        dirty,
        uploadFiles
      },
      {
        schema: ($$value) => {
          schema = $$value;
          $$settled = false;
        },
        dirty: ($$value) => {
          dirty = $$value;
          $$settled = false;
        },
        uploadFiles: ($$value) => {
          uploadFiles = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="button-container flex justify-center space-x-4"><button class="btn variant-ghost-surface mt-5" data-svelte-h="svelte-4ht99">Close</button> <button${add_attribute("type", action ? "submit" : "button", 0)} class="${[
      "btn variant-filled-primary background-submit !text-white mt-5 svelte-1mg8fxn",
      !dirty && submitRequiresDirty ? "not-dirty" : ""
    ].join(" ").trim()}">${escape(submitText)}</button></div> </form>`;
  } while (!$$settled);
  $$unsubscribe_pathProgress();
  return $$rendered;
});
const css = {
  code: ".svelte-1p0h1dm.svelte-1p0h1dm{box-sizing:border-box}.container.svelte-1p0h1dm.svelte-1p0h1dm{display:flex;position:relative}.schema.svelte-1p0h1dm.svelte-1p0h1dm,.form.svelte-1p0h1dm.svelte-1p0h1dm,.output.svelte-1p0h1dm.svelte-1p0h1dm{width:32%;border:solid 1px black;height:99vh;position:relative}.schema.svelte-1p0h1dm.svelte-1p0h1dm{border:none;display:flex;flex-direction:column}.form.svelte-1p0h1dm.svelte-1p0h1dm,.output.svelte-1p0h1dm.svelte-1p0h1dm{margin-left:1%;padding:1em}#schema.svelte-1p0h1dm.svelte-1p0h1dm{width:100%;height:100%;gap:1em}.schema.jsonInvalid.svelte-1p0h1dm #schema.svelte-1p0h1dm{color:darkred}#collapsible.svelte-1p0h1dm.svelte-1p0h1dm{margin-bottom:6px}.control.svelte-1p0h1dm.svelte-1p0h1dm{margin-bottom:6px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let schema = {
    type: "object",
    properties: {
      something: {
        type: "string",
        maxLength: 5,
        description: "description for something"
      },
      amount: { type: "number" },
      test: { type: "color" },
      choose: { type: "string", enum: ["a", "b", "c"] },
      checkThis: { type: "boolean" },
      things: { type: "array", items: { type: "string" } },
      complicatedThings: {
        type: "array",
        editor: "blocks",
        effectiveUrl: "/abc",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            thumbnail: { type: "string", editor: "upload" }
          }
        }
      },
      "obj": {
        "type": "object",
        "properties": { "xyz": { "type": "string" } }
      },
      "aFile": { "type": "string", "editor": "upload" }
    },
    required: ["amount"],
    pathPattern: "item_${amount}"
  };
  let value = {};
  let valueJson = "";
  let collapsible = false;
  const componentContext = { currencySymbol: "£" };
  $$result.css.add(css);
  return `<div class="container svelte-1p0h1dm"><div class="${["schema svelte-1p0h1dm", ""].join(" ").trim()}"><div class="control svelte-1p0h1dm"><input type="checkbox" id="collapsible" class="svelte-1p0h1dm"${add_attribute("checked", collapsible, 1)}> <label for="collapsible" class="svelte-1p0h1dm" data-svelte-h="svelte-gd142">Collapsible</label></div> <textarea id="schema" class="svelte-1p0h1dm">${"test " + escape(JSON.stringify(schema, void 0, 2), false)}</textarea></div> <div class="form svelte-1p0h1dm">${validate_component(SubmitForm, "SubmitForm").$$render(
    $$result,
    {
      schema,
      value,
      uploadBaseUrl: "https://restspace.local:3131/files",
      collapsible,
      componentContext
    },
    {},
    {}
  )}</div> <div class="output svelte-1p0h1dm"><pre class="svelte-1p0h1dm">			${escape(valueJson)}
		</pre></div> </div>`;
});
export {
  Page as default
};
