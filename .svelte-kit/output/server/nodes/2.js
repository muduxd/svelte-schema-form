

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.o9wHGXlx.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/index.vuzwqMJB.js","_app/immutable/chunks/index.Y9nRWNnS.js"];
export const stylesheets = ["_app/immutable/assets/2.0gLiGsVq.css"];
export const fonts = [];
