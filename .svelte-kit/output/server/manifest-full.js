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
		client: {"start":"_app/immutable/entry/start.5ZDARaSP.js","app":"_app/immutable/entry/app.0M431nru.js","imports":["_app/immutable/entry/start.5ZDARaSP.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/singletons.uNE1wJ2k.js","_app/immutable/chunks/index.Y9nRWNnS.js","_app/immutable/entry/app.0M431nru.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/index.vuzwqMJB.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
