import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{i as t,t as n}from"./react-I6BVr-8O.js";import{J as r,Pt as i,X as a,Z as o}from"./vendor-BAhDbYMS.js";import{I as s,M as c,N as l,Q as u,U as d,X as f,Z as p,c as m,g as h,i as g,j as _,l as v,n as y,s as b,t as x,u as S,ut as C}from"./emotion-css.esm-I8gSeA_p.js";import{t as w}from"./actions-GzpIxyMi.js";var T=e(n()),E=_((0,T.jsx)(`path`,{d:`M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z`}),`Person`);function D(e){return p(`MuiAvatar`,e)}f(`MuiAvatar`,[`root`,`colorDefault`,`circular`,`rounded`,`square`,`img`,`fallback`]);var O=e(t()),k=e=>{let{classes:t,variant:n,colorDefault:r}=e;return d({root:[`root`,n,r&&`colorDefault`],img:[`img`],fallback:[`fallback`]},D,t)},A=s(`div`,{name:`MuiAvatar`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.colorDefault&&t.colorDefault]}})(l(({theme:e})=>({position:`relative`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:`50%`,overflow:`hidden`,userSelect:`none`,variants:[{props:{variant:`rounded`},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:{variant:`square`},style:{borderRadius:0}},{props:{colorDefault:!0},style:{color:(e.vars||e).palette.background.default,...e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:e.palette.grey[400],...e.applyStyles(`dark`,{backgroundColor:e.palette.grey[600]})}}}]}))),j=s(`img`,{name:`MuiAvatar`,slot:`Img`})({width:`100%`,height:`100%`,textAlign:`center`,objectFit:`cover`,color:`transparent`,textIndent:1e4}),M=s(E,{name:`MuiAvatar`,slot:`Fallback`})({width:`75%`,height:`75%`});function N({crossOrigin:e,referrerPolicy:t,src:n,srcSet:r}){let[i,a]=O.useState(!1);return O.useEffect(()=>{if(!n&&!r)return;a(!1);let i=!0,o=new Image;return o.onload=()=>{i&&a(`loaded`)},o.onerror=()=>{i&&a(`error`)},o.crossOrigin=e,o.referrerPolicy=t,o.src=n,r&&(o.srcset=r),()=>{i=!1}},[e,t,n,r]),i}var P=O.forwardRef(function(e,t){let n=c({props:e,name:`MuiAvatar`}),{alt:r,children:i,className:a,component:o=`div`,slots:s={},slotProps:l={},imgProps:d,sizes:f,src:p,srcSet:m,variant:g=`circular`,..._}=n,v=null,y={...n,component:o,variant:g},b=N({...d,...typeof l.img==`function`?l.img(y):l.img,src:p,srcSet:m}),x=p||m,S=x&&b!==`error`;y.colorDefault=!S,delete y.ownerState;let C=k(y),[w,E]=h(`root`,{ref:t,className:u(C.root,a),elementType:A,externalForwardedProps:{slots:s,slotProps:l,component:o,..._},ownerState:y}),[D,O]=h(`img`,{className:C.img,elementType:j,externalForwardedProps:{slots:s,slotProps:{img:{...d,...l.img}}},additionalProps:{alt:r,src:p,srcSet:m,sizes:f},ownerState:y}),[P,F]=h(`fallback`,{className:C.fallback,elementType:M,externalForwardedProps:{slots:s,slotProps:l},shouldForwardComponentProp:!0,ownerState:y});return v=S?(0,T.jsx)(D,{...O}):i||i===0?i:x&&r?r[0]:(0,T.jsx)(P,{...F}),(0,T.jsx)(w,{...E,children:v})}),F=_((0,T.jsx)(`path`,{d:`M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-2.98 1-5.77-1.59-5.19-4.56C6.95.71 2 6.58 2 12c0 5.52 4.48 10 10 10 5.89 0 10.54-5.08 9.95-11.01M8.5 15c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15m2-5C9.67 10 9 9.33 9 8.5S9.67 7 10.5 7s1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1`}),`Cookie`);function I(e){return e?.split(` `)?.map(e=>e[0]?.toUpperCase())?.slice(0,3)?.join(``)}var L={SUPER_ADMIN_ROLE:`superAdmin`,ADMIN_ROLE:`admin`,USER_ROLE:`user`,GUEST_ROLE:`guest`},R=`store_user`,z=()=>{let e=[];try{let t=localStorage.getItem(R);if(t&&typeof t==`string`){let n=JSON.parse(t);if(n&&n?.length>0)return e=n,e}return e}catch(t){return console.log(`Error on retrieving users from localstorage: `,t),e}},B=e=>{try{localStorage.setItem(R,JSON.stringify(e))}catch(e){console.log(`Error storing users data`,e)}},V=e=>x`
    background: ${e.background};
    padding: 10px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    .cont {
        display: flex;
        width: 100%;
        border-radius: 3px;
        max-width: 1280px;
        background: ${e.shadow};
        border: 1px solid ${e.accentNeutral};
        flex: 1;
        flex-direction: column;
    }
    .user-row {
        display: flex;
        align-items: center;
        margin: 5px;
        justify-content: space-between;
        border: 1px solid ${e.accentNeutral};
        padding: 10px;
        border-radius: 3px;
        height: 30px;

        p {
            color: ${e.contrast};
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
        }
        .avatar {
            color: ${e.contrast};
            font-size: 10px;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 4px;
            text-transform: uppercase;
        }

        select {
            margin-left: 4px;
            font-size: 12px;
            color: ${e.contrast};
            padding: 4px;
            border-radius: 3px;
            background: ${e.deep};
        }

        .user-role {
            display: flex;
            align-items: center;
            font-size: 10px;
            text-transform: uppercase;
            color: ${e.contrast};
            p {
                margin-left: 4px;
            }
        }

        .name-input {
            display: flex;
            align-items: center;
            padding: 4px;
            border: 1px solid ${e.accentNeutral};
            border-radius: 3px;
            background: ${e.deep};
            color: ${e.contrast};
            height: 26px;
            font-size: 12px;
        }

        .action-buttons {
            display: flex;
            align-items: center;
            gap: 4px;
            width: 80px;
            button {
                display: flex;
                align-items: center;
                flex: 1;
                background: ${e.shadow};
                border: 1px solid ${e.accentNeutral};
                border-radius: 3px;
                cursor: pointer;
                color: ${e.contrast};
                max-width: 25px;
                &:hover {
                    background: ${e.background};
                }
                .cookie-icon {
                    font-size: 15px;
                    color: ${e.contrast};
                }
            }
        }
    }
`,H=(e,t)=>x`
    padding: 4px;
    border-radius: 3px;
    font-size: 10px;
    text-transform: uppercase;
    color: ${t?e.primary:e.contrast} !important;
    color: ${e.deep};
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid ${e.accentNeutral};
    }
    &:after {
        content: "";
        margin-left: 4px;
        display: flex;
        width: 10px;
        height: 10px;
        border-radius: 3px;
        background: ${t?e.primary:e.shadow};
        border: 1px solid ${e.primary};
    }
`,U=({name:e})=>m(P,{children:I(e)}),W=e=>{let{user:t,onUserAdd:n,onUserChange:r,onUserRemove:i,onUserCookie:a,onUserSelect:o}=e,{name:s,role:c,active:l,id:u}=t,d=c===L.SUPER_ADMIN_ROLE,f=g(),[p,h]=(0,O.useState)(!1);return v(`div`,{className:`user-row`,children:[p?m(`p`,{children:m(`input`,{className:`name-input`,value:s,onChange:e=>{let n=e?.target?.value;n.trim()===``&&(n=`Qryn ${c}`),r(e,{...t,name:C.sanitize(n)})},onKeyDown:e=>{e.key===`Enter`&&h(()=>!1)}})}):v(`div`,{onClick:()=>{d||h(e=>!e)},className:`avatar`,children:[m(U,{name:s}),m(`span`,{children:s})]}),v(`div`,{className:`user-role`,children:[`Role:`,` `,d?m(`p`,{children:`Super Admin`}):v(`select`,{onChange:e=>{let n=e?.target?.value;r(e,{...t,role:n})},defaultValue:c,children:[m(`option`,{value:`user`,children:`User`}),m(`option`,{value:`admin`,children:`Admin`}),m(`option`,{value:`guest`,children:`Guest`})]})]}),v(`p`,{children:[`Active`,` `,!d&&m(S,{checked:l,size:`small`,inputProps:{"aria-label":`controlled`},onChange:e=>{let n=e?.target?.checked;r(e,{...t,active:n})}})]}),v(`div`,{onClick:e=>o(e,t),className:y(H(f,t.selected)),children:[`Current User`,` `]}),v(`div`,{className:`action-buttons`,children:[m(`button`,{title:`generate cookie from user`,onClick:e=>a(e,t),children:m(F,{className:`cookie-icon`})}),m(`button`,{title:`add user`,onClick:n,children:`+`}),!d&&m(`button`,{title:`remove user`,onClick:e=>i(e,u),children:`-`})]})]})},G=()=>{let e=a(),t=o(e=>e.currentUser),n=(0,O.useMemo)(()=>z(),[]),[s,c]=(0,O.useState)(n?.length>0?n:[{id:i(),name:`Qryn Admin`,role:`superAdmin`,active:!0,selected:!0}]),[l,u]=r([`user-cookie`]),d=()=>{c(e=>{let t=[...e,{id:i(),name:`Qryn User`,role:`user`,active:!0,selected:!1}];return B(t),t})},f=(t,n)=>{t.preventDefault(),c(e=>{let t=[...e].map(e=>e.id===n.id?{...n,selected:!0}:{...e,selected:!1});return B(t),t}),e(w({...n,selected:!0}))},p=(e,t)=>{e.preventDefault();let n=[...s].filter(e=>e.id!==t);c(()=>(B(n),n))},h=(n,r)=>{n.preventDefault();let i=[...s].map(e=>e.id===r.id?r:e);r.id===t.id&&e(w(r)),c(()=>i),B(i)},g=(e,t)=>{e.preventDefault();try{u(`user-cookie`,btoa(JSON.stringify(t)))}catch(e){console.log(e,`Error on setting user cookie`)}};return m(b,{children:s?.length>0&&s.map((e,t)=>m(W,{user:e,onUserAdd:d,onUserChange:h,onUserRemove:p,onUserCookie:g,onUserSelect:f},t))})},K=()=>m(`div`,{className:y(V(g())),children:m(`div`,{className:`cont`,children:m(G,{})})});export{K as default,z as getUsersFromLocal,B as setLocalUsers};