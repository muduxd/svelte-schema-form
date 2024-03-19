

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.dlca_jMT.js","_app/immutable/chunks/scheduler.YqzeI4eF.js","_app/immutable/chunks/index.UOys41uS.js","_app/immutable/chunks/index.sR6m8Xv2.js"];
export const stylesheets = ["_app/immutable/assets/2.0gLiGsVq.css"];
export const fonts = [];
