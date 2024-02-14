

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.OZ3u3r-p.js","_app/immutable/chunks/scheduler.3cr_YFhF.js","_app/immutable/chunks/index.p5IxVpus.js","_app/immutable/chunks/index.JuWEqTzc.js"];
export const stylesheets = ["_app/immutable/assets/2.rTYsHiLl.css"];
export const fonts = [];
