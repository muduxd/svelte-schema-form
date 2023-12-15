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
		client: {"start":"_app/immutable/entry/start.xHI9V8lW.js","app":"_app/immutable/entry/app.URs6BsQr.js","imports":["_app/immutable/entry/start.xHI9V8lW.js","_app/immutable/chunks/scheduler.F8-nhWWX.js","_app/immutable/chunks/singletons.pB8hZBrA.js","_app/immutable/chunks/index.Xjuo8uma.js","_app/immutable/entry/app.URs6BsQr.js","_app/immutable/chunks/scheduler.F8-nhWWX.js","_app/immutable/chunks/index.i4kBP6ud.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
