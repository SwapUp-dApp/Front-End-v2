const __vite__fileDeps=["assets/biconomy-BjIqBYMm.js","assets/index-DTbJEf8V.js","assets/index-DPg4gnSB.css","assets/openzeppelin-DA6LD1uN.js","assets/engine-wnE5U6nu.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_}from"./index-DTbJEf8V.js";async function p({account:n,transaction:t,serializableTransaction:o,gasless:r}){if(o.value&&o.value>0n)throw new Error("Gasless transactions cannot have a value");if(r.provider==="biconomy"){const{relayBiconomyTransaction:e}=await _(()=>import("./biconomy-BjIqBYMm.js"),__vite__mapDeps([0,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}if(r.provider==="openzeppelin"){const{relayOpenZeppelinTransaction:e}=await _(()=>import("./openzeppelin-DA6LD1uN.js"),__vite__mapDeps([3,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}if(r.provider==="engine"){const{relayEngineTransaction:e}=await _(()=>import("./engine-wnE5U6nu.js"),__vite__mapDeps([4,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}throw new Error("Unsupported gasless provider")}export{p as sendGaslessTransaction};