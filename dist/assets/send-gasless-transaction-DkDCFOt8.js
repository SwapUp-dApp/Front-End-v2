const __vite__fileDeps=["assets/biconomy-CtO5BuJp.js","assets/index-C3mk-QJk.js","assets/index-B7mMrT4H.css","assets/openzeppelin-lN-qqjxg.js","assets/engine-Y8HJzluH.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_}from"./index-C3mk-QJk.js";async function p({account:n,transaction:t,serializableTransaction:o,gasless:r}){if(o.value&&o.value>0n)throw new Error("Gasless transactions cannot have a value");if(r.provider==="biconomy"){const{relayBiconomyTransaction:e}=await _(()=>import("./biconomy-CtO5BuJp.js"),__vite__mapDeps([0,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}if(r.provider==="openzeppelin"){const{relayOpenZeppelinTransaction:e}=await _(()=>import("./openzeppelin-lN-qqjxg.js"),__vite__mapDeps([3,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}if(r.provider==="engine"){const{relayEngineTransaction:e}=await _(()=>import("./engine-Y8HJzluH.js"),__vite__mapDeps([4,1,2]));return e({account:n,transaction:t,serializableTransaction:o,gasless:r})}throw new Error("Unsupported gasless provider")}export{p as sendGaslessTransaction};
