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
		client: {"start":"_app/immutable/entry/start.LH8DTX7S.js","app":"_app/immutable/entry/app.3QF4Rb5E.js","imports":["_app/immutable/entry/start.LH8DTX7S.js","_app/immutable/chunks/scheduler.vYR2bk-x.js","_app/immutable/chunks/singletons.SdDTAVwV.js","_app/immutable/chunks/index.6jBjZWy7.js","_app/immutable/entry/app.3QF4Rb5E.js","_app/immutable/chunks/scheduler.vYR2bk-x.js","_app/immutable/chunks/index.CEdY4TUy.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
