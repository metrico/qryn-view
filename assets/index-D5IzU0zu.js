const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./App-vw_pu-ON.js","./rolldown-runtime-CMxvf4Kt.js","./emotion-css.esm-I8gSeA_p.js","./reactSelect-ZR1oF7P7.js","./reactDnd-kodhPzd1.js","./react-I6BVr-8O.js","./memoize-y7vwAshm.js","./vendor-BAhDbYMS.js","./consts-D6VuSAsB.js","./DeleteOutlineOutlined-C9QS91UZ.js","./dayJs-drdlMfEL.js","./store-WFkD18pz.js","./PluginManagerFactory-BRwypsOB.js","./consts-Chw94eNX.css","./useWebVitals-BrfyHYSI.js","./DataSources-CYTVJoLh.js","./AddOutlined-CFaYo4w8.js","./Main-D2FNF1U0.js","./slate-BHy1vabw.js","./lodash-Bds1IU4A.js","./reactTable-CQqp7oSP.js","./prismJs-CxCWXcLd.js","./actions-GzpIxyMi.js","./Main-DpAvUwZp.css","./Plugins-ERuF9KRp.js","./UserRoles-CFyUvXAM.js"])))=>i.map(i=>d[i]);
import{o as e,r as t}from"./rolldown-runtime-CMxvf4Kt.js";import{i as n,n as r,t as i}from"./react-I6BVr-8O.js";import{B as a,H as o,It as s,R as c,U as l,X as u,Y as d,Z as f,q as p}from"./vendor-BAhDbYMS.js";import{r as m,t as h}from"./store-WFkD18pz.js";import{F as g,G as _,I as v,M as ee,N as y,Q as te,R as b,U as x,V as ne,X as S,Z as C,c as w,g as T,i as re,j as E,l as D,m as ie,n as O,p as k,st as A,t as j,u as ae,ut as oe}from"./emotion-css.esm-I8gSeA_p.js";import{a as se,s as ce}from"./reactSelect-ZR1oF7P7.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var M=e(n()),le=e(r(),1),ue=e=>t=>{t({type:`SET_START_TIME`,start:e})},de=e=>t=>{t({type:`SET_STOP_TIME`,stop:e})},fe=e=>t=>{t({type:`SET_QUERY_STEP`,step:e})},pe=e=>t=>{t({type:`SET_TIME_RANGE_LABEL`,label:e})},me=e=>t=>{t({type:`SET_QUERY_TIME`,time:e})},he=e=>t=>{t({type:`SET_IS_SUBMIT`,isSubmit:e})},ge=e=>t=>{t({type:`SET_QUERY_HISTORY`,queryHistory:e})},_e=e=>t=>{t({type:`SET_HISTORY_OPEN`,historyOpen:e})},ve=e=>{let{request:t,response:n}=e,r=e?.response?.request?.responseURL,i=()=>{switch(r){case r?.includes(`/loki/api/v1/label`):return`label`;case r?.includes(`/loki/api/v1/query_range`):return`query`;default:return`label`}};if(n?.statusText){let e=n?.status;return{message:`API `+n.statusText+`, Please adjust API URL`,status:e,type:i()}}else if(r&&!r.includes(window.location.protocol))return{message:`Mixed Content Error, your View should be over same protocol as your API`,status:500,type:i()};else if(t)return e.stack.includes(`Network Error`)?{message:`Invalid API URL, please adjust API URL`,status:500,type:i()}:{message:`server time out`,status:n?.status,type:i()};else if(e?.stack?.includes(`Invalid URL`))return{message:`Invalid API URL, please adjust API URL`,stauts:n?.status,type:i()};else if(e?.response?.status===404)return{message:`Invalid API URL, please adjust API URL`,status:n?.status,type:i()};else return{message:`something went wrong with request`,status:n?.status,type:i()}},N=e=>t=>{let n=m.getState().notifications;n.push({message:e.message,type:e.type,visible:!0}),t({type:`ADD_NOTIFICATION`,payload:[...n]})},ye=e=>t=>{let n=m.getState().notifications;n[e].visible=!1,t({type:`REMOVE_NOTIFICATION`,payload:[...n]})};function be(e){return function(t){t({type:`SET_FROM_TIME`,toTime:e})}}function xe(e){return function(e){e({type:`SET_TO_TIME`})}}var Se=e=>t=>{t({type:`SET_THEME`,theme:e})},Ce=e=>t=>{t({type:`SET_AUTO_THEME`,autoTheme:e})},we=e=>t=>{t({type:`SET_IS_EMPTY_VIEW`,isEmptyView:e})};function Te(e){return function(t){t({type:`SET_RESPONSE_TYPE`,responseType:e})}}var Ee=e=>t=>{t({type:`SET_RIGHT_PANEL`,right:e})},De=e=>t=>{t({type:`SET_LEFT_PANEL`,left:e})},Oe=e=>t=>{t({type:`SET_RIGHT_DATAVIEW`,rightDataView:e})},ke=e=>t=>{t({type:`SET_LEFT_DATAVIEW`,leftDataView:e})},Ae=e=>t=>{t({type:`SET_SPLIT_VIEW`,isSplit:e})};function je(e){return function(t){t({type:`SET_API_WARNING`,apiWarning:e})}}var Me=e=>{e.interceptors.response.use(e=>e,e=>{if(m.dispatch(N({type:`error`,message:e.message})),e.response){let t=ve(e);e?.response?.status===401||(t.status===500&&t.type===`labels`?m.getState().notifications.length<1&&m.getState().debugMode===!0&&m.dispatch(N({type:`error`,message:t.message+` for `+t.type||t.status+t.type+`Error`})):t.status===404&&t.type===`labels`?m.getState().notifications.length<1&&m.dispatch(N({type:`error`,message:t.message||t.status+t.type+`Error`})):m.getState().notifications.length<1&&m.dispatch(N({type:`error`,message:t.message+` for `+t.type||t.status+t.type+`Error`})))}else{let t=JSON.parse(JSON.stringify(e)),n={url:t.config.url,message:t.message,name:t.name};m.dispatch(je({type:`labels`,message:`Labels not available`}));let{url:r}=n,i=m.getState().apiWarning;i&&r.includes(`query`)&&m.getState().notifications.length<1?(i.num++,m.dispatch(N({type:`error`,message:`API not found, please adjust API URL`}))):r.includes(`labels`)&&m.getState().notifications.length<1&&m.dispatch(N({type:`error`,message:`API not found, please adjust API URL`}))}})},Ne=0;function Pe(e){let[t,n]=M.useState(e),r=e||t;return M.useEffect(()=>{t??(Ne+=1,n(`mui-${Ne}`))},[t]),r}var Fe={...M}.useId;function Ie(e){if(Fe!==void 0){let t=Fe();return e??t}return Pe(e)}var Le=Ie;function Re(e){return C(`MuiPaper`,e)}S(`MuiPaper`,`root.rounded.outlined.elevation.elevation0.elevation1.elevation2.elevation3.elevation4.elevation5.elevation6.elevation7.elevation8.elevation9.elevation10.elevation11.elevation12.elevation13.elevation14.elevation15.elevation16.elevation17.elevation18.elevation19.elevation20.elevation21.elevation22.elevation23.elevation24`.split(`.`));var P=e(i()),ze=e=>{let{square:t,elevation:n,variant:r,classes:i}=e;return x({root:[`root`,r,!t&&`rounded`,r===`elevation`&&`elevation${n}`]},Re,i)},Be=v(`div`,{name:`MuiPaper`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant===`elevation`&&t[`elevation${n.elevation}`]]}})(y(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create(`box-shadow`),variants:[{props:({ownerState:e})=>!e.square,style:{borderRadius:e.shape.borderRadius}},{props:{variant:`outlined`},style:{border:`1px solid ${(e.vars||e).palette.divider}`}},{props:{variant:`elevation`},style:{boxShadow:`var(--Paper-shadow)`,backgroundImage:`var(--Paper-overlay)`}}]}))),Ve=M.forwardRef(function(e,t){let n=ee({props:e,name:`MuiPaper`}),r=b(),{className:i,component:a=`div`,elevation:o=1,square:s=!1,variant:c=`elevation`,...l}=n,u={...n,component:a,elevation:o,square:s,variant:c};return(0,P.jsx)(Be,{as:a,ownerState:u,className:te(ze(u).root,i),ref:t,...l,style:{...c===`elevation`&&{"--Paper-shadow":(r.vars||r).shadows[o],...r.vars&&{"--Paper-overlay":r.vars.overlays?.[o]},...!r.vars&&r.palette.mode===`dark`&&{"--Paper-overlay":`linear-gradient(${_(`#fff`,ne(o))}, ${_(`#fff`,ne(o))})`}},...l.style}})});function He(e){return C(`MuiAlert`,e)}var Ue=S(`MuiAlert`,[`root`,`action`,`icon`,`message`,`filled`,`colorSuccess`,`colorInfo`,`colorWarning`,`colorError`,`filledSuccess`,`filledInfo`,`filledWarning`,`filledError`,`outlined`,`outlinedSuccess`,`outlinedInfo`,`outlinedWarning`,`outlinedError`,`standard`,`standardSuccess`,`standardInfo`,`standardWarning`,`standardError`]);function We(e){return C(`MuiCircularProgress`,e)}S(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`]);var F=44,Ge=ce`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,Ke=ce`
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
`,qe=typeof Ge==`string`?null:se`
        animation: ${Ge} 1.4s linear infinite;
      `,Je=typeof Ke==`string`?null:se`
        animation: ${Ke} 1.4s ease-in-out infinite;
      `,Ye=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e;return x({root:[`root`,n,`color${g(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,`circle${g(n)}`,i&&`circleDisableShrink`]},We,t)},Xe=v(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${g(n.color)}`]]}})(y(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:qe||{animation:`${Ge} 1.4s linear infinite`}},...Object.entries(e.palette).filter(k()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),Ze=v(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),Qe=v(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,t[`circle${g(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(y(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:Je||{animation:`${Ke} 1.4s ease-in-out infinite`}}]}))),$e=v(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(y(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),et=M.forwardRef(function(e,t){let n=ee({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,size:s=40,style:c,thickness:l=3.6,value:u=0,variant:d=`indeterminate`,...f}=n,p={...n,color:i,disableShrink:a,size:s,thickness:l,value:u,variant:d,enableTrackSlot:o},m=Ye(p),h={},g={},_={};if(d===`determinate`){let e=2*Math.PI*((F-l)/2);h.strokeDasharray=e.toFixed(3),_[`aria-valuenow`]=Math.round(u),h.strokeDashoffset=`${((100-u)/100*e).toFixed(3)}px`,g.transform=`rotate(-90deg)`}return(0,P.jsx)(Xe,{className:te(m.root,r),style:{width:s,height:s,...g,...c},ownerState:p,ref:t,role:`progressbar`,..._,...f,children:(0,P.jsxs)(Ze,{className:m.svg,ownerState:p,viewBox:`${F/2} ${F/2} ${F} ${F}`,children:[o?(0,P.jsx)($e,{className:m.track,ownerState:p,cx:F,cy:F,r:(F-l)/2,fill:`none`,strokeWidth:l,"aria-hidden":`true`}):null,(0,P.jsx)(Qe,{className:m.circle,style:h,ownerState:p,cx:F,cy:F,r:(F-l)/2,fill:`none`,strokeWidth:l})]})})});function tt(e){return C(`MuiIconButton`,e)}var nt=S(`MuiIconButton`,[`root`,`disabled`,`colorInherit`,`colorPrimary`,`colorSecondary`,`colorError`,`colorInfo`,`colorSuccess`,`colorWarning`,`edgeStart`,`edgeEnd`,`sizeSmall`,`sizeMedium`,`sizeLarge`,`loading`,`loadingIndicator`,`loadingWrapper`]),rt=e=>{let{classes:t,disabled:n,color:r,edge:i,size:a,loading:o}=e;return x({root:[`root`,o&&`loading`,n&&`disabled`,r!=="default"&&`color${g(r)}`,i&&`edge${g(i)}`,`size${g(a)}`],loadingIndicator:[`loadingIndicator`],loadingWrapper:[`loadingWrapper`]},tt,t)},it=v(ie,{name:`MuiIconButton`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.loading&&t.loading,n.color!=="default"&&t[`color${g(n.color)}`],n.edge&&t[`edge${g(n.edge)}`],t[`size${g(n.size)}`]]}})(y(({theme:e})=>({textAlign:`center`,flex:`0 0 auto`,fontSize:e.typography.pxToRem(24),padding:8,borderRadius:`50%`,color:(e.vars||e).palette.action.active,transition:e.transitions.create(`background-color`,{duration:e.transitions.duration.shortest}),variants:[{props:e=>!e.disableRipple,style:{"--IconButton-hoverBg":e.alpha((e.vars||e).palette.action.active,(e.vars||e).palette.action.hoverOpacity),"&:hover":{backgroundColor:`var(--IconButton-hoverBg)`,"@media (hover: none)":{backgroundColor:`transparent`}}}},{props:{edge:`start`},style:{marginLeft:-12}},{props:{edge:`start`,size:`small`},style:{marginLeft:-3}},{props:{edge:`end`},style:{marginRight:-12}},{props:{edge:`end`,size:`small`},style:{marginRight:-3}}]})),y(({theme:e})=>({variants:[{props:{color:`inherit`},style:{color:`inherit`}},...Object.entries(e.palette).filter(k()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}})),...Object.entries(e.palette).filter(k()).map(([t])=>({props:{color:t},style:{"--IconButton-hoverBg":e.alpha((e.vars||e).palette[t].main,(e.vars||e).palette.action.hoverOpacity)}})),{props:{size:`small`},style:{padding:5,fontSize:e.typography.pxToRem(18)}},{props:{size:`large`},style:{padding:12,fontSize:e.typography.pxToRem(28)}}],[`&.${nt.disabled}`]:{backgroundColor:`transparent`,color:(e.vars||e).palette.action.disabled},[`&.${nt.loading}`]:{color:`transparent`}}))),at=v(`span`,{name:`MuiIconButton`,slot:`LoadingIndicator`})(({theme:e})=>({display:`none`,position:`absolute`,visibility:`visible`,top:`50%`,left:`50%`,transform:`translate(-50%, -50%)`,color:(e.vars||e).palette.action.disabled,variants:[{props:{loading:!0},style:{display:`flex`}}]})),ot=M.forwardRef(function(e,t){let n=ee({props:e,name:`MuiIconButton`}),{edge:r=!1,children:i,className:a,color:o=`default`,disabled:s=!1,disableFocusRipple:c=!1,size:l=`medium`,id:u,loading:d=null,loadingIndicator:f,...p}=n,m=Le(u),h=f??(0,P.jsx)(et,{"aria-labelledby":m,color:`inherit`,size:16}),g={...n,edge:r,color:o,disabled:s,disableFocusRipple:c,loading:d,loadingIndicator:h,size:l},_=rt(g);return(0,P.jsxs)(it,{id:d?m:u,className:te(_.root,a),centerRipple:!0,focusRipple:!c,disabled:s||d,ref:t,...p,ownerState:g,children:[typeof d==`boolean`&&(0,P.jsx)(`span`,{className:_.loadingWrapper,style:{display:`contents`},children:(0,P.jsx)(at,{className:_.loadingIndicator,ownerState:g,children:d&&h})}),i]})}),st=E((0,P.jsx)(`path`,{d:`M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z`}),`SuccessOutlined`),ct=E((0,P.jsx)(`path`,{d:`M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z`}),`ReportProblemOutlined`),lt=E((0,P.jsx)(`path`,{d:`M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z`}),`ErrorOutline`),ut=E((0,P.jsx)(`path`,{d:`M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z`}),`InfoOutlined`),dt=E((0,P.jsx)(`path`,{d:`M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z`}),`Close`),ft=e=>{let{variant:t,color:n,severity:r,classes:i}=e;return x({root:[`root`,`color${g(n||r)}`,`${t}${g(n||r)}`,`${t}`],icon:[`icon`],message:[`message`],action:[`action`]},He,i)},pt=v(Ve,{name:`MuiAlert`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`${n.variant}${g(n.color||n.severity)}`]]}})(y(({theme:e})=>{let t=e.palette.mode===`light`?e.darken:e.lighten,n=e.palette.mode===`light`?e.lighten:e.darken;return{...e.typography.body2,backgroundColor:`transparent`,display:`flex`,padding:`6px 16px`,variants:[...Object.entries(e.palette).filter(k([`light`])).map(([r])=>({props:{colorSeverity:r,variant:`standard`},style:{color:e.vars?e.vars.palette.Alert[`${r}Color`]:t(e.palette[r].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${r}StandardBg`]:n(e.palette[r].light,.9),[`& .${Ue.icon}`]:e.vars?{color:e.vars.palette.Alert[`${r}IconColor`]}:{color:e.palette[r].main}}})),...Object.entries(e.palette).filter(k([`light`])).map(([n])=>({props:{colorSeverity:n,variant:`outlined`},style:{color:e.vars?e.vars.palette.Alert[`${n}Color`]:t(e.palette[n].light,.6),border:`1px solid ${(e.vars||e).palette[n].light}`,[`& .${Ue.icon}`]:e.vars?{color:e.vars.palette.Alert[`${n}IconColor`]}:{color:e.palette[n].main}}})),...Object.entries(e.palette).filter(k([`dark`])).map(([t])=>({props:{colorSeverity:t,variant:`filled`},style:{fontWeight:e.typography.fontWeightMedium,...e.vars?{color:e.vars.palette.Alert[`${t}FilledColor`],backgroundColor:e.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:e.palette.mode===`dark`?e.palette[t].dark:e.palette[t].main,color:e.palette.getContrastText(e.palette[t].main)}}}))]}})),mt=v(`div`,{name:`MuiAlert`,slot:`Icon`})({marginRight:12,padding:`7px 0`,display:`flex`,fontSize:22,opacity:.9}),ht=v(`div`,{name:`MuiAlert`,slot:`Message`})({padding:`8px 0`,minWidth:0,overflow:`auto`}),gt=v(`div`,{name:`MuiAlert`,slot:`Action`})({display:`flex`,alignItems:`flex-start`,padding:`4px 0 0 16px`,marginLeft:`auto`,marginRight:-8}),_t={success:(0,P.jsx)(st,{fontSize:`inherit`}),warning:(0,P.jsx)(ct,{fontSize:`inherit`}),error:(0,P.jsx)(lt,{fontSize:`inherit`}),info:(0,P.jsx)(ut,{fontSize:`inherit`})},vt=M.forwardRef(function(e,t){let n=ee({props:e,name:`MuiAlert`}),{action:r,children:i,className:a,closeText:o=`Close`,color:s,components:c={},componentsProps:l={},icon:u,iconMapping:d=_t,onClose:f,role:p=`alert`,severity:m=`success`,slotProps:h={},slots:g={},variant:_=`standard`,...v}=n,y={...n,color:s,severity:m,variant:_,colorSeverity:s||m},b=ft(y),x={slots:{closeButton:c.CloseButton,closeIcon:c.CloseIcon,...g},slotProps:{...l,...h}},[ne,S]=T(`root`,{ref:t,shouldForwardComponentProp:!0,className:te(b.root,a),elementType:pt,externalForwardedProps:{...x,...v},ownerState:y,additionalProps:{role:p,elevation:0}}),[C,w]=T(`icon`,{className:b.icon,elementType:mt,externalForwardedProps:x,ownerState:y}),[re,E]=T(`message`,{className:b.message,elementType:ht,externalForwardedProps:x,ownerState:y}),[D,ie]=T(`action`,{className:b.action,elementType:gt,externalForwardedProps:x,ownerState:y}),[O,k]=T(`closeButton`,{elementType:ot,externalForwardedProps:x,ownerState:y}),[A,j]=T(`closeIcon`,{elementType:dt,externalForwardedProps:x,ownerState:y});return(0,P.jsxs)(ne,{...S,children:[u===!1?null:(0,P.jsx)(C,{...w,children:u||d[m]||_t[m]}),(0,P.jsx)(re,{...E,children:i}),r==null?null:(0,P.jsx)(D,{...ie,children:r}),r==null&&f?(0,P.jsx)(D,{...ie,children:(0,P.jsx)(O,{size:`small`,"aria-label":o,title:o,color:`inherit`,onClick:f,...k,children:(0,P.jsx)(A,{fontSize:`small`,...j})})}):null]})});function yt(){let e=f(e=>e.notifications),t=u(),n=e=>{t(ye(e))},r=e=>((0,M.useEffect)(()=>{setTimeout(()=>{t(ye(e.index))},e.delay)},[e]),w(`div`,{children:e.children}));return w(`div`,{className:`alertWrapper`,children:e.map((e,t)=>{if(e.visible)return w(r,{delay:`4000`,index:t,children:w(`div`,{className:`alert`,children:w(vt,{elevation:6,variant:`filled`,onClose:()=>n(t),severity:e.type,sx:{width:`100%`},children:e.message})})},t)})})}var bt=``+new URL(`qryn-logo-Ch2-Iq6y.png`,import.meta.url).href,xt=e=>{let{height:t}=e;return w(`img`,{src:bt,alt:`qryyn View`,height:t||`24px`,className:`logo`})},St=A.button`
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
`;A.button`
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
`;var Ct=A.div`
    overflow-x: hidden;
    border-radius: 3px;
    background: ${({theme:e})=>e.background};
    color: ${({theme:e})=>e.contrast};
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    align-items: center;

    .cont {
        max-width: 1440px;
        padding: 10px;
        margin: 10px;
        width: 100%;
        background: ${({theme:e})=>e.shadow};
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-x: hidden;
    }
    .ds-header {
        padding: 10px;
        padding-bottom: 20px;
        font-size: 24px;
        display: flex;

        margin: 10px;
        justify-content: space-between;
        align-items: center;
        padding-left: 0px;
        .logo {
            margin-right: 10px;
        }
    }
    .ds-cont {
        margin-bottom: 10px;
        border: 1px solid ${({theme:e})=>e.accentNeutral};
        border-radius: 3px;
        color: ${({theme:e})=>e.contrast};
    }

    .ds-item {
        padding: 10px;
        //    margin-bottom: 10px;
        border-radius: 3px 3px 0px 0px;
        padding-bottom: 14px;
        display: flex;
        color: ${({theme:e})=>e.contrast};
        .logo {
            padding: 10px;
            padding-right: 20px;
            padding-left: 0px;
        }
        .ds-text {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .ds-type {
            font-size: 18px;
            padding: 10px;
            padding-left: 0px;
            color: ${({theme:e})=>e.contrast};
        }
        small {
            font-size: 12px;
        }
        .setting-icon {
            justify-self: flex-end;
            cursor: pointer;
        }
        .ds-settings {
            background: ${({theme:e})=>e.shadow};
        }
    }
    .plugins-cont {
        display: flex;
        flex: 1;
        margin: 0px 10px;
        flex-direction: column;
        padding: 10px 20px;
        border: 1px solid ${({theme:e})=>e.accentNeutral};
        border-radius: 3px;
        height: fit-content;
        .title {
            font-size: 14px;
            padding: 10px 0px;
        }
    }
`,wt=A.div`
    color: ${({theme:e})=>e.contrast};
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0px 10px;
    //flex: 0;
    white-space: nowrap;
    ${({width:e})=>e===null?``:`width:${e}px;`}
    border-radius: 3px 0px 0px 3px;
    display: flex;
    align-items: center;
    height: 26px;
`,Tt=A.input`
    display: flex;
    flex: 1;
    background: ${({theme:e})=>e.deep};
    color: ${({theme:e})=>e.contrast};
    border: 1px solid
        ${({error:e,theme:t})=>e?`#b62c14`:t.accentNeutral};
    border-radius: 3px;
    justify-self: flex-end;
    height: 26px;
    padding-left: 8px;
`,Et=A.textarea`
    display: flex;
    flex: 1;
    background: ${({theme:e})=>e.deep};
    color: ${({theme:e})=>e.contrast};
    border: 1px solid ${({theme:e})=>e.accentNeutral};
    border-radius: 3px;
    justify-self: flex-end;
    padding-left: 8px;
`,Dt=A.div`
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
    ${({width:e})=>e&&e===`normal`?``:`flex:1;`}
    //flex: 1;
    select {
        background: ${({theme:e})=>e.deep};
        color: ${({theme:e})=>e.contrast};
        border: 1px solid ${({theme:e})=>e.accentNeutral};
        border-radius: 3px;
        font-size: 12px;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 1px 2px 1px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        option {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`,Ot=A.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    &.internal {
        max-width: 400px;
    }
`;A.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    align-items: center;
`;var kt=A.div`
    padding: 10px;
`,At=A.div`
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({theme:e})=>e.background};
`,jt=A.div`
    padding: 10px;
    border-bottom: 1px solid ${({theme:e})=>e.shadow};
    border-radius: 3px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    .edit-buttons {
        display: flex;
        align-items: center;
        &:disabled {
            display: none;
        }
    }
`,Mt=A.div`
    padding: 10px;
    border-radius: 0px 0px 3px 3px;
    border-top: 1px solid ${({theme:e})=>e.accentNeutral};
`,Nt=A(St)`
    background: ${({primary:e,theme:t})=>e?t.primary:t.neutral};

    border: 1px solid ${({theme:e})=>e.accentNeutral};
    color: ${({primary:e,theme:t})=>e?t.maxContrast:t.contrast};
    margin-left: 5px;
    transition: 0.25s all;
    justify-content: center;
    padding: 3px 12px;
    height: 26px;
    display: flex;
    &:hover {
        background: ${({theme:e,disabled:t})=>t?e.neutral:e.primaryLight};
        color: ${({primary:e,theme:t})=>e?t.contrast:t.maxContrast};
    }
    &:disabled {
        background: ${({theme:e})=>e.neutral};
        border: 1px solid ${({theme:e})=>e.accentNeutral};
        cursor: not-allowed;
        color: ${({theme:e})=>e.contrast};
    }
    @media screen and (max-width: 1070px) {
        display: flex;

        margin: 0;
    }
`,Pt=e=>{let{value:t,onClick:n,primary:r,title:i,disabled:a}=e;return w(Nt,{disabled:a,title:i,onClick:n,primary:r,children:t})},Ft={metrics_icon:``+new URL(`metrics_icon-BLJDMBj5.png`,import.meta.url).href,logs_icon:``+new URL(`logs_icon-BKEwRlc4.png`,import.meta.url).href,traces_icon:``+new URL(`traces_icon-BqGoDW-P.png`,import.meta.url).href},It=({icon:e,style:t})=>w(`img`,{height:`20px`,className:`logo`,style:t,src:Ft[e]||``+new URL(`logs_icon-BKEwRlc4.png`,import.meta.url).href,alt:e}),Lt=e=>{let{value:t,label:n,onChange:r,locked:i,type:a,placeholder:o,error:s,labelWidth:c}=e;return D(Dt,{children:[w(wt,{width:c||null,children:n}),w(Tt,{className:`ds-input`,disabled:i,error:s||!1,onChange:r,type:a,value:oe.sanitize(t),placeholder:o})]})},Rt=e=>j`
    display: flex;
    min-width: 100px;
    flex: ${+!!e};
    -ms-flex: ${+!!e};
`,zt=({value:e,locked:t,onChange:n,opts:r,label:i,labelWidth:a,name:o,fullWidth:s,width:c})=>{let[l,u]=(0,M.useState)(``),d=(0,M.useRef)(null),f=(0,M.useMemo)(()=>r&&r[0]&&typeof r[0]==`string`?r?.map(e=>({value:e,name:e})):r,[r]);return(0,M.useEffect)(()=>{let t=f?.find(t=>t.name===e)?.value;t&&d?.current?.value!==t&&(u(t),d.current.value=t)},[e]),D(Dt,{width:c,children:[i?.length>0&&w(wt,{width:a||null,children:i}),w(`select`,{ref:d,className:O(Rt(s)),disabled:t,defaultValue:oe.sanitize(l),onChange:e=>n(e,o),children:f?.map((e,t)=>w(`option`,{value:oe.sanitize(e.value),children:e.name},t))})]})},Bt=e=>{let{value:t,onChange:n,locked:r,label:i}=e;return D(Dt,{children:[w(wt,{children:i}),w(ae,{disabled:r,size:`small`,checked:t,onChange:n})]})},Vt=e=>j`
    transition: 0.25s all;
    position: absolute;
    left: 0;
    top: 0;
    background: ${e.background};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`,Ht=j`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.5s all;
`,Ut=j`
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
    width: 100px;
    height: 100px;
    border-radius: 50%;
    //background: background: rgb(85,85,85);
    background: linear-gradient(
        90deg,
        rgba(85, 85, 85, 1) 0%,
        rgba(0, 0, 0, 1) 50%,
        rgba(73, 73, 73, 1) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s all;
    animation: rotation 3s infinite linear;
    p {
        color: white;
        font-size: 12px;
    }
    img {
        height: 60px;
    }
`,Wt=e=>j`
    color: ${e.contrast};
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
    letter-spacing: 2px;
`,Gt=()=>w(xt,{height:`200px`});function Kt(){let e=re();return w(`div`,{className:O(Vt(e)),children:D(`div`,{className:O(Ht),children:[w(`div`,{className:O(Ut),children:w(Gt,{})}),w(`div`,{className:O(Wt(e)),children:`Qryn`})]})})}function qt({children:e}){let t=f(e=>e.currentUser.role);return(0,M.useMemo)(()=>{let e=!1,t=``;try{let n=btoa(`cookie-location`),r=localStorage.getItem(n),i=JSON.parse(atob(r));i&&i?.cookiesAvailable?(e=i?.cookiesAvailable,t=`/`+i?.url):e=!1}catch{e=!1}return{cookie:e,url:t}},[]).cookie||t!==`admin`&&t!==`superAdmin`?w(a,{to:``}):e}var Jt=t({componentsToDebugString:()=>Gi,default:()=>Qi,getFullscreenElement:()=>Pn,getUnstableAudioFingerprint:()=>zn,getUnstableCanvasFingerprint:()=>tr,getUnstableHardwareConcurrency:()=>Dr,getUnstableScreenFrame:()=>Sr,getUnstableScreenResolution:()=>gr,getWebGLContext:()=>Di,hashComponents:()=>Ki,isAndroid:()=>In,isChromium:()=>G,isDesktopWebKit:()=>En,isEdgeHTML:()=>Tn,isGecko:()=>J,isSamsungInternet:()=>Ln,isTrident:()=>wn,isWebKit:()=>K,load:()=>Zi,loadSources:()=>Sn,murmurX64Hash128:()=>$i,prepareForSources:()=>Ji,sources:()=>Ri,transformSource:()=>Cn,withIframe:()=>Gn}),Yt=`5.2.0`;function Xt(e,t){return new Promise(n=>setTimeout(n,e,t))}function Zt(){return new Promise(e=>{let t=new MessageChannel;t.port1.onmessage=()=>e(),t.port2.postMessage(null)})}function Qt(e,t=1/0){let{requestIdleCallback:n}=window;return n?new Promise(e=>n.call(window,()=>e(),{timeout:t})):Xt(Math.min(e,t))}function $t(e){return!!e&&typeof e.then==`function`}function en(e,t){try{let n=e();$t(n)?n.then(e=>t(!0,e),e=>t(!1,e)):t(!0,n)}catch(e){t(!1,e)}}async function tn(e,t,n=16){let r=Array(e.length),i=Date.now();for(let a=0;a<e.length;++a){r[a]=t(e[a],a);let o=Date.now();o>=i+n&&(i=o,await Zt())}return r}function I(e){return e.then(void 0,()=>void 0),e}function nn(e,t){for(let n=0,r=e.length;n<r;++n)if(e[n]===t)return!0;return!1}function rn(e,t){return!nn(e,t)}function an(e){return parseInt(e)}function L(e){return parseFloat(e)}function R(e,t){return typeof e==`number`&&isNaN(e)?t:e}function z(e){return e.reduce((e,t)=>e+ +!!t,0)}function on(e,t=1){if(Math.abs(t)>=1)return Math.round(e/t)*t;{let n=1/t;return Math.round(e*n)/n}}function sn(e){let t=`Unexpected syntax '${e}'`,n=/^\s*([a-z-]*)(.*)$/i.exec(e),r=n[1]||void 0,i={},a=/([.:#][\w-]+|\[.+?\])/gi,o=(e,t)=>{i[e]=i[e]||[],i[e].push(t)};for(;;){let e=a.exec(n[2]);if(!e)break;let r=e[0];switch(r[0]){case`.`:o(`class`,r.slice(1));break;case`#`:o(`id`,r.slice(1));break;case`[`:{let e=/^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(r);if(e)o(e[1],e[4]??e[5]??``);else throw Error(t);break}default:throw Error(t)}}return[r,i]}function cn(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r>127)return new TextEncoder().encode(e);t[n]=r}return t}function B(e,t){let n=e[0]>>>16,r=e[0]&65535,i=e[1]>>>16,a=e[1]&65535,o=t[0]>>>16,s=t[0]&65535,c=t[1]>>>16,l=t[1]&65535,u=0,d=0,f=0,p=0;p+=a+l,f+=p>>>16,p&=65535,f+=i+c,d+=f>>>16,f&=65535,d+=r+s,u+=d>>>16,d&=65535,u+=n+o,u&=65535,e[0]=u<<16|d,e[1]=f<<16|p}function V(e,t){let n=e[0]>>>16,r=e[0]&65535,i=e[1]>>>16,a=e[1]&65535,o=t[0]>>>16,s=t[0]&65535,c=t[1]>>>16,l=t[1]&65535,u=0,d=0,f=0,p=0;p+=a*l,f+=p>>>16,p&=65535,f+=i*l,d+=f>>>16,f&=65535,f+=a*c,d+=f>>>16,f&=65535,d+=r*l,u+=d>>>16,d&=65535,d+=i*c,u+=d>>>16,d&=65535,d+=a*s,u+=d>>>16,d&=65535,u+=n*l+r*c+i*s+a*o,u&=65535,e[0]=u<<16|d,e[1]=f<<16|p}function H(e,t){let n=e[0];t%=64,t===32?(e[0]=e[1],e[1]=n):t<32?(e[0]=n<<t|e[1]>>>32-t,e[1]=e[1]<<t|n>>>32-t):(t-=32,e[0]=e[1]<<t|n>>>32-t,e[1]=n<<t|e[1]>>>32-t)}function U(e,t){t%=64,t!==0&&(t<32?(e[0]=e[1]>>>32-t,e[1]<<=t):(e[0]=e[1]<<t-32,e[1]=0))}function W(e,t){e[0]^=t[0],e[1]^=t[1]}var ln=[4283543511,3981806797],un=[3301882366,444984403];function dn(e){let t=[0,e[0]>>>1];W(e,t),V(e,ln),t[1]=e[0]>>>1,W(e,t),V(e,un),t[1]=e[0]>>>1,W(e,t)}var fn=[2277735313,289559509],pn=[1291169091,658871167],mn=[0,5],hn=[0,1390208809],gn=[0,944331445];function _n(e,t){let n=cn(e);t||=0;let r=[0,n.length],i=r[1]%16,a=r[1]-i,o=[0,t],s=[0,t],c=[0,0],l=[0,0],u;for(u=0;u<a;u+=16)c[0]=n[u+4]|n[u+5]<<8|n[u+6]<<16|n[u+7]<<24,c[1]=n[u]|n[u+1]<<8|n[u+2]<<16|n[u+3]<<24,l[0]=n[u+12]|n[u+13]<<8|n[u+14]<<16|n[u+15]<<24,l[1]=n[u+8]|n[u+9]<<8|n[u+10]<<16|n[u+11]<<24,V(c,fn),H(c,31),V(c,pn),W(o,c),H(o,27),B(o,s),V(o,mn),B(o,hn),V(l,pn),H(l,33),V(l,fn),W(s,l),H(s,31),B(s,o),V(s,mn),B(s,gn);c[0]=0,c[1]=0,l[0]=0,l[1]=0;let d=[0,0];switch(i){case 15:d[1]=n[u+14],U(d,48),W(l,d);case 14:d[1]=n[u+13],U(d,40),W(l,d);case 13:d[1]=n[u+12],U(d,32),W(l,d);case 12:d[1]=n[u+11],U(d,24),W(l,d);case 11:d[1]=n[u+10],U(d,16),W(l,d);case 10:d[1]=n[u+9],U(d,8),W(l,d);case 9:d[1]=n[u+8],W(l,d),V(l,pn),H(l,33),V(l,fn),W(s,l);case 8:d[1]=n[u+7],U(d,56),W(c,d);case 7:d[1]=n[u+6],U(d,48),W(c,d);case 6:d[1]=n[u+5],U(d,40),W(c,d);case 5:d[1]=n[u+4],U(d,32),W(c,d);case 4:d[1]=n[u+3],U(d,24),W(c,d);case 3:d[1]=n[u+2],U(d,16),W(c,d);case 2:d[1]=n[u+1],U(d,8),W(c,d);case 1:d[1]=n[u],W(c,d),V(c,fn),H(c,31),V(c,pn),W(o,c)}return W(o,r),W(s,r),B(o,s),B(s,o),dn(o),dn(s),B(o,s),B(s,o),(`00000000`+(o[0]>>>0).toString(16)).slice(-8)+(`00000000`+(o[1]>>>0).toString(16)).slice(-8)+(`00000000`+(s[0]>>>0).toString(16)).slice(-8)+(`00000000`+(s[1]>>>0).toString(16)).slice(-8)}function vn(e){return{name:e.name,message:e.message,stack:e.stack?.split(`
`),...e}}function yn(e){return/^function\s.*?\{\s*\[native code]\s*}$/.test(String(e))}function bn(e){return typeof e!=`function`}function xn(e,t){let n=I(new Promise(n=>{let r=Date.now();en(e.bind(null,t),(...e)=>{let t=Date.now()-r;if(!e[0])return n(()=>({error:e[1],duration:t}));let i=e[1];if(bn(i))return n(()=>({value:i,duration:t}));n(()=>new Promise(e=>{let n=Date.now();en(i,(...r)=>{let i=t+Date.now()-n;if(!r[0])return e({error:r[1],duration:i});e({value:r[1],duration:i})})}))})}));return function(){return n.then(e=>e())}}function Sn(e,t,n,r){let i=Object.keys(e).filter(e=>rn(n,e)),a=I(tn(i,n=>xn(e[n],t),r));return async function(){let e=await tn(await a,e=>I(e()),r),t=await Promise.all(e),n={};for(let e=0;e<i.length;++e)n[i[e]]=t[e];return n}}function Cn(e,t){let n=e=>bn(e)?t(e):()=>{let n=e();return $t(n)?n.then(t):t(n)};return t=>{let r=e(t);return $t(r)?r.then(n):n(r)}}function wn(){let e=window,t=navigator;return z([`MSCSSMatrix`in e,`msSetImmediate`in e,`msIndexedDB`in e,`msMaxTouchPoints`in t,`msPointerEnabled`in t])>=4}function Tn(){let e=window,t=navigator;return z([`msWriteProfilerMark`in e,`MSStream`in e,`msLaunchUri`in t,`msSaveBlob`in t])>=3&&!wn()}function G(){let e=window,t=navigator;return z([`webkitPersistentStorage`in t,`webkitTemporaryStorage`in t,(t.vendor||``).indexOf(`Google`)===0,`webkitResolveLocalFileSystemURL`in e,`BatteryManager`in e,`webkitMediaStream`in e,`webkitSpeechGrammar`in e])>=5}function K(){let e=window,t=navigator;return z([`ApplePayError`in e,`CSSPrimitiveValue`in e,`Counter`in e,t.vendor.indexOf(`Apple`)===0,`RGBColor`in e,`WebKitMediaKeys`in e])>=4}function En(){let e=window,{HTMLElement:t,Document:n}=e;return z([`safari`in e,!(`ongestureend`in e),!(`TouchEvent`in e),!(`orientation`in e),t&&!(`autocapitalize`in t.prototype),n&&`pointerLockElement`in n.prototype])>=4}function q(){let e=window;return yn(e.print)&&String(e.browser)===`[object WebPageNamespace]`}function J(){let e=window;return z([`buildID`in navigator,`MozAppearance`in(document.documentElement?.style??{}),`onmozfullscreenchange`in e,`mozInnerScreenX`in e,`CSSMozDocumentRule`in e,`CanvasCaptureMediaStream`in e])>=4}function Dn(){let e=window,t=navigator,{CSS:n}=e;return z([`userActivation`in t,n.supports(`color`,`light-dark(#000, #fff)`),n.supports(`height`,`1lh`),`globalPrivacyControl`in t])>=3}function On(){let{CSS:e}=window;return z([e.supports(`selector(::details-content)`),e.supports(`selector(::before::marker)`),e.supports(`selector(::after::marker)`),!(`locale`in CompositionEvent.prototype)])>=3}function kn(){let e=window;return z([!(`MediaSettingsRange`in e),`RTCEncodedAudioFrame`in e,``+e.Intl==`[object Intl]`,``+e.Reflect==`[object Reflect]`])>=3}function An(){let e=window,{URLPattern:t}=e;return z([`union`in Set.prototype,`Iterator`in e,t&&`hasRegExpGroups`in t.prototype,`RGB8`in WebGLRenderingContext.prototype])>=3}function jn(){let e=window,t=document,{CSS:n,Promise:r,AudioContext:i}=e;return z([r&&`try`in r,`caretPositionFromPoint`in t,i&&`onerror`in i.prototype,n.supports(`ruby-align`,`space-around`)])>=3}function Mn(){let e=window;return z([`DOMRectList`in e,`RTCPeerConnectionIceEvent`in e,`SVGGeometryElement`in e,`ontransitioncancel`in e])>=3}function Y(){let e=window,t=navigator,{CSS:n,HTMLButtonElement:r}=e;return z([!(`getStorageUpdates`in t),r&&`popover`in r.prototype,`CSSCounterStyleRule`in e,n.supports(`font-size-adjust: ex-height 0.5`),n.supports(`text-transform: full-width`)])>=4}function Nn(){if(navigator.platform===`iPad`)return!0;let e=screen,t=e.width/e.height;return z([`MediaSource`in window,!!Element.prototype.webkitRequestFullscreen,t>.65&&t<1.53])>=2}function Pn(){let e=document;return e.fullscreenElement||e.msFullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||null}function Fn(){let e=document;return(e.exitFullscreen||e.msExitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen).call(e)}function In(){let e=G(),t=J(),n=window,r=navigator,i=`connection`;return e?z([!(`SharedWorker`in n),r[i]&&`ontypechange`in r[i],!(`sinkId`in new Audio)])>=2:t?z([`onorientationchange`in n,`orientation`in n,/android/i.test(r.appVersion)])>=2:!1}function Ln(){let e=navigator,t=window,n=Audio.prototype,{visualViewport:r}=t;return z([`srLatency`in n,`srChannelCount`in n,`devicePosture`in e,r&&`segments`in r,`getTextInformation`in Image.prototype])>=3}function Rn(){return Vn()?-4:zn()}function zn(){let e=window,t=e.OfflineAudioContext||e.webkitOfflineAudioContext;if(!t)return-2;if(Bn())return-1;let n=new t(1,5e3,44100),r=n.createOscillator();r.type=`triangle`,r.frequency.value=1e4;let i=n.createDynamicsCompressor();i.threshold.value=-50,i.knee.value=40,i.ratio.value=12,i.attack.value=0,i.release.value=.25,r.connect(i),i.connect(n.destination),r.start(0);let[a,o]=Hn(n),s=I(a.then(e=>Un(e.getChannelData(0).subarray(4500)),e=>{if(e.name===`timeout`||e.name===`suspended`)return-3;throw e}));return()=>(o(),s)}function Bn(){return K()&&!En()&&!Mn()}function Vn(){return K()&&Y()&&q()||G()&&Ln()&&An()}function Hn(e){let t=()=>void 0;return[new Promise((n,r)=>{let i=!1,a=0,o=0;e.oncomplete=e=>n(e.renderedBuffer);let s=()=>{setTimeout(()=>r(Wn(`timeout`)),Math.min(500,o+5e3-Date.now()))},c=()=>{try{let t=e.startRendering();switch($t(t)&&I(t),e.state){case`running`:o=Date.now(),i&&s();break;case`suspended`:document.hidden||a++,i&&a>=3?r(Wn(`suspended`)):setTimeout(c,500);break}}catch(e){r(e)}};c(),t=()=>{i||(i=!0,o>0&&s())}}),t]}function Un(e){let t=0;for(let n=0;n<e.length;++n)t+=Math.abs(e[n]);return t}function Wn(e){let t=Error(e);return t.name=e,t}async function Gn(e,t,n=50){var r;let i=document;for(;!i.body;)await Xt(n);let a=i.createElement(`iframe`);try{for(await new Promise((e,n)=>{let r=!1,o=()=>{r=!0,e()};a.onload=o,a.onerror=e=>{r=!0,n(e)};let{style:s}=a;s.setProperty(`display`,`block`,`important`),s.position=`absolute`,s.top=`0`,s.left=`0`,s.visibility=`hidden`,t&&`srcdoc`in a?a.srcdoc=t:a.src=`about:blank`,i.body.appendChild(a);let c=()=>{r||(a.contentWindow?.document?.readyState===`complete`?o():setTimeout(c,10))};c()});!a.contentWindow?.document?.body;)await Xt(n);return await e(a,a.contentWindow)}finally{(r=a.parentNode)==null||r.removeChild(a)}}function Kn(e){let[t,n]=sn(e),r=document.createElement(t??`div`);for(let e of Object.keys(n)){let t=n[e].join(` `);e===`style`?qn(r.style,t):r.setAttribute(e,t)}return r}function qn(e,t){for(let n of t.split(`;`)){let t=/^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(n);if(t){let[,n,r,,i]=t;e.setProperty(n,r,i||``)}}}function Jn(){let e=window;for(;;){let t=e.parent;if(!t||t===e)return!1;try{if(t.location.origin!==e.location.origin)return!0}catch(e){if(e instanceof Error&&e.name===`SecurityError`)return!0;throw e}e=t}}var Yn=`mmMwWLliI0O&1`,Xn=`48px`,X=[`monospace`,`sans-serif`,`serif`],Zn=`sans-serif-thin.ARNO PRO.Agency FB.Arabic Typesetting.Arial Unicode MS.AvantGarde Bk BT.BankGothic Md BT.Batang.Bitstream Vera Sans Mono.Calibri.Century.Century Gothic.Clarendon.EUROSTILE.Franklin Gothic.Futura Bk BT.Futura Md BT.GOTHAM.Gill Sans.HELV.Haettenschweiler.Helvetica Neue.Humanst521 BT.Leelawadee.Letter Gothic.Levenim MT.Lucida Bright.Lucida Sans.Menlo.MS Mincho.MS Outlook.MS Reference Specialty.MS UI Gothic.MT Extra.MYRIAD PRO.Marlett.Meiryo UI.Microsoft Uighur.Minion Pro.Monotype Corsiva.PMingLiU.Pristina.SCRIPTINA.Segoe UI Light.Serifa.SimHei.Small Fonts.Staccato222 BT.TRAJAN PRO.Univers CE 55 Medium.Vrinda.ZWAdobeF`.split(`.`);function Qn(){return Gn(async(e,{document:t})=>{let n=t.body;n.style.fontSize=Xn;let r=t.createElement(`div`);r.style.setProperty(`visibility`,`hidden`,`important`);let i={},a={},o=e=>{let n=t.createElement(`span`),{style:i}=n;return i.position=`absolute`,i.top=`0`,i.left=`0`,i.fontFamily=e,n.textContent=Yn,r.appendChild(n),n},s=(e,t)=>o(`'${e}',${t}`),c=()=>X.map(o),l=()=>{let e={};for(let t of Zn)e[t]=X.map(e=>s(t,e));return e},u=e=>X.some((t,n)=>e[n].offsetWidth!==i[t]||e[n].offsetHeight!==a[t]),d=c(),f=l();n.appendChild(r);for(let e=0;e<X.length;e++)i[X[e]]=d[e].offsetWidth,a[X[e]]=d[e].offsetHeight;return Zn.filter(e=>u(f[e]))})}function $n(){let e=navigator.plugins;if(!e)return;let t=[];for(let n=0;n<e.length;++n){let r=e[n];if(!r)continue;let i=[];for(let e=0;e<r.length;++e){let t=r[e];i.push({type:t.type,suffixes:t.suffixes})}t.push({name:r.name,description:r.description,mimeTypes:i})}return t}function er(){return tr(lr())}function tr(e){let t=!1,n,r,[i,a]=nr();return rr(i,a)?(t=ir(a),e?n=r=`skipped`:[n,r]=ar(i,a)):n=r=`unsupported`,{winding:t,geometry:n,text:r}}function nr(){let e=document.createElement(`canvas`);return e.width=1,e.height=1,[e,e.getContext(`2d`)]}function rr(e,t){return!!(t&&e.toDataURL)}function ir(e){return e.rect(0,0,10,10),e.rect(2,2,6,6),!e.isPointInPath(5,5,`evenodd`)}function ar(e,t){or(e,t);let n=cr(e);return n===cr(e)?(sr(e,t),[cr(e),n]):[`unstable`,`unstable`]}function or(e,t){e.width=240,e.height=60,t.textBaseline=`alphabetic`,t.fillStyle=`#f60`,t.fillRect(100,1,62,20),t.fillStyle=`#069`,t.font=`11pt "Times New Roman"`;let n=`Cwm fjordbank gly ${String.fromCharCode(55357,56835)}`;t.fillText(n,2,15),t.fillStyle=`rgba(102, 204, 0, 0.2)`,t.font=`18pt Arial`,t.fillText(n,4,45)}function sr(e,t){e.width=122,e.height=110,t.globalCompositeOperation=`multiply`;for(let[e,n,r]of[[`#f2f`,40,40],[`#2ff`,80,40],[`#ff2`,60,80]])t.fillStyle=e,t.beginPath(),t.arc(n,r,40,0,Math.PI*2,!0),t.closePath(),t.fill();t.fillStyle=`#f9c`,t.arc(60,60,60,0,Math.PI*2,!0),t.arc(60,60,20,0,Math.PI*2,!0),t.fill(`evenodd`)}function cr(e){return e.toDataURL()}function lr(){let e=K()&&Y()&&q(),t=J()&&Dn();return e||t}function ur(){let e=navigator,t=0,n;e.maxTouchPoints===void 0?e.msMaxTouchPoints!==void 0&&(t=e.msMaxTouchPoints):t=an(e.maxTouchPoints);try{document.createEvent(`TouchEvent`),n=!0}catch{n=!1}let r=`ontouchstart`in window;return{maxTouchPoints:t,touchEvent:n,touchStart:r}}function dr(){return navigator.oscpu}function fr(){let e=navigator,t=[],n=e.language||e.userLanguage||e.browserLanguage||e.systemLanguage;if(n!==void 0&&t.push([n]),Array.isArray(e.languages))G()&&kn()||t.push(e.languages);else if(typeof e.languages==`string`){let n=e.languages;n&&t.push(n.split(`,`))}return t}function pr(){return window.screen.colorDepth}function mr(){return R(L(navigator.deviceMemory),void 0)}function hr(){if(!(K()&&Y()&&q()))return gr()}function gr(){let e=screen,t=e=>R(an(e),null),n=[t(e.width),t(e.height)];return n.sort().reverse(),n}var _r=2500,vr=10,yr,br;function xr(){if(br!==void 0)return;let e=()=>{let t=wr();Tr(t)?br=setTimeout(e,_r):(yr=t,br=void 0)};e()}function Sr(){return xr(),async()=>{let e=wr();if(Tr(e)){if(yr)return[...yr];Pn()&&(await Fn(),e=wr())}return Tr(e)||(yr=e),e}}function Cr(){let e=K()&&Y()&&q(),t=J()&&On();if(e||t)return()=>Promise.resolve(void 0);let n=Sr();return async()=>{let e=await n(),t=e=>e===null?null:on(e,vr);return[t(e[0]),t(e[1]),t(e[2]),t(e[3])]}}function wr(){let e=screen;return[R(L(e.availTop),null),R(L(e.width)-L(e.availWidth)-R(L(e.availLeft),0),null),R(L(e.height)-L(e.availHeight)-R(L(e.availTop),0),null),R(L(e.availLeft),null)]}function Tr(e){for(let t=0;t<4;++t)if(e[t])return!1;return!0}function Er(){let e=Dr();return e!==void 0&&J()&&On()?e>=8?8:4:e}function Dr(){return R(an(navigator.hardwareConcurrency),void 0)}function Or(){let e=window.Intl?.DateTimeFormat;if(e){let t=new e().resolvedOptions().timeZone;if(t)return t}let t=-kr();return`UTC${t>=0?`+`:``}${t}`}function kr(){let e=new Date().getFullYear();return Math.max(L(new Date(e,0,1).getTimezoneOffset()),L(new Date(e,6,1).getTimezoneOffset()))}function Ar(){try{return!!window.sessionStorage}catch{return!0}}function jr(){try{return!!window.localStorage}catch{return!0}}function Mr(){if(!(wn()||Tn()))try{return!!window.indexedDB}catch{return!0}}function Nr(){return!!window.openDatabase}function Pr(){return navigator.cpuClass}function Fr(){let{platform:e}=navigator;return e===`MacIntel`&&K()&&!En()?Nn()?`iPad`:`iPhone`:e}function Ir(){return navigator.vendor||``}function Lr(){let e=[];for(let t of[`chrome`,`safari`,`__crWeb`,`__gCrWeb`,`yandex`,`__yb`,`__ybro`,`__firefox__`,`__edgeTrackingPreventionStatistics`,`webkit`,`oprt`,`samsungAr`,`ucweb`,`UCShellJava`,`puffinDevice`]){let n=window[t];n&&typeof n==`object`&&e.push(t)}return e.sort()}function Rr(){let e=document;try{e.cookie=`cookietest=1; SameSite=Strict;`;let t=e.cookie.indexOf(`cookietest=`)!==-1;return e.cookie=`cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT`,t}catch{return!1}}function zr(){let e=atob;return{abpIndo:[`#Iklan-Melayang`,`#Kolom-Iklan-728`,`#SidebarIklan-wrapper`,`[title="ALIENBOLA" i]`,e(`I0JveC1CYW5uZXItYWRz`)],abpvn:[`.quangcao`,`#mobileCatfish`,e(`LmNsb3NlLWFkcw==`),`[id^="bn_bottom_fixed_"]`,`#pmadv`],adBlockFinland:[`.mainostila`,e(`LnNwb25zb3JpdA==`),`.ylamainos`,e(`YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd`),e(`YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd`)],adBlockPersian:[`#navbar_notice_50`,`.kadr`,`TABLE[width="140px"]`,`#divAgahi`,e(`YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd`)],adBlockWarningRemoval:[`#adblock-honeypot`,`.adblocker-root`,`.wp_adblock_detect`,e(`LmhlYWRlci1ibG9ja2VkLWFk`),e(`I2FkX2Jsb2NrZXI=`)],adGuardAnnoyances:[`.hs-sosyal`,`#cookieconsentdiv`,`div[class^="app_gdpr"]`,`.as-oil`,`[data-cypress="soft-push-notification-modal"]`],adGuardBase:[`.BetterJsPopOverlay`,e(`I2FkXzMwMFgyNTA=`),e(`I2Jhbm5lcmZsb2F0MjI=`),e(`I2NhbXBhaWduLWJhbm5lcg==`),e(`I0FkLUNvbnRlbnQ=`)],adGuardChinese:[e(`LlppX2FkX2FfSA==`),e(`YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd`),`#widget-quan`,e(`YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd`),e(`YVtocmVmKj0iLjE5NTZobC5jb20vIl0=`)],adGuardFrench:[`#pavePub`,e(`LmFkLWRlc2t0b3AtcmVjdGFuZ2xl`),`.mobile_adhesion`,`.widgetadv`,e(`LmFkc19iYW4=`)],adGuardGerman:[`aside[data-portal-id="leaderboard"]`],adGuardJapanese:[`#kauli_yad_1`,e(`YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0=`),e(`Ll9wb3BJbl9pbmZpbml0ZV9hZA==`),e(`LmFkZ29vZ2xl`),e(`Ll9faXNib29zdFJldHVybkFk`)],adGuardMobile:[e(`YW1wLWF1dG8tYWRz`),e(`LmFtcF9hZA==`),`amp-embed[type="24smi"]`,`#mgid_iframe1`,e(`I2FkX2ludmlld19hcmVh`)],adGuardRussian:[e(`YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0=`),e(`LnJlY2xhbWE=`),`div[id^="smi2adblock"]`,e(`ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd`),`#psyduckpockeball`],adGuardSocial:[e(`YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0=`),e(`YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0=`),`.etsy-tweet`,`#inlineShare`,`.popup-social`],adGuardSpanishPortuguese:[`#barraPublicidade`,`#Publicidade`,`#publiEspecial`,`#queTooltip`,`.cnt-publi`],adGuardTrackingProtection:[`#qoo-counter`,e(`YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ==`),e(`YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0=`),e(`YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ==`),`#top100counter`],adGuardTurkish:[`#backkapat`,e(`I3Jla2xhbWk=`),e(`YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0=`),e(`YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd`),e(`YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==`)],bulgarian:[e(`dGQjZnJlZW5ldF90YWJsZV9hZHM=`),`#ea_intext_div`,`.lapni-pop-over`,`#xenium_hot_offers`],easyList:[`.yb-floorad`,e(`LndpZGdldF9wb19hZHNfd2lkZ2V0`),e(`LnRyYWZmaWNqdW5reS1hZA==`),`.textad_headline`,e(`LnNwb25zb3JlZC10ZXh0LWxpbmtz`)],easyListChina:[e(`LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ==`),e(`LmZyb250cGFnZUFkdk0=`),`#taotaole`,`#aafoot.top_box`,`.cfa_popup`],easyListCookie:[`.ezmob-footer`,`.cc-CookieWarning`,`[data-cookie-number]`,e(`LmF3LWNvb2tpZS1iYW5uZXI=`),`.sygnal24-gdpr-modal-wrap`],easyListCzechSlovak:[`#onlajny-stickers`,e(`I3Jla2xhbW5pLWJveA==`),e(`LnJla2xhbWEtbWVnYWJvYXJk`),`.sklik`,e(`W2lkXj0ic2tsaWtSZWtsYW1hIl0=`)],easyListDutch:[e(`I2FkdmVydGVudGll`),e(`I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw==`),`.adstekst`,e(`YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0=`),`#semilo-lrectangle`],easyListGermany:[`#SSpotIMPopSlider`,e(`LnNwb25zb3JsaW5rZ3J1ZW4=`),e(`I3dlcmJ1bmdza3k=`),e(`I3Jla2xhbWUtcmVjaHRzLW1pdHRl`),e(`YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=`)],easyListItaly:[e(`LmJveF9hZHZfYW5udW5jaQ==`),`.sb-box-pubbliredazionale`,e(`YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd`),e(`YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd`),e(`YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==`)],easyListLithuania:[e(`LnJla2xhbW9zX3RhcnBhcw==`),e(`LnJla2xhbW9zX251b3JvZG9z`),e(`aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd`),e(`aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd`),e(`aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd`)],estonian:[e(`QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==`)],fanboyAnnoyances:[`#ac-lre-player`,`.navigate-to-top`,`#subscribe_popup`,`.newsletter_holder`,`#back-top`],fanboyAntiFacebook:[`.util-bar-module-firefly-visible`],fanboyEnhancedTrackers:[`.open.pushModal`,`#issuem-leaky-paywall-articles-zero-remaining-nag`,`#sovrn_container`,`div[class$="-hide"][zoompage-fontsize][style="display: block;"]`,`.BlockNag__Card`],fanboySocial:[`#FollowUs`,`#meteored_share`,`#social_follow`,`.article-sharer`,`.community__social-desc`],frellwitSwedish:[e(`YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ==`),e(`YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ==`),`article.category-samarbete`,e(`ZGl2LmhvbGlkQWRz`),`ul.adsmodern`],greekAdBlock:[e(`QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd`),e(`QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ==`),e(`QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd`),`DIV.agores300`,`TABLE.advright`],hungarian:[`#cemp_doboz`,`.optimonk-iframe-container`,e(`LmFkX19tYWlu`),e(`W2NsYXNzKj0iR29vZ2xlQWRzIl0=`),`#hirdetesek_box`],iDontCareAboutCookies:[`.alert-info[data-block-track*="CookieNotice"]`,`.ModuleTemplateCookieIndicator`,`.o--cookies--container`,`#cookies-policy-sticky`,`#stickyCookieBar`],icelandicAbp:[e(`QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==`)],latvian:[e(`YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0=`),e(`YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==`)],listKr:[e(`YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0=`),e(`I2xpdmVyZUFkV3JhcHBlcg==`),e(`YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ==`),e(`aW5zLmZhc3R2aWV3LWFk`),`.revenue_unit_item.dable`],listeAr:[e(`LmdlbWluaUxCMUFk`),`.right-and-left-sponsers`,e(`YVtocmVmKj0iLmFmbGFtLmluZm8iXQ==`),e(`YVtocmVmKj0iYm9vcmFxLm9yZyJd`),e(`YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd`)],listeFr:[e(`YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ==`),e(`I2FkY29udGFpbmVyX3JlY2hlcmNoZQ==`),e(`YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0=`),`.site-pub-interstitiel`,`div[id^="crt-"][data-criteo-id]`],officialPolish:[`#ceneo-placeholder-ceneo-12`,e(`W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd`),e(`YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ==`),e(`YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ==`),e(`ZGl2I3NrYXBpZWNfYWQ=`)],ro:[e(`YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd`),e(`YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd`),e(`YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0=`),e(`YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd`),`a[href^="/url/"]`],ruAd:[e(`YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd`),e(`YVtocmVmKj0iLy91dGltZy5ydS8iXQ==`),e(`YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0=`),`#pgeldiz`,`.yandex-rtb-block`],thaiAds:[`a[href*=macau-uta-popup]`,e(`I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA==`),e(`LmFkczMwMHM=`),`.bumq`,`.img-kosana`],webAnnoyancesUltralist:[`#mod-social-share-2`,`#social-tools`,e(`LmN0cGwtZnVsbGJhbm5lcg==`),`.zergnet-recommend`,`.yt.btn-link.btn-md.btn`]}}async function Br({debug:e}={}){if(!Vr())return;let t=zr(),n=Object.keys(t),r=await Hr([].concat(...n.map(e=>t[e])));e&&Wr(t,r);let i=n.filter(e=>{let n=t[e];return z(n.map(e=>r[e]))>n.length*.6});return i.sort(),i}function Vr(){return K()||In()}async function Hr(e){var t;let n=document,r=n.createElement(`div`),i=Array(e.length),a={};Ur(r);for(let t=0;t<e.length;++t){let a=Kn(e[t]);a.tagName===`DIALOG`&&a.show();let o=n.createElement(`div`);Ur(o),o.appendChild(a),r.appendChild(o),i[t]=a}for(;!n.body;)await Xt(50);n.body.appendChild(r);try{for(let t=0;t<e.length;++t)i[t].offsetParent||(a[e[t]]=!0)}finally{(t=r.parentNode)==null||t.removeChild(r)}return a}function Ur(e){e.style.setProperty(`visibility`,`hidden`,`important`),e.style.setProperty(`display`,`block`,`important`)}function Wr(e,t){let n="DOM blockers debug:\n```";for(let r of Object.keys(e)){n+=`\n${r}:`;for(let i of e[r])n+=`\n  ${t[i]?`🚫`:`➡️`} ${i}`}console.log(`${n}\n\`\`\``)}function Gr(){for(let e of[`rec2020`,`p3`,`srgb`])if(matchMedia(`(color-gamut: ${e})`).matches)return e}function Kr(){if(qr(`inverted`))return!0;if(qr(`none`))return!1}function qr(e){return matchMedia(`(inverted-colors: ${e})`).matches}function Jr(){if(Yr(`active`))return!0;if(Yr(`none`))return!1}function Yr(e){return matchMedia(`(forced-colors: ${e})`).matches}var Xr=100;function Zr(){if(matchMedia(`(min-monochrome: 0)`).matches){for(let e=0;e<=Xr;++e)if(matchMedia(`(max-monochrome: ${e})`).matches)return e;throw Error(`Too high value`)}}function Qr(){if(Z(`no-preference`))return 0;if(Z(`high`)||Z(`more`))return 1;if(Z(`low`)||Z(`less`))return-1;if(Z(`forced`))return 10}function Z(e){return matchMedia(`(prefers-contrast: ${e})`).matches}function $r(){if(ei(`reduce`))return!0;if(ei(`no-preference`))return!1}function ei(e){return matchMedia(`(prefers-reduced-motion: ${e})`).matches}function ti(){if(ni(`reduce`))return!0;if(ni(`no-preference`))return!1}function ni(e){return matchMedia(`(prefers-reduced-transparency: ${e})`).matches}function ri(){if(ii(`high`))return!0;if(ii(`standard`))return!1}function ii(e){return matchMedia(`(dynamic-range: ${e})`).matches}var Q=Math,$=()=>0;function ai(){let e=Q.acos||$,t=Q.acosh||$,n=Q.asin||$,r=Q.asinh||$,i=Q.atanh||$,a=Q.atan||$,o=Q.sin||$,s=Q.sinh||$,c=Q.cos||$,l=Q.cosh||$,u=Q.tan||$,d=Q.tanh||$,f=Q.exp||$,p=Q.expm1||$,m=Q.log1p||$;return{acos:e(.12312423423423424),acosh:t(1e308),acoshPf:(e=>Q.log(e+Q.sqrt(e*e-1)))(1e154),asin:n(.12312423423423424),asinh:r(1),asinhPf:(e=>Q.log(e+Q.sqrt(e*e+1)))(1),atanh:i(.5),atanhPf:(e=>Q.log((1+e)/(1-e))/2)(.5),atan:a(.5),sin:o(-1e300),sinh:s(1),sinhPf:(e=>Q.exp(e)-1/Q.exp(e)/2)(1),cos:c(10.000000000123),cosh:l(1),coshPf:(e=>(Q.exp(e)+1/Q.exp(e))/2)(1),tan:u(-1e300),tanh:d(1),tanhPf:(e=>(Q.exp(2*e)-1)/(Q.exp(2*e)+1))(1),exp:f(1),expm1:p(1),expm1Pf:(e=>Q.exp(e)-1)(1),log1p:m(10),log1pPf:(e=>Q.log(1+e))(10),powPI:(e=>Q.pow(Q.PI,e))(-100)}}var oi=`mmMwWLliI0fiflO&1`,si={default:[],apple:[{font:`-apple-system-body`}],serif:[{fontFamily:`serif`}],sans:[{fontFamily:`sans-serif`}],mono:[{fontFamily:`monospace`}],min:[{fontSize:`1px`}],system:[{fontFamily:`system-ui`}]};function ci(){return ui((e,t,n)=>{let r={},i={};for(let n of Object.keys(si)){let[i={},a=oi]=si[n],o=e.createElement(`span`);o.textContent=a,o.style.whiteSpace=`nowrap`;for(let e of Object.keys(i)){let t=i[e];t!==void 0&&(o.style[e]=t)}r[n]=o,t.append(e.createElement(`br`),o)}let a=G()&&jn();for(let e of Object.keys(si)){let t=r[e].getBoundingClientRect().width;i[e]=a?li(t*n.devicePixelRatio):t}return i})}function li(e){let t=10**(In()?0:3);return Math.floor(e*t)/t}function ui(e,t=4e3){return Gn((n,r)=>{let i=r.document,a=i.body,o=a.style;o.width=`${t}px`,o.webkitTextSizeAdjust=o.textSizeAdjust=`none`,G()?a.style.zoom=`${1/r.devicePixelRatio}`:K()&&(a.style.zoom=`reset`);let s=i.createElement(`div`);return s.textContent=[...Array(t/20<<0)].map(()=>`word`).join(` `),a.appendChild(s),e(i,a,r)},`<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">`)}function di(){return navigator.pdfViewerEnabled}function fi(){let e=new Float32Array(1),t=new Uint8Array(e.buffer);return e[0]=1/0,e[0]-=e[0],t[3]}function pi(){let{ApplePaySession:e}=window;if(typeof e?.canMakePayments!=`function`)return-1;if(mi())return-3;try{return+!!e.canMakePayments()}catch(e){return hi(e)}}var mi=Jn;function hi(e){if(e instanceof Error&&e.name===`InvalidAccessError`&&/\bfrom\b.*\binsecure\b/i.test(e.message))return-2;throw e}function gi(){let e=document.createElement(`a`),t=e.attributionSourceId??e.attributionsourceid;return t===void 0?void 0:String(t)}var _i=-1,vi=-2,yi=new Set([10752,2849,2884,2885,2886,2928,2929,2930,2931,2932,2960,2961,2962,2963,2964,2965,2966,2967,2968,2978,3024,3042,3088,3089,3106,3107,32773,32777,32777,32823,32824,32936,32937,32938,32939,32968,32969,32970,32971,3317,33170,3333,3379,3386,33901,33902,34016,34024,34076,3408,3410,3411,3412,3413,3414,3415,34467,34816,34817,34818,34819,34877,34921,34930,35660,35661,35724,35738,35739,36003,36004,36005,36347,36348,36349,37440,37441,37443,7936,7937,7938]),bi=new Set([34047,35723,36063,34852,34853,34854,34229,36392,36795,38449]),xi=[`FRAGMENT_SHADER`,`VERTEX_SHADER`],Si=[`LOW_FLOAT`,`MEDIUM_FLOAT`,`HIGH_FLOAT`,`LOW_INT`,`MEDIUM_INT`,`HIGH_INT`],Ci=`WEBGL_debug_renderer_info`,wi=`WEBGL_polygon_mode`;function Ti({cache:e}){let t=Di(e);if(!t)return _i;if(!Ni(t))return vi;let n=ji()?null:t.getExtension(Ci);return{version:t.getParameter(t.VERSION)?.toString()||``,vendor:t.getParameter(t.VENDOR)?.toString()||``,vendorUnmasked:n?t.getParameter(n.UNMASKED_VENDOR_WEBGL)?.toString():``,renderer:t.getParameter(t.RENDERER)?.toString()||``,rendererUnmasked:n?t.getParameter(n.UNMASKED_RENDERER_WEBGL)?.toString():``,shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION)?.toString()||``}}function Ei({cache:e}){let t=Di(e);if(!t)return _i;if(!Ni(t))return vi;let n=t.getSupportedExtensions(),r=t.getContextAttributes(),i=[],a=[],o=[],s=[],c=[];if(r)for(let e of Object.keys(r))a.push(`${e}=${r[e]}`);let l=ki(t);for(let e of l){let n=t[e];o.push(`${e}=${n}${yi.has(n)?`=${t.getParameter(n)}`:``}`)}if(n)for(let e of n){if(e===Ci&&ji()||e===wi&&Mi())continue;let n=t.getExtension(e);if(!n){i.push(e);continue}for(let e of ki(n)){let r=n[e];s.push(`${e}=${r}${bi.has(r)?`=${t.getParameter(r)}`:``}`)}}for(let e of xi)for(let n of Si){let r=Oi(t,e,n);c.push(`${e}.${n}=${r.join(`,`)}`)}return s.sort(),o.sort(),{contextAttributes:a,parameters:o,shaderPrecisions:c,extensions:n,extensionParameters:s,unsupportedExtensions:i}}function Di(e){if(e.webgl)return e.webgl.context;let t=document.createElement(`canvas`),n;t.addEventListener(`webglCreateContextError`,()=>n=void 0);for(let e of[`webgl`,`experimental-webgl`]){try{n=t.getContext(e)}catch{}if(n)break}return e.webgl={context:n},n}function Oi(e,t,n){let r=e.getShaderPrecisionFormat(e[t],e[n]);return r?[r.rangeMin,r.rangeMax,r.precision]:[]}function ki(e){return Object.keys(e.__proto__).filter(Ai)}function Ai(e){return typeof e==`string`&&!e.match(/[^A-Z0-9_x]/)}function ji(){return J()}function Mi(){return G()||K()}function Ni(e){return typeof e.getParameter==`function`}function Pi(){if(!(In()||K()))return-2;if(!window.AudioContext)return-1;let e=new AudioContext().baseLatency;return e==null?-1:isFinite(e)?e:-3}function Fi(){if(!window.Intl)return-1;let e=window.Intl.DateTimeFormat;if(!e)return-2;let t=e().resolvedOptions().locale;return!t&&t!==``?-3:t}function Ii(e){return/not/i.test(e)}async function Li(){let e=navigator.userAgentData;if(!e)return;let t=e.brands.filter(({brand:e})=>!Ii(e)).map(({brand:e})=>e),n={brands:t.length>1?t.filter(e=>e!==`Chromium`):t,mobile:e.mobile,platform:e.platform};if(e.getHighEntropyValues)try{let t=await e.getHighEntropyValues([`architecture`,`bitness`,`model`,`platformVersion`]);n.architecture=t.architecture,n.bitness=t.bitness,n.model=t.model,n.platformVersion=t.platformVersion}catch(e){if(e instanceof DOMException&&e.name===`NotAllowedError`)n.highEntropyStatus=`not_allowed`;else throw e}return n}var Ri={userAgentData:Li,fonts:Qn,domBlockers:Br,fontPreferences:ci,audio:Rn,screenFrame:Cr,canvas:er,osCpu:dr,languages:fr,colorDepth:pr,deviceMemory:mr,screenResolution:hr,hardwareConcurrency:Er,timezone:Or,sessionStorage:Ar,localStorage:jr,indexedDB:Mr,openDatabase:Nr,cpuClass:Pr,platform:Fr,plugins:$n,touchSupport:ur,vendor:Ir,vendorFlavors:Lr,cookiesEnabled:Rr,colorGamut:Gr,invertedColors:Kr,forcedColors:Jr,monochrome:Zr,contrast:Qr,reducedMotion:$r,reducedTransparency:ti,hdr:ri,math:ai,pdfViewerEnabled:di,architecture:fi,applePay:pi,privateClickMeasurement:gi,audioBaseLatency:Pi,dateTimeLocale:Fi,webGlBasics:Ti,webGlExtensions:Ei};function zi(e){return Sn(Ri,e,[])}var Bi=`$ if upgrade to Pro: https://fingerprint.com/github/?utm_source=oss&utm_medium=referral&utm_campaign=confidence_score`;function Vi(e){let t=Hi(e),n=Ui(t);return{score:t,comment:Bi.replace(/\$/g,`${n}`)}}function Hi(e){if(In())return .4;if(K())return En()&&!(Y()&&q())?.5:.3;let t=`value`in e.platform?e.platform.value:``;return/^Win/.test(t)?.6:/^Mac/.test(t)?.5:.7}function Ui(e){return on(.99+.01*e,1e-4)}function Wi(e){let t=``;for(let n of Object.keys(e).sort()){let r=e[n],i=`error`in r?`error`:JSON.stringify(r.value);t+=`${t?`|`:``}${n.replace(/([:|\\])/g,`\\$1`)}:${i}`}return t}function Gi(e){return JSON.stringify(e,(e,t)=>t instanceof Error?vn(t):t,2)}function Ki(e){return _n(Wi(e))}function qi(e){let t;return{get visitorId(){return t===void 0&&(t=Ki(this.components)),t},set visitorId(e){t=e},confidence:Vi(e),components:e,version:Yt}}function Ji(e=50){return Qt(e,e*2)}function Yi(e,t){let n=Date.now();return{async get(r){let i=Date.now(),a=await e(),o=qi(a);return(t||r?.debug)&&console.log(`Copy the text below to get the debug data:

\`\`\`
version: ${o.version}
userAgent: ${navigator.userAgent}
timeBetweenLoadAndGet: ${i-n}
visitorId: ${o.visitorId}
components: ${Gi(a)}
\`\`\``),o}}}function Xi(){if(!(window.__fpjs_d_m||Math.random()>=.001))try{let e=new XMLHttpRequest;e.open(`get`,`https://m1.openfpcdn.io/fingerprintjs/v${Yt}/npm-monitoring`,!0),e.send()}catch(e){console.error(e)}}async function Zi(e={}){let{delayFallback:t,debug:n,monitoring:r=!0}=e;return r&&Xi(),await Ji(t),Yi(zi({cache:{},debug:n}),n)}var Qi={load:Zi,hashComponents:Ki,componentsToDebugString:Gi},$i=_n,ea=`modulepreload`,ta=function(e,t){return new URL(e,t).href},na={},ra=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=ta(t,n),t in na)return;na[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:ea,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};try{let{webVitalsActive:e,httpPerformanceActive:t,setQrynInstance:n}=h.getState();(e||t)&&(async()=>await Jt)().then(e=>e.load())?.then(e=>e.get())?.then(({visitorId:e})=>{n(e)})}catch(e){console.log(e)}var ia=(0,M.lazy)(()=>ra(()=>import(`./App-vw_pu-ON.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url)),aa=(0,M.lazy)(()=>ra(()=>import(`./DataSources-CYTVJoLh.js`),__vite__mapDeps([15,1,3,4,5,6,2,7,16,9,11,14]),import.meta.url)),oa=(0,M.lazy)(()=>ra(()=>import(`./Main-D2FNF1U0.js`),__vite__mapDeps([17,1,3,4,5,6,2,7,8,9,10,11,12,13,18,19,16,20,21,14,22,23]),import.meta.url)),sa=(0,M.lazy)(()=>ra(()=>import(`./Plugins-ERuF9KRp.js`),__vite__mapDeps([24,1,2,3,4,5,6,7,14,11,12]),import.meta.url)),ca=(0,M.lazy)(()=>ra(()=>import(`./UserRoles-CFyUvXAM.js`),__vite__mapDeps([25,1,2,3,4,5,6,7,22]),import.meta.url));Me(s),le.createRoot(document.getElementById(`root`)).render(w(M.StrictMode,{children:w(p,{children:D(d,{store:m,children:[w(c,{basename:``,children:w(M.Suspense,{fallback:w(Kt,{}),children:w(l,{children:D(o,{path:`/`,element:w(ia,{}),children:[w(o,{index:!0,element:w(oa,{})}),w(o,{path:`/search/*`,index:!0,element:w(oa,{})}),w(o,{path:`/plugins`,element:w(sa,{})}),w(o,{path:`/users`,element:w(ca,{})}),w(o,{path:`/datasources/*`,element:D(qt,{children:[` `,w(aa,{})]})})]})})})}),w(yt,{})]})})}));export{Ce as A,fe as B,Ae as C,Ee as D,De as E,_e as F,ue as H,ge as I,he as L,xe as M,be as N,Te as O,N as P,me as R,Ie as S,Oe as T,de as V,yt as _,Pt as a,Ve as b,kt as c,At as d,Ct as f,xt as g,St as h,It as i,Se as j,we as k,Dt as l,Et as m,zt as n,Mt as o,jt as p,Lt as r,Ot as s,Bt as t,wt as u,ot as v,ke as w,Le as x,et as y,pe as z};