import{ap as f,am as N,_ as S,aq as t,ax as m,bN as Y,aw as P,bO as Z,aE as G,ay as _,bP as ee,bc as te,as as ne,bQ as oe,au as y,aL as v,aF as V,bR as ae,bS as ie,bT as se,bw as W,bL as re,aB as x,bU as L,bV as le,bW as C,bX as ce,bY as de,bZ as ue,aK as me,aH as he,b_ as ge,b$ as pe,bK as fe,aM as xe,c0 as ye,c1 as we,c2 as be}from"./index-BYFQGY9d.js";function Se({countryCode:e,setCountryCode:n}){const r=f.useRef(null),{data:i}=N({queryKey:["supported-sms-countries"],queryFn:async()=>{const{supportedSmsCountries:a}=await S(()=>import("./supported-sms-countries-Cg6pf6QY.js"),[]);return a}}),c=i??[{countryIsoCode:"US",countryName:"United States",phoneNumberCode:1}];return t.jsx(t.Fragment,{children:t.jsxs(je,{ref:r,name:"countries",id:"countries",value:e,onChange:a=>{n(a.target.value)},style:{paddingLeft:m.md,paddingRight:"0"},children:[t.jsx(q,{style:{display:"none"},value:e,children:e}),c.map(a=>t.jsxs(q,{value:`${a.countryIsoCode} +${a.phoneNumberCode}`,children:[a.countryName," +",a.phoneNumberCode," "]},a.countryIsoCode))]})})}const q=Y(()=>{const e=P();return{color:e.colors.primaryText,background:e.colors.modalBg,transition:"background 0.3s ease","&:hover":{background:e.colors.tertiaryBg}}}),je=Z(()=>{const e=P();return{fontSize:G.sm,display:"block",padding:m.sm,boxSizing:"border-box",outline:"none",border:"none",borderRadius:_.lg,color:e.colors.primaryText,WebkitAppearance:"none",appearance:"none",cursor:"pointer",background:"transparent","&::placeholder":{color:e.colors.secondaryText},"&[disabled]":{cursor:"not-allowed"},minWidth:"0px",maxWidth:"90px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}});function K(e){const[n,r]=f.useState("US +1"),[i,c]=f.useState(""),[a,s]=f.useState(),[d,k]=f.useState(!1),l=()=>{k(!0),!(!i||a)&&e.onSelect(e.format==="phone"?`+${n.split("+")[1]}${i}`:i)},h=d&&!!a||!i&&!!e.emptyErrorMessage&&d;return t.jsxs("div",{style:{width:"100%"},children:[t.jsxs(ee,{style:{position:"relative",display:"flex",flexDirection:"row"},"data-error":h,children:[e.format==="phone"&&t.jsx(Se,{countryCode:n,setCountryCode:r}),t.jsx(te,{tabIndex:-1,placeholder:e.placeholder,style:{flexGrow:1,padding:`${m.md} ${e.format==="phone"?0:m.md}`},variant:"transparent",type:e.type,name:e.name,value:i,onChange:g=>{c(g.target.value),e.errorMessage?s(e.errorMessage(g.target.value)):s(void 0)},onKeyDown:g=>{g.key==="Enter"&&l()}}),t.jsx(ne,{onClick:l,style:{padding:m.md,borderRadius:`0 ${_.lg} ${_.lg} 0`},children:t.jsx(oe,{width:y.md,height:y.md})})]}),d&&a&&t.jsxs(t.Fragment,{children:[t.jsx(v,{y:"xs"}),t.jsx(V,{color:"danger",size:"sm",children:a})]}),!(d&&a)&&!i&&e.emptyErrorMessage&&d&&t.jsxs(t.Fragment,{children:[t.jsx(v,{y:"xs"}),t.jsx(V,{color:"danger",size:"sm",children:e.emptyErrorMessage})]})]})}function Ie(e){switch(e){case"google":return"Sign In - Google Accounts";default:return`Sign In - ${e.slice(0,1).toUpperCase()}${e.slice(1)}`}}function ve(e){switch(e){case"facebook":return{width:715,height:555};default:return{width:350,height:500}}}function ke(e,n){const{height:r,width:i}=ve(e),c=(window.innerHeight-r)/2,a=(window.innerWidth-i)/2,s=window.open("",void 0,`width=${i}, height=${r}, top=${c}, left=${a}`);if(s){const d=Ie(e);s.document.title=d,s.document.body.innerHTML=Ee,s.document.body.style.background=n.colors.modalBg,s.document.body.style.color=n.colors.accentText}return s&&window.addEventListener("beforeunload",()=>{s==null||s.close()}),s}const Ee=`
<svg class="loader" viewBox="0 0 50 50">
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="currentColor"
    stroke-width="4"
  />
</svg>

<style>
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  .loader circle {
    animation: loading 1.5s linear infinite;
  }

  @keyframes loading {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
`,Ce={google:ae,apple:ie,facebook:se};function _e(e){return/^\S+@\S+\.\S+$/.test(e.replace(/\+/g,""))}const Le=["email","phone","google","apple","facebook","passkey"],Pe=e=>{var U,A,F,z,D;const n=e.locale,{chain:r,client:i,connectModal:c}=W(),{wallet:a}=e,s=re(),d=P(),k={google:n.signInWithGoogle,facebook:n.signInWithFacebook,apple:n.signInWithApple},l=e.wallet.getConfig(),h=((U=l==null?void 0:l.auth)==null?void 0:U.options)||Le,g=h.includes("passkey"),T=h.indexOf("email"),j=T!==-1,O=h.indexOf("phone"),w=O!==-1,[p,$]=f.useState(()=>j&&w?T<O?"email":"phone":j?"email":w?"phone":"none"),B=p==="email"?n.emailPlaceholder:n.phonePlaceholder,M=p==="email"?n.emailRequired:n.phoneRequired;let I="text";p==="email"?I="email":p==="phone"&&(I="tel");const E=h.filter(o=>o==="google"||o==="apple"||o==="facebook"),R=E.length>0,Q=async o=>{try{const u=ke(o,d);if(!u)throw new Error("Failed to open login window");const H=a.connect({chain:r,client:i,strategy:o,openedWindow:u,closeOpenedWindow:X=>{X.close()}});await ge(o,pe),s({socialLogin:{type:o,connectionPromise:H}}),e.select()}catch(u){console.error(`Error sign in with ${o}`,u)}};function J(){s({passkeyLogin:!0}),e.select()}const b=E.length>1;return(A=l==null?void 0:l.metadata)!=null&&A.image&&(!l.metadata.image.height||!l.metadata.image.width)&&console.warn("Image is not properly configured. Please set height and width.",l.metadata.image),t.jsxs(x,{flex:"column",gap:"md",style:{position:"relative"},children:[((F=l==null?void 0:l.metadata)==null?void 0:F.image)&&t.jsx(x,{flex:"row",center:"both",children:t.jsx(L,{loading:"eager",client:i,style:{maxHeight:"100px",maxWidth:"300px"},src:l.metadata.image.src,alt:l.metadata.image.alt,width:(z=Math.min(l.metadata.image.width??300,300))==null?void 0:z.toString(),height:(D=Math.min(l.metadata.image.height??100,100))==null?void 0:D.toString()})}),R&&t.jsx(x,{flex:b?"row":"column",center:"x",gap:"sm",style:{justifyContent:"space-between"},children:E.map(o=>{const u=b?y.lg:y.md;return t.jsxs(We,{"aria-label":`Login with ${o}`,"data-variant":b?"icon":"full",variant:"outline",fullWidth:!b,onClick:()=>{Q(o)},children:[t.jsx(L,{src:Ce[o],width:u,height:u,client:i}),!b&&k[o]]},o)})}),c.size==="wide"&&R&&(j||w)&&t.jsx(le,{text:n.or}),j&&t.jsx(t.Fragment,{children:p==="email"?t.jsx(K,{type:I,onSelect:o=>{s({emailLogin:o}),e.select()},placeholder:B,name:"email",errorMessage:o=>{if(!_e(o.toLowerCase()))return n.invalidEmail},emptyErrorMessage:M,submitButtonText:n.submitEmail}):t.jsx(C,{client:i,icon:ce,onClick:()=>{$("email")},title:"Email address"})}),w&&t.jsx(t.Fragment,{children:p==="phone"?t.jsx(K,{format:"phone",type:I,onSelect:o=>{s({phoneLogin:o.replace(/[-\(\) ]/g,"")}),e.select()},placeholder:B,name:"phone",errorMessage:o=>{const u=o.replace(/[-\(\) ]/g,"");if(!/^[0-9]+$/.test(u)&&w)return n.invalidPhone},emptyErrorMessage:M,submitButtonText:n.submitEmail}):t.jsx(C,{client:i,icon:de,onClick:()=>{$("phone")},title:"Phone number"})}),g&&t.jsx(t.Fragment,{children:t.jsx(C,{client:i,icon:ue,onClick:()=>{J()},title:"Passkey"})})]})};function $e(e){const n=e.locale.emailLoginScreen,{connectModal:r,client:i}=W(),c=r.size==="compact",{initialScreen:a,screen:s}=fe(),d=s===e.wallet&&a===e.wallet?void 0:e.goBack;return t.jsxs(x,{fullHeight:!0,flex:"column",p:"lg",animate:"fadein",style:{minHeight:"250px"},children:[c?t.jsxs(t.Fragment,{children:[t.jsx(xe,{onBack:d,title:t.jsxs(t.Fragment,{children:[r.titleIcon?t.jsx(L,{src:r.titleIcon,width:y.md,height:y.md,client:i}):null,t.jsx(ye,{children:r.title??n.title})]})}),t.jsx(v,{y:"lg"})]}):null,t.jsx(x,{expand:!0,flex:"column",center:"y",p:c?void 0:"lg",children:t.jsx(Pe,{...e})}),c&&(r.showThirdwebBranding!==!1||r.termsOfServiceUrl||r.privacyPolicyUrl)&&t.jsx(v,{y:"xl"}),t.jsxs(x,{flex:"column",gap:"lg",children:[t.jsx(we,{termsOfServiceUrl:r.termsOfServiceUrl,privacyPolicyUrl:r.privacyPolicyUrl}),r.showThirdwebBranding!==!1&&t.jsx(be,{})]})]})}const We=me(he)({"&[data-variant='full']":{display:"flex",justifyContent:"flex-start",padding:m.md,gap:m.md,fontSize:G.md,fontWeight:500,transition:"background-color 0.2s ease","&:active":{boxShadow:"none"}},"&[data-variant='icon']":{padding:m.sm,flexGrow:1}});async function Te(e){switch(e){case"es_ES":return(await S(()=>import("./es-CM7EoCZ5.js"),[])).default;case"ja_JP":return(await S(()=>import("./ja-pgAr-I_C.js"),[])).default;case"tl_PH":return(await S(()=>import("./tl-DqYcAmHJ.js"),[])).default;default:return(await S(()=>import("./en-0wdLJB6c.js"),[])).default}}function Be(){const e=W().locale;return N({queryKey:["inAppWalletLocale",e],queryFn:()=>Te(e),refetchOnMount:!1,refetchOnWindowFocus:!1})}export{Pe as I,$e as a,ke as o,Be as u};
