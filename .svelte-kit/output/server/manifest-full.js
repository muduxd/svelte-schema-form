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
		client: {"start":"_app/immutable/entry/start.tbA_rT0v.js","app":"_app/immutable/entry/app.vb_xK6O4.js","imports":["_app/immutable/entry/start.tbA_rT0v.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/singletons.RUHL4Tf1.js","_app/immutable/chunks/index.Y9nRWNnS.js","_app/immutable/entry/app.vb_xK6O4.js","_app/immutable/chunks/scheduler.7O7R-GME.js","_app/immutable/chunks/index.vuzwqMJB.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
