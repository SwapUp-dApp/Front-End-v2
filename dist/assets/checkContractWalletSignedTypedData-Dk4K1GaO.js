import{i as t}from"./isValidSignature-DEaCSNDS.js";import{a4 as r}from"./index-D3h7I4QW.js";import{h as e}from"./index-vUAC-Nar.js";import"./toRlp-BTO3O8FU.js";const i="0x1626ba7e";async function h(a){if(!r(a.signature))throw new Error("The signature must be a valid hex string.");return await t({contract:a.contract,hash:e(a.data),signature:a.signature})===i}export{h as checkContractWalletSignedTypedData};