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
		client: {"start":"_app/immutable/entry/start.adJVOs0S.js","app":"_app/immutable/entry/app.re35vEIB.js","imports":["_app/immutable/entry/start.adJVOs0S.js","_app/immutable/chunks/scheduler.wkhlQAFY.js","_app/immutable/chunks/singletons.GoDF78uy.js","_app/immutable/chunks/index.CTwmgoz2.js","_app/immutable/entry/app.re35vEIB.js","_app/immutable/chunks/scheduler.wkhlQAFY.js","_app/immutable/chunks/index.i6COa9Rq.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
