

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.QJMiPCD4.js","_app/immutable/chunks/scheduler.W04W5Byt.js","_app/immutable/chunks/index.EPNPJ6ZS.js","_app/immutable/chunks/index.Pv1yzP9s.js"];
export const stylesheets = ["_app/immutable/assets/2.1KFpPHsk.css"];
export const fonts = [];
