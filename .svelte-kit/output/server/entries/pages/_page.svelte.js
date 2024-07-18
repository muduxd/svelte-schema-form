import { c as create_ssr_component, v as validate_component, m as missing_component, b as add_attribute, e as escape, d as each, f as spread, h as escape_attribute_value, i as escape_object, j as get_store_value, k as compute_rest_props, l as createEventDispatcher, n as compute_slots, s as setContext, g as getContext, a as subscribe, o as add_classes, p as add_styles, q as null_to_empty, r as set_store_value } from "../../chunks/ssr.js";
import _, { get } from "lodash-es";
import set from "lodash-es/set.js";
import get$1 from "lodash-es/get.js";
import "@exodus/schemasafe";
import FaSolidPlus from "svelte-icons-pack/fa/FaSolidPlus.js";
import FaSolidArrowUp from "svelte-icons-pack/fa/FaSolidArrowUp.js";
import FaSolidArrowDown from "svelte-icons-pack/fa/FaSolidArrowDown.js";
import FaSolidTrash from "svelte-icons-pack/fa/FaSolidTrash.js";
import FaCopy from "svelte-icons-pack/fa/FaCopy.js";
import { w as writable, r as readable } from "../../chunks/index.js";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
import { v4 } from "uuid";
import "@exodus/schemasafe/src/pointer.js";
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
    $$rendered = `<div>${validate_component(component || missing_component, "svelte:component").$$render(
      $$result,
      { params, value, class: "h-[40px]", schema },
      {
        schema: ($$value) => {
          schema = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
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
const css$5 = {
  code: ".legend-group.svelte-hghlbv{padding:20px;padding-top:0;margin:10px 0;color:rgb(var(--color-surface-100));border:2px solid rgb(var(--color-surface-100));border-radius:10px}fieldset.subset.object.svelte-hghlbv{flex-grow:1 !important}",
  map: null
};
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
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    propNames = Object.keys(schema.properties);
    legendText = schemaLabel(schema, params.path);
    showLegend = params.collapsible || params.containerParent !== "array" && !!legendText;
    legendClasses = showLegend ? "legend-group" : "";
    $$rendered = `<fieldset${add_attribute("name", params.path.join("."), 0)} class="${"subset object depth-" + escape(params.path.length, true) + " flex flex-col grow gap-[5px] " + escape(legendClasses, true) + " svelte-hghlbv"}">${showLegend ? `<legend class="subset-label object-label">${params.collapsible ? `<span class="${"collapser " + escape(collapserOpenState, true) + " svelte-hghlbv"}"></span>` : ``} ${params.containerParent !== "array" || schema.title ? `<span class="subset-label-title object-label-title !mx-2 text-lg font-bold"><!-- HTML_TAG_START -->${stringToHtml(schemaLabel(schema, params.path))}<!-- HTML_TAG_END --></span> ${schema.description ? `<span class="subset-label-description object-label-description mx-2 text-lg font-bold"><!-- HTML_TAG_START -->${stringToHtml(schema.description)}<!-- HTML_TAG_END --></span>` : ``}` : ``}</legend>` : ``} ${collapserOpenState === "open" ? `${each(propNames, (propName) => {
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
    })}` : ``} </fieldset>`;
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
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { size = "1em" } = $$props;
  let { color = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { className = "" } = $$props;
  let innerHtml;
  let attr;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  {
    {
      attr = {};
      if (color) {
        if (src.a.stroke !== "none") {
          attr.stroke = color;
        }
        if (src.a.fill !== "none") {
          attr.fill = color;
        }
      }
    }
  }
  {
    {
      innerHtml = (title ? `<title>${title}</title>` : "") + src.c;
    }
  }
  return `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { "stroke-width": "0" },
      { class: escape_attribute_value(className) },
      escape_object(src.a),
      escape_object(attr),
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${innerHtml}<!-- HTML_TAG_END --></svg>`;
});
const css$4 = {
  code: ".list-controls.svelte-34tvem{margin:10px;display:flex}.list-control.add.svelte-34tvem{align-self:flex-start;margin-top:10px}",
  map: null
};
const buttonClasses$1 = "!mx-2 bg-primary-500 p-2 rounded-full self-start text-center";
const iconSize$1 = 16;
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
  $$result.css.add(css$4);
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
    $$rendered = `${showWrapper ? `<fieldset${add_attribute("name", params.path.join("."), 0)} class="${"subset array depth-" + escape(params.path.length, true) + " flex flex-col grow gap-[5px] svelte-34tvem"}">${params.collapsible || legendText ? `<legend class="subset-label array-label">${params.collapsible ? `<span class="${"collapser " + escape(collapserOpenState, true) + " svelte-34tvem"}"></span>` : ``} <span class="subset-label-title object-label-title"><!-- HTML_TAG_START -->${stringToHtml(legendText)}<!-- HTML_TAG_END --></span> ${schema.description ? `<span class="subset-label-description object-label-description"><!-- HTML_TAG_START -->${stringToHtml(schema.description)}<!-- HTML_TAG_END --></span>` : ``}</legend>` : ``} ${collapserOpenState === "open" ? `${!emptyText ? `${each(value || [], (item, idx) => {
      return `<div class="flex items-center">${validate_component(SubSchemaForm || missing_component, "svelte:component").$$render(
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
      )} <div class="list-controls svelte-34tvem">${controls.includes("delete") ? `<button type="button" class="${"list-control delete " + escape(buttonClasses$1, true) + " svelte-34tvem"}" title="delete">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaSolidTrash,
          color: "white",
          size: iconSize$1
        },
        {},
        {}
      )} </button>` : ``} ${controls.includes("duplicate") ? `<button type="button" class="${"list-control duplicate " + escape(buttonClasses$1, true) + " svelte-34tvem"}" title="duplicate">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaCopy,
          color: "white",
          size: iconSize$1
        },
        {},
        {}
      )} </button>` : ``} ${controls.includes("reorder") && idx > 0 ? `<button type="button" class="${"list-control up " + escape(buttonClasses$1, true) + " svelte-34tvem"}" title="move up">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaSolidArrowUp,
          color: "white",
          size: iconSize$1
        },
        {},
        {}
      )} </button>` : ``} ${controls.includes("reorder") && idx < (value || []).length - 1 ? `<button type="button" class="${"list-control down " + escape(buttonClasses$1, true) + " svelte-34tvem"}" title="move down">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaSolidArrowDown,
          color: "white",
          size: iconSize$1
        },
        {},
        {}
      )} </button>` : ``}</div> </div>`;
    })} ${controls.includes("add") ? `<button type="button" class="${"list-control add " + escape(buttonClasses$1, true) + " svelte-34tvem"}" title="add item">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        src: FaSolidPlus,
        color: "white",
        size: iconSize$1
      },
      {},
      {}
    )}</button>` : ``}` : `<div class="emptyText">${escape(emptyText)}</div>`}` : ``}</fieldset>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const storePopup = writable(void 0);
const stores = {};
function localStorageStore(key, initialValue, options) {
  options?.serializer ?? JSON;
  options?.storage ?? "local";
  if (!stores[key]) {
    const store = writable(initialValue, (set3) => {
    });
    const { subscribe: subscribe2, set: set2 } = store;
    stores[key] = {
      set(value) {
        set2(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set2(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
localStorageStore("modeCurrent", false);
function prefersReducedMotion() {
  return false;
}
readable(prefersReducedMotion(), (set2) => {
});
const cBase$2 = "inline-block";
const cLabel = "unstyled flex items-center";
const cTrack = "flex transition-all duration-[200ms] cursor-pointer";
const cThumb = "w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow";
const SlideToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cTrackActive;
  let cThumbBackground;
  let cThumbPos;
  let classesDisabled;
  let classesBase;
  let classesLabel;
  let classesTrack;
  let classesThumb;
  let $$restProps = compute_rest_props($$props, ["name", "checked", "size", "background", "active", "border", "rounded", "label"]);
  let $$slots = compute_slots(slots);
  createEventDispatcher();
  let { name } = $$props;
  let { checked = false } = $$props;
  let { size = "md" } = $$props;
  let { background = "bg-surface-400 dark:bg-surface-700" } = $$props;
  let { active = "bg-surface-900 dark:bg-surface-300" } = $$props;
  let { border = "" } = $$props;
  let { rounded = "rounded-full" } = $$props;
  let { label = "" } = $$props;
  let trackSize;
  switch (size) {
    case "sm":
      trackSize = "w-12 h-6";
      break;
    case "lg":
      trackSize = "w-20 h-10";
      break;
    default:
      trackSize = "w-16 h-8";
  }
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  cTrackActive = checked ? active : `${background} cursor-pointer`;
  cThumbBackground = checked ? "bg-white/75" : "bg-white";
  cThumbPos = checked ? "translate-x-full" : "";
  classesDisabled = $$props.disabled === true ? "opacity-50" : "hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer";
  classesBase = `${cBase$2} ${rounded} ${classesDisabled} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesTrack = `${cTrack} ${border} ${rounded} ${trackSize} ${cTrackActive}`;
  classesThumb = `${cThumb} ${rounded} ${cThumbBackground} ${cThumbPos}`;
  return `<div${add_attribute("id", label, 0)} class="${"slide-toggle " + escape(classesBase, true)}" data-testid="slide-toggle" role="switch"${add_attribute("aria-label", label, 0)}${add_attribute("aria-checked", checked, 0)} tabindex="0"><label class="${"slide-toggle-label " + escape(classesLabel, true)}"> <input${spread(
    [
      { type: "checkbox" },
      { class: "slide-toggle-input hidden" },
      { name: escape_attribute_value(name) },
      escape_object(prunedRestProps()),
      { disabled: $$props.disabled || null }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}>  <div class="${[
    "slide-toggle-track " + escape(classesTrack, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"><div class="${[
    "slide-toggle-thumb " + escape(classesThumb, true),
    $$props.disabled ? "cursor-not-allowed" : ""
  ].join(" ").trim()}"></div></div>  ${$$slots.default ? `<div class="slide-toggle-text ml-3">${slots.default ? slots.default({}) : ``}</div>` : ``}</label></div>`;
});
const cBase$1 = "space-y-4";
const cList = "flex overflow-x-auto hide-scrollbar";
const cPanel = "";
const TabGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesList;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let { justify = "justify-start" } = $$props;
  let { border = "border-b border-surface-400-500-token" } = $$props;
  let { active = "border-b-2 border-surface-900-50-token" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { flex = "flex-none" } = $$props;
  let { padding = "px-4 py-2" } = $$props;
  let { rounded = "rounded-tl-container-token rounded-tr-container-token" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { regionList = "" } = $$props;
  let { regionPanel = "" } = $$props;
  let { labelledby = "" } = $$props;
  let { panel = "" } = $$props;
  setContext("active", active);
  setContext("hover", hover);
  setContext("flex", flex);
  setContext("padding", padding);
  setContext("rounded", rounded);
  setContext("spacing", spacing);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0)
    $$bindings.regionList(regionList);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  if ($$props.panel === void 0 && $$bindings.panel && panel !== void 0)
    $$bindings.panel(panel);
  classesBase = `${cBase$1} ${$$props.class ?? ""}`;
  classesList = `${cList} ${justify} ${border} ${regionList}`;
  classesPanel = `${cPanel} ${regionPanel}`;
  return `  <div class="${"tab-group " + escape(classesBase, true)}" data-testid="tab-group"> <div class="${"tab-list " + escape(classesList, true)}" role="tablist"${add_attribute("aria-labelledby", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>  ${$$slots.panel ? `<div class="${"tab-panel " + escape(classesPanel, true)}" role="tabpanel"${add_attribute("aria-labelledby", panel, 0)} tabindex="0">${slots.panel ? slots.panel({}) : ``}</div>` : ``}</div>`;
});
const cBase = "text-center cursor-pointer transition-colors duration-100";
const cInterface = "";
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let classesActive;
  let classesBase;
  let classesInterface;
  let classesTab;
  let $$restProps = compute_rest_props($$props, [
    "group",
    "name",
    "value",
    "title",
    "controls",
    "regionTab",
    "active",
    "hover",
    "flex",
    "padding",
    "rounded",
    "spacing"
  ]);
  let $$slots = compute_slots(slots);
  let { group } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  let { title = "" } = $$props;
  let { controls = "" } = $$props;
  let { regionTab = "" } = $$props;
  let { active = getContext("active") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { flex = getContext("flex") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { spacing = getContext("spacing") } = $$props;
  let elemInput;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.controls === void 0 && $$bindings.controls && controls !== void 0)
    $$bindings.controls(controls);
  if ($$props.regionTab === void 0 && $$bindings.regionTab && regionTab !== void 0)
    $$bindings.regionTab(regionTab);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  selected = value === group;
  classesActive = selected ? active : hover;
  classesBase = `${cBase} ${flex} ${padding} ${rounded} ${classesActive} ${$$props.class ?? ""}`;
  classesInterface = `${cInterface} ${spacing}`;
  classesTab = `${regionTab}`;
  return `<label${add_attribute("class", classesBase, 0)}${add_attribute("title", title, 0)}> <div class="${"tab " + escape(classesTab, true)}" data-testid="tab" role="tab"${add_attribute("aria-controls", controls, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("tabindex", selected ? 0 : -1, 0)}> <div class="h-0 w-0 overflow-hidden"><input${spread(
    [
      { type: "radio" },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) },
      escape_object(prunedRestProps()),
      { tabindex: "-1" }
    ],
    {}
  )}${add_attribute("this", elemInput, 0)}${value === group ? add_attribute("checked", true, 1) : ""}></div>  <div class="${"tab-interface " + escape(classesInterface, true)}">${$$slots.lead ? `<div class="tab-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``} <div class="tab-label">${slots.default ? slots.default({}) : ``}</div></div></div></label>`;
});
const Boolean = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  let { schema } = $$props;
  let { value = false } = $$props;
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
    $$rendered = ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
      default: () => {
        return `${validate_component(SlideToggle, "SlideToggle").$$render(
          $$result,
          {
            id: params.path.join("."),
            name: params.path.join("."),
            size: "sm",
            checked: value
          },
          {
            checked: ($$value) => {
              value = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
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
const Buffers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let flexDirection;
  let currentBuffer;
  let currentBufferInputVal;
  let currentObjectInputVal;
  let currentConstantInputVal;
  storePopup.set({
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  });
  let { params } = $$props;
  let { schema } = $$props;
  let { value } = $$props;
  let buffersText;
  let objects;
  let givenVariablesObj = [];
  let internalVariables = [];
  let contextVariables = [];
  let runtimeVariables = [];
  let id = params.path.join(".");
  let tabSet = 0;
  let uniqueId = v4();
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
    {
      {
        if (Array.isArray(schema.internalVariables)) {
          internalVariables = [...schema.internalVariables];
        } else {
          internalVariables = [];
        }
      }
    }
    {
      {
        if (Array.isArray(schema.contextVariables)) {
          contextVariables = [...schema.contextVariables];
        } else {
          contextVariables = [];
        }
      }
    }
    {
      {
        if (Array.isArray(schema.runtimeVariables)) {
          runtimeVariables = [...schema.runtimeVariables];
        } else {
          runtimeVariables = [];
        }
      }
    }
    givenVariablesObj = [...internalVariables, ...contextVariables, ...runtimeVariables];
    schema.buffersText.map((_2, index) => index) || schema.enum;
    buffersText = schema.buffersText;
    objects = schema.objects;
    flexDirection = schema.direction || "column";
    currentBuffer = "";
    currentBufferInputVal = null;
    currentObjectInputVal = null;
    currentConstantInputVal = null;
    $$rendered = ` ${validate_component(params.components["fieldWrapper"] || missing_component, "svelte:component").$$render($$result, { params, schema }, {}, {
      default: () => {
        return `<button class="btn flex items-center variant-filled w-48 justify-between"><span class="capitalize">${escape("Choose buffer")}</span> <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path></svg></button> <div class="p-4 w-48 card shadow-xl z-10"${add_attribute("data-popup", `popupCombobox-${uniqueId}`, 0)}>${validate_component(TabGroup, "TabGroup").$$render($$result, {}, {}, {
          panel: () => {
            return `${tabSet === 0 ? `<div role="radiogroup" class="flex flex-col gap-2"${add_attribute("aria-labelledby", `label-${id}-${uniqueId}`, 0)} style="${"flex-direction:" + escape(flexDirection, true)}"${add_attribute("id", `group-${id}-${uniqueId}`, 0)}><input${add_attribute("id", `${params.path.join(".")}-${uniqueId}`, 0)}${add_attribute("name", `${params.path.join(".")}-${uniqueId}`, 0)} type="number" class="input px-4 py-2" placeholder="0" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}${add_attribute("value", currentBufferInputVal, 0)}> <div class="overflow-y-auto max-h-48">${each(buffersText, (bufferText, idx) => {
              return `<label${add_attribute("for", `${id}-${idx}-${uniqueId}`, 0)} class="flex items-center space-x-2"><input class="radio" type="radio"${add_attribute("id", `${id}-${idx}-${uniqueId}`, 0)}${add_attribute("value", bufferText, 0)}${add_attribute("name", `${id}-${uniqueId}`, 0)}${bufferText === currentBuffer ? add_attribute("checked", true, 1) : ""}> <p>${escape(bufferText || "")}</p> </label>`;
            })}</div></div> <button class="listbox-item btn variant-filled-primary mt-2 w-full" type="button" data-svelte-h="svelte-13im8od">Done</button>` : `${tabSet === 1 ? `<div role="radiogroup" class="flex flex-col gap-2"${add_attribute("aria-labelledby", `label-${id}-${uniqueId}`, 0)} style="${"flex-direction:" + escape(flexDirection, true)}"${add_attribute("id", `group-${id}-${uniqueId}`, 0)}><input${add_attribute("id", `${params.path.join(".")}-${uniqueId}`, 0)}${add_attribute("name", `${params.path.join(".")}-${uniqueId}`, 0)} type="number" class="input px-4 py-2" placeholder="0" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}${add_attribute("value", currentObjectInputVal, 0)}> <div class="overflow-y-auto max-h-48">${each(objects, (object, idx) => {
              return `<label${add_attribute("for", `${id}-${idx}-${uniqueId}`, 0)} class="flex items-center space-x-2"><input class="radio" type="radio"${add_attribute("id", `${id}-${idx}-${uniqueId}`, 0)}${add_attribute("value", object.value, 0)}${add_attribute("name", `${object.name}-${id}-${uniqueId}`, 0)}${object.value === currentBuffer ? add_attribute("checked", true, 1) : ""}> <p>${escape(object.name || "")}</p> </label>`;
            })}</div></div> <button class="listbox-item btn variant-filled-primary mt-2 w-full" type="button" data-svelte-h="svelte-13im8od">Done</button>` : `${tabSet === 2 ? `<div><input${add_attribute("id", `${params.path.join(".")}-${uniqueId}`, 0)}${add_attribute("name", `${params.path.join(".")}-${uniqueId}`, 0)} type="number" class="input px-4 py-2" placeholder="0" ${schema.readOnly || params.containerReadOnly ? "disabled" : ""}${add_attribute("value", currentConstantInputVal, 0)}></div> <button class="listbox-item btn variant-filled-primary mt-2 w-full" type="button" data-svelte-h="svelte-13im8od">Done</button>` : `${tabSet === 3 ? `<div>${givenVariablesObj.length > 0 ? `<select name="vals"${add_attribute("id", `vals-${uniqueId}`, 0)} class="input mt-1" style="background-color: #2E395A;">${internalVariables && internalVariables.length > 0 ? `<optgroup label="Internal Variables">${each(internalVariables, (variableObj, index) => {
              return `<option${add_attribute("value", variableObj.value, 0)}>${escape(variableObj.name)}</option>`;
            })}</optgroup>` : ``}${contextVariables && contextVariables.length > 0 ? `<optgroup label="Context Variables">${each(contextVariables, (variableObj, index) => {
              return `<option${add_attribute("value", variableObj.value, 0)}>${escape(variableObj.name)}</option>`;
            })}</optgroup>` : ``}${runtimeVariables && runtimeVariables.length > 0 ? `<optgroup label="Runtime Variables">${each(runtimeVariables, (variableObj, index) => {
              return `<option${add_attribute("value", variableObj.value, 0)}>${escape(variableObj.name)}</option>`;
            })}</optgroup>` : ``}</select>` : `<p data-svelte-h="svelte-o1tfc4">No variables created.</p>`}</div> <button ${!(givenVariablesObj.length > 0) ? "disabled" : ""}${add_attribute("class", `listbox-item btn variant-filled-primary mt-2 w-full ${!(givenVariablesObj.length > 0) ? "not-dirty" : ""}`, 0)} type="button">Done</button>` : ``}`}`}`} `;
          },
          default: () => {
            return `${validate_component(Tab, "Tab").$$render(
              $$result,
              { name: "tab1", value: 0, group: tabSet },
              {
                group: ($$value) => {
                  tabSet = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `Buffers`;
                }
              }
            )} ${validate_component(Tab, "Tab").$$render(
              $$result,
              { name: "tab2", value: 1, group: tabSet },
              {
                group: ($$value) => {
                  tabSet = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `Objects`;
                }
              }
            )} ${validate_component(Tab, "Tab").$$render(
              $$result,
              { name: "tab3", value: 2, group: tabSet },
              {
                group: ($$value) => {
                  tabSet = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `Constants`;
                }
              }
            )} ${validate_component(Tab, "Tab").$$render(
              $$result,
              { name: "tab4", value: 3, group: tabSet },
              {
                group: ($$value) => {
                  tabSet = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `Variables`;
                }
              }
            )}`;
          }
        })} <div class="arrow bg-surface-100-800-token"></div></div>`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
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
const css$3 = {
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
  $$result.css.add(css$3);
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
const css$2 = {
  code: ".list-control.add.svelte-y24vra{align-self:flex-start;margin-top:10px}fieldset.subset.array.svelte-y24vra{flex-grow:1 !important}",
  map: null
};
const buttonClasses = " !mx-2 bg-primary-500 p-2 rounded-full self-start text-center";
const iconSize = 16;
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
  $$result.css.add(css$2);
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
    $$rendered = `${showWrapper ? `<fieldset${add_attribute("name", params.path.join("."), 0)} class="${"subset array list-detail depth-" + escape(params.path.length, true) + " flex flex-col grow gap-[5px] svelte-y24vra"}">${params.collapsible || legendText ? `<legend class="subset-label array-label">${params.collapsible ? `<span class="${"collapser " + escape(collapserOpenState, true) + " svelte-y24vra"}"></span>` : ``} <span class="subset-label-title object-label-title"><!-- HTML_TAG_START -->${stringToHtml(legendText)}<!-- HTML_TAG_END --></span> ${schema.description ? `<span class="subset-label-description object-label-description"><!-- HTML_TAG_START -->${stringToHtml(schema.description)}<!-- HTML_TAG_END --></span>` : ``}</legend>` : ``} ${collapserOpenState === "open" ? `${!emptyText ? `   <div class="table-container" tabindex="0"${add_styles({
      "grid-template-columns": gridTemplateColumns
    })}>${`${each(listFields, (fieldName, idx) => {
      return `<div class="${escape(null_to_empty(headingClass(idx, sort)), true) + " svelte-y24vra"}" tabindex="0">${escape(fieldName)}</div>`;
    })} ${!readOnly ? `<div class="buttons-header" data-svelte-h="svelte-1ufcg2c"> </div>` : ``} ${each(rowView, (item, idx) => {
      return `<div class="${["row-wrapper", idx === selectedIdx ? "selected" : ""].join(" ").trim()}">${each(listProps, (propName) => {
        return `<div class="item">${escape(item[propName] === void 0 ? " " : item[propName])}</div>`;
      })}</div> ${!readOnly ? `<div class="array-buttons"><div class="row-buttons">${controls.includes("delete") ? `<button type="button" class="${"list-control delete " + escape(buttonClasses, true) + " svelte-y24vra"}" title="delete">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaSolidTrash,
          color: "white",
          size: iconSize
        },
        {},
        {}
      )} </button>` : ``} ${controls.includes("duplicate") ? `<button type="button" class="${"list-control duplicate " + escape(buttonClasses, true) + " svelte-y24vra"}" title="duplicate">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaCopy,
          color: "white",
          size: iconSize
        },
        {},
        {}
      )} </button>` : ``} ${controls.includes("reorder") && sort === null && idx > 0 ? `<button type="button" class="${"list-control up " + escape(buttonClasses, true) + " svelte-y24vra"}" title="move up">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaSolidArrowUp,
          color: "white",
          size: iconSize
        },
        {},
        {}
      )} </button>` : ``} ${controls.includes("reorder") && sort === null && idx < (value || []).length - 1 ? `<button type="button" class="${"list-control down " + escape(buttonClasses, true) + " svelte-y24vra"}" title="move down">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          src: FaSolidArrowDown,
          color: "white",
          size: iconSize
        },
        {},
        {}
      )} </button>` : ``}</div> </div>` : ``}`;
    })}`}</div>` : `<div class="emptyText">${escape(emptyText)}</div>`} ${controls.includes("add") ? `<button type="button" class="${"list-control add " + escape(buttonClasses, true) + " svelte-y24vra"}" title="add item">${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        src: FaSolidPlus,
        color: "white",
        size: iconSize
      },
      {},
      {}
    )}</button>` : ``}` : ``}</fieldset>` : ``}`;
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
      return `<div role="radiogroup" class="space-y-2"${add_attribute("aria-labelledby", `label-${id}`, 0)} style="${"flex-direction:" + escape(flexDirection, true)}"${add_attribute("id", `group-${id}`, 0)}>${each(enumVals, (enumVal, idx) => {
        return `<label${add_attribute("for", `${id}-${idx}`, 0)} class="flex items-center space-x-2"><input class="radio" type="radio"${add_attribute("id", `${id}-${idx}`, 0)}${add_attribute("value", enumVal, 0)}${add_attribute("name", id, 0)} ${enumVal === value ? "checked" : ""}> <p>${escape((enumText || [])[idx])}</p> </label>`;
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
          buffers: Buffers,
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
        showErrors,
        components,
        collapsible,
        componentContext,
        schema,
        value,
        dirty,
        uploadFiles
      },
      {
        schema: ($$value) => {
          schema = $$value;
          $$settled = false;
        },
        value: ($$value) => {
          value = $$value;
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
    )} <div class="button-container flex justify-between space-x-4"><button class="btn variant-ghost-surface mt-5" data-svelte-h="svelte-4ht99">Close</button> <button${add_attribute("type", action ? "submit" : "button", 0)} class="${[
      "btn variant-filled-primary background-submit !text-white mt-5 svelte-1mg8fxn",
      !dirty && submitRequiresDirty ? "not-dirty" : ""
    ].join(" ").trim()}">${escape(submitText)}</button></div> </form>`;
  } while (!$$settled);
  $$unsubscribe_pathProgress();
  return $$rendered;
});
const css = {
  code: '.svelte-1shpih0.svelte-1shpih0{box-sizing:border-box}.container.svelte-1shpih0.svelte-1shpih0{display:flex;position:relative}.schema.svelte-1shpih0.svelte-1shpih0,.form.svelte-1shpih0.svelte-1shpih0,.output.svelte-1shpih0.svelte-1shpih0{width:32%;border:solid 1px black;height:99vh;position:relative}.schema.svelte-1shpih0.svelte-1shpih0{border:none;display:flex;flex-direction:column}.form.svelte-1shpih0.svelte-1shpih0,.output.svelte-1shpih0.svelte-1shpih0{margin-left:1%;padding:1em}#schema.svelte-1shpih0.svelte-1shpih0{width:100%;height:100%;gap:1em}.schema.jsonInvalid.svelte-1shpih0 #schema.svelte-1shpih0{color:darkred}#collapsible.svelte-1shpih0.svelte-1shpih0{margin-bottom:6px}.control.svelte-1shpih0.svelte-1shpih0{margin-bottom:6px}form.svelte-schema-form .subset{display:grid;grid-template-rows:auto;grid-gap:1em;align-items:flex-start;padding-left:1em;box-sizing:border-box;border:none}form.svelte-schema-form .depth-0{padding-left:0}.svelte-schema-form .object{grid-template-columns:max-content 1fr;border-left:1px solid #999;grid-column:span 2}form.svelte-schema-form .array > .object{grid-column:span 1}form.svelte-schema-form .object.depth-0{border-left:none}form.svelte-schema-form .array{grid-column:span 2;grid-template-columns:1fr max-content}form.svelte-schema-form .subset > .subset-label{margin-bottom:1em}form.svelte-schema-form .subset > .subset-label .subset-label-title{display:block}form.svelte-schema-form .array > legend{margin-left:-1em}form.svelte-schema-form .array > .object{margin-left:-1em}form.svelte-schema-form .list-item{display:flex}form.svelte-schema-form input[type="checkbox"]{justify-self:start}form.svelte-schema-form .error{grid-column:1 / span 2}form.svelte-schema-form .sf-drop-area{width:100%;display:flex}form.svelte-schema-form .sf-drop-area .sf-upload-caption{position:absolute;top:0;bottom:0;left:0;right:30px;display:flex;justify-content:center;align-items:center;z-index:-1}form.svelte-schema-form .sf-drop-area .sf-upload-controls{position:absolute;right:0;display:flex;flex-direction:column;justify-content:space-between;height:100%;padding:4px;box-sizing:border-box}form.svelte-schema-form .sf-drop-area .sf-upload-controls button{border:0;padding:0;height:20px;width:20px;cursor:pointer}form.svelte-schema-form .sf-drop-area .sf-upload-controls .sf-upload-deleter{width:20px;height:20px;cursor:pointer}form.svelte-schema-form .sf-drop-area .sf-upload-input{align-self:center;width:calc(100% - 30px);margin:0 10px}form.svelte-schema-form .sf-drop-area.link .sf-upload-thumb, form.svelte-schema-form .sf-drop-area.link .sf-upload-file{display:none}form.svelte-schema-form .sf-drop-area .sf-upload-file{font-size:1.4em;font-weight:bold;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0.4em;color:white;background-color:#ddd}form.svelte-schema-form .sf-progress-bars{grid-column:2;display:flex;flex-direction:column;gap:3px;box-sizing:border-box}form.svelte-schema-form .sf-progress-bars .sf-progress-bar{width:100%;position:relative;box-sizing:border-box}form.svelte-schema-form .sf-progress-bars .sf-progress-bar .sf-progress-done{position:absolute;left:0;top:0;bottom:0}form.svelte-schema-form .sf-autocomplete{width:100%;position:relative}form.svelte-schema-form .sf-autocomplete .sf-items{z-index:1;position:absolute;right:0;left:0;max-height:12em;overflow-y:auto;overflow-x:hidden}form.svelte-schema-form .sf-autocomplete .sf-items > div, form.svelte-schema-form .sf-autocomplete .sf-selected-item{display:flex;align-items:center}form.svelte-schema-form .list-detail{width:100%}form.svelte-schema-form .list-detail .table-container{display:grid}form.svelte-schema-form .list-detail .row-wrapper{display:contents}form.svelte-schema-form .list-detail .item{display:flex}form.svelte-schema-form .list-detail .table-container > .element{grid-column:span 3}form.svelte-schema-form .list-detail .add-button-container{grid-column:span 3}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let schema = {
    type: "object",
    properties: {
      buffers: {
        title: "",
        editor: "buffers",
        buffersText: ["Buffer1", "Oasddsfgagadf", "gfrew342t", "sdfgdsfg", "sdafasdf"],
        objects: [
          { name: "asd", value: "asd" },
          { name: "asdgfdsfag", value: "324234" },
          { name: "w342534", value: "wer234" }
        ]
      }
      // internalVariables: [
      // 	{name: "asd", type:"string", value:"asdasd"},
    }
    // 	{name: "dfssdfg", type:"string", value:"asdasd"},
    // 	{name: "3454", type:"number", value:3454}
  };
  let schemaa = {
    type: "object",
    properties: {
      buffers: {
        title: "",
        editor: "buffers",
        buffersText: ["Buffer1", "Oasddsfgagadf", "gfrew342t", "sdfgdsfg", "sdafasdf"],
        objects: [
          { name: "asd", value: "asd" },
          { name: "asdgfdsfag", value: "324234" },
          { name: "w342534", value: "wer234" }
        ],
        // internalVariables: [
        // 	{name: "asd1", type:"string", value:"asd1"},
        // 	{name: "dfssdfg", type:"string", value:"dfssdfg1"},
        // 	{name: "3454", type:"number", value:3454}
        // ],
        contextVariables: [
          {
            name: "asd2",
            type: "string",
            value: "asd2"
          },
          {
            name: "dfssdfg2",
            type: "string",
            value: "dfssdfg2"
          },
          {
            name: "3454",
            type: "number",
            value: 3454
          }
        ]
      }
      // runtimeVariables: [
      // 	{name: "asd3", type:"string", value:"asd3"},
    }
    // 	{name: "dfssdfg3", type:"string", value:"dfssdfg3"},
    // 	{name: "3454", type:"number", value:3454}
  };
  let value = {};
  let valueJson = "";
  let collapsible = false;
  const componentContext = { currencySymbol: "£" };
  $$result.css.add(css);
  return `<div class="container svelte-1shpih0"><div class="${["schema svelte-1shpih0", ""].join(" ").trim()}"><div class="control svelte-1shpih0"><input type="checkbox" id="collapsible" class="svelte-1shpih0"${add_attribute("checked", collapsible, 1)}> <label for="collapsible" class="svelte-1shpih0" data-svelte-h="svelte-gd142">Collapsible</label></div> <textarea id="schema" class="svelte-1shpih0">${"test " + escape(JSON.stringify(schema, void 0, 2), false)}</textarea></div> <div class="form svelte-1shpih0">${validate_component(SubmitForm, "SubmitForm").$$render(
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
  )} ${validate_component(SubmitForm, "SubmitForm").$$render(
    $$result,
    {
      schema: schemaa,
      value,
      uploadBaseUrl: "https://restspace.local:3131/files",
      collapsible,
      componentContext
    },
    {},
    {}
  )}</div> <div class="output svelte-1shpih0"><pre class="svelte-1shpih0">			${escape(valueJson)}
		</pre></div> </div>`;
});
export {
  Page as default
};
