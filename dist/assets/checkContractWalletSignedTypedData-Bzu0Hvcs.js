import{i as t}from"./isValidSignature-DeFZovOZ.js";import{a4 as r}from"./index-bvzQwYcz.js";import{h as e}from"./index-DdVCBqXR.js";import"./toRlp-zId6OaBx.js";const i="0x1626ba7e";async function h(a){if(!r(a.signature))throw new Error("The signature must be a valid hex string.");return await t({contract:a.contract,hash:e(a.data),signature:a.signature})===i}export{h as checkContractWalletSignedTypedData};