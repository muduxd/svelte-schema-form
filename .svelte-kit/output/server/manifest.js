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
		client: {"start":"_app/immutable/entry/start.sKj-xrzQ.js","app":"_app/immutable/entry/app.a9nydL48.js","imports":["_app/immutable/entry/start.sKj-xrzQ.js","_app/immutable/chunks/scheduler.YqzeI4eF.js","_app/immutable/chunks/singletons.5OnM-tS-.js","_app/immutable/chunks/index.sR6m8Xv2.js","_app/immutable/entry/app.a9nydL48.js","_app/immutable/chunks/scheduler.YqzeI4eF.js","_app/immutable/chunks/index.UOys41uS.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
