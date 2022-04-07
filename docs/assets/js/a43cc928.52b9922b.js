/*! For license information please see a43cc928.52b9922b.js.LICENSE.txt */
(self.webpackChunksoccisaurus=self.webpackChunksoccisaurus||[]).push([[56],{115:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return ce}});var r=a(7294),s=a(2600),n=a(2263),o=a(4184),l=a.n(o),i=a(5697),c=a.n(i),d=a(5893);const f={type:c().string,tooltip:c().bool,as:c().elementType},u=r.forwardRef((({as:e="div",className:t,type:a="valid",tooltip:r=!1,...s},n)=>(0,d.jsx)(e,{...s,ref:n,className:l()(t,`${a}-${r?"tooltip":"feedback"}`)})));u.displayName="Feedback",u.propTypes=f;var p=u;var m=r.createContext({});const v=["xxl","xl","lg","md","sm","xs"],b=r.createContext({prefixes:{},breakpoints:v}),{Consumer:x,Provider:h}=b;function y(e,t){const{prefixes:a}=(0,r.useContext)(b);return e||a[t]||t}function N(){const{breakpoints:e}=(0,r.useContext)(b);return e}const g=r.forwardRef((({id:e,bsPrefix:t,className:a,type:s="checkbox",isValid:n=!1,isInvalid:o=!1,as:i="input",...c},f)=>{const{controlId:u}=(0,r.useContext)(m);return t=y(t,"form-check-input"),(0,d.jsx)(i,{...c,ref:f,type:s,id:e||u,className:l()(a,t,n&&"is-valid",o&&"is-invalid")})}));g.displayName="FormCheckInput";var j=g;const C=r.forwardRef((({bsPrefix:e,className:t,htmlFor:a,...s},n)=>{const{controlId:o}=(0,r.useContext)(m);return e=y(e,"form-check-label"),(0,d.jsx)("label",{...s,ref:n,htmlFor:a||o,className:l()(t,e)})}));C.displayName="FormCheckLabel";var w=C;const k=r.forwardRef((({id:e,bsPrefix:t,bsSwitchPrefix:a,inline:s=!1,disabled:n=!1,isValid:o=!1,isInvalid:i=!1,feedbackTooltip:c=!1,feedback:f,feedbackType:u,className:v,style:b,title:x="",type:h="checkbox",label:N,children:g,as:C="input",...k},$)=>{t=y(t,"form-check"),a=y(a,"form-switch");const{controlId:P}=(0,r.useContext)(m),R=(0,r.useMemo)((()=>({controlId:e||P})),[P,e]),F=!g&&null!=N&&!1!==N||function(e,t){return r.Children.toArray(e).some((e=>r.isValidElement(e)&&e.type===t))}(g,w),I=(0,d.jsx)(j,{...k,type:"switch"===h?"checkbox":h,ref:$,isValid:o,isInvalid:i,disabled:n,as:C});return(0,d.jsx)(m.Provider,{value:R,children:(0,d.jsx)("div",{style:b,className:l()(v,F&&t,s&&`${t}-inline`,"switch"===h&&a),children:g||(0,d.jsxs)(d.Fragment,{children:[I,F&&(0,d.jsx)(w,{title:x,children:N}),f&&(0,d.jsx)(p,{type:u,tooltip:c,children:f})]})})})}));k.displayName="FormCheck";var $=Object.assign(k,{Input:j,Label:w});a(2473);const P=r.forwardRef((({bsPrefix:e,type:t,size:a,htmlSize:s,id:n,className:o,isValid:i=!1,isInvalid:c=!1,plaintext:f,readOnly:u,as:p="input",...v},b)=>{const{controlId:x}=(0,r.useContext)(m);let h;return e=y(e,"form-control"),h=f?{[`${e}-plaintext`]:!0}:{[e]:!0,[`${e}-${a}`]:a},(0,d.jsx)(p,{...v,type:t,size:s,ref:b,readOnly:u,id:n||x,className:l()(o,h,i&&"is-valid",c&&"is-invalid","color"===t&&`${e}-color`)})}));P.displayName="FormControl";var R=Object.assign(P,{Feedback:p}),F=/-(.)/g;const I=e=>{return e[0].toUpperCase()+(t=e,t.replace(F,(function(e,t){return t.toUpperCase()}))).slice(1);var t};var S=function(e,{displayName:t=I(e),Component:a,defaultProps:s}={}){const n=r.forwardRef((({className:t,bsPrefix:r,as:s=a||"div",...n},o)=>{const i=y(r,e);return(0,d.jsx)(s,{ref:o,className:l()(t,i),...n})}));return n.defaultProps=s,n.displayName=t,n}("form-floating");const O=r.forwardRef((({controlId:e,as:t="div",...a},s)=>{const n=(0,r.useMemo)((()=>({controlId:e})),[e]);return(0,d.jsx)(m.Provider,{value:n,children:(0,d.jsx)(t,{...a,ref:s})})}));O.displayName="FormGroup";var _=O;const E=r.forwardRef(((e,t)=>{const[{className:a,...r},{as:s="div",bsPrefix:n,spans:o}]=function({as:e,bsPrefix:t,className:a,...r}){t=y(t,"col");const s=N(),n=[],o=[];return s.forEach((e=>{const a=r[e];let s,l,i;delete r[e],"object"==typeof a&&null!=a?({span:s,offset:l,order:i}=a):s=a;const c="xs"!==e?`-${e}`:"";s&&n.push(!0===s?`${t}${c}`:`${t}${c}-${s}`),null!=i&&o.push(`order${c}-${i}`),null!=l&&o.push(`offset${c}-${l}`)})),[{...r,className:l()(a,...n,...o)},{as:e,bsPrefix:t,spans:n}]}(e);return(0,d.jsx)(s,{...r,ref:t,className:l()(a,!o.length&&n)})}));E.displayName="Col";var L=E;const T=r.forwardRef((({as:e="label",bsPrefix:t,column:a,visuallyHidden:s,className:n,htmlFor:o,...i},c)=>{const{controlId:f}=(0,r.useContext)(m);t=y(t,"form-label");let u="col-form-label";"string"==typeof a&&(u=`${u} ${u}-${a}`);const p=l()(n,t,s&&"visually-hidden",a&&u);return o=o||f,a?(0,d.jsx)(L,{ref:c,as:"label",className:p,htmlFor:o,...i}):(0,d.jsx)(e,{ref:c,className:p,htmlFor:o,...i})}));T.displayName="FormLabel",T.defaultProps={column:!1,visuallyHidden:!1};var z=T;const Z=r.forwardRef((({bsPrefix:e,className:t,id:a,...s},n)=>{const{controlId:o}=(0,r.useContext)(m);return e=y(e,"form-range"),(0,d.jsx)("input",{...s,type:"range",ref:n,className:l()(t,e),id:a||o})}));Z.displayName="FormRange";var D=Z;const A=r.forwardRef((({bsPrefix:e,size:t,htmlSize:a,className:s,isValid:n=!1,isInvalid:o=!1,id:i,...c},f)=>{const{controlId:u}=(0,r.useContext)(m);return e=y(e,"form-select"),(0,d.jsx)("select",{...c,size:a,ref:f,className:l()(s,e,t&&`${e}-${t}`,n&&"is-valid",o&&"is-invalid"),id:i||u})}));A.displayName="FormSelect";var B=A;const H=r.forwardRef((({bsPrefix:e,className:t,as:a="small",muted:r,...s},n)=>(e=y(e,"form-text"),(0,d.jsx)(a,{...s,ref:n,className:l()(t,e,r&&"text-muted")}))));H.displayName="FormText";var V=H;const G=r.forwardRef(((e,t)=>(0,d.jsx)($,{...e,ref:t,type:"switch"})));G.displayName="Switch";var M=Object.assign(G,{Input:$.Input,Label:$.Label});const U=r.forwardRef((({bsPrefix:e,className:t,children:a,controlId:r,label:s,...n},o)=>(e=y(e,"form-floating"),(0,d.jsxs)(_,{ref:o,className:l()(t,e),controlId:r,...n,children:[a,(0,d.jsx)("label",{htmlFor:r,children:s})]}))));U.displayName="FloatingLabel";var q=U;const X={_ref:c().any,validated:c().bool,as:c().elementType},J=r.forwardRef((({className:e,validated:t,as:a="form",...r},s)=>(0,d.jsx)(a,{...r,ref:s,className:l()(e,t&&"was-validated")})));J.displayName="Form",J.propTypes=X;var K=Object.assign(J,{Group:_,Control:R,Floating:S,Check:$,Switch:M,Label:z,Text:V,Range:D,Select:B,FloatingLabel:q});const Q=["as","disabled"];function W({tagName:e,disabled:t,href:a,target:r,rel:s,onClick:n,tabIndex:o=0,type:l}){e||(e=null!=a||null!=r||null!=s?"a":"button");const i={tagName:e};if("button"===e)return[{type:l||"button",disabled:t},i];const c=r=>{(t||"a"===e&&function(e){return!e||"#"===e.trim()}(a))&&r.preventDefault(),t?r.stopPropagation():null==n||n(r)};return"a"===e&&(a||(a="#"),t&&(a=void 0)),[{role:"button",disabled:void 0,tabIndex:t?void 0:o,href:a,target:"a"===e?r:void 0,"aria-disabled":t||void 0,rel:"a"===e?s:void 0,onClick:c,onKeyDown:e=>{" "===e.key&&(e.preventDefault(),c(e))}},i]}const Y=r.forwardRef(((e,t)=>{let{as:a,disabled:r}=e,s=function(e,t){if(null==e)return{};var a,r,s={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,Q);const[n,{tagName:o}]=W(Object.assign({tagName:a,disabled:r},s));return(0,d.jsx)(o,Object.assign({},s,n,{ref:t}))}));Y.displayName="Button";const ee=r.forwardRef((({as:e,bsPrefix:t,variant:a,size:r,active:s,className:n,...o},i)=>{const c=y(t,"btn"),[f,{tagName:u}]=W({tagName:e,...o}),p=u;return(0,d.jsx)(p,{...f,...o,ref:i,className:l()(n,c,s&&"active",a&&`${c}-${a}`,r&&`${c}-${r}`,o.href&&o.disabled&&"disabled")})}));ee.displayName="Button",ee.defaultProps={variant:"primary",active:!1,disabled:!1};var te=ee,ae=a(6123),re=a(6010),se=a(1207);function ne(e,t=v){const a=[];return Object.entries(e).forEach((([e,r])=>{null!=r&&("object"==typeof r?t.forEach((t=>{const s=r[t];if(null!=s){const r="xs"!==t?`-${t}`:"";a.push(`${e}${r}-${s}`)}})):a.push(`${e}-${r}`))})),a}const oe=r.forwardRef((({as:e="div",bsPrefix:t,className:a,direction:r,gap:s,...n},o)=>{t=y(t,"horizontal"===r?"hstack":"vstack");const i=N();return(0,d.jsx)(e,{...n,ref:o,className:l()(a,t,...ne({gap:s,breakpoints:i}))})}));oe.displayName="Stack";var le=oe,ie={nodes:{shape:"dot"},edges:{color:"#000000"},interaction:{hideEdgesOnDrag:!0},physics:!1,height:"512px"};function ce(e){Object.assign({},e);var t=(0,n.Z)().siteConfig,a=(0,r.useState)(),o=a[0],l=a[1],i=(0,r.useState)(["None","None"]),c=i[0],d=i[1],f=(0,r.useState)({nodes:[],edges:[]}),u=f[0],p=f[1],m={select:function(e){var t=e.nodes,a=u.nodes.find((function(e){return e.id===t[0]}));d([a.label,a.attributes.Cluster])}};function v(e){var t,a,r,s;t=e,a=p,r=function(e){console.log("error")},(s=new XMLHttpRequest).onreadystatechange=function(){4===s.readyState&&(200===s.status?a(JSON.parse(s.responseText)):r(s))},s.open("GET",t,!0),s.send(),p({nodes:[],edges:[]})}return r.createElement(s.Z,{title:"Hello from "+t.title,description:"Description will go into a meta tag in <head />"},r.createElement(ae.Z,{className:(0,re.Z)(se.Z.graphCanvas),graph:u,options:ie,events:m}),r.createElement("div",{className:(0,re.Z)(se.Z.textcenter)},r.createElement(le,{direction:"horizontal",gap:3},r.createElement(K.Select,{onChange:function(e){e.preventDefault(),l(e.target.value)},className:"me-auto"},r.createElement("option",null,"Selecciona una red"),r.createElement("option",{value:"data/networks/SalarioRosa2.json"},"Paper - #SalarioRosa2"),r.createElement("option",{value:"data/networks/Coco.json"},"Paper - Coco")),r.createElement(te,{variant:"primary",onClick:function(){return v(o)}},"Cargar"))),r.createElement("h3",{className:(0,re.Z)(se.Z.textcenter)},"Label = ",c[0]," Cluster = ",c[1]))}},4184:function(e,t){var a;!function(){"use strict";var r={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var n=typeof a;if("string"===n||"number"===n)e.push(a);else if(Array.isArray(a)){if(a.length){var o=s.apply(null,a);o&&e.push(o)}}else if("object"===n)if(a.toString===Object.prototype.toString)for(var l in a)r.call(a,l)&&a[l]&&e.push(l);else e.push(a.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0===(a=function(){return s}.apply(t,[]))||(e.exports=a)}()},1207:function(e,t){"use strict";t.Z={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN",heroCanvas:"heroCanvas_GjX2",heroContainer:"heroContainer_i2aB",graphCanvas:"graphCanvas_HH1Q",radarCanvas:"radarCanvas_oRzM",textcenter:"textcenter_EAFs"}},5251:function(e,t,a){"use strict";a(7418);var r=a(7294),s=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var n=Symbol.for;s=n("react.element"),t.Fragment=n("react.fragment")}var o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l=Object.prototype.hasOwnProperty,i={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,a){var r,n={},c=null,d=null;for(r in void 0!==a&&(c=""+a),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)l.call(t,r)&&!i.hasOwnProperty(r)&&(n[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===n[r]&&(n[r]=t[r]);return{$$typeof:s,type:e,key:c,ref:d,props:n,_owner:o.current}}t.jsx=c,t.jsxs=c},5893:function(e,t,a){"use strict";e.exports=a(5251)},2473:function(e){"use strict";var t=function(){};e.exports=t}}]);