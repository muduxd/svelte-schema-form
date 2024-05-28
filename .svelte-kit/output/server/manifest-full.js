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
		client: {"start":"_app/immutable/entry/start.QtiyLdtm.js","app":"_app/immutable/entry/app.PHSeokdu.js","imports":["_app/immutable/entry/start.QtiyLdtm.js","_app/immutable/chunks/scheduler.1nKTxpW7.js","_app/immutable/chunks/singletons.uwOFdcau.js","_app/immutable/chunks/index.tCH4QRSl.js","_app/immutable/entry/app.PHSeokdu.js","_app/immutable/chunks/scheduler.1nKTxpW7.js","_app/immutable/chunks/index.O5_VnBjY.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
