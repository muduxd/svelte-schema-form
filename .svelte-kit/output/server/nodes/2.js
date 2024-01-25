

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.eC_YgWJT.js","_app/immutable/chunks/scheduler.kU5Dmvpj.js","_app/immutable/chunks/index.E2DS1zM7.js","_app/immutable/chunks/index.Eo7l_F5I.js"];
export const stylesheets = ["_app/immutable/assets/2.1KFpPHsk.css"];
export const fonts = [];
