export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.gDiNM4BI.js","app":"_app/immutable/entry/app.PM1qqm6m.js","imports":["_app/immutable/entry/start.gDiNM4BI.js","_app/immutable/chunks/scheduler.IYY3GwSD.js","_app/immutable/chunks/singletons.gwwDGvcK.js","_app/immutable/chunks/index.oJ-9leN1.js","_app/immutable/entry/app.PM1qqm6m.js","_app/immutable/chunks/scheduler.IYY3GwSD.js","_app/immutable/chunks/index.BYeRDEgE.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
