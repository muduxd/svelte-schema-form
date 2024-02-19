

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.R1_XVR15.js","_app/immutable/chunks/scheduler.vYR2bk-x.js","_app/immutable/chunks/index.CEdY4TUy.js","_app/immutable/chunks/index.6jBjZWy7.js"];
export const stylesheets = ["_app/immutable/assets/2.wWWGPKnE.css"];
export const fonts = [];
