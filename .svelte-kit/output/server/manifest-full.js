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
		client: {"start":"_app/immutable/entry/start.EyX5M9Ip.js","app":"_app/immutable/entry/app.EH6sgJFW.js","imports":["_app/immutable/entry/start.EyX5M9Ip.js","_app/immutable/chunks/scheduler.W04W5Byt.js","_app/immutable/chunks/singletons.Dv3v-45P.js","_app/immutable/chunks/index.Pv1yzP9s.js","_app/immutable/entry/app.EH6sgJFW.js","_app/immutable/chunks/scheduler.W04W5Byt.js","_app/immutable/chunks/index.EPNPJ6ZS.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
