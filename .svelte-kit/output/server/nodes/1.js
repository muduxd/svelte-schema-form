

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.z2LGdhVJ.js","_app/immutable/chunks/scheduler.kU5Dmvpj.js","_app/immutable/chunks/index.E2DS1zM7.js","_app/immutable/chunks/singletons.07NQtfpZ.js","_app/immutable/chunks/index.Eo7l_F5I.js"];
export const stylesheets = [];
export const fonts = [];
