import{aq as V,ar as E}from"./index-CqGVgeBE.js";var P=(s=>(s[s.Border=-1]="Border",s[s.Data=0]="Data",s[s.Function=1]="Function",s[s.Position=2]="Position",s[s.Timing=3]="Timing",s[s.Alignment=4]="Alignment",s))(P||{}),j=Object.defineProperty,X=(s,t,e)=>t in s?j(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,z=(s,t,e)=>(X(s,typeof t!="symbol"?t+"":t,e),e);const G=[0,1],S=[1,0],O=[2,3],L=[3,2],H={L:G,M:S,Q:O,H:L},K=/^[0-9]*$/,W=/^[A-Z0-9 $%*+.\/:-]*$/,_="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",v=1,B=40,k=3,Z=3,R=40,J=10,U=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],$=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]];class Q{constructor(t,e,n,r){if(this.version=t,this.ecc=e,z(this,"size"),z(this,"mask"),z(this,"modules",[]),z(this,"types",[]),t<v||t>B)throw new RangeError("Version value out of range");if(r<-1||r>7)throw new RangeError("Mask value out of range");this.size=t*4+17;const o=Array.from({length:this.size},()=>!1);for(let l=0;l<this.size;l++)this.modules.push(o.slice()),this.types.push(o.map(()=>0));this.drawFunctionPatterns();const i=this.addEccAndInterleave(n);if(this.drawCodewords(i),r===-1){let l=1e9;for(let c=0;c<8;c++){this.applyMask(c),this.drawFormatBits(c);const h=this.getPenaltyScore();h<l&&(r=c,l=h),this.applyMask(c)}}this.mask=r,this.applyMask(r),this.drawFormatBits(r)}getModule(t,e){return t>=0&&t<this.size&&e>=0&&e<this.size&&this.modules[e][t]}drawFunctionPatterns(){for(let n=0;n<this.size;n++)this.setFunctionModule(6,n,n%2===0,P.Timing),this.setFunctionModule(n,6,n%2===0,P.Timing);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const t=this.getAlignmentPatternPositions(),e=t.length;for(let n=0;n<e;n++)for(let r=0;r<e;r++)n===0&&r===0||n===0&&r===e-1||n===e-1&&r===0||this.drawAlignmentPattern(t[n],t[r]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(t){const e=this.ecc[1]<<3|t;let n=e;for(let o=0;o<10;o++)n=n<<1^(n>>>9)*1335;const r=(e<<10|n)^21522;for(let o=0;o<=5;o++)this.setFunctionModule(8,o,y(r,o));this.setFunctionModule(8,7,y(r,6)),this.setFunctionModule(8,8,y(r,7)),this.setFunctionModule(7,8,y(r,8));for(let o=9;o<15;o++)this.setFunctionModule(14-o,8,y(r,o));for(let o=0;o<8;o++)this.setFunctionModule(this.size-1-o,8,y(r,o));for(let o=8;o<15;o++)this.setFunctionModule(8,this.size-15+o,y(r,o));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let t=this.version;for(let n=0;n<12;n++)t=t<<1^(t>>>11)*7973;const e=this.version<<12|t;for(let n=0;n<18;n++){const r=y(e,n),o=this.size-11+n%3,i=Math.floor(n/3);this.setFunctionModule(o,i,r),this.setFunctionModule(i,o,r)}}drawFinderPattern(t,e){for(let n=-4;n<=4;n++)for(let r=-4;r<=4;r++){const o=Math.max(Math.abs(r),Math.abs(n)),i=t+r,l=e+n;i>=0&&i<this.size&&l>=0&&l<this.size&&this.setFunctionModule(i,l,o!==2&&o!==4,P.Position)}}drawAlignmentPattern(t,e){for(let n=-2;n<=2;n++)for(let r=-2;r<=2;r++)this.setFunctionModule(t+r,e+n,Math.max(Math.abs(r),Math.abs(n))!==1,P.Alignment)}setFunctionModule(t,e,n,r=P.Function){this.modules[e][t]=n,this.types[e][t]=r}addEccAndInterleave(t){const e=this.version,n=this.ecc;if(t.length!==F(e,n))throw new RangeError("Invalid argument");const r=$[n[0]][e],o=U[n[0]][e],i=Math.floor(C(e)/8),l=r-i%r,c=Math.floor(i/r),h=[],f=at(o);for(let u=0,m=0;u<r;u++){const M=t.slice(m,m+c-o+(u<l?0:1));m+=M.length;const p=ct(M,f);u<l&&M.push(0),h.push(M.concat(p))}const a=[];for(let u=0;u<h[0].length;u++)h.forEach((m,M)=>{(u!==c-o||M>=l)&&a.push(m[u])});return a}drawCodewords(t){if(t.length!==Math.floor(C(this.version)/8))throw new RangeError("Invalid argument");let e=0;for(let n=this.size-1;n>=1;n-=2){n===6&&(n=5);for(let r=0;r<this.size;r++)for(let o=0;o<2;o++){const i=n-o,c=(n+1&2)===0?this.size-1-r:r;!this.types[c][i]&&e<t.length*8&&(this.modules[c][i]=y(t[e>>>3],7-(e&7)),e++)}}}applyMask(t){if(t<0||t>7)throw new RangeError("Mask value out of range");for(let e=0;e<this.size;e++)for(let n=0;n<this.size;n++){let r;switch(t){case 0:r=(n+e)%2===0;break;case 1:r=e%2===0;break;case 2:r=n%3===0;break;case 3:r=(n+e)%3===0;break;case 4:r=(Math.floor(n/3)+Math.floor(e/2))%2===0;break;case 5:r=n*e%2+n*e%3===0;break;case 6:r=(n*e%2+n*e%3)%2===0;break;case 7:r=((n+e)%2+n*e%3)%2===0;break;default:throw new Error("Unreachable")}!this.types[e][n]&&r&&(this.modules[e][n]=!this.modules[e][n])}}getPenaltyScore(){let t=0;for(let o=0;o<this.size;o++){let i=!1,l=0;const c=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[o][h]===i?(l++,l===5?t+=k:l>5&&t++):(this.finderPenaltyAddHistory(l,c),i||(t+=this.finderPenaltyCountPatterns(c)*R),i=this.modules[o][h],l=1);t+=this.finderPenaltyTerminateAndCount(i,l,c)*R}for(let o=0;o<this.size;o++){let i=!1,l=0;const c=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][o]===i?(l++,l===5?t+=k:l>5&&t++):(this.finderPenaltyAddHistory(l,c),i||(t+=this.finderPenaltyCountPatterns(c)*R),i=this.modules[h][o],l=1);t+=this.finderPenaltyTerminateAndCount(i,l,c)*R}for(let o=0;o<this.size-1;o++)for(let i=0;i<this.size-1;i++){const l=this.modules[o][i];l===this.modules[o][i+1]&&l===this.modules[o+1][i]&&l===this.modules[o+1][i+1]&&(t+=Z)}let e=0;for(const o of this.modules)e=o.reduce((i,l)=>i+(l?1:0),e);const n=this.size*this.size,r=Math.ceil(Math.abs(e*20-n*10)/n)-1;return t+=r*J,t}getAlignmentPatternPositions(){if(this.version===1)return[];{const t=Math.floor(this.version/7)+2,e=this.version===32?26:Math.ceil((this.version*4+4)/(t*2-2))*2,n=[6];for(let r=this.size-7;n.length<t;r-=e)n.splice(1,0,r);return n}}finderPenaltyCountPatterns(t){const e=t[1],n=e>0&&t[2]===e&&t[3]===e*3&&t[4]===e&&t[5]===e;return(n&&t[0]>=e*4&&t[6]>=e?1:0)+(n&&t[6]>=e*4&&t[0]>=e?1:0)}finderPenaltyTerminateAndCount(t,e,n){return t&&(this.finderPenaltyAddHistory(e,n),e=0),e+=this.size,this.finderPenaltyAddHistory(e,n),this.finderPenaltyCountPatterns(n)}finderPenaltyAddHistory(t,e){e[0]===0&&(t+=this.size),e.pop(),e.unshift(t)}}function A(s,t,e){if(t<0||t>31||s>>>t)throw new RangeError("Value out of range");for(let n=t-1;n>=0;n--)e.push(s>>>n&1)}function y(s,t){return(s>>>t&1)!==0}class I{constructor(t,e,n){if(this.mode=t,this.numChars=e,this.bitData=n,e<0)throw new RangeError("Invalid argument");this.bitData=n.slice()}getData(){return this.bitData.slice()}}const tt=[1,10,12,14],et=[2,9,11,13],nt=[4,8,16,16];function D(s,t){return s[Math.floor((t+7)/17)+1]}function T(s){const t=[];for(const e of s)A(e,8,t);return new I(nt,s.length,t)}function st(s){if(!Y(s))throw new RangeError("String contains non-numeric characters");const t=[];for(let e=0;e<s.length;){const n=Math.min(s.length-e,3);A(Number.parseInt(s.substring(e,e+n),10),n*3+1,t),e+=n}return new I(tt,s.length,t)}function rt(s){if(!q(s))throw new RangeError("String contains unencodable characters in alphanumeric mode");const t=[];let e;for(e=0;e+2<=s.length;e+=2){let n=_.indexOf(s.charAt(e))*45;n+=_.indexOf(s.charAt(e+1)),A(n,11,t)}return e<s.length&&A(_.indexOf(s.charAt(e)),6,t),new I(et,s.length,t)}function ot(s){return s===""?[]:Y(s)?[st(s)]:q(s)?[rt(s)]:[T(lt(s))]}function Y(s){return K.test(s)}function q(s){return W.test(s)}function it(s,t){let e=0;for(const n of s){const r=D(n.mode,t);if(n.numChars>=1<<r)return Number.POSITIVE_INFINITY;e+=4+r+n.bitData.length}return e}function lt(s){s=encodeURI(s);const t=[];for(let e=0;e<s.length;e++)s.charAt(e)!=="%"?t.push(s.charCodeAt(e)):(t.push(Number.parseInt(s.substring(e+1,e+3),16)),e+=2);return t}function C(s){if(s<v||s>B)throw new RangeError("Version number out of range");let t=(16*s+128)*s+64;if(s>=2){const e=Math.floor(s/7)+2;t-=(25*e-10)*e-55,s>=7&&(t-=36)}return t}function F(s,t){return Math.floor(C(s)/8)-U[t[0]][s]*$[t[0]][s]}function at(s){if(s<1||s>255)throw new RangeError("Degree out of range");const t=[];for(let n=0;n<s-1;n++)t.push(0);t.push(1);let e=1;for(let n=0;n<s;n++){for(let r=0;r<t.length;r++)t[r]=N(t[r],e),r+1<t.length&&(t[r]^=t[r+1]);e=N(e,2)}return t}function ct(s,t){const e=t.map(n=>0);for(const n of s){const r=n^e.shift();e.push(0),t.forEach((o,i)=>e[i]^=N(o,r))}return e}function N(s,t){if(s>>>8||t>>>8)throw new RangeError("Byte out of range");let e=0;for(let n=7;n>=0;n--)e=e<<1^(e>>>7)*285,e^=(t>>>n&1)*s;return e}function ht(s,t,e=1,n=40,r=-1,o=!0){if(!(v<=e&&e<=n&&n<=B)||r<-1||r>7)throw new RangeError("Invalid value");let i,l;for(i=e;;i++){const a=F(i,t)*8,u=it(s,i);if(u<=a){l=u;break}if(i>=n)throw new RangeError("Data too long")}for(const a of[S,O,L])o&&l<=F(i,a)*8&&(t=a);const c=[];for(const a of s){A(a.mode[0],4,c),A(a.numChars,D(a.mode,i),c);for(const u of a.getData())c.push(u)}const h=F(i,t)*8;A(0,Math.min(4,h-c.length),c),A(0,(8-c.length%8)%8,c);for(let a=236;c.length<h;a^=253)A(a,8,c);const f=Array.from({length:Math.ceil(c.length/8)},()=>0);return c.forEach((a,u)=>f[u>>>3]|=a<<7-(u&7)),new Q(i,t,f,r)}function ft(s,t){var a;const{ecc:e="L",boostEcc:n=!1,minVersion:r=1,maxVersion:o=40,maskPattern:i=-1,border:l=1}=t||{},c=typeof s=="string"?ot(s):Array.isArray(s)?[T(s)]:void 0;if(!c)throw new Error(`uqr only supports encoding string and binary data, but got: ${typeof s}`);const h=ht(c,H[e],r,o,i,n),f=ut({version:h.version,maskPattern:h.mask,size:h.size,data:h.modules,types:h.types},l);return t!=null&&t.invert&&(f.data=f.data.map(u=>u.map(m=>!m))),(a=t==null?void 0:t.onEncoded)==null||a.call(t,f),f}function ut(s,t=1){if(!t)return s;const{size:e}=s,n=e+t*2;s.size=n,s.data.forEach(o=>{for(let i=0;i<t;i++)o.unshift(!1),o.push(!1)});for(let o=0;o<t;o++)s.data.unshift(Array.from({length:n},i=>!1)),s.data.push(Array.from({length:n},i=>!1));const r=P.Border;s.types.forEach(o=>{for(let i=0;i<t;i++)o.unshift(r),o.push(r)});for(let o=0;o<t;o++)s.types.unshift(Array.from({length:n},i=>r)),s.types.push(Array.from({length:n},i=>r));return s}function gt({ecl:s="M",size:t=200,uri:e,clearSize:n=0,image:r,imageBackground:o="transparent"}){const i=n,l=t-10*2,c=V.useMemo(()=>{const h=[],f=ft(e,{ecc:s,border:0}).data,a=l/f.length,u=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];for(const{x:b,y:g}of u){const x=(f.length-7)*a*b,w=(f.length-7)*a*g;for(let d=0;d<3;d++)h.push(E.jsx("rect",{fill:d%2!==0?"var(--ck-qr-background, var(--ck-body-background))":"var(--ck-qr-dot-color)",rx:(d-2)*-5+(d===0?2:3),ry:(d-2)*-5+(d===0?2:3),width:a*(7-d*2),height:a*(7-d*2),x:x+a*d,y:w+a*d},`${d}-${b}-${g}`))}if(r){const b=(f.length-7)*a*1,g=(f.length-7)*a*1;h.push(E.jsxs(E.Fragment,{children:[E.jsx("rect",{fill:o,rx:-2*-5+2,ry:-2*-5+2,width:a*(7-0*2),height:a*(7-0*2),x:b+a*0,y:g+a*0}),E.jsx("foreignObject",{width:a*(7-0*2),height:a*(7-0*2),x:b+a*0,y:g+a*0,children:E.jsx("div",{style:{borderRadius:-2*-5+2,overflow:"hidden"},children:r})})]}))}const m=Math.floor((i+25)/a),M=f.length/2-m/2,p=f.length/2+m/2-1;return f.forEach((b,g)=>{b.forEach((x,w)=>{var d;(d=f[g])!=null&&d[w]&&(g<7&&w<7||g>f.length-8&&w<7||g<7&&w>f.length-8||(r||!(g>M&&g<p&&w>M&&w<p))&&h.push(E.jsx("circle",{cx:g*a+a/2,cy:w*a+a/2,fill:"var(--ck-qr-dot-color)",r:a/3},`circle-${g}-${w}`)))})}),h},[s,r,o,i,l,e]);return E.jsxs("svg",{height:l,width:l,viewBox:`0 0 ${l} ${l}`,style:{width:l,height:l},role:"presentation",children:[E.jsx("rect",{fill:"transparent",height:l,width:l}),c]})}export{gt as default};
