import{s as $,f as b,l as _,a as S,g as d,h as f,m as g,d as p,c as x,i as l,u as h,n as v,D as E,E as q}from"../chunks/scheduler.IlVl7hCi.js";import{S as y,i as C}from"../chunks/index.U90YCfkg.js";import{d as D}from"../chunks/singletons.2d2Ffvnr.js";const H=()=>{const s=D;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return H().page.subscribe(s)}};function j(s){let t,r=s[0].status+"",o,n,i,c=s[0].error?.message+"",u;return{c(){t=b("h1"),o=_(r),n=S(),i=b("p"),u=_(c)},l(e){t=d(e,"H1",{});var a=f(t);o=g(a,r),a.forEach(p),n=x(e),i=d(e,"P",{});var m=f(i);u=g(m,c),m.forEach(p)},m(e,a){l(e,t,a),h(t,o),l(e,n,a),l(e,i,a),h(i,u)},p(e,[a]){a&1&&r!==(r=e[0].status+"")&&v(o,r),a&1&&c!==(c=e[0].error?.message+"")&&v(u,c)},i:E,o:E,d(e){e&&(p(t),p(n),p(i))}}}function k(s,t,r){let o;return q(s,P,n=>r(0,o=n)),[o]}let B=class extends y{constructor(t){super(),C(this,t,k,j,$,{})}};export{B as component};
