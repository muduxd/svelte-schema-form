

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DWAX-M6h.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/index.vuzwqMJB.js","_app/immutable/chunks/singletons.EUWrIv4M.js","_app/immutable/chunks/index.Y9nRWNnS.js"];
export const stylesheets = [];
export const fonts = [];
