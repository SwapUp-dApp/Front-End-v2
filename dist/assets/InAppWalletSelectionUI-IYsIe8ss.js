import{bL as c,bx as o,bM as r,bN as i,ar as t,bA as u,bl as d}from"./index-CqkGq1z7.js";import{u as x,I as m}from"./useInAppWalletLocale-BsnPO3i_.js";function f(e){const{screen:n}=c(),{connectModal:a}=o(),s=r(),l=x();return a.size==="wide"||n!==i.main&&a.size==="compact"?t.jsx(u,{walletId:e.wallet.id,selectWallet:()=>{s({}),e.select()}}):l.data?t.jsx(m,{locale:l.data,wallet:e.wallet,done:e.done,select:e.select,goBack:e.goBack}):t.jsx(d,{height:"195px"})}export{f as default};
