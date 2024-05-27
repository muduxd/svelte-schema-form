

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.UboV1fJY.js","_app/immutable/chunks/scheduler.YqzeI4eF.js","_app/immutable/chunks/index.UOys41uS.js"];
export const stylesheets = ["_app/immutable/assets/0.q3-q7s22.css"];
export const fonts = [];
