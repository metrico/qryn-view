var de=Object.defineProperty;var ue=(t,n,i)=>n in t?de(t,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[n]=i;var I=(t,n,i)=>ue(t,typeof n!="symbol"?n+"":n,i);import{d as e,j as h,g as J,D as w,h as T,i as V,F as P,f as M,Q as he,k as pe,e as fe}from"./index-B56jiPHu.js";import{r as O}from"./react-DIWaIpl4.js";import{m as E,u as A,n as Z,s as ge,L as me,v as Se,w as ve,x as ye,p as xe,R as Ce}from"./vendor-BdPLc28b.js";import{D as ke,L as $,I as H,d as we,S as Ne,a as R,F,s as z,b as be,c as B,T as Oe,e as ee,f as De,P as Le}from"./AddOutlined-DPdVR7I6.js";import{d as te,s as ze}from"./DeleteOutlineOutlined-DjInisfP.js";import{S as U,r as Q}from"./createSvgIcon-D9Yj96mf.js";import{j as G}from"./reactDnd-BPxy8ERY.js";import{d as ne}from"./reactSelect-BedkNtp3.js";import"./memoize-cXKcxwUz.js";const j=t=>{const{value:n,onClick:i,primary:c,title:l}=t;return e(ke,{title:l,onClick:i,primary:c,children:n})},Ae=t=>T("display:flex;flex:",t?1:0,";",""),ae=({value:t,locked:n,onChange:i,opts:c,label:l,labelWidth:f,name:S,fullWidth:C,width:v})=>{const[y,x]=O.useState(""),N=O.useRef(null),k=O.useMemo(()=>typeof c[0]=="string"?c.map(u=>({value:u,name:u})):c,[c]);return O.useEffect(()=>{var m,a;const u=(m=k==null?void 0:k.find(r=>r.name===t))==null?void 0:m.value;u&&((a=N==null?void 0:N.current)==null?void 0:a.value)!==u&&(x(u),N.current.value=u)},[t]),h(H,{width:v,children:[(l==null?void 0:l.length)>0&&e($,{width:f||null,children:l}),e("select",{ref:N,className:J(Ae(C)),disabled:n,defaultValue:w.sanitize(y),onChange:u=>i(u,S),children:k==null?void 0:k.map((u,m)=>e("option",{value:w.sanitize(u.value),children:u.name},m))})]})},se=t=>{const{value:n,onChange:i,locked:c,label:l}=t;return h(H,{children:[e($,{children:l}),e(U,{disabled:c,size:"small",checked:n,onChange:i})]})};var W={},Ie=V;Object.defineProperty(W,"__esModule",{value:!0});var ie=W.default=void 0,Je=Ie(Q()),Fe=G;ie=W.default=(0,Je.default)((0,Fe.jsx)("path",{d:"m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4z"}),"CachedOutlined");var K={},Te=V;Object.defineProperty(K,"__esModule",{value:!0});var re=K.default=void 0,Ee=Te(Q()),Re=G;re=K.default=(0,Ee.default)((0,Re.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"}),"CheckCircle");const le=t=>n=>{n({type:"SET_IS_DATASOURCE_SAVED",isDsSaved:t})};var X={},_e=V;Object.defineProperty(X,"__esModule",{value:!0});var oe=X.default=void 0,je=_e(Q()),Pe=G;oe=X.default=(0,je.default)((0,Pe.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"}),"ErrorOutline");const ce=T({name:"vtwnvy",styles:"height:12px!important;width:12px!important;color:white;margin:0px 4px"}),Me=t=>T("display:flex;align-items:center;background:",t.primary,";color:white;font-size:11px;padding:4px;border-radius:3px;margin-right:10px;cursor:pointer;span{margin-right:4px;font-weight:bold;}",""),Ue=T({name:"1t9g6tg",styles:"display:flex;align-items:center;background:#b62c14;color:white;font-size:12px;padding:4px;border-radius:3px;margin-right:10px;cursor:pointer;span{margin-right:4px;font-weight:bold;}"}),$e=T({name:"9hkg7e",styles:"display:flex;align-items:center;font-size:12px;&.loading-icon{height:14px;width:14px;}"}),He=({setIsSaved:t})=>{const n=M();return h("div",{className:J(Me(n)),onClick:i=>t(!1),children:[e(re,{className:J(ce)})," ",e("span",{children:"Saved"})]})},Y=({errorText:t})=>h("div",{className:J(Ue),children:[e(oe,{className:J(ce)})," ",e("span",{children:t})]});function q(t){const{onClickAdd:n,isAdd:i,title:c,isEditing:l,fieldErrors:f}=t,S=E(),[C,v]=O.useState(!1);return O.useEffect(()=>(l&&(setTimeout(()=>{v(!0),S(le(!0))},800),v(!1)),v(!1),()=>{v(!1)}),[l]),h(Ne,{children:[c,h("div",{className:"edit-buttons",children:[l&&h("div",{className:$e,children:[e(ie,{style:{height:"13px",width:"13px"}})," ","Saving ..."]}),(f==null?void 0:f.protocol)&&e(Y,{errorText:"Insecure Mixed Content. Mixing HTTP and HTTPS is insecure and is not supported."}),(f==null?void 0:f.url)&&e(Y,{errorText:"Please complete API URL"}),C&&e(He,{setIsSaved:v}),i&&e(P,{children:e(we,{fontSize:"small",style:{cursor:"pointer",display:"flex"},onClick:n})})]})]})}const qe=t=>{const n=E(),i=A(u=>u.dataSources),[c,l]=O.useState(!1),{headers:f,id:S}=t,[C,v]=O.useState((t==null?void 0:t.cors)||!1),y=u=>{const m=u.target.checked,a=i.map(r=>(r.id===S&&(r.cors=m),r));v(()=>m),localStorage.setItem("dataSources",JSON.stringify(a)),n(z(a))},x=(u,m,a)=>{l(()=>!0);const r=u.target.value,g=(i.find(p=>p.id===S).headers||[]).map(p=>(p.id===m&&(p[a]=r),p)),o=i.map(p=>(p.id===S&&(p.headers=[...g]),p));localStorage.setItem("dataSources",JSON.stringify(o)),n(z(o)),setTimeout(()=>{l(()=>!1)},800)},N=u=>{u.preventDefault();const m=i==null?void 0:i.find(s=>s.id===S),a=m.headers,r=JSON.parse(JSON.stringify([...i]));if(f.length>0){const s={...a[a.length-1],id:Z()},d={...m,headers:[...m.headers,s]},g=r==null?void 0:r.map(o=>o.id===S?{...d}:o);localStorage.setItem("dataSources",JSON.stringify(g)),n(z(g))}},k=(u,m)=>{const a=i==null?void 0:i.find(o=>o.id===S),s=[...f].filter(o=>o.id!==m),d={...a,headers:[...s]},g=i==null?void 0:i.map(o=>o.id===S?{...d}:o);localStorage.setItem("dataSources",JSON.stringify(g)),n(z(g))};return e("div",{className:"",children:f&&h(P,{children:[e(q,{title:"Custom HTTP Headers",isEdit:!1,isAdd:!0,isEditing:c,onClickAdd:N}),h(R,{children:[e($,{children:"Use CORS"})," ",e(U,{size:"small",checked:C,onChange:y})]}),f==null?void 0:f.map((u,m)=>e(R,{children:h(H,{children:[e(F,{label:"header",value:w.sanitize(u.header),onChange:a=>x(a,u.id,"header")}),e(F,{label:"value",value:w.sanitize(u.value),onChange:a=>x(a,u.id,"value")}),e(te,{onClick:a=>k(a,u.id),style:{cursor:"pointer",marginLeft:"10px"},fontSize:"small"})]})},m))]})})};function Ve(t){const n=ge(),i=M(),c=A(y=>y.urlLocation),l=E(),{title:f}=t,S=A(y=>y.isDsSaved),C=O.useMemo(()=>S?"Save":"Back",[S]),v=()=>{let y=(c==null?void 0:c.length)>0;l(le(!1)),n((y||C==="Back")&&f!=="DataSources"?-1:"")};return h("div",{className:"ds-header",children:[e("div",{style:{display:"flex",alignItems:"center"},children:h("div",{style:{display:"flex",flexDirection:"column"},children:[h("div",{style:{display:"flex"},children:[e(he,{}),e("h1",{children:f})]}),h("p",{style:{color:i.contrast,fontSize:"10px",marginTop:"5px",marginLeft:"10px",opacity:".5"},children:["v","0.28.8"]})]})}),e(j,{value:w.sanitize(C),onClick:v,editing:!0,primary:S})]})}const Be=t=>{const{id:n,name:i,regex:c,urlLabel:l,internalLink:f,linkType:S,locked:C,dataSourceId:v,fieldEditing:y}=t,x=E(),N=A(s=>s.dataSources),k=O.useMemo(()=>N.map(s=>({name:s.name,value:s.id})),[N]),u=(s,d)=>{y();const g=JSON.parse(JSON.stringify(N)),L=g.find(b=>b.id===v).linkedFields.map(b=>b.id===n?{...b,[s]:d}:b);return g.map(b=>b.id===v?{...b,linkedFields:L}:b)},m=s=>{y();const d=JSON.parse(JSON.stringify(N)),p=d.find(b=>b.id===v).linkedFields.filter(b=>b.id!==n),L=d.map(b=>b.id===v?{...b,linkedFields:[...p]}:b);localStorage.setItem("dataSources",JSON.stringify(L)),x(z(L))},a=(s,d)=>{y();const g=s.target.value,o=u(d,g);localStorage.setItem("dataSources",JSON.stringify(o)),x(z(o))},r=(s,d)=>{y();const g=!!s.target.checked,o=u(d,g);localStorage.setItem("dataSources",JSON.stringify(o)),x(z(o))};return h(be,{children:[h(R,{children:[e(F,{value:w.sanitize(i),label:"Name",onChange:s=>a(s,"name")}),e(F,{value:w.sanitize(c),label:"Regex",onChange:s=>a(s,"regex")}),e(F,{value:w.sanitize(l),label:"URL Label",onChange:s=>a(s,"urlLabel")}),e(te,{onClick:m,fontSize:"small",style:{marginLeft:"10px",cursor:"pointer",display:C?"none":"inline-block"}})]}),h(R,{className:"internal",children:[e(se,{value:f,label:"Internal Link",onChange:s=>r(s,"internalLink")}),e(ae,{label:"",value:w.sanitize(S),opts:k,selectType:"linkedField",onChange:s=>a(s,"linkID")})]})]})};class Qe{constructor(){I(this,"id");I(this,"dataSource");I(this,"ds_id");I(this,"name");I(this,"regex");I(this,"query");I(this,"urlLabel");I(this,"url");I(this,"internalLink");I(this,"linkType");this.id=Z(),this.dataSource="Logs",this.ds_id="logs",this.name="traceID",this.regex='^.*?"traceID" ="(w+)".*$/',this.query="${__value.raw}",this.urlLabel="",this.url="",this.internalLink=!0,this.linkType="Traces"}create(){const{id:n,dataSource:i,ds_id:c,name:l,regex:f,query:S,urlLabel:C,url:v,internalLink:y,linkType:x}=this;return{id:n,dataSource:i,ds_id:c,name:l,regex:f,query:S,urlLabel:C,url:v,internalLink:y,linkType:x}}}const Ge=t=>{const{linkedFields:n,name:i,id:c}=t,l=A(x=>x.dataSources),f=E(),[S,C]=O.useState(!1),v=()=>{const x=new Qe;x.dataSource=i,x.create();const k=[...JSON.parse(JSON.stringify(n)),{...x}],u=JSON.parse(JSON.stringify(l)),m=u==null?void 0:u.map(a=>a.id===c?{...a,linkedFields:k}:a);localStorage.setItem("dataSources",JSON.stringify(m)),f(z(m))},y=()=>{C(()=>!0),setTimeout(()=>{C(()=>!1)},800)};return(n==null?void 0:n.length)>0?h(P,{children:[e(q,{title:"Linked Fields",isEdit:!0,isAdd:!0,onClickAdd:v,isEditing:S}),e(B,{children:n==null?void 0:n.map((x,N)=>e(Be,{...x,dataSourceId:c,locked:!1,fieldEditing:y},N))})]}):null};function We(t){const{value:n,label:i,onChange:c,placeholder:l}=t;return h(H,{children:[e($,{children:i}),e(Oe,{className:"ds-input",onChange:c,placeholder:l,value:w.sanitize(n)})]})}function Ke(t){const{auth:n,id:i}=t,c=E(),l=A(a=>a.dataSources),[f,S]=O.useState([]),[C,v]=O.useState(!1),y=O.useMemo(()=>{var a;return(a=Object.entries(n))==null?void 0:a.map(([r,s])=>({name:r,...s})).filter(r=>r.name!=="fields")},[n]),x=O.useMemo(()=>{var a;return(a=Object.entries(n))==null?void 0:a.map(([r,s])=>({name:r,...s})).find(r=>r.name==="fields")},[n]),N=(a,r)=>{const s=JSON.parse(JSON.stringify(n));s[r].value=a;const g=JSON.parse(JSON.stringify(l)).map(o=>o.id===i?{...o,auth:{...s}}:o);return localStorage.setItem("dataSources",JSON.stringify(g)),c(z(g)),g};O.useEffect(()=>{var r,s;const a=(s=(r=y.filter(d=>d.form_type==="switch"&&!!(d!=null&&d.value)))==null?void 0:r.filter(d=>!!d.withFields))==null?void 0:s.map(d=>d.name);S(a)},[y,S]);const k=(a,r)=>{v(()=>!0);const s=a.target.value;N(s,r),setTimeout(()=>{v(()=>!1)},800)},u=(a,r)=>{v(()=>!0);const s=a.target.checked;N(s,r),setTimeout(()=>{v(()=>!1)},800)},m=(a,r,s)=>{var b;v(()=>!0);const d=a.target.value,g=JSON.parse(JSON.stringify(n)),o={...g,fields:{...g.fields,[s]:(b=g==null?void 0:g.fields[s])==null?void 0:b.map(D=>D.name===r?(D.value=d,{...D}):D)}},p=JSON.parse(JSON.stringify([...l])),L=p==null?void 0:p.map(D=>(D.id===i&&(D.auth=o),D));localStorage.setItem("dataSources",JSON.stringify(L)),c(z(L)),setTimeout(()=>{v(()=>!1)},600)};return h(P,{children:[e(q,{title:"HTTP Auth Fields",isEditing:C,isEdit:!1,isAdd:!1}),h(B,{children:[y&&y.map((a,r)=>a.form_type==="select"?e(ae,{value:w.sanitize(a.value),name:w.sanitize(a.name),onChange:s=>k(s,a.name),locked:!1,opts:a.options,label:a.label},r):a.form_type==="switch"?e(se,{label:a.label,value:a.value,onChange:s=>u(s,a.name)},r):null),e(R,{children:f&&f.map((a,r)=>{var s;return e(R,{children:x[a]&&((s=x[a])==null?void 0:s.map((d,g)=>d.form_type==="input"||d.form_type==="password"?e(F,{onChange:o=>m(o,d.name,a),type:d.form_type,value:w.sanitize(d.value),label:d.label,placeholder:d.placeholder},g):d.form_type==="textarea"?e(We,{onChange:o=>m(o,d.name,a),value:w.sanitize(d.value),label:d.label,placeholder:d.placeholder},g):null))},r)})})]})]})}const Xe=pe("div",{target:"emiacor0"})("position:absolute;left:0;top:0;background:",({theme:t})=>t.background,";display:flex;flex-direction:culumn;justify-content:center;color:",({theme:t})=>t.contrast,";flex:1;height:100%;width:100%;.body-cont{max-width:1440px;padding:10px;margin:10px;border-radius:3px;flex:1;background:",({theme:t})=>t.shadow,";overflow-y:auto;overflow-x:hidden;}.ds-header{padding:10px;padding-bottom:20px;font-size:24px;flex:1;display:flex;width:100%;justify-content:space-between;align-items:center;padding-left:0px;.logo{margin-right:10px;}}.ds-cont{margin-bottom:10px;border:1px solid ",({theme:t})=>t.accentNeutral,";border-radius:3px;overflow-y:auto;}.ds-item{padding:10px;border-radius:3px 3px 0px 0px;padding-bottom:14px;display:flex;.logo{padding:10px;padding-right:20px;padding-left:0px;}.ds-text{display:flex;flex-direction:column;flex:1;}.ds-type{font-size:18px;padding:10px;padding-left:0px;color:",({theme:t})=>t.contrast,";}small{font-size:12px;}.setting-icon{justify-self:flex-end;cursor:pointer;}.ds-settings{background:",({theme:t})=>t.background,";}}");function Ye(){const t=A(({dataSources:n})=>n);return(t==null?void 0:t.length)>0?e("div",{style:{margin:"10px"},children:t.map((n,i)=>{const{icon:c,id:l,name:f,type:S,url:C}=n;return e("div",{className:"ds-cont",children:e(me,{to:l,children:h("div",{className:"ds-item",children:[e(ee,{icon:c}),h("div",{className:"ds-text",children:[e("div",{className:"ds-type",children:f}),h("span",{children:[h("small",{children:[S," | "," "]}),e("small",{style:{userSelect:"all"},children:C})]})]})]})})},i)})}):e("div",{children:e("h1",{children:"No Data Sources Found."})})}const Ze=t=>{const{headers:n,id:i,linkedFields:c,name:l,url:f,cors:S}=t,C=E(),v=A(({dataSources:r})=>r),[y,x]=O.useState({url:!1,protocol:!1}),N=(r,s)=>{let d=s;r==="url"&&(d=s.replace(/\/$/,""));const g=JSON.parse(JSON.stringify(v));return g.forEach(o=>{o.id===i&&(o[r]=d)}),g},[k,u]=O.useState(!1),m=r=>{try{const s=window.location.protocol,d=new URL(r).protocol;return{value:s===d,error:""}}catch{return{value:!1,error:"url"}}},a=(r,s)=>{u(()=>!0);const d=r.target.value;if(s==="url"){const o=m(d);if((o==null?void 0:o.error)==="url"&&x(p=>({...p,url:!0})),!(o!=null&&o.value)&&(o==null?void 0:o.error)===""&&x(p=>({...p,protocol:!0})),(o==null?void 0:o.error)===""&&(o!=null&&o.value)){x(L=>({...L,protocol:!1,url:!1}));const p=N(s,d);localStorage.setItem("dataSources",JSON.stringify(p)),C(z(p)),setTimeout(()=>{u(()=>!1)},800)}}const g=N(s,d);localStorage.setItem("dataSources",JSON.stringify(g)),C(z(g)),setTimeout(()=>{u(()=>!1)},800)};return h(De,{children:[e(q,{isEditing:k,isEdit:!0,isAdd:!1,title:"DataSource Settings",fieldErrors:y}),e(B,{children:h(R,{children:[e(F,{value:w.sanitize(l),label:"Name",onChange:r=>a(r,"name")}),e(F,{value:w.sanitize(f),label:"URL",error:y.url||y.protocol,onChange:r=>a(r,"url")})]})}),e(Ke,{...t}),e(qe,{cors:S,headers:n,id:i}),e(Ge,{...t,linkedFields:c})]})},et=T({name:"9rq8lq",styles:"display:flex;align-items:center;justify-content:space-between;margin-right:20px"});function tt(t,n,i){let c={},l=i&&i!==""&&n&&n!=="",f=l?`${btoa(n)}:${btoa(i)}`:"",S=JSON.parse(JSON.stringify(t));return l&&f&&(c.auth=f),c.url=S,JSON.stringify(c)}function nt(t){const{url:n,auth:{basicAuth:i,fields:{basicAuth:[c,l]}}}=t,[f,S]=ve(["qryn-dev-cookie","qryn-settings"]),C=E(),v=A(k=>k.dataSources),y=()=>{const k=[...v],u=JSON.parse(JSON.stringify(k)),m=u==null?void 0:u.map(a=>({...a,url:w.sanitize(n),auth:{...a.auth,basicAuth:{...a.auth.basicAuth,value:i.value},fields:{...a.auth.fields,basicAuth:[...a.auth.fields.basicAuth].map(r=>r.name==="user"?{...r,value:w.sanitize(c.value)}:r.name==="password"?{...r,value:w.sanitize(l.value)}:r)}}}));localStorage.setItem("dataSources",JSON.stringify(m)),C(z(m)),C(fe({type:"success",message:"Set same URL and Basic Auth for All Data Sources"}))};function x(){const k=new Date;new Date().setDate(k.getDate()+1);try{S("qryn-settings",tt(n,c.value,l.value),{path:""})}catch(m){console.log(m)}}function N(){const{headers:k,id:u,name:m,linkedFields:a}=t,r=k==null?void 0:k.map(({header:o,value:p})=>({[o]:p})),d=`data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify({id:u,name:m,headers:r,linkedFields:a}))}`,g=document.createElement("a");g.href=d,g.download=`${m}_${u}.json`,g.click()}return h("div",{className:"ds-cont",children:[h("div",{className:J(et),children:[e(at,{...t}),h("div",{style:{display:"flex",alignItems:"center"},children:[e(j,{title:"Download Datasource settings as JSON",value:w.sanitize("Download JSON"),onClick:N,primary:!0}),e(j,{title:"Set Cookie with name: qryn-settings",value:w.sanitize("Save Cookie"),onClick:x,primary:!0}),e(j,{title:"Use same URL and Basic Auth for all Data Sources",value:w.sanitize("Use For All"),onClick:y,primary:!0})]})]}),e("div",{className:"ds-settings",children:e(Ze,{...t})})]})}const at=t=>{const{icon:n,name:i,type:c,url:l}=t;return h("div",{className:"ds-item",children:[e(ee,{icon:n}),h("div",{className:"ds-text",children:[e("div",{className:"ds-type",children:i}),h("small",{children:[w.sanitize(c)," | ",w.sanitize(l)]})]})]})};function st(){let{id:t}=Se();const n=M(),i=A(l=>l.dataSources),c=O.useMemo(()=>!i||i.length===0?{}:i.find(l=>l.id===t)||{},[t,i]);return e(ne,{theme:n,children:e(Xe,{children:h("div",{className:"body-cont",children:[e(Ve,{title:"DataSource Settings",datasource:c}),e("div",{className:"datasource-body",children:e(nt,{...c})})]})})})}const it=t=>T("display:flex;flex-direction:column;flex:1;flex-wrap:wrap;width:400px;border:1px solid ",t.accentNeutral,";padding:5px;border-radius:3px;margin-left:10px;",""),rt=T({name:"1reekiy",styles:"display:flex;padding:4px 12px;font-size:14px;border-radius:4px;white-space:nowrap;align-items:center;justify-content:space-between"}),lt=T({name:"t10jb8",styles:"margin:5px"}),ot=T({name:"1wnuhlc",styles:"margin-left:20px;display:flex;align-items:center;span{font-size:12px;}"}),ct=T({name:"17moij0",styles:"align-items:center;width:100%;display:flex;margin-top:10px;justify-content:space-between;flex:1"}),dt=t=>{const[n,i]=O.useState(""),[c,l]=O.useState(""),[f,S]=O.useState(""),[C,v]=O.useState(!1),[y,x]=O.useState(!1),N=A(p=>p.dataSources),k=E(),u="Save",m=M(),a=p=>{var D;const b=(((D=p==null?void 0:p.target)==null?void 0:D.value)||"").replace(/\/$/,"");i(()=>b)},r=p=>{l(()=>p.target.value)},s=p=>{S(()=>p.target.value)},d=p=>{v(()=>p.target.checked)},g=p=>{x(()=>p.target.checked)},o=p=>{const L=JSON.parse(JSON.stringify(N)),b=L==null?void 0:L.map(D=>({...D,url:n,auth:{...D.auth,basicAuth:{...D.auth.basicAuth,value:y},fields:{...D.auth.fields,basicAuth:[...D.auth.fields.basicAuth].map(_=>_.name==="user"?{..._,value:c}:_.name==="password"?{..._,value:f}:_)}}}));localStorage.setItem("dataSources",JSON.stringify(b)),k(z(b))};return h("div",{className:J(it(m)),children:[h("div",{className:J(rt),children:["Use one setting for all Data Sources",e(U,{checked:C,size:"small",onChange:d})]}),C&&h("div",{className:J(lt),children:[e(F,{value:w.sanitize(n),label:"url",onChange:a,placeholder:"http://qryn.dev"}),y&&h(P,{children:[e(F,{value:w.sanitize(c),label:"user",onChange:r,placeholder:"default"}),e(F,{value:w.sanitize(f),label:"password",onChange:s,type:"password",placeholder:""})]}),h("div",{className:J(ct),children:[h("div",{className:J(ot),children:[e("span",{children:"Use Basic Auth"})," ",e(U,{checked:y,size:"small",onChange:g})," "]}),e(j,{value:w.sanitize(u),onClick:o,editing:!1,primary:!0})]})]})]})};function Ct(t){const n=t.replace(/#/,""),i=decodeURIComponent(n),c=new URLSearchParams(i);for(let[l,f]of c)(l==="left"||l==="right")&&JSON.parse(f)}function kt(){const t=ye.useMediaQuery({query:"(prefers-color-scheme: dark)"}),n=E(),i=M(),c=A(l=>l.autoTheme);return O.useEffect(()=>{if(c){const l=t?"dark":"light";n(ze(l)),localStorage.setItem("theme",JSON.stringify({theme:l,auto:c}))}},[t,c,n]),h(ne,{theme:i,children:[e(Le,{children:h("div",{className:"cont",children:[e(Ye,{}),e("div",{style:{display:"flex",flex:1},children:e("div",{style:{height:"40px"},children:e(dt,{})})})]})}),e(Ce,{children:e(xe,{path:":id",element:e(st,{})})})]})}export{kt as default,Ct as getURlParams};
