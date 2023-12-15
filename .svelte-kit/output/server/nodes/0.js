

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CNagTTs0.js","_app/immutable/chunks/scheduler.F8-nhWWX.js","_app/immutable/chunks/index.i4kBP6ud.js"];
export const stylesheets = [];
export const fonts = [];
