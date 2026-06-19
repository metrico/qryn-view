import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{i as t,t as n}from"./react-I6BVr-8O.js";import{Z as r}from"./vendor-BAhDbYMS.js";import{c as i,i as a,j as o,l as s,n as c,s as l,t as u,u as d}from"./emotion-css.esm-zLgD89SO.js";import{t as f}from"./PluginManagerFactory-DB6_3AQd.js";import{t as p}from"./useWebVitals-u6p42mRN.js";var m=e(t(),1),h=e=>u`
    max-width: 1440px;
    padding: 10px;
    margin: 10px;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden;
    max-width: 1440px;
    align-self: center;
    .plugin-section {
        padding: 4px;
        font-size: 14px;
        color: ${e.contrast};
    }
    .page-header {
        border-bottom: 1px solid ${e.shadow};
        margin-bottom: 0.5em;
        padding: 1em 0.25em;
        display: flex;
        gap: 0.25em;
        align-items: baseline;
        h1 {
            font-size: 1.5em;
            color: ${e.contrast};
        }
        h3 {
            font-size: 1.25em;
            color: ${e.contrastNeutral};
        }
    }
    .cards-container {
        display: flex;
        flex-direction: row;
        flex: 1;
        gap: 1em;
    }
`,g=e=>u`
    padding: 10px;
    margin: 4px;
    background: ${e.shadow};
    border: 1px solid ${e.accentNeutral};
    color: ${e.contrast};
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 350px;
    border-radius: 3px;
    height: fit-content;

    .image {
        display: flex;
        align-items: center;
    }

    .title {
        font-size: 16px;
        padding: 4px;
        align-self: flex-start;
        display: flex;
        align-items: center;
        width: 100%;
        .plugin-name {
            flex: 1;
            margin-left: 10px;
        }
        .switch {
            display: flex;
            align-items: center;
            justify-self: end;
        }
    }
    .text {
        font-size: 12px;
        padding: 4px;
        line-height: 1.5;
    }
    .icon {
        font-size: 60px;
        opacity: 0.25;
    }
`;u`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;var _=o((0,e(n()).jsx)(`path`,{d:`M10.5 4.5c.28 0 .5.22.5.5v2h6v6h2c.28 0 .5.22.5.5s-.22.5-.5.5h-2v6h-2.12c-.68-1.75-2.39-3-4.38-3s-3.7 1.25-4.38 3H4v-2.12c1.75-.68 3-2.39 3-4.38S5.76 9.8 4.01 9.12L4 7h6V5c0-.28.22-.5.5-.5m0-2C9.12 2.5 8 3.62 8 5H4c-1.1 0-1.99.9-1.99 2v3.8h.29c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-.3c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7v.3H17c1.1 0 2-.9 2-2v-4c1.38 0 2.5-1.12 2.5-2.5S20.38 11 19 11V7c0-1.1-.9-2-2-2h-4c0-1.38-1.12-2.5-2.5-2.5`}),`ExtensionOutlined`),v=e=>{let{name:t,active:n,section:r}=e,a=f(),[o,s]=(0,m.useState)(n),c=(e,t,n)=>{s(()=>!n),a.togglePlugin(e,t,!n)};return i(l,{children:i(d,{size:`small`,checked:o,onChange:()=>c(r,t,o),inputProps:{"aria-label":`controlled`}})})},y=e=>{let{theme:t,name:n,description:r,section:a,active:o,visible:u}=e;return u?i(l,{children:s(`div`,{className:c(g(t)),children:[s(`div`,{className:`title`,children:[i(`div`,{className:`image`,children:i(_,{className:`icon`})}),s(`div`,{className:`plugin-name`,children:[` `,n]}),i(`div`,{className:`switch`,children:i(v,{active:o,name:n,section:a})})]}),i(`div`,{className:`text`,children:r})]})}):i(l,{})},b=({components:e,section:t})=>{let n=r(e=>e.currentUser.role),[o,s]=(0,m.useState)((0,m.useMemo)(()=>e?.filter(e=>e.roles.includes(n)),[n,e]));(0,m.useEffect)(()=>{if(n&&e){let t=e?.filter(e=>e.roles.includes(n));s(t)}},[n,e]);let c=a();return i(`div`,{style:{display:`flex`,gap:`.5em`},children:o?.length>0&&o?.map((e,n)=>i(y,{theme:c,name:e.name,active:e.active,visible:e.visible,section:t,description:e.description},n))})};function x(){let e=a();p({page:`Plugins`});let[t]=(0,m.useState)(f().getAll()),n=(0,m.useMemo)(()=>Object.keys(t)?.length>0?Object.entries(t):[],[t]);return s(`div`,{className:c(h(e)),children:[s(`div`,{className:`page-header`,children:[i(`h1`,{children:`Plugins`}),i(`h3`,{children:`(need to reload page to activate)`})]}),i(`div`,{className:`cards-container`,children:n?.length>0&&n?.map(([e,t],n)=>i(b,{components:t,section:e},n))})]})}export{x as default};