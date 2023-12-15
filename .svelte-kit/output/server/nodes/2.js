

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.q1ByibA5.js","_app/immutable/chunks/scheduler.F8-nhWWX.js","_app/immutable/chunks/index.i4kBP6ud.js","_app/immutable/chunks/index.Xjuo8uma.js"];
export const stylesheets = ["_app/immutable/assets/2.KNiNtd4k.css"];
export const fonts = [];
