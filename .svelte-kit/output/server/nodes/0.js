

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.A6q5XH1Q.js","_app/immutable/chunks/scheduler.wkhlQAFY.js","_app/immutable/chunks/index.i6COa9Rq.js"];
export const stylesheets = ["_app/immutable/assets/0.EqfriKAP.css"];
export const fonts = [];
