const __vite__fileDeps=["assets/index-CWyL5VOM.js","assets/index-BG_IXE39.css","assets/hashMessage-Dt1Sh-8f.js","assets/checkContractWalletSignature-BZxtCY-L.js","assets/isValidSignature-B237xFYV.js","assets/checkContractWalletSignedTypedData-DmjrZ9OJ.js","assets/toRlp-B1qa_TNc.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{B as le,F as Z,G as me,H as fe,I as E,J as ye,K as B,L as J,M as T,N as ge,O as C,P as he,Q as K,R as Q,S as X,T as we,V as Ae,W as O,X as be,e as ve,v as Te,Y as F,Z as ee,u as xe,$ as M,a0 as v,C as Pe,n as te,a1 as _e,a2 as h,a3 as De,a4 as Ge,a5 as G,a6 as Ee,a7 as ne,a8 as ae,a9 as Oe,w as A,aa as Ie,s as se,ab as Le,ac as U,ad as Ce,ae as Fe,af as Me,ag as Ue,ah as Se,ai as Re,aj as _,ak as $,al as He,_ as w,p as re,b as Be,am as V}from"./index-CWyL5VOM.js";import{t as $e}from"./toRlp-B1qa_TNc.js";class Ve extends le{constructor(n){super(`Filter type "${n}" is not supported.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"FilterTypeNotSupportedError"})}}const S=Z;function Ne(t){const{abi:n,args:e=[],name:a}=t,s=me(a,{strict:!1}),i=n.filter(o=>s?o.type==="function"?fe(o)===a:o.type==="event"?S(o)===a:!1:"name"in o&&o.name===a);if(i.length===0)return;if(i.length===1)return i[0];let r;for(const o of i){if(!("inputs"in o))continue;if(!e||e.length===0){if(!o.inputs||o.inputs.length===0)return o;continue}if(!o.inputs||o.inputs.length===0||o.inputs.length!==e.length)continue;if(e.every((u,p)=>{const l="inputs"in o&&o.inputs[p];return l?I(u,l):!1})){if(r&&"inputs"in r&&r.inputs){const u=ie(o.inputs,r.inputs,e);if(u)throw new ye({abiItem:o,type:u[0]},{abiItem:r,type:u[1]})}r=o}}return r||i[0]}function I(t,n){const e=typeof t,a=n.type;switch(a){case"address":return E(t,{strict:!1});case"bool":return e==="boolean";case"function":return e==="string";case"string":return e==="string";default:return a==="tuple"&&"components"in n?Object.values(n.components).every((s,i)=>I(Object.values(t)[i],s)):/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(a)?e==="number"||e==="bigint":/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(a)?e==="string"||t instanceof Uint8Array:/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(a)?Array.isArray(t)&&t.every(s=>I(s,{...n,type:a.replace(/(\[[0-9]{0,}\])$/,"")})):!1}}function ie(t,n,e){for(const a in t){const s=t[a],i=n[a];if(s.type==="tuple"&&i.type==="tuple"&&"components"in s&&"components"in i)return ie(s.components,i.components,e[a]);const r=[s.type,i.type];if(r.includes("address")&&r.includes("bytes20")?!0:r.includes("address")&&r.includes("string")?E(e[a],{strict:!1}):r.includes("address")&&r.includes("bytes")?E(e[a],{strict:!1}):!1)return r}}const N="/docs/contract/encodeEventTopics";function ke(t){var c;const{abi:n,eventName:e,args:a}=t;let s=n[0];if(e){const u=Ne({abi:n,name:e});if(!u)throw new B(e,{docsPath:N});s=u}if(s.type!=="event")throw new B(void 0,{docsPath:N});const i=J(s),r=S(i);let o=[];if(a&&"inputs"in s){const u=(c=s.inputs)==null?void 0:c.filter(l=>"indexed"in l&&l.indexed),p=Array.isArray(a)?a:Object.values(a).length>0?(u==null?void 0:u.map(l=>a[l.name]))??[]:[];p.length>0&&(o=(u==null?void 0:u.map((l,d)=>Array.isArray(p[d])?p[d].map((y,f)=>k({param:l,value:p[d][f]})):p[d]?k({param:l,value:p[d]}):null))??[])}return[r,...o]}function k({param:t,value:n}){if(t.type==="string"||t.type==="bytes")return T(ge(n));if(t.type==="tuple"||t.type.match(/^(.*)\[(\d+)?\]$/))throw new Ve(t.type);return C([t],[n])}const j="/docs/contract/decodeEventLog";function je(t){const{abi:n,data:e,strict:a,topics:s}=t,i=a??!0,[r,...o]=s;if(!r)throw new he({docsPath:j});const c=n.find(m=>m.type==="event"&&r===S(J(m)));if(!(c&&"name"in c)||c.type!=="event")throw new K(r,{docsPath:j});const{name:u,inputs:p}=c,l=p==null?void 0:p.some(m=>!("name"in m&&m.name));let d=l?[]:{};const y=p.filter(m=>"indexed"in m&&m.indexed);for(let m=0;m<y.length;m++){const g=y[m],P=o[m];if(!P)throw new Q({abiItem:c,param:g});d[l?m:g.name||m]=ze({param:g,value:P})}const f=p.filter(m=>!("indexed"in m&&m.indexed));if(f.length>0){if(e&&e!=="0x")try{const m=X(f,e);if(m)if(l)d=[...d,...m];else for(let g=0;g<f.length;g++)d[f[g].name]=m[g]}catch(m){if(i)throw m instanceof we||m instanceof Ae?new O({abiItem:c,data:e,params:f,size:be(e)}):m}else if(i)throw new O({abiItem:c,data:"0x",params:f,size:0})}return{eventName:u,args:Object.values(d).length>0?d:void 0}}function ze({param:t,value:n}){return t.type==="string"||t.type==="bytes"||t.type==="tuple"||t.type.match(/^(.*)\[(\d+)?\]$/)?n:(X([t],n)||[])[0]}function We({abi:t,eventName:n,logs:e,strict:a=!0}){return e.map(s=>{var i;try{const r=je({...s,abi:t,strict:a});return n&&!n.includes(r.eventName)?null:{...r,...s}}catch(r){let o,c;if(r instanceof K)return null;if(r instanceof O||r instanceof Q){if(a)return null;o=r.abiItem.name,c=(i=r.abiItem.inputs)==null?void 0:i.some(u=>!("name"in u&&u.name))}return{...s,args:c?[]:{},eventName:o}}}).filter(Boolean)}function qe(t){const{domain:n={},message:e,primaryType:a}=t,s={EIP712Domain:ve({domain:n}),...t.types};Te({domain:n,message:e,primaryType:a,types:s});const i=["0x1901"];return n&&i.push(Ye({domain:n,types:s})),a!=="EIP712Domain"&&i.push(oe({data:e,primaryType:a,types:s})),T(F(i))}function Ye({domain:t,types:n}){return oe({data:t,primaryType:"EIP712Domain",types:n})}function oe({data:t,primaryType:n,types:e}){const a=ce({data:t,primaryType:n,types:e});return T(a)}function ce({data:t,primaryType:n,types:e}){const a=[{type:"bytes32"}],s=[Ze({primaryType:n,types:e})];for(const i of e[n]){const[r,o]=de({types:e,name:i.name,type:i.type,value:t[i.name]});a.push(r),s.push(o)}return C(a,s)}function Ze({primaryType:t,types:n}){const e=ee(Je({primaryType:t,types:n}));return T(e)}function Je({primaryType:t,types:n}){let e="";const a=ue({primaryType:t,types:n});a.delete(t);const s=[t,...Array.from(a).sort()];for(const i of s)e+=`${i}(${n[i].map(({name:r,type:o})=>`${o} ${r}`).join(",")})`;return e}function ue({primaryType:t,types:n},e=new Set){const a=t.match(/^\w*/u),s=a==null?void 0:a[0];if(e.has(s)||n[s]===void 0)return e;e.add(s);for(const i of n[s])ue({primaryType:i.type,types:n},e);return e}function de({types:t,name:n,type:e,value:a}){if(t[e]!==void 0)return[{type:"bytes32"},T(ce({data:a,primaryType:e,types:t}))];if(e==="bytes")return a=`0x${(a.length%2?"0":"")+a.slice(2)}`,[{type:"bytes32"},T(a)];if(e==="string")return[{type:"bytes32"},T(ee(a))];if(e.lastIndexOf("]")===e.length-1){const s=e.slice(0,e.lastIndexOf("[")),i=a.map(r=>de({name:n,type:s,types:t,value:r}));return[{type:"bytes32"},T(C(i.map(([r])=>r),i.map(([,r])=>r)))]}return[{type:e},a]}function D(t){if(["string","number"].includes(typeof t)&&!Number.isInteger(Number(t)))throw new Error(`Expected value to be an integer to convert to a bigint, got ${t} of type ${typeof t}`);return t instanceof Uint8Array?BigInt(xe(t)):BigInt(t)}function Ke(t){return`0x${t.reduce((n,e)=>n+e.replace("0x",""),"")}`}const pe=50000n,Qe=t=>{const n=Xe(t);return{domain:{name:"zkSync",version:"2",chainId:t.chainId},types:{Transaction:[{name:"txType",type:"uint256"},{name:"from",type:"uint256"},{name:"to",type:"uint256"},{name:"gasLimit",type:"uint256"},{name:"gasPerPubdataByteLimit",type:"uint256"},{name:"maxFeePerGas",type:"uint256"},{name:"maxPriorityFeePerGas",type:"uint256"},{name:"paymaster",type:"uint256"},{name:"nonce",type:"uint256"},{name:"value",type:"uint256"},{name:"data",type:"bytes"},{name:"factoryDeps",type:"bytes32[]"},{name:"paymasterInput",type:"bytes"}]},primaryType:"Transaction",message:n}};function Xe(t){const{gas:n,nonce:e,to:a,from:s,value:i,maxFeePerGas:r,maxPriorityFeePerGas:o,paymaster:c,paymasterInput:u,gasPerPubdata:p,data:l}=t;return{txType:113n,from:BigInt(s),to:a?BigInt(a):0n,gasLimit:n??0n,gasPerPubdataByteLimit:p??pe,maxFeePerGas:r??0n,maxPriorityFeePerGas:o??0n,paymaster:c?BigInt(c):0n,nonce:e?BigInt(e):0n,value:i??0n,data:l||"0x0",factoryDeps:[],paymasterInput:u||"0x"}}async function et(t){const{account:n,eip712Transaction:e,chainId:a}=t,s=Qe(e),i=await n.signTypedData({...s});return nt({...e,chainId:a,customSignature:i})}async function tt(t){const{account:n,transaction:e}=t;let[a,s,i,r,o,c,u]=await Promise.all([M(e),v(e.to),v(e.value),v(e.gas),v(e.maxFeePerGas),v(e.maxPriorityFeePerGas),v(e.eip712).then(l=>l==null?void 0:l.gasPerPubdata)]);if(!r||!o||!c){const d=await Pe(e)({method:"zks_estimateFee",params:[{from:n.address,to:s,data:a,value:i?te(i):void 0}]});r=D(d.gas_limit),o=D(d.max_fee_per_gas)*2n,c=D(d.max_priority_fee_per_gas)||1n,u=D(d.gas_per_pubdata_limit)}return{...await _e({transaction:{...e,gas:r,maxFeePerGas:o,maxPriorityFeePerGas:c},from:n.address}),...e.eip712,gasPerPubdata:u,from:n.address}}function nt(t){const{chainId:n,gas:e,nonce:a,to:s,from:i,value:r,maxFeePerGas:o,maxPriorityFeePerGas:c,customSignature:u,factoryDeps:p,paymaster:l,paymasterInput:d,gasPerPubdata:y,data:f}=t,m=[a?h(a):"0x",c?h(c):"0x",o?h(o):"0x",e?h(e):"0x",s??"0x",r?h(r):"0x",f??"0x0",h(n),h(""),h(""),h(n),i??"0x",y?h(y):h(pe),p??[],u??"0x",l&&d?[l,d]:[]];return Ke(["0x71",$e(m)])}function at(t){const{logs:n,events:e,strict:a}=t;return We({logs:n,abi:e.map(s=>s.abiEvent),strict:a})}function st(t){return!!(t&&typeof t=="object"&&"type"in t&&t.type==="event")}function rt(t){const{signature:n}=t;let e;return st(n)?e=n:e=De(n),{abiEvent:e,hash:Z(e),topics:ke({abi:[e],args:t.filters})}}function it(t={}){return rt({signature:"event UserOperationRevertReason(bytes32 indexed userOpHash, address indexed sender, uint256 nonce, bytes revertReason)",filters:t})}const ot=()=>{const t=BigInt(Math.floor(Math.random()*4294967296)),n=BigInt(Math.floor(Math.random()*4294967296)),e=BigInt(Math.floor(Math.random()*4294967296)),a=BigInt(Math.floor(Math.random()*4294967296)),s=BigInt(Math.floor(Math.random()*4294967296)),i=BigInt(Math.floor(Math.random()*4294967296));return t<<BigInt(160)|n<<BigInt(128)|e<<BigInt(96)|a<<BigInt(64)|s<<BigInt(32)|i},ct=()=>BigInt(F([te(ot()),"0x0000000000000000"]));function R(t){return Object.fromEntries(Object.entries(t).map(([n,e])=>[n,Ge(e)?e:h(e)]))}function ut(t){return t.id===324||t.id===300||t.id===302}async function dt(t){var n;return x({...t,operation:"eth_sendUserOperation",params:[R(t.userOp),((n=t.options.overrides)==null?void 0:n.entrypointAddress)??G]})}async function z(t){var e;const n=await x({...t,operation:"eth_estimateUserOperationGas",params:[R(t.userOp),((e=t.options.overrides)==null?void 0:e.entrypointAddress)??G]});return{preVerificationGas:A(n.preVerificationGas),verificationGas:A(n.verificationGas),verificationGasLimit:A(n.verificationGasLimit),callGasLimit:A(n.callGasLimit)+Ie}}async function pt(t){const n=await x({...t,operation:"thirdweb_getUserOperationGasPrice",params:[]});return{maxPriorityFeePerGas:A(n.maxPriorityFeePerGas),maxFeePerGas:A(n.maxFeePerGas)}}async function lt(t){var e,a;const n=await x({...t,operation:"eth_getUserOperationReceipt",params:[t.userOpHash]});if(n){if(n.success===!1){const i=(a=(e=at({events:[it()],logs:n.logs})[0])==null?void 0:e.args)==null?void 0:a.revertReason;if(!i)throw new Error(`UserOp failed at txHash: ${n.transactionHash}`);const r=Ee({data:i});throw new Error(`UserOp failed with reason: '${r.args.join(",")}' at txHash: ${n.transactionHash}`)}return n.receipt}}async function mt(t){const n=await x({options:t.options,operation:"zk_paymasterData",params:[t.transaction]});return{paymaster:n.paymaster,paymasterInput:n.paymasterInput}}async function ft(t){return{transactionHash:(await x({options:t.options,operation:"zk_broadcastTransaction",params:[{...t.transaction,signedTransaction:t.signedTransaction}]})).transactionHash}}async function x(t){var c;const{options:n,operation:e,params:a}=t,s=((c=n.overrides)==null?void 0:c.bundlerUrl)??ne(n.chain),r=await ae(n.client)(s,{method:"POST",headers:{"Content-Type":"application/json"},body:Oe({jsonrpc:"2.0",id:1,method:e,params:a})}),o=await r.json();if(!r.ok||o.error){let u=o.error||r.statusText;typeof u=="object"&&(u=JSON.stringify(u));const p=o.code||"UNKNOWN";throw new Error(`${e} error: ${u}
Status: ${r.status}
Code: ${p}`)}return o.result}async function yt(t,n){var s,i,r;if((s=n.overrides)!=null&&s.predictAddress)return n.overrides.predictAddress(t);if((i=n.overrides)!=null&&i.accountAddress)return n.overrides.accountAddress;const e=n.personalAccountAddress;if(!e)throw new Error("Account address is required to predict the smart wallet address.");const a=se(((r=n.overrides)==null?void 0:r.accountSalt)??"");return Le({contract:t,method:"function getAddress(address, bytes) returns (address)",params:[e,a]})}function gt(t){var a,s;const{factoryContract:n,options:e}=t;return(a=e.overrides)!=null&&a.createAccount?e.overrides.createAccount(n):U({contract:n,method:"function createAccount(address, bytes) returns (address)",params:[e.personalAccount.address,se(((s=e.overrides)==null?void 0:s.accountSalt)??"")]})}function ht(t){var s;const{accountContract:n,options:e,transaction:a}=t;return(s=e.overrides)!=null&&s.execute?e.overrides.execute(n,a):U({contract:n,method:"function execute(address, uint256, bytes)",params:[a.to||"",a.value||0n,a.data||"0x"]})}function wt(t){var s;const{accountContract:n,options:e,transactions:a}=t;return(s=e.overrides)!=null&&s.executeBatch?e.overrides.executeBatch(n,a):U({contract:n,method:"function executeBatch(address[], uint256[], bytes[])",params:[a.map(i=>i.to||""),a.map(i=>i.value||0n),a.map(i=>i.data||"0x")]})}async function W(t){var l,d,y,f;const{userOp:n,options:e}=t;if((l=e.overrides)!=null&&l.paymaster)return(d=e.overrides)==null?void 0:d.paymaster(n);const a={"Content-Type":"application/json"},s=e.client,i=Ce(e.chain),r=((y=e.overrides)==null?void 0:y.entrypointAddress)??G,c=await ae(s)(i,{method:"POST",headers:a,body:JSON.stringify({jsonrpc:"2.0",id:1,method:"pm_sponsorUserOperation",params:[R(n),r]})}),u=await c.json();if(!c.ok){const m=u.error||c.statusText,g=u.code||"UNKNOWN";throw new Error(`Paymaster error: ${m}
Status: ${c.status}
Code: ${g}`)}if(u.result)return typeof u.result=="string"?{paymasterAndData:u.result}:{paymasterAndData:u.result.paymasterAndData,verificationGasLimit:u.result.verificationGasLimit?A(u.result.verificationGasLimit):void 0,preVerificationGas:u.result.preVerificationGas?A(u.result.preVerificationGas):void 0,callGasLimit:u.result.callGasLimit?A(u.result.callGasLimit):void 0};const p=((f=u.error)==null?void 0:f.message)||u.error||c.statusText||"unknown error";throw new Error(`Paymaster error from ${i}: ${p}`)}async function At(t){var l;const{executeTx:n,options:e}=t,s=await Fe(e.accountContract)?"0x":await vt(e),i=await M(n);let{maxFeePerGas:r,maxPriorityFeePerGas:o}=n;const c=((l=e.overrides)==null?void 0:l.bundlerUrl)??ne(e.chain);if(Me(c)){const d=await pt({options:e});r=d.maxFeePerGas,o=d.maxPriorityFeePerGas}else{const[d,y]=await Promise.all([v(r),v(o)]);if(d&&y)r=d,o=y;else{const f=await Ue(e.client,e.chain);o=y??f.maxPriorityFeePerGas??0n,r=d??f.maxFeePerGas??0n}}const u=ct(),p={sender:e.accountContract.address,nonce:u,initCode:s,callData:i,maxFeePerGas:r,maxPriorityFeePerGas:o,callGasLimit:0n,verificationGasLimit:0n,preVerificationGas:0n,paymasterAndData:"0x",signature:Se};if(e.sponsorGas){const d=await W({userOp:p,options:e}),y=d.paymasterAndData;if(y&&y!=="0x"&&(p.paymasterAndData=y),d.callGasLimit&&d.verificationGasLimit&&d.preVerificationGas)p.callGasLimit=d.callGasLimit,p.verificationGasLimit=d.verificationGasLimit,p.preVerificationGas=d.preVerificationGas;else{const f=await z({userOp:p,options:e});if(p.callGasLimit=f.callGasLimit,p.verificationGasLimit=f.verificationGasLimit,p.preVerificationGas=f.preVerificationGas,y&&y!=="0x"){const m=await W({userOp:p,options:e});m.paymasterAndData&&m.paymasterAndData!=="0x"&&(p.paymasterAndData=m.paymasterAndData)}}}else{const d=await z({userOp:p,options:e});p.callGasLimit=d.callGasLimit,p.verificationGasLimit=d.verificationGasLimit,p.preVerificationGas=d.preVerificationGas}return{...p,signature:"0x"}}async function bt(t){var s;const{userOp:n,options:e}=t,a=Tt({userOp:n,entryPoint:((s=e.overrides)==null?void 0:s.entrypointAddress)||G,chainId:e.chain.id});if(e.personalAccount.signMessage){const i=await e.personalAccount.signMessage({message:{raw:Re(a)}});return{...n,signature:i}}throw new Error("signMessage not implemented in signingAccount")}async function vt(t){const{factoryContract:n}=t,e=gt({factoryContract:n,options:t});return F([n.address,await M(e)])}function Tt(t){const{userOp:n,entryPoint:e,chainId:a}=t,s=_(n.initCode),i=_(n.callData),r=_(n.paymasterAndData),o=$([{type:"address"},{type:"uint256"},{type:"bytes32"},{type:"bytes32"},{type:"uint256"},{type:"uint256"},{type:"uint256"},{type:"uint256"},{type:"uint256"},{type:"bytes32"}],[n.sender,n.nonce,s,i,n.callGasLimit,n.verificationGasLimit,n.preVerificationGas,n.maxFeePerGas,n.maxPriorityFeePerGas,r]),c=$([{type:"bytes32"},{type:"address"},{type:"uint256"}],[_(o),e,BigInt(a)]);return _(c)}function xt(t){return t.id==="smart"}const H=new WeakMap,L=new WeakMap;async function Pt(t,n,e){const{personalAccount:a,client:s,chain:i}=n;if(!a)throw new Error("Personal wallet does not have an account");const r=e,o=r.factoryAddress??He,c=i??r.chain,u="gasless"in r?r.gasless:r.sponsorGas;if(ut(c))return[Gt({creationOptions:e,connectionOptions:n,chain:c,sponsorGas:u}),c];const p=V({client:s,address:o,chain:c}),l=await yt(p,{personalAccountAddress:a.address,...r}).then(f=>f).catch(f=>{throw new Error(`Failed to get account address with factory contract ${p.address} on chain ID ${c.id}. Are you on the right chain?`,{cause:f})}),d=V({client:s,address:l,chain:c}),y=await Dt({...r,chain:c,sponsorGas:u,personalAccount:a,accountContract:d,factoryContract:p,client:s});return H.set(a,t),L.set(t,a),[y,c]}async function _t(t){const n=L.get(t);n&&(H.delete(n),L.delete(t))}async function Dt(t){const{accountContract:n}=t,e={address:n.address,async sendTransaction(a){const s=ht({accountContract:n,options:t,transaction:a});return Y({executeTx:s,options:t})},async sendBatchTransaction(a){const s=wt({accountContract:n,options:t,transactions:a});return Y({executeTx:s,options:t})},async signMessage({message:a}){const[{isContractDeployed:s},{readContract:i},{encodeAbiParameters:r},{hashMessage:o},{checkContractWalletSignature:c}]=await Promise.all([w(()=>import("./index-CWyL5VOM.js").then(f=>f.cj),__vite__mapDeps([0,1])),w(()=>import("./index-CWyL5VOM.js").then(f=>f.cl),__vite__mapDeps([0,1])),w(()=>import("./index-CWyL5VOM.js").then(f=>f.ck),__vite__mapDeps([0,1])),w(()=>import("./hashMessage-Dt1Sh-8f.js"),__vite__mapDeps([2,0,1])),w(()=>import("./checkContractWalletSignature-BZxtCY-L.js"),__vite__mapDeps([3,4,0,1]))]);await s(n)||(console.log("Account contract not deployed yet. Deploying account before signing message"),await q({options:t,account:e,accountContract:n}));const p=o(a);let l=!1;try{await i({contract:n,method:"function getMessageHash(bytes32 _hash) public view returns (bytes32)",params:[p]}),l=!0}catch{}let d;if(l){const f=r([{type:"bytes32"}],[p]);d=await t.personalAccount.signTypedData({domain:{name:"Account",version:"1",chainId:t.chain.id,verifyingContract:n.address},primaryType:"AccountMessage",types:{AccountMessage:[{name:"message",type:"bytes"}]},message:{message:f}})}else d=await t.personalAccount.signMessage({message:a});if(await c({contract:n,message:a,signature:d}))return d;throw new Error("Unable to verify signature on smart account, please make sure the smart account is deployed and the signature is valid.")},async signTypedData(a){var m,g,P;const s=re(a),[{isContractDeployed:i},{readContract:r},{encodeAbiParameters:o},{checkContractWalletSignedTypedData:c}]=await Promise.all([w(()=>import("./index-CWyL5VOM.js").then(b=>b.cj),__vite__mapDeps([0,1])),w(()=>import("./index-CWyL5VOM.js").then(b=>b.cl),__vite__mapDeps([0,1])),w(()=>import("./index-CWyL5VOM.js").then(b=>b.ck),__vite__mapDeps([0,1])),w(()=>import("./checkContractWalletSignedTypedData-DmjrZ9OJ.js"),__vite__mapDeps([5,4,0,1,6]))]);if(((g=(m=s.domain)==null?void 0:m.verifyingContract)==null?void 0:g.toLowerCase())===((P=n.address)==null?void 0:P.toLowerCase()))return t.personalAccount.signTypedData(s);await i(n)||(console.log("Account contract not deployed yet. Deploying account before signing message"),await q({options:t,account:e,accountContract:n}));const l=qe(s);let d=!1;try{await r({contract:n,method:"function getMessageHash(bytes32 _hash) public view returns (bytes32)",params:[l]}),d=!0}catch{}let y;if(d){const b=o([{type:"bytes32"}],[l]);y=await t.personalAccount.signTypedData({domain:{name:"Account",version:"1",chainId:t.chain.id,verifyingContract:n.address},primaryType:"AccountMessage",types:{AccountMessage:[{name:"message",type:"bytes"}]},message:{message:b}})}else y=await t.personalAccount.signTypedData(s);if(await c({contract:n,data:s,signature:y}))return y;throw new Error("Unable to verify signature on smart account, please make sure the smart account is deployed and the signature is valid.")},async onTransactionRequested(a){var s,i;return(i=(s=t.personalAccount).onTransactionRequested)==null?void 0:i.call(s,a)}};return e}function Gt(t){const{creationOptions:n,connectionOptions:e,chain:a}=t,s={address:e.personalAccount.address,async sendTransaction(i){const r={data:i.data,to:i.to??void 0,value:i.value??0n,chain:Be(i.chainId),client:e.client};let o=await tt({account:s,transaction:r});if(t.sponsorGas){const p=await mt({options:{client:e.client,overrides:n.overrides,chain:a},transaction:o});o={...o,...p}}const c=await et({account:s,chainId:a.id,eip712Transaction:o});return{transactionHash:(await ft({options:{client:e.client,overrides:n.overrides,chain:a},transaction:o,signedTransaction:c})).transactionHash,client:e.client,chain:a}},async signMessage({message:i}){return e.personalAccount.signMessage({message:i})},async signTypedData(i){const r=re(i);return e.personalAccount.signTypedData(r)},async onTransactionRequested(i){var r,o;return(o=(r=e.personalAccount).onTransactionRequested)==null?void 0:o.call(r,i)}};return s}async function q(t){const{options:n,account:e,accountContract:a}=t,[{sendTransaction:s},{prepareTransaction:i}]=await Promise.all([w(()=>import("./index-CWyL5VOM.js").then(c=>c.co),__vite__mapDeps([0,1])),w(()=>import("./index-CWyL5VOM.js").then(c=>c.cm),__vite__mapDeps([0,1]))]),r=i({client:n.client,chain:n.chain,to:a.address,value:0n,gas:50000n});return await s({transaction:r,account:e})}async function Y(t){const{executeTx:n,options:e}=t,a=await At({executeTx:n,options:e}),s=await bt({options:e,userOp:a}),i=await dt({options:e,userOp:s}),r=await Et({options:e,userOpHash:i});return{client:e.client,chain:e.chain,transactionHash:r.transactionHash}}async function Et(t){const{options:n,userOpHash:e}=t,a=12e4,s=1e3,i=Date.now()+a;for(;Date.now()<i;){const r=await lt({options:n,userOpHash:e});if(r)return r;await new Promise(o=>setTimeout(o,s))}throw new Error("Timeout waiting for userOp to be mined")}const Lt=Object.freeze(Object.defineProperty({__proto__:null,connectSmartWallet:Pt,disconnectSmartWallet:_t,isSmartWallet:xt,personalAccountToSmartAccountMap:H},Symbol.toStringTag,{value:"Module"}));export{qe as h,Lt as i};
