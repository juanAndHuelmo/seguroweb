"use strict";(globalThis.webpackChunkhuelmo_seguros=globalThis.webpackChunkhuelmo_seguros||[]).push([[547],{547(e,a,o){o.r(a),o.d(a,{default:()=>pe});var t=o(43),l=o(820),n=o(486),r=o(230),s=o(34),i=o(631),d=o(600),c=o(554),p=o(584),u=o(757),f=o(59),b=o(553),h=o(579);const g=l.Ay.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 390px;
  background: #eef2f7;
  color: #111827;
  overflow: hidden;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
`,x=l.Ay.aside`
  background: #111827;
  color: #fff;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;

  @media (max-width: 1100px) {
    position: sticky;
    top: 0;
    z-index: 20;
  }
`,y=l.Ay.div`
  display: grid;
  gap: 4px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  strong {
    font-size: 1rem;
  }

  span {
    color: #9ca3af;
    font-size: 0.82rem;
  }
`,m=l.Ay.nav`
  display: grid;
  gap: 7px;
`,v=l.Ay.button`
  width: 100%;
  border: 1px solid ${e=>e.$active?"rgba(255,255,255,0.22)":"transparent"};
  border-radius: 7px;
  background: ${e=>e.$active?"rgba(255,255,255,0.12)":"transparent"};
  color: #fff;
  cursor: pointer;
  padding: 11px 10px;
  text-align: left;
  font-weight: 800;

  small {
    display: block;
    margin-top: 3px;
    color: #9ca3af;
    font-weight: 600;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.09);
  }
`,k=l.Ay.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,j=l.Ay.div`
  min-height: 66px;
  padding: 12px 18px;
  border-bottom: 1px solid #dbe3ef;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,C=l.Ay.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #f9fafb;
`,w=l.Ay.button`
  border: none;
  border-radius: 999px;
  background: ${e=>e.$active?"#111827":"transparent"};
  color: ${e=>e.$active?"#fff":"#374151"};
  cursor: pointer;
  font-weight: 800;
  padding: 8px 12px;
`,A=l.Ay.div`
  flex: 1;
  overflow: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
`,$=l.Ay.div`
  width: ${e=>"mobile"===e.$mode?"390px":"100%"};
  max-width: ${e=>"mobile"===e.$mode?"390px":"1180px"};
  min-height: calc(100vh - 118px);
  background: var(--color-light);
  border: 1px solid #d1d5db;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.18);
`,P=l.Ay.div`
  height: 38px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;

  span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #d1d5db;
  }

  strong {
    margin-left: 8px;
    color: #6b7280;
    font-size: 0.78rem;
  }
`,S=l.Ay.div`
  height: calc(100% - 38px);
  min-height: calc(100vh - 156px);
  overflow: auto;

  .navbar {
    position: static;
  }
`,T=l.Ay.aside`
  background: #ffffff;
  border-left: 1px solid #dbe3ef;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1100px) {
    border-left: none;
    border-top: 1px solid #dbe3ef;
    min-height: 70vh;
  }
`,F=l.Ay.header`
  padding: 18px;
  border-bottom: 1px solid #e5e7eb;

  p {
    margin: 0 0 4px;
    color: #6b7280;
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
`,I=l.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px;
`,B=l.Ay.div`
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 14px;
`,z=(0,l.Ay)(B)`
  padding: 0;
  gap: 0;
  overflow: hidden;
`,N=l.Ay.button`
  width: 100%;
  border: none;
  background: ${e=>e.$open?"#f3f4f6":"#fff"};
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  text-align: left;

  strong {
    display: block;
    font-size: 0.95rem;
  }

  span {
    color: #6b7280;
    display: block;
    font-size: 0.74rem;
    font-weight: 700;
    margin-top: 3px;
  }
`,O=l.Ay.div`
  display: ${e=>e.$open?"grid":"none"};
  gap: 12px;
  padding: 14px;
  border-top: 1px solid #e5e7eb;
`,U=l.Ay.h3`
  margin: 0;
  font-size: 0.95rem;
`,D=l.Ay.label`
  display: grid;
  gap: 6px;
  color: #374151;
  font-size: 0.82rem;
  font-weight: 800;
`,E=l.Ay.span`
  color: #6b7280;
  font-size: 0.74rem;
  font-weight: 600;
`,G=l.Ay.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px;
  color: #111827;
  font: inherit;
`,L=l.Ay.textarea`
  width: 100%;
  min-height: 92px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px;
  color: #111827;
  font: inherit;
  resize: vertical;
`,M=l.Ay.div`
  display: grid;
  gap: 8px;
`,W=l.Ay.div`
  width: 100%;
  min-height: 118px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    background: #fff;
  }

  span {
    color: #9ca3af;
    font-size: 0.82rem;
  }
`,J=l.Ay.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
`,R=l.Ay.label`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-weight: 800;
  padding: 10px 12px;
  white-space: nowrap;

  input {
    display: none;
  }
`,V=l.Ay.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.78rem;
  line-height: 1.4;
`,H=l.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,Q=l.Ay.div`
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`,_=l.Ay.div`
  display: grid;
  grid-template-columns: 42px 1fr 64px;
  gap: 10px;
  align-items: center;

  input[type="color"] {
    width: 42px;
    height: 36px;
    padding: 2px;
  }

  input[type="range"] {
    width: 100%;
  }
`,q=l.Ay.button`
  border: 1px solid ${e=>e.$danger?"#fecaca":"#d1d5db"};
  border-radius: 6px;
  background: ${e=>e.$primary?"#111827":"#fff"};
  color: ${e=>e.$primary?"#fff":e.$danger?"#b91c1c":"#374151"};
  cursor: pointer;
  font-weight: 800;
  padding: 10px 12px;
`,K=l.Ay.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #eef2f7;
`,X=l.Ay.form`
  width: min(100%, 390px);
  display: grid;
  gap: 14px;
  padding: 26px;
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.14);

  h1 {
    margin: 0;
    font-size: 1.45rem;
  }

  p {
    margin: 0;
    color: #6b7280;
    line-height: 1.45;
  }
`,Y=l.Ay.p`
  color: #b91c1c !important;
  font-weight: 800;
`,Z=[{id:"services",title:"Servicios",hint:"Productos, textos e im\xe1genes",page:"home"},{id:"whyUs",title:"Beneficios",hint:"Por qu\xe9 elegirnos",page:"home"},{id:"about",title:"Nosotros",hint:"Historia y diferenciales",page:"about"},{id:"brokers",title:"Aseguradoras",hint:"Logos y textos",page:"brokers"},{id:"footer",title:"Contacto",hint:"Tel\xe9fono, email y redes",page:"contact"},{id:"forms",title:"Formularios",hint:"Colores de contacto y cotizaci\xf3n",page:"contact"},{id:"whatsapp",title:"WhatsApp",hint:"Bot\xf3n flotante",page:"home"},{id:"colors",title:"Colores",hint:"Paleta visual",page:"home"}],ee=e=>Array.isArray(e)?e.join("\n"):"",ae=e=>e.split("\n").map(e=>e.trim()).filter(Boolean);function oe(e){let{label:a,value:o,onChange:l}=e;const[n,r]=(0,t.useState)(!1);return(0,h.jsxs)(D,{children:[a,(0,h.jsxs)(M,{children:[(0,h.jsx)(W,{children:o?(0,h.jsx)("img",{src:(i=o,i?i.startsWith("http")||i.startsWith("data:")?i:"."+i:""),alt:""}):(0,h.jsx)("span",{children:"Sin imagen"})}),(0,h.jsxs)(J,{children:[(0,h.jsx)(G,{value:o||"",onChange:e=>l(e.target.value),placeholder:"Peg\xe1 un link o ruta de imagen"}),(0,h.jsxs)(R,{children:[n?"Subiendo...":"Subir",(0,h.jsx)("input",{type:"file",accept:"image/*",disabled:n,onChange:async e=>{var a;const o=null===(a=e.target.files)||void 0===a?void 0:a[0];if(!o)return;if(!o.type.startsWith("image/"))return window.alert("Seleccion\xe1 un archivo de imagen."),void(e.target.value="");if(o.size>5242880)return window.alert("La imagen es muy pesada. Us\xe1 una imagen menor a 5 MB."),void(e.target.value="");const t=localStorage.getItem(s.yn),n=new FormData;n.append("file",o),r(!0);try{const e=await fetch((0,s.e9)("/api/media/upload"),{method:"POST",headers:{Authorization:`Bearer ${t}`},body:n}),a=await e.json();if(!e.ok)return void window.alert(a.error||"No se pudo subir la imagen.");l(a.url)}catch(i){window.alert("No se pudo conectar con la API para subir la imagen.")}finally{r(!1),e.target.value=""}}})]})]}),(0,h.jsx)(V,{children:"Pod\xe9s pegar una URL, usar una imagen de `/Images/...` o subir JPG, PNG, WEBP, GIF o SVG hasta 5 MB."})]})]});var i}const te=e=>e.toString(16).padStart(2,"0"),le=e=>{let{r:a,g:o,b:t}=e;return`#${te(a)}${te(o)}${te(t)}`},ne=function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(a>=1)return e;const{r:o,g:t,b:l}=(e=>{const a=null===e||void 0===e?void 0:e.replace("#","");return a&&6===a.length?{r:parseInt(a.slice(0,2),16),g:parseInt(a.slice(2,4),16),b:parseInt(a.slice(4,6),16)}:{r:0,g:0,b:0}})(e);return`rgba(${o}, ${t}, ${l}, ${Number(a).toFixed(2)})`};function re(e){let{label:a,value:o,onChange:t,opacity:l=!1}=e;const n=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#000000";const a=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)$/);if(a){const e={r:Number(a[1]),g:Number(a[2]),b:Number(a[3])};return{hex:le(e),opacity:void 0===a[4]?1:Number(a[4])}}return{hex:e.startsWith("#")?e:"#000000",opacity:1}}(o);return(0,h.jsxs)(D,{children:[a,(0,h.jsxs)(Q,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)(G,{type:"color",value:n.hex,onChange:e=>t(ne(e.target.value,n.opacity))}),(0,h.jsx)(G,{value:o||"",onChange:e=>t(e.target.value),placeholder:"#064e3b o rgba(6, 78, 59, 0.85)"}),(0,h.jsxs)("span",{children:[Math.round(100*n.opacity),"%"]})]}),l&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("input",{type:"range",min:"0",max:"100",value:Math.round(100*n.opacity),onChange:e=>t(ne(n.hex,Number(e.target.value)/100))}),(0,h.jsx)(E,{children:"Opacidad del color. 100% es s\xf3lido."})]})]})]})}function se(e){let{id:a,title:o,summary:t,openPanel:l,setOpenPanel:n,children:r}=e;const s=l===a;return(0,h.jsxs)(z,{children:[(0,h.jsxs)(N,{type:"button",$open:s,onClick:()=>n(s?"":a),children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:o}),t&&(0,h.jsx)("span",{children:t})]}),(0,h.jsx)("strong",{children:s?"Cerrar":"Configurar"})]}),(0,h.jsx)(O,{$open:s,children:r})]})}function ie(e){let{colors:a={},fields:o,onChange:t}=e;return o.map(e=>(0,h.jsx)(re,{label:e.label,value:a[e.key]||e.fallback,opacity:e.opacity,onChange:o=>t({...a,[e.key]:o})},e.key))}function de(e){let{title:a="Colores de esta secci\xf3n",colors:o={},fields:t,onChange:l,panelId:n,summary:r,openPanel:s,setOpenPanel:i}=e;return n?(0,h.jsx)(se,{id:n,title:a,summary:r,openPanel:s,setOpenPanel:i,children:(0,h.jsx)(ie,{colors:o,fields:t,onChange:l})}):(0,h.jsxs)(B,{children:[(0,h.jsx)(U,{children:a}),(0,h.jsx)(ie,{colors:o,fields:t,onChange:l})]})}const ce={services:[{key:"background",label:"Fondo de secci\xf3n",fallback:"#f5f5f7",opacity:!0},{key:"cardBackground",label:"Fondo del panel",fallback:"#ffffff",opacity:!0},{key:"title",label:"T\xedtulo",fallback:"#1d1d1f"},{key:"text",label:"Texto",fallback:"#1d1d1f"},{key:"buttonBackground",label:"Bot\xf3n",fallback:"#064e3b",opacity:!0},{key:"buttonText",label:"Texto bot\xf3n",fallback:"#ffffff"},{key:"dockBackground",label:"Dock",fallback:"#1d1d1f",opacity:!0}],whyUs:[{key:"background",label:"Fondo de secci\xf3n",fallback:"#f5f5f7",opacity:!0},{key:"title",label:"T\xedtulo",fallback:"#1d1d1f"},{key:"itemBackground",label:"Fondo beneficio",fallback:"#ffffff",opacity:!0},{key:"itemText",label:"Texto beneficio",fallback:"#1d1d1f"}],about:[{key:"backgroundStart",label:"Fondo inicio",fallback:"#064e3b",opacity:!0},{key:"backgroundEnd",label:"Fondo fin",fallback:"#2d5016",opacity:!0},{key:"title",label:"T\xedtulo",fallback:"#ffffff"},{key:"text",label:"Texto",fallback:"#d1d5db"},{key:"accent",label:"Acento",fallback:"#10b981"},{key:"cardBackground",label:"Fondo tarjeta",fallback:"#ffffff",opacity:!0},{key:"buttonBackground",label:"Bot\xf3n",fallback:"#ffffff",opacity:!0},{key:"buttonText",label:"Texto bot\xf3n",fallback:"#064e3b"}],brokers:[{key:"backgroundStart",label:"Fondo inicio",fallback:"#064e3b",opacity:!0},{key:"backgroundEnd",label:"Fondo fin",fallback:"#2d5016",opacity:!0},{key:"title",label:"T\xedtulo",fallback:"#ffffff"},{key:"subtitle",label:"Subt\xedtulo",fallback:"#10b981"},{key:"cardBackground",label:"Fondo tarjeta",fallback:"#ffffff",opacity:!0},{key:"phone",label:"Tel\xe9fono",fallback:"#064e3b"}],footer:[{key:"background",label:"Fondo",fallback:"#ffffff",opacity:!0},{key:"title",label:"T\xedtulos",fallback:"#064e3b"},{key:"text",label:"Texto",fallback:"#1d1d1f"},{key:"link",label:"Links e \xedconos",fallback:"#064e3b"},{key:"socialBackground",label:"Fondo redes",fallback:"#f5f5f7",opacity:!0}],whatsapp:[{key:"background",label:"Fondo",fallback:"#25d366",opacity:!0},{key:"icon",label:"\xcdcono",fallback:"#ffffff"}],forms:[{key:"background",label:"Fondo",fallback:"#f2f2f7",opacity:!0},{key:"wrapper",label:"Panel",fallback:"#ffffff",opacity:!0},{key:"title",label:"T\xedtulo",fallback:"#1d1d1f"},{key:"buttonBackground",label:"Bot\xf3n",fallback:"#064e3b",opacity:!0},{key:"buttonText",label:"Texto bot\xf3n",fallback:"#ffffff"}]};const pe=function(){const{content:e,updateContent:a,resetContent:o}=(0,r.S)(),{theme:l,updateColor:z,resetColors:N,customThemes:O}=(0,t.useContext)(n.D),[E,M]=(0,t.useState)("services"),[W,J]=(0,t.useState)("home"),[R,V]=(0,t.useState)("desktop"),[Q,_]=(0,t.useState)("Sin cambios pendientes."),[te,le]=(0,t.useState)(!1),[ne,re]=(0,t.useState)(!1),[se,ie]=(0,t.useState)(!0),[pe,ue]=(0,t.useState)(!1),[fe,be]=(0,t.useState)(""),[he,ge]=(0,t.useState)(""),[xe,ye]=(0,t.useState)("");(0,t.useEffect)(()=>{(async()=>{const e=localStorage.getItem(s.yn);if(e)try{const a=await fetch((0,s.e9)("/api/auth/me"),{headers:{Authorization:`Bearer ${e}`}});ue(a.ok),a.ok||localStorage.removeItem(s.yn)}catch(a){localStorage.removeItem(s.yn),ue(!1)}finally{ie(!1)}else ie(!1)})()},[]);const me=(0,t.useMemo)(()=>Z.find(e=>e.id===E)||Z[0],[E]),ve=()=>{le(!0),_("Cambios sin guardar. Presion\xe1 Guardar para publicarlos.")},ke=(o,t)=>{ve(),a(o,{...e[o],...t})},je=(o,t)=>{ve(),a("styles",{...e.styles,[o]:t})},Ce=(o,t)=>{ve(),a("services",e.services.map((e,a)=>a===o?{...e,...t}:e))},we=(a,o)=>{ve(),ke("brokers",{items:e.brokers.items.map((e,t)=>t===a?{...e,...o}:e)})},Ae=async e=>{e.preventDefault(),ge("");try{const e=await fetch((0,s.e9)("/api/auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:fe})}),a=await e.json();if(!e.ok)return void ge(a.error||"Contrase\xf1a incorrecta.");localStorage.setItem(s.yn,a.token),be(""),ue(!0)}catch(a){ge("No se pudo conectar con la API.")}};return se?(0,h.jsx)(K,{children:(0,h.jsxs)(X,{as:"div",children:[(0,h.jsx)("h1",{children:"Panel de administraci\xf3n"}),(0,h.jsx)("p",{children:"Verificando sesi\xf3n..."})]})}):pe?(0,h.jsxs)(g,{children:[(0,h.jsxs)(x,{children:[(0,h.jsxs)(y,{children:[(0,h.jsx)("strong",{children:"Editor Huelmo"}),(0,h.jsx)("span",{children:"Solo contenido real de la web"})]}),(0,h.jsx)(m,{"aria-label":"Partes editables de la web",children:Z.map(e=>(0,h.jsxs)(v,{type:"button",$active:E===e.id,onClick:()=>(e=>{M(e.id),J(e.page),ye("")})(e),children:[e.title,(0,h.jsx)("small",{children:e.hint})]},e.id))}),(0,h.jsxs)(H,{children:[(0,h.jsx)(q,{type:"button",$danger:!0,onClick:()=>{window.confirm("\xbfRestaurar el contenido predeterminado? Guard\xe1 despu\xe9s para publicarlo.")&&(ve(),o())},children:"Restaurar contenido"}),(0,h.jsx)(q,{type:"button",onClick:()=>{localStorage.removeItem(s.yn),be(""),ue(!1),_("Sesi\xf3n cerrada.")},children:"Cerrar sesi\xf3n"})]})]}),(0,h.jsxs)(k,{children:[(0,h.jsxs)(j,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:"Vista previa en vivo"}),(0,h.jsx)("div",{style:{color:te?"#b45309":"#6b7280",fontSize:13},children:Q})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(C,{children:["home","about","brokers","contact"].map(e=>(0,h.jsx)(w,{type:"button",$active:W===e,onClick:()=>J(e),children:"home"===e?"Inicio":"about"===e?"Nosotros":"brokers"===e?"Aseguradoras":"Contacto"},e))}),(0,h.jsxs)(C,{children:[(0,h.jsx)(w,{type:"button",$active:"desktop"===R,onClick:()=>V("desktop"),children:"Desktop"}),(0,h.jsx)(w,{type:"button",$active:"mobile"===R,onClick:()=>V("mobile"),children:"Mobile"})]}),(0,h.jsx)(q,{type:"button",$primary:!0,onClick:async()=>{const a=localStorage.getItem(s.yn);if(!a)return ue(!1),void _("La sesi\xf3n venci\xf3. Inici\xe1 sesi\xf3n de nuevo.");re(!0),localStorage.setItem("siteContent",JSON.stringify(e)),localStorage.setItem("selectedTheme",JSON.stringify(l)),localStorage.setItem("customColors",JSON.stringify(l));try{const o=await fetch((0,s.e9)("/api/settings"),{method:"PUT",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({content:e,theme:l,customThemes:O||{}})});if(!o.ok){const e=await o.json().catch(()=>({}));return _(e.error||"No se pudo guardar en la API. Qued\xf3 guardado solo en este navegador."),void(401===o.status&&(localStorage.removeItem(s.yn),ue(!1)))}le(!1),_("Cambios guardados y publicados para la web.")}catch(o){_("No se pudo conectar con la API. Qued\xf3 guardado solo en este navegador.")}finally{re(!1)}},disabled:ne,children:ne?"Guardando...":"Guardar"}),(0,h.jsx)(q,{type:"button",onClick:()=>{window.location.href="./"},children:"Ver sitio"})]})]}),(0,h.jsx)(A,{children:(0,h.jsxs)($,{$mode:R,children:[(0,h.jsxs)(P,{children:[(0,h.jsx)("span",{style:{background:"#ef4444"}}),(0,h.jsx)("span",{style:{background:"#f59e0b"}}),(0,h.jsx)("span",{style:{background:"#22c55e"}}),(0,h.jsxs)("strong",{children:["huelmoseguros.uy/","home"===W?"":W]})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(i.A,{currentPage:W,setCurrentPage:J}),(0,h.jsx)("main",{children:(()=>{switch(W){case"about":return(0,h.jsx)(c.A,{});case"brokers":return(0,h.jsx)(p.A,{});case"contact":return(0,h.jsx)(u.A,{});default:return(0,h.jsx)(d.A,{})}})()}),(0,h.jsx)(b.A,{}),(0,h.jsx)(f.A,{})]})]})})]}),(0,h.jsxs)(T,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)("p",{children:"Editando"}),(0,h.jsx)("h2",{children:me.title})]}),(0,h.jsx)(I,{children:(()=>{var a,o,t,n,r,s,i;return"services"===E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(de,{panelId:"services-colors",title:"Colores generales de Servicios",summary:"Fondo, panel, textos, bot\xf3n y dock",openPanel:xe,setOpenPanel:ye,colors:null===(a=e.styles)||void 0===a?void 0:a.services,fields:ce.services,onChange:e=>je("services",e)}),e.services.map((a,o)=>{var t,l,n,r,s,i,d,c;return(0,h.jsxs)(B,{children:[(0,h.jsx)(U,{children:a.title||`Servicio ${o+1}`}),(0,h.jsxs)(D,{children:["T\xedtulo",(0,h.jsx)(G,{value:a.title,onChange:e=>Ce(o,{title:e.target.value})})]}),(0,h.jsxs)(D,{children:["Descripci\xf3n",(0,h.jsx)(L,{value:a.description,onChange:e=>Ce(o,{description:e.target.value})})]}),(0,h.jsx)(de,{panelId:`service-${o}-colors`,title:"Colores de este servicio",summary:a.title||`Servicio ${o+1}`,openPanel:xe,setOpenPanel:ye,colors:a.colors||{},fields:[{key:"title",label:"T\xedtulo",fallback:null===(t=e.styles)||void 0===t||null===(l=t.services)||void 0===l?void 0:l.title},{key:"text",label:"Texto",fallback:null===(n=e.styles)||void 0===n||null===(r=n.services)||void 0===r?void 0:r.text},{key:"buttonBackground",label:"Bot\xf3n",fallback:null===(s=e.styles)||void 0===s||null===(i=s.services)||void 0===i?void 0:i.buttonBackground,opacity:!0},{key:"buttonText",label:"Texto bot\xf3n",fallback:null===(d=e.styles)||void 0===d||null===(c=d.services)||void 0===c?void 0:c.buttonText}],onChange:e=>Ce(o,{colors:e})}),(0,h.jsx)(oe,{label:"\xcdcono",value:a.icon,onChange:e=>Ce(o,{icon:e})}),(0,h.jsx)(oe,{label:"Imagen de fondo",value:a.imagen,onChange:e=>Ce(o,{imagen:e})})]},`${a.title}-${o}`)})]}):"whyUs"===E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(de,{panelId:"whyUs-colors",title:"Colores de Beneficios",summary:"Fondo, t\xedtulo y tarjetas",openPanel:xe,setOpenPanel:ye,colors:null===(o=e.styles)||void 0===o?void 0:o.whyUs,fields:ce.whyUs,onChange:e=>je("whyUs",e)}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(D,{children:["T\xedtulo",(0,h.jsx)(G,{value:e.whyUs.title,onChange:e=>ke("whyUs",{title:e.target.value})})]}),(0,h.jsxs)(D,{children:["Beneficios",(0,h.jsx)(L,{value:ee(e.whyUs.items),onChange:e=>ke("whyUs",{items:ae(e.target.value)})})]})]})]}):"about"===E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(de,{panelId:"about-colors",title:"Colores generales de Nosotros",summary:"Fondo, texto, acento, tarjetas y bot\xf3n",openPanel:xe,setOpenPanel:ye,colors:null===(t=e.styles)||void 0===t?void 0:t.about,fields:ce.about,onChange:e=>je("about",e)}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(D,{children:["T\xedtulo",(0,h.jsx)(G,{value:e.about.title,onChange:e=>ke("about",{title:e.target.value})})]}),(0,h.jsxs)(D,{children:["Subt\xedtulo",(0,h.jsx)(G,{value:e.about.subtitle,onChange:e=>ke("about",{subtitle:e.target.value})})]}),(0,h.jsxs)(D,{children:["T\xedtulo historia",(0,h.jsx)(G,{value:e.about.historyTitle,onChange:e=>ke("about",{historyTitle:e.target.value})})]}),(0,h.jsxs)(D,{children:["P\xe1rrafos de historia",(0,h.jsx)(L,{value:ee(e.about.historyParagraphs),onChange:e=>ke("about",{historyParagraphs:ae(e.target.value)})})]}),(0,h.jsxs)(D,{children:["Texto bot\xf3n",(0,h.jsx)(G,{value:e.about.ctaText,onChange:e=>ke("about",{ctaText:e.target.value})})]})]}),e.about.features.map((a,o)=>{var t,l,n,r,s,i;return(0,h.jsxs)(B,{children:[(0,h.jsxs)(U,{children:["Diferencial ",o+1]}),(0,h.jsxs)(D,{children:["T\xedtulo",(0,h.jsx)(G,{value:a.title,onChange:a=>ke("about",{features:e.about.features.map((e,t)=>t===o?{...e,title:a.target.value}:e)})})]}),(0,h.jsxs)(D,{children:["Descripci\xf3n",(0,h.jsx)(L,{value:a.description,onChange:a=>ke("about",{features:e.about.features.map((e,t)=>t===o?{...e,description:a.target.value}:e)})})]}),(0,h.jsx)(de,{panelId:`feature-${o}-colors`,title:"Colores de este diferencial",summary:a.title||`Diferencial ${o+1}`,openPanel:xe,setOpenPanel:ye,colors:a.colors||{},fields:[{key:"cardBackground",label:"Fondo tarjeta",fallback:null===(t=e.styles)||void 0===t||null===(l=t.about)||void 0===l?void 0:l.cardBackground,opacity:!0},{key:"accent",label:"Acento",fallback:null===(n=e.styles)||void 0===n||null===(r=n.about)||void 0===r?void 0:r.accent},{key:"text",label:"Texto",fallback:null===(s=e.styles)||void 0===s||null===(i=s.about)||void 0===i?void 0:i.text}],onChange:a=>ke("about",{features:e.about.features.map((e,t)=>t===o?{...e,colors:a}:e)})})]},`${a.title}-${o}`)})]}):"brokers"===E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(de,{panelId:"brokers-colors",title:"Colores generales de Aseguradoras",summary:"Fondo, t\xedtulos, tarjetas y tel\xe9fonos",openPanel:xe,setOpenPanel:ye,colors:null===(n=e.styles)||void 0===n?void 0:n.brokers,fields:ce.brokers,onChange:e=>je("brokers",e)}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(D,{children:["T\xedtulo",(0,h.jsx)(G,{value:e.brokers.title,onChange:e=>ke("brokers",{title:e.target.value})})]}),(0,h.jsxs)(D,{children:["Subt\xedtulo",(0,h.jsx)(L,{value:e.brokers.subtitle,onChange:e=>ke("brokers",{subtitle:e.target.value})})]})]}),e.brokers.items.map((a,o)=>{var t,l,n,r;return(0,h.jsxs)(B,{children:[(0,h.jsx)(U,{children:a.name||`Aseguradora ${o+1}`}),(0,h.jsxs)(D,{children:["Nombre",(0,h.jsx)(G,{value:a.name,onChange:e=>we(o,{name:e.target.value})})]}),(0,h.jsxs)(D,{children:["Tel\xe9fono siniestros",(0,h.jsx)(G,{value:a.claimsPhone||"",onChange:e=>we(o,{claimsPhone:e.target.value})})]}),(0,h.jsxs)(D,{children:["Detalle siniestros",(0,h.jsx)(G,{value:a.claimsDetail||"",onChange:e=>we(o,{claimsDetail:e.target.value})})]}),(0,h.jsx)(de,{panelId:`broker-${o}-colors`,title:"Colores de esta aseguradora",summary:a.name||`Aseguradora ${o+1}`,openPanel:xe,setOpenPanel:ye,colors:a.colors||{},fields:[{key:"cardBackground",label:"Fondo tarjeta",fallback:null===(t=e.styles)||void 0===t||null===(l=t.brokers)||void 0===l?void 0:l.cardBackground,opacity:!0},{key:"phone",label:"Tel\xe9fono",fallback:null===(n=e.styles)||void 0===n||null===(r=n.brokers)||void 0===r?void 0:r.phone}],onChange:e=>we(o,{colors:e})}),(0,h.jsx)(oe,{label:"Logo",value:a.image,onChange:e=>we(o,{image:e})})]},`${a.name}-${o}`)})]}):"footer"===E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(de,{panelId:"footer-colors",title:"Colores de Contacto/Footer",summary:"Fondo, t\xedtulos, texto, links y redes",openPanel:xe,setOpenPanel:ye,colors:null===(r=e.styles)||void 0===r?void 0:r.footer,fields:ce.footer,onChange:e=>je("footer",e)}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(D,{children:["Email",(0,h.jsx)(G,{value:e.footer.email,onChange:e=>ke("footer",{email:e.target.value})})]}),(0,h.jsxs)(D,{children:["Tel\xe9fono",(0,h.jsx)(G,{value:e.footer.phone,onChange:e=>ke("footer",{phone:e.target.value})})]}),(0,h.jsxs)(D,{children:["Horario",(0,h.jsx)(G,{value:e.footer.schedule,onChange:e=>ke("footer",{schedule:e.target.value})})]}),(0,h.jsxs)(D,{children:["Texto del footer",(0,h.jsx)(L,{value:e.footer.about,onChange:e=>ke("footer",{about:e.target.value})})]}),(0,h.jsxs)(D,{children:["Instagram",(0,h.jsx)(G,{value:e.footer.instagram,onChange:e=>ke("footer",{instagram:e.target.value})})]}),(0,h.jsxs)(D,{children:["Facebook",(0,h.jsx)(G,{value:e.footer.facebook,onChange:e=>ke("footer",{facebook:e.target.value})})]}),(0,h.jsxs)(D,{children:["LinkedIn",(0,h.jsx)(G,{value:e.footer.linkedin,onChange:e=>ke("footer",{linkedin:e.target.value})})]})]})]}):"whatsapp"===E?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(de,{panelId:"whatsapp-colors",title:"Colores del bot\xf3n de WhatsApp",summary:"Fondo e \xedcono",openPanel:xe,setOpenPanel:ye,colors:null===(s=e.styles)||void 0===s?void 0:s.whatsapp,fields:ce.whatsapp,onChange:e=>je("whatsapp",e)}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(D,{children:["Tel\xe9fono",(0,h.jsx)(G,{value:e.whatsapp.phone,onChange:e=>ke("whatsapp",{phone:e.target.value})})]}),(0,h.jsxs)(D,{children:["Mensaje inicial",(0,h.jsx)(L,{value:e.whatsapp.message,onChange:e=>ke("whatsapp",{message:e.target.value})})]})]})]}):"forms"===E?(0,h.jsx)(de,{panelId:"forms-colors",title:"Colores de Formularios",summary:"Fondo, panel, t\xedtulo y bot\xf3n",openPanel:xe,setOpenPanel:ye,colors:null===(i=e.styles)||void 0===i?void 0:i.forms,fields:ce.forms,onChange:e=>je("forms",e)}):(0,h.jsxs)(B,{children:[(0,h.jsxs)(D,{children:["Primario",(0,h.jsx)(G,{type:"color",value:l.primary,onChange:e=>{ve(),z("primary",e.target.value)}})]}),(0,h.jsxs)(D,{children:["Secundario",(0,h.jsx)(G,{type:"color",value:l.secondary,onChange:e=>{ve(),z("secondary",e.target.value)}})]}),(0,h.jsxs)(D,{children:["Acento",(0,h.jsx)(G,{type:"color",value:l.accent,onChange:e=>{ve(),z("accent",e.target.value)}})]}),(0,h.jsxs)(D,{children:["Texto",(0,h.jsx)(G,{type:"color",value:l.dark,onChange:e=>{ve(),z("dark",e.target.value)}})]}),(0,h.jsxs)(D,{children:["Fondo",(0,h.jsx)(G,{type:"color",value:l.light,onChange:e=>{ve(),z("light",e.target.value)}})]}),(0,h.jsx)(q,{type:"button",onClick:()=>{ve(),N()},children:"Restaurar colores"})]})})()})]})]}):(0,h.jsx)(K,{children:(0,h.jsxs)(X,{onSubmit:Ae,children:[(0,h.jsx)("h1",{children:"Panel de administraci\xf3n"}),(0,h.jsx)("p",{children:"Ingres\xe1 la contrase\xf1a para editar la web."}),(0,h.jsxs)(D,{children:["Contrase\xf1a",(0,h.jsx)(G,{type:"password",value:fe,onChange:e=>be(e.target.value),placeholder:"Ingres\xe1 la contrase\xf1a",autoComplete:"current-password"})]}),he&&(0,h.jsx)(Y,{children:he}),(0,h.jsx)(q,{type:"submit",$primary:!0,children:"Entrar"})]})})}}}]);
//# sourceMappingURL=547.0d664af5.chunk.js.map