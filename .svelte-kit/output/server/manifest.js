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
		client: {"start":"_app/immutable/entry/start.XtrPMpd0.js","app":"_app/immutable/entry/app.Zyfit_Oi.js","imports":["_app/immutable/entry/start.XtrPMpd0.js","_app/immutable/chunks/scheduler.kU5Dmvpj.js","_app/immutable/chunks/singletons.7gFj8NRt.js","_app/immutable/chunks/index.Eo7l_F5I.js","_app/immutable/entry/app.Zyfit_Oi.js","_app/immutable/chunks/scheduler.kU5Dmvpj.js","_app/immutable/chunks/index.E2DS1zM7.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
