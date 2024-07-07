import{B as f,bH as v,bG as P,c7 as Y,G as Z,N as q,X as k,bF as J,c8 as Q,c9 as ee,I as T,ca as z,Z as a,cb as F,cc as A,am as te,a1 as re,ab as ne}from"./index-C4wIsjsa.js";import{t as x}from"./toRlp-B80FSsvR.js";const se={ether:-9,wei:9};function oe(e,r){let t=e.toString();const n=t.startsWith("-");n&&(t=t.slice(1)),t=t.padStart(r,"0");let[s,o]=[t.slice(0,t.length-r),t.slice(t.length-r)];return o=o.replace(/(0+)$/,""),`${n?"-":""}${s||"0"}${o?`.${o}`:""}`}function I(e,r="wei"){return oe(e,se[r])}function ie(e){const r=Object.entries(e).map(([n,s])=>s===void 0||s===!1?null:[n,s]).filter(Boolean),t=r.reduce((n,[s])=>Math.max(n,s.length),0);return r.map(([n,s])=>`  ${`${n}:`.padEnd(t+1)}  ${s}`).join(`
`)}class ae extends f{constructor({transaction:r}){super("Cannot infer a transaction type from provided transaction.",{metaMessages:["Provided Transaction:","{",ie(r),"}","","To infer the type, either provide:","- a `type` to the Transaction, or","- an EIP-1559 Transaction with `maxFeePerGas`, or","- an EIP-2930 Transaction with `gasPrice` & `accessList`, or","- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or","- a Legacy Transaction with `gasPrice`"]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidSerializableTransactionError"})}}class ce extends f{constructor({storageKey:r}){super(`Size for storage key "${r}" is invalid. Expected 32 bytes. Got ${Math.floor((r.length-2)/2)} bytes.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidStorageKeySizeError"})}}class E extends f{constructor({cause:r,maxFeePerGas:t}={}){super(`The fee cap (\`maxFeePerGas\`${t?` = ${I(t)} gwei`:""}) cannot be higher than the maximum allowed value (2^256-1).`,{cause:r}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"FeeCapTooHigh"})}}Object.defineProperty(E,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/});class M extends f{constructor({cause:r,maxPriorityFeePerGas:t,maxFeePerGas:n}={}){super([`The provided tip (\`maxPriorityFeePerGas\`${t?` = ${I(t)} gwei`:""}) cannot be higher than the fee cap (\`maxFeePerGas\`${n?` = ${I(n)} gwei`:""}).`].join(`
`),{cause:r}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"TipAboveFeeCapError"})}}Object.defineProperty(M,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max priority fee per gas higher than max fee per gas|tip higher than fee cap/});function K(e){const{kzg:r}=e,t=e.to??(typeof e.blobs[0]=="string"?"hex":"bytes"),n=typeof e.blobs[0]=="string"?e.blobs.map(o=>v(o)):e.blobs,s=[];for(const o of n)s.push(Uint8Array.from(r.blobToKzgCommitment(o)));return t==="bytes"?s:s.map(o=>P(o))}function _(e){const{kzg:r}=e,t=e.to??(typeof e.blobs[0]=="string"?"hex":"bytes"),n=typeof e.blobs[0]=="string"?e.blobs.map(i=>v(i)):e.blobs,s=typeof e.commitments[0]=="string"?e.commitments.map(i=>v(i)):e.commitments,o=[];for(let i=0;i<n.length;i++){const c=n[i],l=s[i];o.push(Uint8Array.from(r.computeBlobKzgProof(c,l)))}return t==="bytes"?o:o.map(i=>P(i))}function le(e,r){return Y(Z(e,{strict:!1})?q(e):e)}function ue(e){const{commitment:r,version:t=1}=e,n=e.to??(typeof r=="string"?"hex":"bytes"),s=le(r);return s.set([t],0),n==="bytes"?s:P(s)}function fe(e){const{commitments:r,version:t}=e,n=e.to??(typeof r[0]=="string"?"hex":"bytes"),s=[];for(const o of r)s.push(ue({commitment:o,to:n,version:t}));return s}const C=6,U=32,G=4096,R=U*G,O=R*C-1-1*G*C,D=1;class be extends f{constructor({maxSize:r,size:t}){super("Blob size is too large.",{metaMessages:[`Max: ${r} bytes`,`Given: ${t} bytes`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BlobSizeTooLargeError"})}}class N extends f{constructor(){super("Blob data must not be empty."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"EmptyBlobError"})}}class de extends f{constructor({hash:r,size:t}){super(`Versioned hash "${r}" size is invalid.`,{metaMessages:["Expected: 32",`Received: ${t}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidVersionedHashSizeError"})}}class he extends f{constructor({hash:r,version:t}){super(`Versioned hash "${r}" version is invalid.`,{metaMessages:[`Expected: ${D}`,`Received: ${t}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidVersionedHashVersionError"})}}function me(e){const r=e.to??(typeof e.data=="string"?"hex":"bytes"),t=typeof e.data=="string"?v(e.data):e.data,n=k(t);if(!n)throw new N;if(n>O)throw new be({maxSize:O,size:n});const s=[];let o=!0,i=0;for(;o;){const c=J(new Uint8Array(R));let l=0;for(;l<G;){const u=t.slice(i,i+(U-1));if(c.pushByte(0),c.pushBytes(u),u.length<31){c.pushByte(128),o=!1;break}l++,i+=31}s.push(c)}return r==="bytes"?s.map(c=>c.bytes):s.map(c=>P(c.bytes))}function ye(e){const{data:r,kzg:t,to:n}=e,s=e.blobs??me({data:r,to:n}),o=e.commitments??K({blobs:s,kzg:t,to:n}),i=e.proofs??_({blobs:s,commitments:o,kzg:t,to:n}),c=[];for(let l=0;l<s.length;l++)c.push({blob:s[l],commitment:o[l],proof:i[l]});return c}function pe(e){if(e.type)return e.type;if(typeof e.blobs<"u"||typeof e.blobVersionedHashes<"u"||typeof e.maxFeePerBlobGas<"u"||typeof e.sidecars<"u")return"eip4844";if(typeof e.maxFeePerGas<"u"||typeof e.maxPriorityFeePerGas<"u")return"eip1559";if(typeof e.gasPrice<"u")return typeof e.accessList<"u"?"eip2930":"legacy";throw new ae({transaction:e})}class $ extends f{constructor({chainId:r}){super(typeof r=="number"?`Chain ID "${r}" is invalid.`:"Chain ID is invalid."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"InvalidChainIdError"})}}function ge(e){const{blobVersionedHashes:r}=e;if(r){if(r.length===0)throw new N;for(const t of r){const n=k(t),s=Q(ee(t,0,1));if(n!==32)throw new de({hash:t,size:n});if(s!==D)throw new he({hash:t,version:s})}}W(e)}function W(e){const{chainId:r,maxPriorityFeePerGas:t,maxFeePerGas:n,to:s}=e;if(r<=0)throw new $({chainId:r});if(s&&!T(s))throw new z({address:s});if(n&&n>2n**256n-1n)throw new E({maxFeePerGas:n});if(t&&n&&t>n)throw new M({maxFeePerGas:n,maxPriorityFeePerGas:t})}function xe(e){const{chainId:r,maxPriorityFeePerGas:t,gasPrice:n,maxFeePerGas:s,to:o}=e;if(r<=0)throw new $({chainId:r});if(o&&!T(o))throw new z({address:o});if(t||s)throw new f("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");if(n&&n>2n**256n-1n)throw new E({maxFeePerGas:n})}function Pe(e){const{chainId:r,maxPriorityFeePerGas:t,gasPrice:n,maxFeePerGas:s,to:o,accessList:i}=e;if(o&&!T(o))throw new z({address:o});if(typeof r<"u"&&r<=0)throw new $({chainId:r});if(t||s)throw new f("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");if(n&&n>2n**256n-1n)throw new E({maxFeePerGas:n});if(i)throw new f("`accessList` is not a valid Legacy Transaction attribute.")}function B(e){if(!e||e.length===0)return[];const r=[];for(let t=0;t<e.length;t++){const{address:n,storageKeys:s}=e[t];for(let o=0;o<s.length;o++)if(s[o].length-2!==64)throw new ce({storageKey:s[o]});if(!T(n,{strict:!1}))throw new z({address:n});r.push([n,s])}return r}function we(e,r){const t=pe(e);return t==="eip1559"?Te(e):t==="eip2930"?ze(e):t==="eip4844"?ve(e):Ee(e)}function ve(e,r){const{chainId:t,gas:n,nonce:s,to:o,value:i,maxFeePerBlobGas:c,maxFeePerGas:l,maxPriorityFeePerGas:u,accessList:m,data:y}=e;ge(e);let h=e.blobVersionedHashes,b=e.sidecars;if(e.blobs&&(typeof h>"u"||typeof b>"u")){const d=typeof e.blobs[0]=="string"?e.blobs:e.blobs.map(g=>P(g)),w=e.kzg,p=K({blobs:d,kzg:w});if(typeof h>"u"&&(h=fe({commitments:p})),typeof b>"u"){const g=_({blobs:d,commitments:p,kzg:w});b=ye({blobs:d,commitments:p,proofs:g})}}const X=B(m),L=[a(t),s?a(s):"0x",u?a(u):"0x",l?a(l):"0x",n?a(n):"0x",o??"0x",i?a(i):"0x",y??"0x",X,c?a(c):"0x",h??[],...H(e)],S=[],V=[],j=[];if(b)for(let d=0;d<b.length;d++){const{blob:w,commitment:p,proof:g}=b[d];S.push(w),V.push(p),j.push(g)}return F(["0x03",b?x([L,S,V,j]):x(L)])}function Te(e,r){const{chainId:t,gas:n,nonce:s,to:o,value:i,maxFeePerGas:c,maxPriorityFeePerGas:l,accessList:u,data:m}=e;W(e);const y=B(u),h=[a(t),s?a(s):"0x",l?a(l):"0x",c?a(c):"0x",n?a(n):"0x",o??"0x",i?a(i):"0x",m??"0x",y,...H(e)];return F(["0x02",x(h)])}function ze(e,r){const{chainId:t,gas:n,data:s,nonce:o,to:i,value:c,accessList:l,gasPrice:u}=e;xe(e);const m=B(l),y=[a(t),o?a(o):"0x",u?a(u):"0x",n?a(n):"0x",i??"0x",c?a(c):"0x",s??"0x",m,...H(e)];return F(["0x01",x(y)])}function Ee(e,r){const{chainId:t=0,gas:n,data:s,nonce:o,to:i,value:c,gasPrice:l}=e;Pe(e);let u=[o?a(o):"0x",l?a(l):"0x",n?a(n):"0x",i??"0x",c?a(c):"0x",s??"0x"];return t>0&&(u=[...u,a(t),"0x","0x"]),x(u)}function H(e,r){const{r:t,s:n,v:s,yParity:o}=e;return typeof t>"u"?[]:typeof n>"u"?[]:typeof s>"u"&&typeof o>"u"?[]:[typeof o=="number"?o?a(1):"0x":s===0n?"0x":s===1n?a(1):s===27n?"0x":a(1),A(t),A(n)]}const Ie="0x420000000000000000000000000000000000000F";async function $e(e){const{transaction:r,gasPriceOracleAddress:t}=e,n=te({client:r.client,address:t||Ie,chain:r.chain}),{gasPrice:s,...o}=await re({transaction:r}),i=we({...o,type:"eip1559"});return ne({contract:n,method:"function getL1Fee(bytes memory _data) view returns (uint256)",params:[i]})}export{$e as estimateL1Fee};
