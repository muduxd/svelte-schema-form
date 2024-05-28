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
		client: {"start":"_app/immutable/entry/start.TY3EyMGe.js","app":"_app/immutable/entry/app.h5-g7dDy.js","imports":["_app/immutable/entry/start.TY3EyMGe.js","_app/immutable/chunks/scheduler.7woAWCaP.js","_app/immutable/chunks/singletons.3i8_Eywt.js","_app/immutable/chunks/index.TeyEfz2H.js","_app/immutable/entry/app.h5-g7dDy.js","_app/immutable/chunks/scheduler.7woAWCaP.js","_app/immutable/chunks/index.1W1sS5SM.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
