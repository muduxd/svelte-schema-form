

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.r05BpWSe.js","_app/immutable/chunks/scheduler.IYY3GwSD.js","_app/immutable/chunks/index.BYeRDEgE.js"];
export const stylesheets = ["_app/immutable/assets/0.zOZVG1-q.css"];
export const fonts = [];
