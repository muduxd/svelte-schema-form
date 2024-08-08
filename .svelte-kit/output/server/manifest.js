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
		client: {"start":"_app/immutable/entry/start.ie_p5Ghc.js","app":"_app/immutable/entry/app.O6MCF1cK.js","imports":["_app/immutable/entry/start.ie_p5Ghc.js","_app/immutable/chunks/scheduler.e-SIUeoS.js","_app/immutable/chunks/singletons.8MjPsGt1.js","_app/immutable/chunks/index.fiq2uqmN.js","_app/immutable/entry/app.O6MCF1cK.js","_app/immutable/chunks/scheduler.e-SIUeoS.js","_app/immutable/chunks/index.mR-p4qrN.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
