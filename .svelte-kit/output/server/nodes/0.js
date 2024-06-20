

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0._HIef5AM.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/index.vuzwqMJB.js"];
export const stylesheets = ["_app/immutable/assets/0.3H37NqVj.css"];
export const fonts = [];
