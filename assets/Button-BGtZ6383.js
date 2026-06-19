import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{i as t,t as n}from"./react-I6BVr-8O.js";import{r}from"./store-5naQc6cl.js";import{F as i,G as a,I as o,M as s,N as c,Q as l,R as u,U as d,V as f,X as p,Z as m,p as h,st as g}from"./emotion-css.esm-zLgD89SO.js";import{a as _,s as v}from"./reactSelect-ZR1oF7P7.js";var y=e=>t=>{t({type:`SET_START_TIME`,start:e})},b=e=>t=>{t({type:`SET_STOP_TIME`,stop:e})},x=e=>t=>{t({type:`SET_QUERY_STEP`,step:e})},S=e=>t=>{t({type:`SET_TIME_RANGE_LABEL`,label:e})},ee=e=>t=>{t({type:`SET_QUERY_TIME`,time:e})},C=e=>t=>{t({type:`SET_IS_SUBMIT`,isSubmit:e})},w=e=>t=>{t({type:`SET_QUERY_HISTORY`,queryHistory:e})},T=e=>t=>{t({type:`SET_HISTORY_OPEN`,historyOpen:e})},te=e=>{let{request:t,response:n}=e,r=e?.response?.request?.responseURL,i=()=>{switch(r){case r?.includes(`/loki/api/v1/label`):return`label`;case r?.includes(`/loki/api/v1/query_range`):return`query`;default:return`label`}};if(n?.statusText){let e=n?.status;return{message:`API `+n.statusText+`, Please adjust API URL`,status:e,type:i()}}else if(r&&!r.includes(window.location.protocol))return{message:`Mixed Content Error, your View should be over same protocol as your API`,status:500,type:i()};else if(t)return e.stack.includes(`Network Error`)?{message:`Invalid API URL, please adjust API URL`,status:500,type:i()}:{message:`server time out`,status:n?.status,type:i()};else if(e?.stack?.includes(`Invalid URL`))return{message:`Invalid API URL, please adjust API URL`,stauts:n?.status,type:i()};else if(e?.response?.status===404)return{message:`Invalid API URL, please adjust API URL`,status:n?.status,type:i()};else return{message:`something went wrong with request`,status:n?.status,type:i()}},ne=e=>t=>{let n=r.getState().notifications;n.push({message:e.message,type:e.type,visible:!0}),t({type:`ADD_NOTIFICATION`,payload:[...n]})},E=e=>t=>{let n=r.getState().notifications;n[e].visible=!1,t({type:`REMOVE_NOTIFICATION`,payload:[...n]})};function D(e){return function(t){t({type:`SET_FROM_TIME`,toTime:e})}}function O(e){return function(e){e({type:`SET_TO_TIME`})}}var k=e=>t=>{t({type:`SET_THEME`,theme:e})},A=e=>t=>{t({type:`SET_AUTO_THEME`,autoTheme:e})},j=e=>t=>{t({type:`SET_IS_EMPTY_VIEW`,isEmptyView:e})};function M(e){return function(t){t({type:`SET_RESPONSE_TYPE`,responseType:e})}}var N=e=>t=>{t({type:`SET_RIGHT_PANEL`,right:e})},P=e=>t=>{t({type:`SET_LEFT_PANEL`,left:e})},F=e=>t=>{t({type:`SET_RIGHT_DATAVIEW`,rightDataView:e})},I=e=>t=>{t({type:`SET_LEFT_DATAVIEW`,leftDataView:e})},L=e=>t=>{t({type:`SET_SPLIT_VIEW`,isSplit:e})},R=e(t()),z=0;function B(e){let[t,n]=R.useState(e),r=e||t;return R.useEffect(()=>{t??(z+=1,n(`mui-${z}`))},[t]),r}var V={...R}.useId;function H(e){if(V!==void 0){let t=V();return e??t}return B(e)}var U=H;function W(e){return m(`MuiPaper`,e)}p(`MuiPaper`,`root.rounded.outlined.elevation.elevation0.elevation1.elevation2.elevation3.elevation4.elevation5.elevation6.elevation7.elevation8.elevation9.elevation10.elevation11.elevation12.elevation13.elevation14.elevation15.elevation16.elevation17.elevation18.elevation19.elevation20.elevation21.elevation22.elevation23.elevation24`.split(`.`));var G=e(n()),K=e=>{let{square:t,elevation:n,variant:r,classes:i}=e;return d({root:[`root`,r,!t&&`rounded`,r===`elevation`&&`elevation${n}`]},W,i)},q=o(`div`,{name:`MuiPaper`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant===`elevation`&&t[`elevation${n.elevation}`]]}})(c(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create(`box-shadow`),variants:[{props:({ownerState:e})=>!e.square,style:{borderRadius:e.shape.borderRadius}},{props:{variant:`outlined`},style:{border:`1px solid ${(e.vars||e).palette.divider}`}},{props:{variant:`elevation`},style:{boxShadow:`var(--Paper-shadow)`,backgroundImage:`var(--Paper-overlay)`}}]}))),J=R.forwardRef(function(e,t){let n=s({props:e,name:`MuiPaper`}),r=u(),{className:i,component:o=`div`,elevation:c=1,square:d=!1,variant:p=`elevation`,...m}=n,h={...n,component:o,elevation:c,square:d,variant:p};return(0,G.jsx)(q,{as:o,ownerState:h,className:l(K(h).root,i),ref:t,...m,style:{...p===`elevation`&&{"--Paper-shadow":(r.vars||r).shadows[c],...r.vars&&{"--Paper-overlay":r.vars.overlays?.[c]},...!r.vars&&r.palette.mode===`dark`&&{"--Paper-overlay":`linear-gradient(${a(`#fff`,f(c))}, ${a(`#fff`,f(c))})`}},...m.style}})});function Y(e){return m(`MuiCircularProgress`,e)}p(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`]);var X=44,Z=v`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,Q=v`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,re=typeof Z==`string`?null:_`
        animation: ${Z} 1.4s linear infinite;
      `,ie=typeof Q==`string`?null:_`
        animation: ${Q} 1.4s ease-in-out infinite;
      `,ae=e=>{let{classes:t,variant:n,color:r,disableShrink:a}=e;return d({root:[`root`,n,`color${i(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,`circle${i(n)}`,a&&`circleDisableShrink`]},Y,t)},oe=o(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${i(n.color)}`]]}})(c(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:re||{animation:`${Z} 1.4s linear infinite`}},...Object.entries(e.palette).filter(h()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),$=o(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),se=o(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,t[`circle${i(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(c(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:ie||{animation:`${Q} 1.4s ease-in-out infinite`}}]}))),ce=o(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(c(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),le=R.forwardRef(function(e,t){let n=s({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,size:c=40,style:u,thickness:d=3.6,value:f=0,variant:p=`indeterminate`,...m}=n,h={...n,color:i,disableShrink:a,size:c,thickness:d,value:f,variant:p,enableTrackSlot:o},g=ae(h),_={},v={},y={};if(p===`determinate`){let e=2*Math.PI*((X-d)/2);_.strokeDasharray=e.toFixed(3),y[`aria-valuenow`]=Math.round(f),_.strokeDashoffset=`${((100-f)/100*e).toFixed(3)}px`,v.transform=`rotate(-90deg)`}return(0,G.jsx)(oe,{className:l(g.root,r),style:{width:c,height:c,...v,...u},ownerState:h,ref:t,role:`progressbar`,...y,...m,children:(0,G.jsxs)($,{className:g.svg,ownerState:h,viewBox:`${X/2} ${X/2} ${X} ${X}`,children:[o?(0,G.jsx)(ce,{className:g.track,ownerState:h,cx:X,cy:X,r:(X-d)/2,fill:`none`,strokeWidth:d,"aria-hidden":`true`}):null,(0,G.jsx)(se,{className:g.circle,style:_,ownerState:h,cx:X,cy:X,r:(X-d)/2,fill:`none`,strokeWidth:d})]})})}),ue=g.button`
    padding: 0px 8px;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    user-select: none;
    border: none;
    border-radius: 3px;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    align-items: center;
`;g.button`
    position: relative;
    display: inline-block;
    padding: 5px 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    border: 1px solid;
    border-radius: 6px;
`;export{ee as C,y as D,b as E,C as S,x as T,E as _,H as a,T as b,F as c,M as d,j as f,D as g,O as h,U as i,P as l,k as m,le as n,L as o,A as p,J as r,I as s,ue as t,N as u,ne as v,S as w,w as x,te as y};