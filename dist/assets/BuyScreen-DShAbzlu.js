import{an as Ie,ao as Ve,ap as $e,a8 as Ue,g as Fe,aq as y,ar as t,as as He,at as Ye,au as Ge,av as T,aw as De,ax as H,ay as F,az as U,aA as Ke,aB as Ze,aC as l,aD as Je,aE as q,aF as I,aG as m,aH as Xe,aI as D,aJ as te,aK as $,aL as K,aM as u,aN as ne,aO as X,aP as et,aQ as tt,aR as nt,aS as ot,aT as st,aU as it,aV as at,aW as oe,aX as rt,aY as ct,aZ as dt,a_ as lt,a$ as Be,b0 as ze,b1 as ut,b2 as ht,b3 as Z,b4 as xt,b5 as p,b6 as O,b7 as mt,b8 as Pe,b9 as ft,ba as Y,bb as yt,bc as se,bd as gt,be as ee,bf as G,bg as Me,bh as Le,bi as jt,bj as bt,bk as wt,bl as St,bm as Ct,bn as kt,bo as Ae,bp as Tt,bq as Ft,br as Bt,bs as At,bt as Et,bu as Wt,bv as vt}from"./index-C3mk-QJk.js";function Rt(e,n){return Ie({...n,queryKey:["buyWithCryptoQuote",e],queryFn:()=>{if(!e)throw new Error("Swap params are required");return Ve(e)},enabled:!!e,retry(i,s){return!(i>3||s.message.includes("Minimum purchase"))}})}async function It(e){try{const n=new URLSearchParams({toAddress:e.toAddress,fromCurrencySymbol:e.fromCurrencySymbol,toChainId:e.toChainId.toString(),toTokenAddress:e.toTokenAddress.toLowerCase()});e.fromAmount&&n.append("fromAmount",e.fromAmount),e.toAmount&&n.append("toAmount",e.toAmount),e.maxSlippageBPS&&n.append("maxSlippageBPS",e.maxSlippageBPS.toString()),e.isTestMode&&n.append("isTestMode",e.isTestMode.toString());const i=n.toString(),s=`${$e()}?${i}`,o=await Ue(e.client)(s);if(!o.ok){const a=await o.json();throw a&&"error"in a?a:new Error(`HTTP error! status: ${o.status}`)}return(await o.json()).result}catch(n){throw console.error("Fetch error:",n),n}}function Dt(e,n){return Ie({...n,queryKey:["useBuyWithFiatQuote",e],queryFn:async()=>{if(!e)throw new Error("No params provided");return It(e)},enabled:!!e,retry(i,s){if(i>3)return!1;try{if(s.error.code==="MINIMUM_PURCHASE_AMOUNT")return!1}catch{return!0}return!0}})}function Ne(e){const n=e.toToken.chainId===e.onRampToken.token.chainId,i=Fe(e.toToken.tokenAddress)===Fe(e.onRampToken.token.tokenAddress);return!(n&&i)}const zt=y.forwardRef(function(n,i){return t.jsx(t.Fragment,{children:t.jsxs(Pt,{ref:i,children:[t.jsx(He,{children:t.jsx(Ye,{type:"button","aria-label":"Close",onClick:n.close,children:t.jsx(Ge,{width:T.md,height:T.md,style:{color:"inherit"}})})}),n.children]})})}),Pt=De(()=>{const e=H();return{zIndex:1e4,padding:F.lg,borderTopLeftRadius:U.xl,borderTopRightRadius:U.xl,background:e.colors.modalBg,position:"absolute",bottom:0,left:0,right:0,animation:`${Mt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)`,borderTop:`1px solid ${e.colors.borderColor}`}}),Mt=Ke`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Lt=De(()=>({backgroundColor:H().colors.modalOverlayBg,zIndex:9999,position:"absolute",inset:0,animation:`${Ze} 400ms cubic-bezier(0.16, 1, 0.3, 1)`}));function Nt(){const e=y.useRef(null),n=y.useRef(null);return{drawerRef:e,drawerOverlayRef:n,onClose:s=>{var o;if(e.current){const a={easing:"cubic-bezier(0.175, 0.885, 0.32, 1.1)",fill:"forwards",duration:300},d=e.current.animate([{transform:"translateY(100%)",opacity:0}],a);(o=n.current)==null||o.animate([{opacity:0}],a),d.onfinish=s}else s()}}}function qe(e){const{estimatedSeconds:n,quoteIsLoading:i}=e;return t.jsxs(l,{bg:"tertiaryBg",flex:"row",borderColor:"borderColor",style:{borderRadius:U.md,borderTopLeftRadius:0,borderTopRightRadius:0,justifyContent:"space-between",alignItems:"center",borderWidth:"1px",borderStyle:"solid"},children:[t.jsxs(l,{flex:"row",center:"y",gap:"xxs",color:"accentText",p:"sm",children:[t.jsx(Je,{width:T.sm,height:T.sm}),i?t.jsx(q,{height:I.xs,width:"50px",color:"borderColor"}):t.jsx(m,{size:"xs",color:"secondaryText",children:n!==void 0?`~${Xe(n)}`:"--"})]}),t.jsxs(D,{variant:"ghost",onClick:e.onViewFees,gap:"xs",children:[t.jsx(l,{color:"accentText",flex:"row",center:"both",children:t.jsx(qt,{size:T.sm})}),t.jsx(m,{size:"xs",color:"secondaryText",children:"View Fees"})]})]})}const qt=e=>t.jsxs("svg",{width:e.size,height:e.size,viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[t.jsx("path",{d:"M9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5Z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),t.jsx("path",{d:"M4.5 7.5L7.5 4.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"})]});function pt(e){return t.jsxs(l,{bg:"tertiaryBg",borderColor:"borderColor",flex:"row",style:{borderRadius:U.md,borderBottomRightRadius:0,borderBottomLeftRadius:0,borderWidth:"1px",borderStyle:"solid",borderBottom:"none",flexWrap:"nowrap",justifyContent:"space-between",alignItems:"center"},children:[t.jsxs(Ot,{variant:"ghost",onClick:e.onSelectCurrency,style:{minHeight:"64px",justifyContent:"flex-start",minWidth:"50%"},gap:"sm",children:[t.jsx(e.currency.icon,{size:T.md}),t.jsxs(l,{flex:"row",center:"y",gap:"xxs",color:"secondaryText",children:[t.jsx(m,{color:"primaryText",children:e.currency.shorthand}),t.jsx(te,{width:T.sm,height:T.sm})]})]}),t.jsx("div",{style:{flexGrow:1,flexShrink:1,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:F.xxs,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",justifyContent:"center",paddingRight:F.sm},children:e.isLoading?t.jsx(q,{width:"100px",height:I.lg}):t.jsx(m,{size:"lg",color:e.value?"primaryText":"secondaryText",children:e.value?`${$(Number(e.value),4)}`:"--"})})]})}const Ot=K(D)(()=>({"&[disabled]:hover":{borderColor:"transparent"}}));function _t(e){return t.jsxs("div",{children:[t.jsx(m,{size:"sm",children:"Pay with "}),t.jsx(u,{y:"xs"}),t.jsxs(l,{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gridGap:F.sm},children:[t.jsx(Ee,{isChecked:e.selected==="creditCard",variant:"outline",onClick:()=>{e.onSelect("creditCard")},children:"Credit Card"}),t.jsx(Ee,{isChecked:e.selected==="crypto",variant:"outline",onClick:()=>{e.onSelect("crypto")},children:"Crypto"})]})]})}const Ee=K(D)(e=>{const n=H();return{fontSize:I.sm,borderColor:e.isChecked?n.colors.accentText:n.colors.borderColor,"&:hover":{borderColor:e.isChecked?n.colors.accentText:n.colors.secondaryText},gap:F.xs,paddingInline:F.xxs,paddingBlock:F.sm,width:"100%"}});function Qt(e){return t.jsxs(l,{children:[t.jsx(l,{p:"lg",children:t.jsx(ne,{title:"Select Currency",onBack:e.onBack})}),t.jsx(X,{}),t.jsx(u,{y:"lg"}),t.jsx(l,{flex:"column",gap:"xs",px:"lg",children:et.map(n=>t.jsxs(Vt,{fullWidth:!0,variant:"secondary",onClick:()=>e.onSelect(n),gap:"sm",children:[t.jsx(n.icon,{size:T.lg}),t.jsxs(l,{flex:"column",gap:"xxs",children:[t.jsx(m,{color:"primaryText",children:n.shorthand}),t.jsx(m,{size:"sm",children:n.name})]})]},n.shorthand))}),t.jsx(u,{y:"lg"})]})}const Vt=K(D)(()=>{const e=H();return{background:e.colors.tertiaryBg,justifyContent:"flex-start",gap:F.sm,padding:F.sm,"&:hover":{background:e.colors.secondaryButtonBg,transform:"scale(1.01)"},transition:"background 200ms ease, transform 150ms ease"}});function pe(e,n){const o=(window.innerHeight-750)/2,a=(window.innerWidth-500)/2;return window.open(`${e}&theme=${n}`,"thirdweb Pay",`width=500, height=750, top=${o}, left=${a}`)}function $t(e){var d,h,x,g;const n=tt(),{openedWindow:i}=e,s=nt({intentId:e.intentId,client:e.client});let o="loading";((d=s.data)==null?void 0:d.status)==="ON_RAMP_TRANSFER_FAILED"||((h=s.data)==null?void 0:h.status)==="PAYMENT_FAILED"?o="failed":((x=s.data)==null?void 0:x.status)==="CRYPTO_SWAP_FALLBACK"?o="partialSuccess":((g=s.data)==null?void 0:g.status)==="ON_RAMP_TRANSFER_COMPLETED"&&(o="completed"),y.useEffect(()=>{var r,c;!i||!s.data||(((r=s.data)==null?void 0:r.status)==="CRYPTO_SWAP_REQUIRED"||((c=s.data)==null?void 0:c.status)==="ON_RAMP_TRANSFER_COMPLETED")&&i.close()},[s.data,i]);const a=y.useRef(!1);return y.useEffect(()=>{var r;!a.current&&((r=s.data)==null?void 0:r.status)==="ON_RAMP_TRANSFER_COMPLETED"&&(a.current=!0,ot(n))},[s.data,n]),y.useEffect(()=>{var r;((r=s.data)==null?void 0:r.status)==="CRYPTO_SWAP_REQUIRED"&&e.onShowSwapFlow(s.data)},[s.data,e.onShowSwapFlow]),t.jsxs(l,{p:"lg",children:[t.jsx(ne,{title:"Buy",onBack:e.onBack}),e.hasTwoSteps&&t.jsxs(t.Fragment,{children:[t.jsx(u,{y:"lg"}),t.jsx(st,{steps:2,currentStep:1}),t.jsx(u,{y:"sm"}),t.jsxs(m,{size:"xs",children:["Step 1 of 2 - Buying ",e.quote.onRampToken.token.symbol," with"," ",e.quote.fromCurrencyWithFees.currencySymbol]})]}),t.jsx(Ut,{uiStatus:o,onDone:e.onDone,fiatStatus:s.data,client:e.client,isBuyForTx:e.isBuyForTx,quote:e.quote,isEmbed:e.isEmbed})]})}function Ut(e){const{uiStatus:n}=e,i=e.fiatStatus?it(e.fiatStatus):void 0,s=e.fiatStatus&&e.fiatStatus.status!=="NOT_FOUND"?e.fiatStatus:void 0,o=e.quote.onRampToken,a=t.jsx(at,{client:e.client,token:s!=null&&s.source?{chainId:s.source.token.chainId,address:s.source.token.tokenAddress,symbol:s.source.token.symbol||"",amount:s.source.amount}:{chainId:o.token.chainId,address:o.token.tokenAddress,symbol:o.token.symbol,amount:o.amount},fiat:{amount:e.quote.fromCurrencyWithFees.amount,currencySymbol:e.quote.fromCurrencyWithFees.currencySymbol},statusMeta:s!=null&&s.source&&i?{color:i==null?void 0:i.color,text:i==null?void 0:i.status,txHash:s.source.transactionHash}:void 0});return t.jsxs(l,{children:[t.jsx(u,{y:"xl"}),n==="loading"&&t.jsxs(t.Fragment,{children:[t.jsx(u,{y:"md"}),t.jsx(l,{flex:"row",center:"x",children:t.jsx(oe,{size:"3xl",color:"accentText"})}),t.jsx(u,{y:"md"}),t.jsx(m,{color:"primaryText",size:"lg",center:!0,children:"Buy Pending"}),t.jsx(u,{y:"sm"}),!rt()&&t.jsx(m,{center:!0,children:"Complete the purchase in popup"}),t.jsx(u,{y:"xxl"}),a]}),n==="failed"&&t.jsxs(t.Fragment,{children:[t.jsx(u,{y:"md"}),t.jsx(l,{flex:"row",center:"x",children:t.jsx(ct,{size:T["3xl"]})}),t.jsx(u,{y:"lg"}),t.jsx(m,{color:"primaryText",size:"lg",center:!0,children:"Transaction Failed"}),t.jsx(u,{y:"xxl"}),a]}),n==="completed"&&t.jsxs(t.Fragment,{children:[t.jsx(u,{y:"md"}),t.jsx(l,{flex:"row",center:"x",color:"success",children:t.jsx(dt,{width:T["3xl"],height:T["3xl"]})}),t.jsx(u,{y:"md"}),t.jsx(m,{color:"primaryText",size:"lg",center:!0,children:"Buy Complete"}),e.fiatStatus&&e.fiatStatus.status!=="NOT_FOUND"&&t.jsxs(t.Fragment,{children:[t.jsx(u,{y:"xxl"}),a,t.jsx(u,{y:"sm"})]}),!e.isEmbed&&t.jsx(D,{variant:"accent",fullWidth:!0,onClick:e.onDone,children:e.isBuyForTx?"Continue Transaction":"Done"})]})]})}function Ht(e){const n=Ne(e.quote),[i,s]=y.useState(n?{id:"step-1"}:{id:"onramp-status"}),[o,a]=y.useState(e.openedWindow);return i.id==="step-1"?t.jsx(lt,{client:e.client,onBack:e.onBack,partialQuote:Be(e.quote),step:1,onContinue:()=>{const d=pe(e.quote.onRampLink,e.theme);ze({type:"fiat",intentId:e.quote.intentId}),a(d),s({id:"onramp-status"})}}):i.id==="onramp-status"?t.jsx($t,{client:e.client,intentId:e.quote.intentId,onBack:e.onBack,onViewPendingTx:e.onViewPendingTx,hasTwoSteps:n,openedWindow:o,quote:e.quote,onDone:e.onDone,onShowSwapFlow:d=>{s({id:"postonramp-swap",data:d})},isBuyForTx:e.isBuyForTx,isEmbed:e.isEmbed}):i.id==="postonramp-swap"?t.jsx(ut,{status:i.data,quote:Be(e.quote),client:e.client,onBack:e.onBack,onViewPendingTx:e.onViewPendingTx,onDone:e.onDone,onSwapFlowStarted:()=>{},isBuyForTx:e.isBuyForTx,isEmbed:e.isEmbed}):null}function Yt(e){const{buyForTx:n,hasEditedAmount:i,isMainScreen:s,setTokenAmount:o,account:a}=e,d=!i&&s,h=!s,[x,g]=y.useState(n==null?void 0:n.cost);return y.useEffect(()=>{if(!n||h)return;let r=!0;async function c(){if(!(!n||!r)){try{const b=await ht(n.tx,a==null?void 0:a.address);if(!r)return;if(g(b),d&&b>n.balance){const E=String($(Number(Z(b-n.balance)),4));o(E)}}catch{}await xt(3e4),c()}}return c(),()=>{r=!1}},[n,d,o,h,a]),{amountNeeded:x}}function Gt(e){const{payOptions:n,supportedDestinations:i,toChain:s,toToken:o,method:a,setMethod:d}=e;function h(){const E=i.find(k=>k.chain.id===s.id);if(!E)return{fiat:!0,swap:!0};const f=p(o)?O:o.address,C=E.tokens.find(k=>k.address.toLowerCase()===f.toLowerCase());return C?{fiat:C.buyWithFiatEnabled,swap:C.buyWithCryptoEnabled}:{fiat:!0,swap:!0}}const{fiat:x,swap:g}=h(),r=n.buyWithFiat!==!1&&x,c=n.buyWithCrypto!==!1&&g;return y.useEffect(()=>{!r&&!c||(a==="creditCard"&&!r&&d("crypto"),a==="crypto"&&!c&&d("creditCard"))},[r,c,a,d]),{showPaymentSelection:r&&c}}const We=mt({id:137,name:"Polygon",nativeCurrency:{name:"MATIC",symbol:"MATIC",decimals:18},blockExplorers:[{name:"PolygonScan",url:"https://polygonscan.com",apiUrl:"https://api.polygonscan.com/api"}]});function Kt(e){var _,j,P,M,W,L,v,N;const n=Pe(),{payOptions:i,buyForTx:s,supportedDestinations:o}=e,a=((_=i.prefillBuy)==null?void 0:_.amount)||(s?String($(Number(Z(s.cost-s.balance)),4)):""),[d,h]=y.useState(!1),[x,g]=y.useState(a),r=ft(x,300),[c,b]=y.useState(((j=i.prefillBuy)==null?void 0:j.chain)||(s==null?void 0:s.tx.chain)||((P=o.find(Q=>Q.chain.id===(n==null?void 0:n.id)))==null?void 0:P.chain)||We),[E,f]=y.useState(((M=i.prefillBuy)==null?void 0:M.token)||Y),[C,k]=y.useState(i.buyWithCrypto!==!1&&((L=(W=i.buyWithCrypto)==null?void 0:W.prefillSource)==null?void 0:L.chain)||We),[w,B]=y.useState(i.buyWithCrypto!==!1&&((N=(v=i.buyWithCrypto)==null?void 0:v.prefillSource)==null?void 0:N.token)||Y),[R,z]=y.useState(yt);return{tokenAmount:x,setTokenAmount:g,hasEditedAmount:d,toChain:c,setToChain:b,deferredTokenAmount:r,fromChain:C,setFromChain:k,toToken:E,setToToken:f,fromToken:w,setFromToken:B,selectedCurrency:R,setHasEditedAmount:h,setSelectedCurrency:z}}function Zt(e){var s;const n=se(e.chain),i=()=>{let o=e.value.replace(".","").length;return e.value.includes(".")&&(o+=.3),`calc(${`${Math.max(1,o)}ch`} + 6px)`};return t.jsxs(l,{children:[t.jsx("div",{onClick:o=>{var a;(a=o.currentTarget.querySelector("input"))==null||a.focus()},children:t.jsxs(l,{flex:"row",center:"both",gap:"xs",style:{flexWrap:"nowrap"},children:[t.jsx(gt,{variant:"outline",pattern:"^[0-9]*[.,]?[0-9]*$",inputMode:"decimal",placeholder:"0",type:"text","data-placeholder":e.value==="",value:e.value||"0",disabled:e.freezeAmount,onClick:o=>{e.value===""&&o.currentTarget.setSelectionRange(o.currentTarget.value.length,o.currentTarget.value.length)},onChange:o=>{let a=o.target.value;a.startsWith(".")&&(a=`0${a}`);const d=Number(a);Number.isNaN(d)||(a.startsWith("0")&&!a.startsWith("0.")?e.onChange(a.slice(1)):e.onChange(a))},style:{border:"none",fontSize:e.value.length>10?"26px":e.value.length>6?"34px":"50px",boxShadow:"none",padding:"0",paddingBlock:"2px",fontWeight:600,textAlign:"right",width:i(),maxWidth:"calc(100% - 100px)"}}),t.jsx(ee,{token:e.token,chain:e.chain,size:"lg",color:"secondaryText"})]})}),!e.hideTokenSelector&&t.jsxs(t.Fragment,{children:[t.jsx(u,{y:"sm"}),t.jsx(l,{flex:"row",center:"x",children:t.jsxs(Jt,{variant:"secondary",fullWidth:!0,style:{fontSize:I.sm},gap:"xxs",onClick:e.onSelectToken,disabled:e.freezeChainAndToken,children:[t.jsxs(l,{flex:"row",center:"y",gap:"sm",children:[t.jsx(G,{token:e.token,chain:e.chain,size:"md",client:e.client}),t.jsxs(l,{flex:"column",style:{gap:"4px"},children:[t.jsx(ee,{token:e.token,chain:e.chain,size:"sm"}),(s=n.data)!=null&&s.name?t.jsx(m,{size:"xs",color:"secondaryText",children:n.data.name}):t.jsx(q,{width:"90px",height:I.xs})]})]}),t.jsx(te,{width:T.sm,height:T.sm,style:{marginLeft:"auto"}})]})})]})]})}const Jt=K(D)(()=>{const e=H();return{background:e.colors.tertiaryBg,border:`1px solid ${e.colors.borderColor}`,justifyContent:"flex-start",transition:"background 0.3s",padding:F.sm}});function Xt(e){var o;const n=se(e.chain),i=Me(),s=Le({address:i==null?void 0:i.address,chain:e.chain,tokenAddress:p(e.token)?void 0:e.token.address,client:e.client});return t.jsxs(l,{bg:"tertiaryBg",borderColor:"borderColor",flex:"row",style:{borderRadius:U.md,borderBottomRightRadius:0,borderBottomLeftRadius:0,borderWidth:"1px",borderStyle:"solid",borderBottom:"none",flexWrap:"nowrap",justifyContent:"space-between",minHeight:"64px",alignItems:"center"},children:[t.jsxs(D,{variant:"ghost",onClick:e.onSelectToken,gap:"sm",style:{paddingInline:F.sm,paddingBlock:F.sm,minWidth:"50%",justifyContent:"flex-start"},disabled:e.freezeChainAndTokenSelection,children:[t.jsx(G,{token:e.token,chain:e.chain,size:"md",client:e.client}),t.jsxs(l,{flex:"column",gap:"xxs",children:[t.jsxs(l,{flex:"row",gap:"xs",center:"y",color:"primaryText",children:[t.jsx(ee,{token:e.token,chain:e.chain,size:"sm"}),t.jsx(te,{width:T.sm,height:T.sm})]}),(o=n.data)!=null&&o.name?t.jsxs(m,{size:"xs",children:[" ",n.data.name]}):t.jsx(q,{width:"90px",height:I.xs})]})]}),t.jsxs("div",{style:{flexGrow:1,flexShrink:1,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:F.xxs,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",justifyContent:"center",paddingRight:F.sm},children:[e.isLoading?t.jsx(q,{width:"120px",height:I.md,color:"borderColor"}):t.jsx(m,{size:"md",color:e.value?"primaryText":"secondaryText",style:{},children:$(Number(e.value),4)||"--"}),t.jsxs(l,{flex:"row",gap:"xxs",center:"y",color:"secondaryText",children:[t.jsx(jt,{size:I.xs}),s.data?t.jsx(m,{size:"xs",color:"secondaryText",weight:500,children:bt(s.data,!0)}):t.jsx(q,{width:"70px",height:I.xs})]})]})]})}function rn(e){const n=wt(e.client);return n.data?t.jsx(tn,{...e,onViewPendingTx:e.onViewPendingTx,supportedDestinations:n.data,buyForTx:e.buyForTx}):t.jsx(St,{})}function en(e){const{payOptions:n}=e,[i,s]=y.useState(n.buyWithCrypto===!1?"creditCard":n.buyWithFiat===!1?"crypto":"creditCard"),[o,a]=y.useState({type:"main"}),[d,h]=y.useState(),{drawerRef:x,drawerOverlayRef:g,onClose:r}=Nt();function c(){r(()=>{h(void 0)})}function b(){a({type:"main"})}return{method:i,setMethod:s,screen:o,setScreen:a,drawerScreen:d,setDrawerScreen:h,drawerRef:x,drawerOverlayRef:g,closeDrawer:c,showMainScreen:b}}function tn(e){var de,le,ue,he,xe,me,fe,ye,ge,je,be,we,Se,Ce,ke,Te;const{client:n,supportedDestinations:i,connectLocale:s,payOptions:o,buyForTx:a}=e,d=Me(),h=Pe();Ct(i.map(A=>A.chain)||[],50);const{method:x,setMethod:g,screen:r,setScreen:c,drawerScreen:b,setDrawerScreen:E,drawerRef:f,drawerOverlayRef:C,closeDrawer:k,showMainScreen:w}=en({payOptions:o}),{tokenAmount:B,setTokenAmount:R,setHasEditedAmount:z,hasEditedAmount:_,toChain:j,setToChain:P,deferredTokenAmount:M,fromChain:W,setFromChain:L,toToken:v,setToToken:N,fromToken:Q,setFromToken:ie,selectedCurrency:Oe,setSelectedCurrency:_e}=Kt({payOptions:o,buyForTx:a,supportedDestinations:i}),{amountNeeded:ae}=Yt({setTokenAmount:R,buyForTx:a,hasEditedAmount:_,isMainScreen:r.type==="main",account:d}),J=h&&B,V=kt({client:e.client,destinationChainId:j.id,destinationTokenAddress:p(v)?O:v.address}),Qe=y.useMemo(()=>ve(i,o,e.supportedTokens),[e.supportedTokens,i,o]),re=y.useMemo(()=>{if(V.data)return ve(V.data,o,e.supportedTokens)},[e.supportedTokens,V.data,o]),{showPaymentSelection:ce}=Gt({payOptions:o,supportedDestinations:i,toChain:j,toToken:v,method:x,setMethod:g});if(r.type==="node")return r.node;if(r.type==="select-currency")return t.jsx(Qt,{onSelect:A=>{w(),_e(A)},onBack:w});if(r.type==="screen-id"&&r.name==="select-to-token"){const A=i.map(S=>S.chain);return((le=(de=o.prefillBuy)==null?void 0:de.allowEdits)==null?void 0:le.token)===!1?t.jsx(Re,{chains:A,client:e.client,connectLocale:e.connectLocale,setChain:P,showMainScreen:w}):t.jsx(Ae,{onBack:w,tokenList:((j!=null&&j.id?Qe[j.id]:void 0)||[]).filter(S=>S.address!==O),onTokenSelect:S=>{N(S),w()},chain:j,chainSelection:((he=(ue=o.prefillBuy)==null?void 0:ue.allowEdits)==null?void 0:he.chain)!==!1?{chains:A,select:S=>{P(S)}}:void 0,connectLocale:s,client:n})}if(r.type==="screen-id"&&r.name==="select-from-token"&&V.data&&re){const A=V.data.map(S=>S.chain);return o.buyWithCrypto!==!1&&((fe=(me=(xe=o.buyWithCrypto)==null?void 0:xe.prefillSource)==null?void 0:me.allowEdits)==null?void 0:fe.token)===!1?t.jsx(Re,{chains:A,client:e.client,connectLocale:e.connectLocale,setChain:L,showMainScreen:w}):t.jsx(Ae,{onBack:w,tokenList:((W!=null&&W.id?re[W.id]:void 0)||[]).filter(S=>S.address!==O),onTokenSelect:S=>{ie(S),c({type:"main"})},chain:W,chainSelection:o.buyWithCrypto!==!1&&((je=(ge=(ye=o.buyWithCrypto)==null?void 0:ye.prefillSource)==null?void 0:ge.allowEdits)==null?void 0:je.chain)!==!1?{chains:V.data.map(S=>S.chain),select:S=>L(S)}:void 0,connectLocale:s,client:n})}return t.jsx(l,{animate:"fadein",children:t.jsxs("div",{onClick:A=>{b&&f.current&&!f.current.contains(A.target)&&(A.preventDefault(),A.stopPropagation(),k())},children:[b&&t.jsxs(t.Fragment,{children:[t.jsx(Lt,{ref:C}),t.jsx(zt,{ref:f,close:k,children:t.jsx(Tt,{children:b})})]}),t.jsxs(l,{p:"lg",style:{paddingBottom:0},children:[t.jsx(ne,{title:e.buyForTx?`Not enough ${e.buyForTx.tokenSymbol}`:"Buy",onBack:e.onBack}),t.jsx(u,{y:"lg"}),!J&&t.jsx(u,{y:"xl"}),ae&&e.buyForTx?t.jsx(sn,{amountNeeded:String($(Number(Z(ae)),4)),buyForTx:e.buyForTx,client:n}):null,t.jsx(Zt,{value:B,onChange:async A=>{z(!0),R(A)},freezeAmount:((we=(be=o.prefillBuy)==null?void 0:be.allowEdits)==null?void 0:we.amount)===!1,freezeChainAndToken:((Ce=(Se=o.prefillBuy)==null?void 0:Se.allowEdits)==null?void 0:Ce.chain)===!1&&((Te=(ke=o.prefillBuy)==null?void 0:ke.allowEdits)==null?void 0:Te.token)===!1,token:v,chain:j,onSelectToken:()=>{c({type:"screen-id",name:"select-to-token"})},client:e.client,hideTokenSelector:!!e.buyForTx})]}),ce?t.jsx(u,{y:"lg"}):t.jsx(u,{y:"md"}),J&&t.jsxs(t.Fragment,{children:[ce&&t.jsxs(l,{px:"lg",children:[t.jsx(_t,{selected:x,onSelect:g}),t.jsx(u,{y:"md"})]}),x==="crypto"&&d&&h&&t.jsx(nn,{...e,setScreen:c,setDrawerScreen:E,tokenAmount:M,toChain:j,toToken:v,fromChain:W,fromToken:Q,showFromTokenSelector:()=>{c({type:"screen-id",name:"select-from-token"})},account:d,activeChain:h}),x==="creditCard"&&d&&t.jsx(on,{...e,setScreen:c,setDrawerScreen:E,tokenAmount:M,toChain:j,toToken:v,closeDrawer:k,selectedCurrency:Oe,showCurrencySelector:()=>{c({type:"select-currency"})},account:d}),t.jsx(u,{y:"sm"})]}),t.jsxs(l,{px:"lg",flex:"column",gap:"sm",children:[!J&&t.jsx(t.Fragment,{children:!d&&e.connectButton?t.jsx("div",{children:e.connectButton}):t.jsx(D,{variant:"accent",fullWidth:!0,disabled:!0,"data-disable":!0,children:"Continue"})}),d&&t.jsx(D,{variant:"outline",fullWidth:!0,style:{padding:F.xs,fontSize:I.sm},onClick:e.onViewPendingTx,children:"View all transactions"})]}),t.jsx(u,{y:"lg"})]})})}function nn(e){var P,M,W,L,v;const{setDrawerScreen:n,setScreen:i,account:s,client:o,toChain:a,tokenAmount:d,toToken:h,fromChain:x,fromToken:g,showFromTokenSelector:r,payOptions:c}=e,b=Le({address:s.address,chain:x,tokenAddress:p(g)?void 0:g.address,client:o}),E=d&&!(x.id===a.id&&g===h)?{fromAddress:s.address,fromChainId:x.id,fromTokenAddress:p(g)?O:g.address,toChainId:a.id,toTokenAddress:p(h)?O:h.address,toAmount:d,client:o}:void 0,f=Rt(E,{staleTime:30*1e3,refetchInterval:30*1e3,gcTime:30*1e3}),C=(P=f.data)==null?void 0:P.swapDetails.fromAmount,k=!!C&&!!b.data&&Number(b.data.displayValue)<Number(C),w=!f.data||k,B=e.activeChain.id!==x.id;function R(N){const Q="Unable to get price quote";try{return N instanceof Error&&N.message.includes("Minimum")?N.message.replace("Fetch failed: Error: ",""):Q}catch{return Q}}function z(){f.data&&i({type:"node",node:t.jsx(Et,{isBuyForTx:!!e.buyForTx,isEmbed:e.isEmbed,client:o,onBack:()=>{i({type:"main"})},buyWithCryptoQuote:f.data,account:s,onViewPendingTx:e.onViewPendingTx,isFiatFlow:!1,onDone:e.onDone,onTryAgain:()=>{i({type:"main"}),f.refetch()}})})}function _(){f.data&&n(t.jsxs("div",{children:[t.jsx(m,{size:"lg",color:"primaryText",children:"Fees"}),t.jsx(u,{y:"lg"}),t.jsx(Wt,{quote:f.data,align:"left"})]}))}const j=c.buyWithCrypto!==!1?(M=c.buyWithCrypto)==null?void 0:M.prefillSource:void 0;return t.jsxs(l,{px:"lg",flex:"column",gap:"md",children:[t.jsxs("div",{children:[t.jsx(Xt,{value:C||"",onSelectToken:r,chain:x,token:g,isLoading:f.isLoading&&!C,client:o,freezeChainAndTokenSelection:((W=j==null?void 0:j.allowEdits)==null?void 0:W.chain)===!1&&((L=j==null?void 0:j.allowEdits)==null?void 0:L.token)===!1}),t.jsx(qe,{quoteIsLoading:f.isLoading,estimatedSeconds:(v=f.data)==null?void 0:v.swapDetails.estimated.durationSeconds,onViewFees:_})]}),f.error&&t.jsx(m,{color:"danger",size:"sm",center:!0,children:R(f.error)}),B&&!f.isLoading&&!k&&!f.error?t.jsx(Ft,{variant:"accent",fullWidth:!0,chain:x}):t.jsx(D,{variant:w?"outline":"accent",fullWidth:!0,"data-disabled":w,disabled:w,onClick:async()=>{w||z()},gap:"xs",children:k?t.jsx(m,{color:"danger",children:"Not Enough Funds"}):f.isLoading?t.jsxs(t.Fragment,{children:[t.jsx(oe,{size:"sm",color:"accentText"}),"Getting price quote"]}):"Continue"})]})}function on(e){var k,w;const{toToken:n,tokenAmount:i,account:s,client:o,setScreen:a,setDrawerScreen:d,toChain:h,showCurrencySelector:x,selectedCurrency:g}=e,r=e.payOptions.buyWithFiat,c=Dt(r!==!1&&i?{fromCurrencySymbol:g.shorthand,toChainId:h.id,toAddress:s.address,toTokenAddress:p(n)?O:n.address,toAmount:i,client:o,isTestMode:r==null?void 0:r.testMode}:void 0);function b(){if(!c.data)return;const B=Ne(c.data);let R=null;B||(R=pe(c.data.onRampLink,typeof e.theme=="string"?e.theme:e.theme.type),ze({type:"fiat",intentId:c.data.intentId})),a({type:"node",node:t.jsx(Ht,{isBuyForTx:!!e.buyForTx,quote:c.data,onBack:()=>{a({type:"main"})},client:o,testMode:r!==!1&&(r==null?void 0:r.testMode)||!1,theme:typeof e.theme=="string"?e.theme:e.theme.type,onViewPendingTx:e.onViewPendingTx,openedWindow:R,onDone:e.onDone,isEmbed:e.isEmbed})})}function E(){c.data&&d(t.jsxs("div",{children:[t.jsx(m,{size:"lg",color:"primaryText",children:"Fees"}),t.jsx(u,{y:"lg"}),t.jsx(vt,{quote:c.data})]}))}function f(B){const R="Unable to get price quote";try{if(B.error.code==="MINIMUM_PURCHASE_AMOUNT"){const z=B.error;return[`Minimum purchase amount is $${z.data.minimumAmountUSDCents/100}`,`Requested amount is $${z.data.requestedAmountUSDCents/100}`]}}catch{}return[R]}const C=!c.data;return t.jsxs(l,{px:"lg",flex:"column",gap:"md",children:[t.jsxs("div",{children:[t.jsx(pt,{isLoading:c.isLoading,value:(k=c.data)==null?void 0:k.fromCurrencyWithFees.amount,client:o,currency:g,onSelectCurrency:x}),t.jsx(qe,{quoteIsLoading:c.isLoading,estimatedSeconds:(w=c.data)==null?void 0:w.estimatedDurationSeconds,onViewFees:E})]}),c.error&&t.jsx("div",{children:f(c.error).map(B=>t.jsx(m,{color:"danger",size:"sm",center:!0,multiline:!0,children:B},B))}),t.jsx(D,{variant:C?"outline":"accent","data-disabled":C,disabled:C,fullWidth:!0,onClick:b,gap:"xs",children:c.isLoading?t.jsxs(t.Fragment,{children:[t.jsx(oe,{size:"sm",color:"accentText"}),"Getting price quote"]}):"Continue"})]})}function sn(e){const n=se(e.buyForTx.tx.chain);return t.jsxs(l,{children:[t.jsx(u,{y:"xs"}),t.jsxs(l,{flex:"row",style:{justifyContent:"space-between"},children:[t.jsx(m,{size:"sm",children:"Amount Needed"}),t.jsxs(l,{flex:"column",style:{alignItems:"flex-end"},children:[t.jsxs(l,{flex:"row",gap:"xs",center:"y",children:[t.jsxs(m,{color:"primaryText",size:"sm",children:[e.amountNeeded," ",e.buyForTx.tokenSymbol]}),t.jsx(G,{chain:e.buyForTx.tx.chain,client:e.client,size:"sm",token:Y})]}),t.jsx(u,{y:"xxs"}),n.data?t.jsxs(m,{size:"sm",children:[" ",n.data.name]}):t.jsx(q,{height:I.sm,width:"50px"})]})]}),t.jsx(u,{y:"md"}),t.jsx(X,{}),t.jsx(u,{y:"md"}),t.jsxs(l,{flex:"row",style:{justifyContent:"space-between"},children:[t.jsx(m,{size:"sm",children:"Your Balance"}),t.jsxs(l,{flex:"row",gap:"xs",children:[t.jsxs(m,{color:"primaryText",size:"sm",children:[$(Number(Z(e.buyForTx.balance)),4)," ",e.buyForTx.tokenSymbol]}),t.jsx(G,{chain:e.buyForTx.tx.chain,client:e.client,size:"sm",token:Y})]})]}),t.jsx(u,{y:"md"}),t.jsx(X,{}),t.jsx(u,{y:"lg"}),t.jsx(m,{center:!0,size:"sm",children:"Purchase"}),t.jsx(u,{y:"xxs"})]})}function ve(e,n,i){const s={},o=n.buyWithFiat===!1,a=n.buyWithCrypto===!1;for(const d of e)s[d.chain.id]=d.tokens.filter(h=>h.buyWithCryptoEnabled&&h.buyWithFiatEnabled?!0:!(!h.buyWithCryptoEnabled&&o||!h.buyWithFiatEnabled&&a));if(i)for(const d in i){const h=Number(d),x=i[h];x&&(s[h]=x)}return s}function Re(e){return t.jsx(Bt,{client:e.client,connectLocale:e.connectLocale,showTabs:!1,onBack:e.showMainScreen,chains:e.chains,closeModal:e.showMainScreen,networkSelector:{renderChain(n){return t.jsx(At,{chain:n.chain,confirming:!1,switchingFailed:!1,onClick:()=>{e.setChain(n.chain),e.showMainScreen()},client:e.client,connectLocale:e.connectLocale})}}})}export{rn as default};
