const __vite__fileDeps=["assets/biconomy-CuoTZErj.js","assets/index-D1ft1FIL.js","assets/index-CxAcB-gs.css","assets/openzeppelin-Bu-DF5_c.js","assets/engine-CU6Gkbz7.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_}from"./index-D1ft1FIL.js";async function p({account:n,transaction:t,serializableTransaction:o,gasless:r}){if(o.value&&o.value>0n)throw new Error("Gasless transactions cannot have a value");if(r.provider==="biconomy"){const{relayBiconomyTransaction:e}=await _(()=>import("./biconomy-CuoTZErj.js"),__vite__mapDeps([0,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}if(r.provider==="openzeppelin"){const{relayOpenZeppelinTransaction:e}=await _(()=>import("./openzeppelin-Bu-DF5_c.js"),__vite__mapDeps([3,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}if(r.provider==="engine"){const{relayEngineTransaction:e}=await _(()=>import("./engine-CU6Gkbz7.js"),__vite__mapDeps([4,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}throw new Error("Unsupported gasless provider")}export{p as sendGaslessTransaction};
