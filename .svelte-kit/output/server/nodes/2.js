

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.euRxV7jC.js","_app/immutable/chunks/scheduler.e-SIUeoS.js","_app/immutable/chunks/index.mR-p4qrN.js","_app/immutable/chunks/index.fiq2uqmN.js"];
export const stylesheets = ["_app/immutable/assets/2.In-WI--W.css"];
export const fonts = [];
