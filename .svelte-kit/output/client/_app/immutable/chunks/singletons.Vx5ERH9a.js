import{w as u}from"./index.i2bAfgl8.js";const b=globalThis.__sveltekit_wx8ssf?.base??"",v=globalThis.__sveltekit_wx8ssf?.assets??b,k="1724409574177",A="sveltekit:snapshot",R="sveltekit:scroll",T="sveltekit:states",I="sveltekit:pageurl",S="sveltekit:history",y="sveltekit:navigation",f={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},_=location.origin;function N(e){if(e instanceof URL)return e;let t=document.baseURI;if(!t){const s=document.getElementsByTagName("base");t=s.length?s[0].href:document.URL}return new URL(e,t)}function U(){return{x:pageXOffset,y:pageYOffset}}function c(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function g(e){let t=e.assignedSlot??e.parentNode;return t?.nodeType===11&&(t=t.host),t}function L(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=g(e)}}function O(e,t){let s;try{s=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const a=e instanceof SVGAElement?e.target.baseVal:e.target,r=!s||!!a||m(s,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),l=s?.origin===_&&e.hasAttribute("download");return{url:s,external:r,target:a,download:l}}function x(e){let t=null,s=null,a=null,r=null,l=null,o=null,n=e;for(;n&&n!==document.documentElement;)a===null&&(a=c(n,"preload-code")),r===null&&(r=c(n,"preload-data")),t===null&&(t=c(n,"keepfocus")),s===null&&(s=c(n,"noscroll")),l===null&&(l=c(n,"reload")),o===null&&(o=c(n,"replacestate")),n=g(n);function i(h){switch(h){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:d[a??"off"],preload_data:d[r??"off"],keepfocus:i(t),noscroll:i(s),reload:i(l),replace_state:i(o)}}function p(e){const t=u(e);let s=!0;function a(){s=!0,t.update(o=>o)}function r(o){s=!1,t.set(o)}function l(o){let n;return t.subscribe(i=>{(n===void 0||s&&i!==n)&&o(n=i)})}return{notify:a,set:r,subscribe:l}}function E(){const{set:e,subscribe:t}=u(!1);let s;async function a(){clearTimeout(s);try{const r=await fetch(`${v}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const o=(await r.json()).version!==k;return o&&(e(!0),clearTimeout(s)),o}catch{return!1}}return{subscribe:t,check:a}}function m(e,t){return e.origin!==_||!e.pathname.startsWith(t)}function Y(e){e.client}const P={url:p({}),page:p({}),navigating:u(null),updated:E()};export{S as H,y as N,I as P,R as S,T as a,A as b,x as c,P as d,b as e,L as f,O as g,f as h,m as i,Y as j,_ as o,N as r,U as s};
