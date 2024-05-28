

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.V6Mgx8A0.js","_app/immutable/chunks/scheduler.7woAWCaP.js","_app/immutable/chunks/index.1W1sS5SM.js","_app/immutable/chunks/index.TeyEfz2H.js"];
export const stylesheets = ["_app/immutable/assets/2.0gLiGsVq.css"];
export const fonts = [];
