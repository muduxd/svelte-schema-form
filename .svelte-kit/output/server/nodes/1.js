

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.IF96go8r.js","_app/immutable/chunks/scheduler.IlVl7hCi.js","_app/immutable/chunks/index.U90YCfkg.js","_app/immutable/chunks/singletons.N360JmwW.js","_app/immutable/chunks/index.i2bAfgl8.js"];
export const stylesheets = [];
export const fonts = [];
