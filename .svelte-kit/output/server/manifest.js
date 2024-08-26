export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","manifest.json"]),
	mimeTypes: {".png":"image/png",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.ChumuKGP.js","app":"_app/immutable/entry/app.VbSOIL9u.js","imports":["_app/immutable/entry/start.ChumuKGP.js","_app/immutable/chunks/scheduler.IlVl7hCi.js","_app/immutable/chunks/singletons.eTZn0MKW.js","_app/immutable/chunks/index.i2bAfgl8.js","_app/immutable/entry/app.VbSOIL9u.js","_app/immutable/chunks/scheduler.IlVl7hCi.js","_app/immutable/chunks/index.U90YCfkg.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
