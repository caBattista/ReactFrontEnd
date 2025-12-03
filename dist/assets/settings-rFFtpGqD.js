import{b as c,j as e,B as m,r as o}from"./index--N4c26ck.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],d=c("moon",r);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],u=c("sun",i);function k(){const[t,s]=o.useState(()=>typeof document<"u"?document.documentElement.classList.contains("dark"):!1),l=o.useCallback(()=>{const n=document.documentElement,a=!n.classList.contains("dark");n.classList.toggle("dark",a),localStorage.setItem("theme",a?"dark":"light"),s(a)},[]);return{isDark:t,toggle:l}}function p(){const{isDark:t,toggle:s}=k();return e.jsx("div",{className:"h-full w-full",children:e.jsxs(m,{variant:"outline",size:"sm",onClick:s,className:"w-full justify-start",children:[t?e.jsx(u,{className:"mr-2"}):e.jsx(d,{className:"mr-2"}),t?"Light mode":"Dark mode"]})})}export{p as default};
