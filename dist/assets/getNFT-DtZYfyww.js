const __vite__fileDeps=["assets/ownerOf-Bhx_V_lU.js","assets/index-CsEefTDm.js","assets/index-B9Xo_vUv.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{ab as c,_ as d}from"./index-CsEefTDm.js";import{p as r,f as o}from"./parseNft-XjnT8TLe.js";const k="0xc87b56dd",i=[{type:"uint256",name:"_tokenId"}],u=[{type:"string"}];async function I(t){return c({contract:t.contract,method:[k,i,u],params:[t.tokenId]})}async function m(t){const[e,n]=await Promise.all([I(t).catch(()=>null),t.includeOwner?d(()=>import("./ownerOf-Bhx_V_lU.js"),__vite__mapDeps([0,1,2])).then(a=>a.ownerOf(t)).catch(()=>null):null]);return e?r(await o({client:t.contract.client,tokenId:t.tokenId,tokenUri:e}).catch(()=>({id:t.tokenId,type:"ERC721",uri:e})),{tokenId:t.tokenId,tokenUri:e,type:"ERC721",owner:n}):r({id:t.tokenId,type:"ERC721",uri:""},{tokenId:t.tokenId,tokenUri:"",type:"ERC721",owner:n})}export{m as getNFT};