import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{i as t}from"./react-I6BVr-8O.js";import{c as n,l as r,n as i,st as a,t as o,u as s,ut as c}from"./emotion-css.esm-zLgD89SO.js";import{t as l}from"./Button-BGtZ6383.js";var u=``+new URL(`qryn-logo-Ch2-Iq6y.png`,import.meta.url).href,d=e=>{let{height:t}=e;return n(`img`,{src:u,alt:`qryyn View`,height:t||`24px`,className:`logo`})},f=a.div`
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
`,p=a.div`
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
`,m=a.input`
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
`,h=a.textarea`
    display: flex;
    flex: 1;
    background: ${({theme:e})=>e.deep};
    color: ${({theme:e})=>e.contrast};
    border: 1px solid ${({theme:e})=>e.accentNeutral};
    border-radius: 3px;
    justify-self: flex-end;
    padding-left: 8px;
`,g=a.div`
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
`,_=a.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    flex-wrap: wrap;
    align-items: center;
    flex: 1;
    &.internal {
        max-width: 400px;
    }
`;a.div`
    display: flex;
    margin: 15px 0px;
    margin-left: 14px;
    align-items: center;
`;var v=a.div`
    padding: 10px;
`,y=a.div`
    margin: 10px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({theme:e})=>e.background};
`,b=a.div`
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
`,x=a.div`
    padding: 10px;
    border-radius: 0px 0px 3px 3px;
    border-top: 1px solid ${({theme:e})=>e.accentNeutral};
`,S=a(l)`
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
`,C=e=>{let{value:t,onClick:r,primary:i,title:a,disabled:o}=e;return n(S,{disabled:o,title:a,onClick:r,primary:i,children:t})},w={metrics_icon:``+new URL(`metrics_icon-BLJDMBj5.png`,import.meta.url).href,logs_icon:``+new URL(`logs_icon-BKEwRlc4.png`,import.meta.url).href,traces_icon:``+new URL(`traces_icon-BqGoDW-P.png`,import.meta.url).href},T=({icon:e,style:t})=>n(`img`,{height:`20px`,className:`logo`,style:t,src:w[e]||``+new URL(`logs_icon-BKEwRlc4.png`,import.meta.url).href,alt:e}),E=e=>{let{value:t,label:i,onChange:a,locked:o,type:s,placeholder:l,error:u,labelWidth:d}=e;return r(g,{children:[n(p,{width:d||null,children:i}),n(m,{className:`ds-input`,disabled:o,error:u||!1,onChange:a,type:s,value:c.sanitize(t),placeholder:l})]})},D=e(t(),1),O=e=>o`
    display: flex;
    min-width: 100px;
    flex: ${+!!e};
    -ms-flex: ${+!!e};
`,k=({value:e,locked:t,onChange:a,opts:o,label:s,labelWidth:l,name:u,fullWidth:d,width:f})=>{let[m,h]=(0,D.useState)(``),_=(0,D.useRef)(null),v=(0,D.useMemo)(()=>o&&o[0]&&typeof o[0]==`string`?o?.map(e=>({value:e,name:e})):o,[o]);return(0,D.useEffect)(()=>{let t=v?.find(t=>t.name===e)?.value;t&&_?.current?.value!==t&&(h(t),_.current.value=t)},[e]),r(g,{width:f,children:[s?.length>0&&n(p,{width:l||null,children:s}),n(`select`,{ref:_,className:i(O(d)),disabled:t,defaultValue:c.sanitize(m),onChange:e=>a(e,u),children:v?.map((e,t)=>n(`option`,{value:c.sanitize(e.value),children:e.name},t))})]})},A=e=>{let{value:t,onChange:i,locked:a,label:o}=e;return r(g,{children:[n(p,{children:o}),n(s,{disabled:a,size:`small`,checked:t,onChange:i})]})};export{C as a,v as c,y as d,f,d as h,T as i,g as l,h as m,k as n,x as o,b as p,E as r,_ as s,A as t,p as u};