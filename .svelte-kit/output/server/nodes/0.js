

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Pe9fs5BO.js","_app/immutable/chunks/scheduler.W04W5Byt.js","_app/immutable/chunks/index.EPNPJ6ZS.js"];
export const stylesheets = [];
export const fonts = [];
