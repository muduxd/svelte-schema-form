

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.6JxH46z5.js","_app/immutable/chunks/scheduler.UYiYyZwv.js","_app/immutable/chunks/index.D1xTW8Wy.js","_app/immutable/chunks/index.wrVt8oOi.js"];
export const stylesheets = ["_app/immutable/assets/2.10DLFnbG.css"];
export const fonts = [];
