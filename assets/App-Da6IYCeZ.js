import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{i as t,t as n}from"./react-I6BVr-8O.js";import{V as r,W as i,X as a,Z as o,z as s}from"./vendor-BAhDbYMS.js";import{a as c}from"./store-5naQc6cl.js";import{I as l,M as u,N as d,Q as f,U as p,c as m,i as h,j as g,l as _,n as v,s as y,st as ee,t as b}from"./emotion-css.esm-zLgD89SO.js";import{S as x,v as S}from"./Button-BGtZ6383.js";import{Z as C,et as w,i as T,it as E,m as D,n as O,ot as k,r as A,t as j,tt as M,u as N}from"./consts-DsjQ7VOl.js";import{n as P,p as F}from"./DeleteOutlineOutlined-BJMBb4rH.js";import{t as I}from"./notifications-ZdfihOE5.js";import{t as L}from"./useWebVitals-u6p42mRN.js";var R=e(t()),z=e(n()),B=e=>{let{absolute:t,children:n,classes:r,flexItem:i,light:a,orientation:o,textAlign:s,variant:c}=e;return p({root:[`root`,t&&`absolute`,c,a&&`light`,o===`vertical`&&`vertical`,i&&`flexItem`,n&&`withChildren`,n&&o===`vertical`&&`withChildrenVertical`,s===`right`&&o!==`vertical`&&`textAlignRight`,s===`left`&&o!==`vertical`&&`textAlignLeft`],wrapper:[`wrapper`,o===`vertical`&&`wrapperVertical`]},E,r)},V=l(`div`,{name:`MuiDivider`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.absolute&&t.absolute,t[n.variant],n.light&&t.light,n.orientation===`vertical`&&t.vertical,n.flexItem&&t.flexItem,n.children&&t.withChildren,n.children&&n.orientation===`vertical`&&t.withChildrenVertical,n.textAlign===`right`&&n.orientation!==`vertical`&&t.textAlignRight,n.textAlign===`left`&&n.orientation!==`vertical`&&t.textAlignLeft]}})(d(({theme:e})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:`solid`,borderColor:(e.vars||e).palette.divider,borderBottomWidth:`thin`,variants:[{props:{absolute:!0},style:{position:`absolute`,bottom:0,left:0,width:`100%`}},{props:{light:!0},style:{borderColor:e.alpha((e.vars||e).palette.divider,.08)}},{props:{variant:`inset`},style:{marginLeft:72}},{props:{variant:`middle`,orientation:`horizontal`},style:{marginLeft:e.spacing(2),marginRight:e.spacing(2)}},{props:{variant:`middle`,orientation:`vertical`},style:{marginTop:e.spacing(1),marginBottom:e.spacing(1)}},{props:{orientation:`vertical`},style:{height:`100%`,borderBottomWidth:0,borderRightWidth:`thin`}},{props:{flexItem:!0},style:{alignSelf:`stretch`,height:`auto`}},{props:({ownerState:e})=>!!e.children,style:{display:`flex`,textAlign:`center`,border:0,borderTopStyle:`solid`,borderLeftStyle:`solid`,"&::before, &::after":{content:`""`,alignSelf:`center`}}},{props:({ownerState:e})=>e.children&&e.orientation!==`vertical`,style:{"&::before, &::after":{width:`100%`,borderTop:`thin solid ${(e.vars||e).palette.divider}`,borderTopStyle:`inherit`}}},{props:({ownerState:e})=>e.orientation===`vertical`&&e.children,style:{flexDirection:`column`,"&::before, &::after":{height:`100%`,borderLeft:`thin solid ${(e.vars||e).palette.divider}`,borderLeftStyle:`inherit`}}},{props:({ownerState:e})=>e.textAlign===`right`&&e.orientation!==`vertical`,style:{"&::before":{width:`90%`},"&::after":{width:`10%`}}},{props:({ownerState:e})=>e.textAlign===`left`&&e.orientation!==`vertical`,style:{"&::before":{width:`10%`},"&::after":{width:`90%`}}}]}))),H=l(`span`,{name:`MuiDivider`,slot:`Wrapper`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.wrapper,n.orientation===`vertical`&&t.wrapperVertical]}})(d(({theme:e})=>({display:`inline-block`,paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`,whiteSpace:`nowrap`,variants:[{props:{orientation:`vertical`},style:{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`}}]}))),U=R.forwardRef(function(e,t){let n=u({props:e,name:`MuiDivider`}),{absolute:r=!1,children:i,className:a,orientation:o=`horizontal`,component:s=i||o===`vertical`?`div`:`hr`,flexItem:c=!1,light:l=!1,role:d=s===`hr`?void 0:`separator`,textAlign:p=`center`,variant:m=`fullWidth`,...h}=n,g={...n,absolute:r,component:s,flexItem:c,light:l,orientation:o,role:d,textAlign:p,variant:m},_=B(g);return(0,z.jsx)(V,{as:s,className:f(_.root,a),role:d,ref:t,ownerState:g,"aria-orientation":d===`separator`&&(s!==`hr`||o===`vertical`)?o:void 0,...h,children:i?(0,z.jsx)(H,{className:_.wrapper,ownerState:g,children:i}):null})});U&&(U.muiSkipListHighlight=!0);var W=g((0,z.jsx)(`path`,{d:`M19.3 16.9c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S11 12 11 14.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.2 3.2 1.4-1.4zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5M12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07c-.64-2.46-2.4-4.47-4.73-5.41V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8`}),`TravelExplore`),G=g((0,z.jsx)(`path`,{d:`M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11`}),`Extension`),K=g((0,z.jsx)(`path`,{d:`M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4`}),`PersonOutlineOutlined`),q=g((0,z.jsx)(`path`,{d:`M2 20h20v-4H2zm2-3h2v2H4zM2 4v4h20V4zm4 3H4V5h2zm-4 7h20v-4H2zm2-3h2v2H4z`}),`Storage`);function J(e){let{c:t}=e,n=a(),r=c(),{hash:o}=i(),s=`Link Copied To Clipboard`;function l(){n(x(!0)),setTimeout(()=>{if(navigator?.clipboard&&window.isSecureContext)navigator?.clipboard?.writeText(window.location.href).then(function(){n(O(r.add(o,{data:{href:window.location.href},description:`From Shared URL`},10))),n(S({type:j.success,message:s}))},function(e){console.log(`error on copy`,e)});else{let e=document.createElement(`textarea`);return e.value=window.location.href,e.style.position=`fixed`,e.style.left=`-999999px`,e.style.top=`-999999px`,document.body.appendChild(e),e.focus(),e.select(),new Promise((t,i)=>{n(O(r.add(o,{data:window.location.href,description:`From Shared URL`},10))),document.execCommand(`copy`)?t():i(),e.remove(),n(S({type:j.success,message:s}))})}},200)}return _(w,{onClick:l,disabled:!1,style:{fontSize:`12px`},children:[` `,m(A,{fontSize:`small`,className:t}),m(`span`,{children:`Copy Link`})]})}var Y=g((0,z.jsx)(`path`,{d:`M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z`}),`Menu`);ee.button`
    border: none;
    background: ${e=>e.theme.neutral};
    border: 1px solid ${e=>e.theme.accentNeutral};
    color: ${e=>e.theme.contrast};
    padding: 3px 12px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 26px;
`;var X=e=>({color:`${e.contrast}`,overflow:`visible`,fontSize:`12px`,background:`${e.shadow}`,border:`1px solid ${e.accentNeutral}`,mt:1.5,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1},"&:before":{content:`""`,display:`block`,position:`absolute`,top:0,right:14,width:10,height:10,borderLeft:`1px solid ${e.accentNeutral}`,borderTop:`1px solid ${e.accentNeutral}`,bgcolor:`${e.shadow}`,transform:`translateY(-50%) rotate(45deg)`,zIndex:0},"& .icon":{fontSize:`16px`,marginRight:`4px`,color:`${e.contrast}`},"& .item":{fontSize:`12px`,color:`${e.contrast}`}}),Z=e=>({display:`flex`,justifyContent:`center`,alignItems:`center`,marginLeft:2,paddingLeft:0,cursor:`pointer`,paddingRight:0,width:`30px`,height:`30px`,background:`none`,borderRadius:`3px`,color:`${e.accentNeutral}`,border:`1px solid ${e.accentNeutral}`});function Q(){let{key:e}=i(),t=o(e=>e.showDataSourceSetting),n=o(e=>e.currentUser.role),r=a(),c=h(),[l,u]=R.useState(null),d=(0,R.useMemo)(()=>!!l,[l]),[f,p]=(0,R.useState)(n||`superAdmin`);(0,R.useEffect)(()=>{p(n)},[n]),(0,R.useEffect)(()=>{v()},[e]);let g=e=>{e.stopPropagation(),e.preventDefault(),u(()=>e.currentTarget)},v=e=>{e?.stopPropagation(),e?.preventDefault(),u(()=>void 0)};return _(y,{children:[m(k,{sx:{display:`flex`,alignItems:`center`,textAlign:`center`},children:m(P,{title:`Settings`,children:m(`button`,{onClick:g,style:Z(c),"aria-controls":d?`account-menu`:void 0,"aria-haspopup":`true`,"aria-expanded":d?`true`:void 0,children:m(Y,{style:{width:`14px`,height:`14px`}})})})}),_(M,{id:`account-menu`,anchorEl:l,open:d,onClose:v,onClick:g,PaperProps:{elevation:0,sx:X(c)},TransitionComponent:F,transformOrigin:{horizontal:`right`,vertical:`top`},anchorOrigin:{horizontal:`right`,vertical:`top`},children:[m(J,{c:`icon`}),m(U,{}),_(w,{onClick:()=>{v(),r(D(!0))},className:`item`,children:[m(C,{className:`icon`}),` General Settings`]}),m(U,{}),m(s,{to:``,children:_(w,{className:`item`,children:[m(W,{className:`icon`}),`Search`]})}),m(s,{to:`/plugins`,children:_(w,{className:`item`,children:[m(G,{className:`icon`}),`Plugins`]})}),m(s,{to:`/users`,children:_(w,{className:`item`,children:[m(K,{className:`icon`}),`Users`]})}),t&&(f===`admin`||f===`superAdmin`)&&m(s,{to:`datasources`,children:_(w,{className:`item`,children:[m(q,{className:`icon`}),`Datasources`]})})]})]})}var te=``+new URL(`qryn-logo-Ch2-Iq6y.png`,import.meta.url).href,ne=()=>m(y,{children:i().pathname.split(`/`).map((e,t)=>e===``&&t===0?{name:`home`,link:``}:{name:`/${e}`,link:e}).map(({name:e,link:t},n)=>m(`a`,{href:t,className:`bread-link`,children:e},n))}),re=e=>b`
    background: ${e.shadow};
    height: 30px;
    padding: 4px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${e.accentNeutral};
    .logo-section {
        padding-top: 4px;
        margin: 0;
        .version {
            color: ${e.contrast};
            font-size: 10px;
            margin-left: 5px;
            margin-top: 4px;
        }
        .path {
            color: ${e.contrast};

            margin-top: 4px;
            margin-left: 20px;
            flex: 1;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 10px;
            letter-spacing: 1px;
            .bread-link {
                cursor: pointer;
                &:hover {
                    color: ${e.primary};
                }
            }
        }
    }
`,ie=()=>{let e=h();return _(`div`,{className:v(re(e)),children:[_(`div`,{className:`logo-section`,children:[m(`img`,{src:te,style:{height:`20px`},alt:`Qryn View`,height:`20px`,className:`logo`}),m(`p`,{className:`version`,children:`3.6.4`}),m(`p`,{className:`path`,children:m(ne,{})})]}),m(`div`,{style:{display:`flex`,alignItems:`center`},children:m(T,{section:`Status Bar`,localProps:e})}),m(Q,{})]})},$=e=>b`
    background: ${e.background};
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex: 1;
`;function ae(){let e=h(),t=o(e=>e.settingsDialogOpen);return L({page:`App`}),_(`div`,{className:v($(e)),children:[m(ie,{}),m(r,{}),m(I,{}),m(N,{open:t})]})}export{$ as MainAppStyles,ae as default};