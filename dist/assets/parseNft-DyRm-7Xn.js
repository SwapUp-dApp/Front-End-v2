const __vite__fileDeps=["assets/index-BS4OQ3kX.js","assets/index-Bb7r3yRl.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as u,n as d}from"./index-BS4OQ3kX.js";let c;function f(){return c||(c=new TextDecoder),c}const l="[object Uint8Array]";function s(r){if(!y(r))throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof r}\``)}function y(r){return r?r.constructor===Uint8Array?!0:Object.prototype.toString.call(r)===l:!1}function w(r){return s(r),f().decode(r)}function o(r){if(typeof r!="string")throw new TypeError(`Expected \`string\`, got \`${typeof r}\``)}function h(r){return r.replaceAll("-","+").replaceAll("_","/")}function T(r){return o(r),Uint8Array.from(globalThis.atob(h(r)),e=>e.codePointAt(0))}function p(r){return o(r),w(T(r))}function A(r){return!!r.startsWith("data:application/json;base64")}function U(r){const[,e]=r.split(",");return p(e)}async function k(r){const{client:e,tokenId:a,tokenUri:n}=r;if(A(n))try{return JSON.parse(U(n))}catch(t){throw console.error("Failed to fetch base64 encoded NFT",{tokenId:a,tokenUri:n},t),t}const{download:i}=await u(()=>import("./index-BS4OQ3kX.js").then(t=>t.cn),__vite__mapDeps([0,1]));try{if(!n.includes("{id}"))return await(await i({client:e,uri:n})).json()}catch(t){throw console.error("Failed to fetch non-dynamic NFT",{tokenId:a,tokenUri:n},t),t}try{try{return await(await i({client:e,uri:n.replace("{id}",d(a,{size:32}).slice(2))})).json()}catch{return await(await i({client:e,uri:n.replace("{id}",a.toString())})).json()}}catch(t){throw console.error("Failed to fetch dynamic NFT",{tokenId:a,tokenUri:n},t),t}}function m(r,e){switch(e.type){case"ERC721":return{metadata:r,owner:(e==null?void 0:e.owner)??null,id:e.tokenId,tokenURI:e.tokenUri,type:e.type};case"ERC1155":return{metadata:r,owner:(e==null?void 0:e.owner)??null,id:e.tokenId,tokenURI:e.tokenUri,type:e.type,supply:e.supply};default:throw new Error("Invalid NFT type")}}export{k as f,m as p};
