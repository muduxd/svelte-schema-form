

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.r1hdKM9z.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/index.vuzwqMJB.js"];
export const stylesheets = ["_app/immutable/assets/0.07lTDQGi.css"];
export const fonts = [];
