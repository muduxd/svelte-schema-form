

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.UzvZHiX0.js","_app/immutable/chunks/scheduler.1nKTxpW7.js","_app/immutable/chunks/index.O5_VnBjY.js","_app/immutable/chunks/index.tCH4QRSl.js"];
export const stylesheets = ["_app/immutable/assets/2.0gLiGsVq.css"];
export const fonts = [];
