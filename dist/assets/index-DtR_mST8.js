const __vite__fileDeps=["assets/index-8tx8P2vk.js","assets/index-CqGVgeBE.js","assets/index-C057y9ns.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as Ee}from"./index-CqGVgeBE.js";const _e=Symbol(),ee=Object.getPrototypeOf,G=new WeakMap,fe=e=>e&&(G.has(e)?G.get(e):ee(e)===Object.prototype||ee(e)===Array.prototype),Ie=e=>fe(e)&&e[_e]||null,te=(e,t=!0)=>{G.set(e,t)};var z={VITE_ENVIRONMENT:"dev",VITE_LOCAL_API_BASE_URL:"http://localhost:8800",VITE_LOCAL_ETHERSCAN_BASE_URL:"https://sepolia.basescan.org",VITE_LOCAL_OPENSEA_BASE_URL:"https://testnets.opensea.io",VITE_LOCAL_OPENSEA_API_BASE_URL:"https://testnets-api.opensea.io",VITE_LOCAL_NAMESPACE_LISTED_ENS_NAME:"swapup-test.eth",VITE_LOCAL_NETWORK:"base-sepolia",VITE_LOCAL_CHAIN_ID:"84532",VITE_DEV_API_BASE_URL:"https://swapup-api-dev2-ezhrekffeyabafdb.centralus-01.azurewebsites.net",VITE_DEV_ETHERSCAN_BASE_URL:"https://sepolia.basescan.org",VITE_DEV_OPENSEA_BASE_URL:"https://testnets.opensea.io",VITE_DEV_OPENSEA_API_BASE_URL:"https://testnets-api.opensea.io",VITE_DEV_NAMESPACE_LISTED_ENS_NAME:"swapup-test.eth",VITE_DEV_NETWORK:"base-sepolia",VITE_DEV_CHAIN_ID:"84532",VITE_QA_API_BASE_URL:"https://swapup-api-dev2-ezhrekffeyabafdb.centralus-01.azurewebsites.net",VITE_QA_ETHERSCAN_BASE_URL:"https://sepolia.etherscan.io",VITE_QA_OPENSEA_BASE_URL:"https://testnets.opensea.io",VITE_QA_OPENSEA_API_BASE_URL:"https://testnets-api.opensea.io",VITE_QA_NAMESPACE_LISTED_ENS_NAME:"swapup-test.eth",VITE_QA_NETWORK:"base-sepolia",VITE_QA_CHAIN_ID:"84532",VITE_PROD_API_BASE_URL:"https://swapup-api-dev2-ezhrekffeyabafdb.centralus-01.azurewebsites.net",VITE_PROD_ETHERSCAN_BASE_URL:"https://etherscan.io",VITE_PROD_OPENSEA_BASE_URL:"https://opensea.io",VITE_PROD_OPENSEA_API_BASE_URL:"https://api.opensea.io",VITE_PROD_NAMESPACE_LISTED_ENS_NAME:"swapup-test.eth",VITE_PROD_NETWORK:"ethereum",VITE_PROD_CHAIN_ID:"1",VITE_SWAPUP_CONTRACT:"0x463f11f38569199a9770504191183e64e8dce03c",VITE_THIRDWEB_CLIENT_ID:"5c9e60ae0eda6988b9a4174283224961",VITE_COIN_RANKING_API_KEY:"coinranking49f1d51959ccdc98f3a5b86933dad1785ecb974e823120ec",VITE_COIN_RANKING_BASE_URL:"https://api.coinranking.com",VITE_OPENSEA_API_KEY:"2efd05380d6e4a428d718b3133abc8ca",VITE_NAMESPACE_API_BASE_URL:"https://api.namespace.tech",VITE_NAMESPACE_OFFCHAIN_API_BASE_URL:"https://offchain.namespace.tech",VITE_NAMESPACE_API_KEY:"Iy0BzGNNvjCnMIjOq6g0h3REfiKEX3oq",VITE_TWITTER_CLIENT_ID:"WFNlZkFYUGViY0hHbU5Bd0ZVSTk6MTpjaQ",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const F=e=>typeof e=="object"&&e!==null,S=new WeakMap,$=new WeakSet,he=(e=Object.is,t=(n,I)=>new Proxy(n,I),s=n=>F(n)&&!$.has(n)&&(Array.isArray(n)||!(Symbol.iterator in n))&&!(n instanceof WeakMap)&&!(n instanceof WeakSet)&&!(n instanceof Error)&&!(n instanceof Number)&&!(n instanceof Date)&&!(n instanceof String)&&!(n instanceof RegExp)&&!(n instanceof ArrayBuffer),r=n=>{switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:throw n}},l=new WeakMap,c=(n,I,g=r)=>{const A=l.get(n);if((A==null?void 0:A[0])===I)return A[1];const m=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n));return te(m,!0),l.set(n,[I,m]),Reflect.ownKeys(n).forEach(R=>{if(Object.getOwnPropertyDescriptor(m,R))return;const O=Reflect.get(n,R),T={value:O,enumerable:!0,configurable:!0};if($.has(O))te(O,!1);else if(O instanceof Promise)delete T.value,T.get=()=>g(O);else if(S.has(O)){const[h,x]=S.get(O);T.value=c(h,x(),g)}Object.defineProperty(m,R,T)}),Object.preventExtensions(m)},_=new WeakMap,E=[1,1],w=n=>{if(!F(n))throw new Error("object required");const I=_.get(n);if(I)return I;let g=E[0];const A=new Set,m=(i,a=++E[0])=>{g!==a&&(g=a,A.forEach(o=>o(i,a)))};let R=E[1];const O=(i=++E[1])=>(R!==i&&!A.size&&(R=i,h.forEach(([a])=>{const o=a[1](i);o>g&&(g=o)})),g),T=i=>(a,o)=>{const f=[...a];f[1]=[i,...f[1]],m(f,o)},h=new Map,x=(i,a)=>{if((z?"production":void 0)!=="production"&&h.has(i))throw new Error("prop listener already exists");if(A.size){const o=a[3](T(i));h.set(i,[a,o])}else h.set(i,[a])},X=i=>{var a;const o=h.get(i);o&&(h.delete(i),(a=o[1])==null||a.call(o))},pe=i=>(A.add(i),A.size===1&&h.forEach(([o,f],D)=>{if((z?"production":void 0)!=="production"&&f)throw new Error("remove already exists");const M=o[3](T(D));h.set(D,[o,M])}),()=>{A.delete(i),A.size===0&&h.forEach(([o,f],D)=>{f&&(f(),h.set(D,[o]))})}),Q=Array.isArray(n)?[]:Object.create(Object.getPrototypeOf(n)),k=t(Q,{deleteProperty(i,a){const o=Reflect.get(i,a);X(a);const f=Reflect.deleteProperty(i,a);return f&&m(["delete",[a],o]),f},set(i,a,o,f){const D=Reflect.has(i,a),M=Reflect.get(i,a,f);if(D&&(e(M,o)||_.has(o)&&e(M,_.get(o))))return!0;X(a),F(o)&&(o=Ie(o)||o);let B=o;if(o instanceof Promise)o.then(v=>{o.status="fulfilled",o.value=v,m(["resolve",[a],v])}).catch(v=>{o.status="rejected",o.reason=v,m(["reject",[a],v])});else{!S.has(o)&&s(o)&&(B=w(o));const v=!$.has(B)&&S.get(B);v&&x(a,v)}return Reflect.set(i,a,B,f),m(["set",[a],o,M]),!0}});_.set(n,k);const ue=[Q,O,c,pe];return S.set(k,ue),Reflect.ownKeys(n).forEach(i=>{const a=Object.getOwnPropertyDescriptor(n,i);"value"in a&&(k[i]=n[i],delete a.value,delete a.writable),Object.defineProperty(Q,i,a)}),k})=>[w,S,$,e,t,s,r,l,c,_,E],[Ae]=he();function C(e={}){return Ae(e)}function W(e,t,s){const r=S.get(e);(z?"production":void 0)!=="production"&&!r&&console.warn("Please use proxy object");let l;const c=[],_=r[3];let E=!1;const n=_(I=>{c.push(I),l||(l=Promise.resolve().then(()=>{l=void 0,E&&t(c.splice(0))}))});return E=!0,()=>{E=!1,n()}}function me(e,t){const s=S.get(e);(z?"production":void 0)!=="production"&&!s&&console.warn("Please use proxy object");const[r,l,c]=s;return c(r,l(),t)}const d=C({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),de={state:d,subscribe(e){return W(d,()=>e(d))},push(e,t){e!==d.view&&(d.view=e,t&&(d.data=t),d.history.push(e))},reset(e){d.view=e,d.history=[e]},replace(e){d.history.length>1&&(d.history[d.history.length-1]=e,d.view=e)},goBack(){if(d.history.length>1){d.history.pop();const[e]=d.history.slice(-1);d.view=e}},setData(e){d.data=e}},u={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return u.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return u.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,s){if(u.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let r=e;r.includes("://")||(r=e.replaceAll("/","").replaceAll(":",""),r=`${r}://`),r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},formatUniversalUrl(e,t,s){if(!u.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let r=e;r.endsWith("/")||(r=`${r}/`),this.setWalletConnectDeepLink(r,s);const l=encodeURIComponent(t);return`${r}wc?uri=${l}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(u.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(u.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(u.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(u.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=de.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},be=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),p=C({enabled:be,userSessionId:"",events:[],connectedWalletId:void 0}),ge={state:p,subscribe(e){return W(p.events,()=>e(me(p.events[p.events.length-1])))},initialize(){p.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(p.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){p.connectedWalletId=e},click(e){if(p.enabled){const t={type:"CLICK",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}},track(e){if(p.enabled){const t={type:"TRACK",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}},view(e){if(p.enabled){const t={type:"VIEW",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}}},y=C({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),b={state:y,subscribe(e){return W(y,()=>e(y))},setChains(e){y.chains=e},setWalletConnectUri(e){y.walletConnectUri=e},setIsCustomDesktop(e){y.isCustomDesktop=e},setIsCustomMobile(e){y.isCustomMobile=e},setIsDataLoaded(e){y.isDataLoaded=e},setIsUiLoaded(e){y.isUiLoaded=e},setIsAuth(e){y.isAuth=e}},K=C({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),V={state:K,subscribe(e){return W(K,()=>e(K))},setConfig(e){var t,s;ge.initialize(),b.setChains(e.chains),b.setIsAuth(!!e.enableAuthMode),b.setIsCustomMobile(!!((t=e.mobileWallets)!=null&&t.length)),b.setIsCustomDesktop(!!((s=e.desktopWallets)!=null&&s.length)),u.setModalVersionInStorage(),Object.assign(K,e)}};var ye=Object.defineProperty,se=Object.getOwnPropertySymbols,Le=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable,ne=(e,t,s)=>t in e?ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,we=(e,t)=>{for(var s in t||(t={}))Le.call(t,s)&&ne(e,s,t[s]);if(se)for(var s of se(t))Oe.call(t,s)&&ne(e,s,t[s]);return e};const q="https://explorer-api.walletconnect.com",J="wcm",Z="js-2.6.2";async function H(e,t){const s=we({sdkType:J,sdkVersion:Z},t),r=new URL(e,q);return r.searchParams.append("projectId",V.state.projectId),Object.entries(s).forEach(([l,c])=>{c&&r.searchParams.append(l,String(c))}),(await fetch(r)).json()}const N={async getDesktopListings(e){return H("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return H("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return H("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return H("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${q}/w3m/v1/getWalletImage/${e}?projectId=${V.state.projectId}&sdkType=${J}&sdkVersion=${Z}`},getAssetImageUrl(e){return`${q}/w3m/v1/getAssetImage/${e}?projectId=${V.state.projectId}&sdkType=${J}&sdkVersion=${Z}`}};var ve=Object.defineProperty,oe=Object.getOwnPropertySymbols,Se=Object.prototype.hasOwnProperty,Ce=Object.prototype.propertyIsEnumerable,re=(e,t,s)=>t in e?ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Te=(e,t)=>{for(var s in t||(t={}))Se.call(t,s)&&re(e,s,t[s]);if(oe)for(var s of oe(t))Ce.call(t,s)&&re(e,s,t[s]);return e};const ae=u.isMobile(),L=C({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),je={state:L,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=V.state;if(e==="NONE"||t==="ALL"&&!e)return L.recomendedWallets;if(u.isArray(e)){const s={recommendedIds:e.join(",")},{listings:r}=await N.getAllListings(s),l=Object.values(r);l.sort((c,_)=>{const E=e.indexOf(c.id),w=e.indexOf(_.id);return E-w}),L.recomendedWallets=l}else{const{chains:s,isAuth:r}=b.state,l=s==null?void 0:s.join(","),c=u.isArray(t),_={page:1,sdks:r?"auth_v1":void 0,entries:u.RECOMMENDED_WALLET_AMOUNT,chains:l,version:2,excludedIds:c?t.join(","):void 0},{listings:E}=ae?await N.getMobileListings(_):await N.getDesktopListings(_);L.recomendedWallets=Object.values(E)}return L.recomendedWallets},async getWallets(e){const t=Te({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:r}=V.state,{recomendedWallets:l}=L;if(r==="ALL")return L.wallets;l.length?t.excludedIds=l.map(g=>g.id).join(","):u.isArray(s)&&(t.excludedIds=s.join(",")),u.isArray(r)&&(t.excludedIds=[t.excludedIds,r].filter(Boolean).join(",")),b.state.isAuth&&(t.sdks="auth_v1");const{page:c,search:_}=e,{listings:E,total:w}=ae?await N.getMobileListings(t):await N.getDesktopListings(t),n=Object.values(E),I=_?"search":"wallets";return L[I]={listings:[...L[I].listings,...n],total:w,page:c??1},{listings:n,total:w}},getWalletImageUrl(e){return N.getWalletImageUrl(e)},getAssetImageUrl(e){return N.getAssetImageUrl(e)},resetSearch(){L.search={listings:[],total:0,page:1}}},U=C({open:!1}),Y={state:U,subscribe(e){return W(U,()=>e(U))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:r}=b.state;if(u.removeWalletConnectDeepLink(),b.setWalletConnectUri(e==null?void 0:e.uri),b.setChains(e==null?void 0:e.chains),de.reset("ConnectWallet"),s&&r)U.open=!0,t();else{const l=setInterval(()=>{const c=b.state;c.isUiLoaded&&c.isDataLoaded&&(clearInterval(l),U.open=!0,t())},200)}})},close(){U.open=!1}};var Ne=Object.defineProperty,ie=Object.getOwnPropertySymbols,Pe=Object.prototype.hasOwnProperty,We=Object.prototype.propertyIsEnumerable,le=(e,t,s)=>t in e?Ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Re=(e,t)=>{for(var s in t||(t={}))Pe.call(t,s)&&le(e,s,t[s]);if(ie)for(var s of ie(t))We.call(t,s)&&le(e,s,t[s]);return e};function De(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const j=C({themeMode:De()?"dark":"light"}),ce={state:j,subscribe(e){return W(j,()=>e(j))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(j.themeMode=t),s&&(j.themeVariables=Re({},s))}},P=C({open:!1,message:"",variant:"success"}),ke={state:P,subscribe(e){return W(P,()=>e(P))},openToast(e,t){P.open=!0,P.message=e,P.variant=t},closeToast(){P.open=!1}};class Ue{constructor(t){this.openModal=Y.open,this.closeModal=Y.close,this.subscribeModal=Y.subscribe,this.setTheme=ce.setThemeConfig,ce.setThemeConfig(t),V.setConfig(t),this.initUi()}async initUi(){if(typeof window<"u"){await Ee(()=>import("./index-8tx8P2vk.js"),__vite__mapDeps([0,1,2]));const t=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",t),b.setIsUiLoaded(!0)}}}const Be=Object.freeze(Object.defineProperty({__proto__:null,WalletConnectModal:Ue},Symbol.toStringTag,{value:"Module"}));export{ge as R,de as T,u as a,Be as i,ce as n,ke as o,b as p,Y as s,je as t,V as y};
