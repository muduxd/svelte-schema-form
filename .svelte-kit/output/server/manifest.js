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
		client: {"start":"_app/immutable/entry/start.loCls6Xa.js","app":"_app/immutable/entry/app.aHWSriao.js","imports":["_app/immutable/entry/start.loCls6Xa.js","_app/immutable/chunks/scheduler.AZEeLPNT.js","_app/immutable/chunks/singletons.9NN_5qGn.js","_app/immutable/chunks/index.3QUMPGsi.js","_app/immutable/entry/app.aHWSriao.js","_app/immutable/chunks/scheduler.AZEeLPNT.js","_app/immutable/chunks/index.nvwC_AwH.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
