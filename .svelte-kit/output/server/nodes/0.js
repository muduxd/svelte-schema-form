

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.d_L2bFvZ.js","_app/immutable/chunks/scheduler.1nKTxpW7.js","_app/immutable/chunks/index.O5_VnBjY.js"];
export const stylesheets = ["_app/immutable/assets/0.pqOZe-TI.css"];
export const fonts = [];
