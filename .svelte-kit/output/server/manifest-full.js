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
		client: {"start":"_app/immutable/entry/start.zDVvvxdB.js","app":"_app/immutable/entry/app.Jej5rx9y.js","imports":["_app/immutable/entry/start.zDVvvxdB.js","_app/immutable/chunks/scheduler.3cr_YFhF.js","_app/immutable/chunks/singletons.Mx47Iij5.js","_app/immutable/chunks/index.JuWEqTzc.js","_app/immutable/entry/app.Jej5rx9y.js","_app/immutable/chunks/scheduler.3cr_YFhF.js","_app/immutable/chunks/index.p5IxVpus.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
