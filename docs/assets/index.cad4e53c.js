var jt=Object.defineProperty,Lt=Object.defineProperties;var Rt=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var ot=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable;var ct=(t,e,n)=>e in t?jt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,a=(t,e)=>{for(var n in e||(e={}))ot.call(e,n)&&ct(t,n,e[n]);if(j)for(var n of j(e))rt.call(e,n)&&ct(t,n,e[n]);return t},m=(t,e)=>Lt(t,Rt(e));var Q=(t,e)=>{var n={};for(var s in t)ot.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&j)for(var s of j(t))e.indexOf(s)<0&&rt.call(t,s)&&(n[s]=t[s]);return n};import{r as E,u as Ft,a as Ot,b as Ht,c as Vt,d as zt,s as $,R as c,L as at,_ as At,T as Qt,O as Yt,w as Y,e as Ut,W as Wt,f as Gt,H as Xt,g as Kt,h as _,i as Dt}from"./vendor.1e56af1c.js";const Jt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}};Jt();const Zt=()=>{const t={hashRoot:"",hashSlash:"#"},e=[["default",{}]];return new Map(e.map(([n,s])=>[n,{options:s,hist:t}]))},it=t=>Zt().get(t),te="_error_cx7tg_1",ee="_worse_cx7tg_11",ne="_equal_cx7tg_21",se="_better_cx7tg_41",oe="_bytes_cx7tg_51",re="_row_cx7tg_64",ce="_main_cx7tg_65";var L={error:te,worse:ee,equal:ne,better:se,bytes:oe,row:re,main:ce};const U=t=>["\u2717","\u2717","\u2713"].map((e,n)=>{const s=[t.worse,t.equal,t.better];return{symbol:e,className:s[n]}}),k=(t,e,n)=>{const s=Math.sign(t.length-e.length);return n[s+1]},W=t=>{const[e,n]=E.exports.useState(new Map);return t.listen(()=>{n(new Map)}),{cache:e,setCache:n,updateCache:(o,r)=>{if(r===null)return n(new Map);n(new Map([...e,[o,r]]))}}},ae=t=>BigInt(`0b${t}`),ie=t=>parseInt(t,2),le=t=>parseInt(t,2).toString(4).padStart(2,"0");function lt(t){return typeof[...t.slice(0)].pop()=="bigint"}function N(t,e){return e?t.map(n=>ae(n)):t.map(n=>ie(n))}const ut=t=>[...t].map(e=>BigInt(e)),R=t=>[...t].map(e=>e.toString(2).padStart(8,"0")),ue=(t,e)=>{const n=new RegExp(e,"g");return t.match(n)||[]},y=(t,e=8,n="0")=>{const s=Math.ceil(t.length/e)*e;return ue(t.padStart(s,n),`.{${e}}`)},G=BigInt(256),de=t=>{const e=t>=G?"B9":"B3";return{input:t,label:e}},X=(t,e)=>`${+!e}${t}`,pe=(t,e)=>{const n=y(t,2,"0");return X(n.join("1"),e)},me=(t,e)=>{const n=y(t,8,"0"),s=[].concat(...n.map(o=>y(X(o,0),3,"0")));return X("00"+s.join(""),e)},he=({input:t,label:e},n)=>{if(e==="B3"){const r=t.toString(2);return pe(r,n)}const s=t-G;s>BigInt(0)||BigInt(0);const o=s.toString(2);return me(o,n)},ge=(t,e)=>{const n=de(t);return he(n,e)},xe=t=>y(t.join(""),8,"0");function dt(t){const e=lt(t),n=e?t:ut(t),s=xe([...n].map(ge));return e?N(s,!0):N(s,!1)}const pt=t=>t.filter((e,n)=>n%3==0),mt=t=>t.findIndex((e,n)=>n>0&&e<4),ht=(t,e)=>{const n=e>=0?e:t.length,s=t.slice(0,n),o=t.slice(n);return[s,o]},fe=t=>{const e=mt(t),[n,s]=ht(t,e),o=n.length-1,r=n.reduce((i,l,u)=>{const p=BigInt(4**(o-u));return i+BigInt(l%4)*p},BigInt(0));return{trios:s,out:r}},ye=t=>{const e=mt(pt(t))*3,[n,s]=ht(t,e),o=pt(n),r=o.length-1,i=o.reduce((l,u,p)=>{const d=p*3,[h,g,f]=n.slice(d,d+3),x=h%4*64+g*8+f,b=BigInt(256**(r-p));return l+BigInt(x%256)*b},G);return{trios:s,out:i}},be=t=>{const[e,n=0]=t;return!e&&n>=4?ye(t.slice(1)):n>0?fe(t):{out:BigInt(e%4),trios:t.slice(1)}},gt=t=>{const e={result:[],trios:t};for(;e.trios.length;){const{out:n,trios:s}=be([...e.trios]);if(e.trios.length<=s.length)return e.result;e.result.push(n),e.trios=s}return e.result},_e=t=>{const e=t.slice(t.indexOf("1"));return y("0"+e.slice(1),3,"0")},Ee=t=>{const e=_e(R(t).join(""));return gt(e.map(n=>parseInt(n,2)))},we=t=>{const e=t.map(n=>parseInt(n,4));return gt(e)};function xt(t){const e=lt(t),n=e?t:ut(t),s=Ee([...n]);return e?s:s.map(o=>Number(o))}const M=t=>Uint8Array.from(t),ve=(t,{radix:e,sep:n})=>{const s=t.split(n).map(o=>parseInt(o,e)).filter(o=>!isNaN(o));return M(s)},F=t=>{const e=M(dt(t)),n=M(xt(e));return{code8:e,out8:n}},ft={heat:["reps","input"],text:["input"],list:["input"]},yt={radix:10,space:",",content:Object.keys(ft)},$e=({radix:t,space:e,content:n},s)=>{const o=ft[s]||[],r=u=>o.includes(u),i=[{keys:["reps"].filter(r),empty:1,decode:u=>parseInt(u,10),encode:u=>u.toString(10),checkText:u=>!isNaN(parseInt(u,10)),checkValue:u=>u>1},{keys:["input"].filter(r),empty:[],decode:u=>ve(u,{sep:e,radix:t}),encode:u=>{const p=d=>(d===void 0&&console.log({n:d}),d.toString(t));return[...u].map(p).join(e)},checkValue:()=>!0}],l=["",s,""].join("/");return{formats:i,root:l}},bt=()=>{const t=Ft().pathname.split("/")[1];return yt.content.includes(t)?t:"text"},K=t=>{const e=Ot(),n=Ht(),{formats:s,root:o}=$e(yt,bt()),r=m(a({},t),{formats:s,root:o}),i=Vt(n,r),l=zt(e,r),u=E.exports.useMemo(()=>p=>l(a(a({},i),p)),[i]);return{hash:i,setHash:l,updateHash:u}},_t=`
  gap: 0.333em;
  display: grid;
  justify-items: center;
  justify-content: space-evenly;
`,Se=$.div`
  ${_t}
  grid-template-columns: 1fr auto 1fr;
  padding-top: 1em;
`,Be=$.div`
  ${_t}
  grid-template-columns: repeat(${({n:t})=>t}, 1fr);
  grid-column: 2;
`,Ie=$.div`
  margin: 0.5em;
`,Ce=t=>{const{links:e,noNav:n=!1}=t;return n?"":c.createElement(Se,null,c.createElement(Be,{n:e.length},e.map((i,r)=>{var l=i,{text:s}=l,o=Q(l,["text"]);return c.createElement(Ie,{key:r},c.createElement(at,a({},o),s))})))},Pe="_error_ahglg_1",ke="_worse_ahglg_11",Ne="_equal_ahglg_21",Me="_better_ahglg_41",qe="_bytes_ahglg_51",Te="_wrapper_ahglg_64",je="_dropdown_ahglg_65",Le="_center_ahglg_76",Re="_right_ahglg_121",Fe="_item_ahglg_125",Oe="_active_ahglg_125";var S={error:Pe,worse:ke,equal:Ne,better:Me,bytes:qe,wrapper:Te,dropdown:je,center:Le,right:Re,item:Fe,active:Oe};const He=(t,e)=>{const{padding:n,sep:s}=e;if(n===0)return!0;const o=y(t,n,"");return!(s?t.split(s):o).some(l=>n!==l.length)},Et=({radix:t})=>{const e=new Map([[0,""],[16,"a-f0-9"]]);return e.has(t)?e.get(t):"0-"+(t-1)},Ve=(t,e,n)=>t.replace(new RegExp(e,"g"),n),ze=(t,e)=>{const{sep:n}=e,s=`[${n}]+?<!$`,o=Et(e),r=`[^${o}${n}]`;return[...o?[[r,""]]:[],...n?[[s,n]]:[]].reduce((l,[u,p])=>Ve(l,u,p),t)},Ae=(t,e)=>{const n=Et(e),s=new RegExp(`[${n}]$`);return!n||t.match(s)},wt={"0":24,"1":25,"2":28,"3":41,"4":40,"5":27,"6":44,"7":51,"8":42,"9":32," ":0,e:1,t:2,a:3,o:4,n:5,i:6,s:7,r:8,h:9,l:10,d:11,c:12,u:13,m:14,f:15,p:16,g:17,y:18,w:19,",":20,".":21,b:22,v:23,k:26,T:29,S:30,'"':31,A:33,M:34,"-":35,C:36,I:37,N:38,"'":39,B:43,R:45,P:46,E:47,D:48,H:49,x:50,W:52,L:53,O:54,F:55,Y:56,G:57,J:58,z:59,j:60,U:61,q:62,"\n":63,":":64,")":65,"(":66,$:67,K:68,";":69,V:70,"*":71,"?":72,Q:73,"/":74,X:75,"&":76,Z:77,"!":78,"%":79,"+":80,">":81,"<":82,"=":83,"#":84,"@":85,"[":86,"\\":87,"]":88,"^":89,_:90,"`":91,"{":92,"|":93,"}":94,"~":95},Qe=t=>Object.keys(t).sort((e,n)=>t[e]-t[n]),vt={dict:wt,list:Qe(wt)},Ye=8,Ue=t=>y(t,Ye),$t=(t,e)=>{const{name:n}=e.code,s=`Each item in ${n} must be ${e.padding} chars.`;if(!He(t,e))throw new Error(s)},q={uint8:{textParser:t=>e=>($t(e,t),Xe(e,t)),bitParser:t=>e=>Ke(y(e,t.bits),t).join(t.sep)},uintVarQuat:{textParser:t=>e=>{$t(e,t);const{sep:n,code:s}=t,{padding:o,encode:r}=s,i=e.split(n).join(""),l=y(i,o),u=we(l),p=N(u),d=r(p);return R(d)},bitParser:t=>e=>{const{bits:n}=t.code,s=y(e,n).map(le);return y(s.join(""),t.padding).join(t.sep)}},englishText:{textParser:t=>e=>{const{dict:n}=vt,s=[...e].map(o=>n[o]);return R(s)},bitParser:t=>e=>{const{sep:n}=t,{list:s}=vt;return N(y(e,t.bits)).map(i=>s[i]||"?").join(n)}}},We=({entropy:t,radix:e})=>Math.ceil(Math.log(t)/Math.log(e)),O=({bits:t,radix:e})=>{const n=2**(t||8);return We({entropy:n,radix:e})},w=t=>R(t).join(""),Ge=t=>N(Ue(t)),Xe=(t,{radix:e,bits:n,sep:s})=>{const o=O({bits:n,radix:2});return t.split(s).map(r=>parseInt(r,e).toString(2).padStart(o,"0"))},Ke=(t,{radix:e,padding:n,sep:s})=>t.map(o=>parseInt(o,2).toString(e).padStart(n,"0")),De=t=>t.replace(/^\w/,e=>e.toUpperCase()),Je=({sep:t})=>{const e=new Map([["^..+.$",o=>`joined by ${o.slice(1,-1)}`]]),n=[...e.keys()].find(o=>t==null?void 0:t.match(new RegExp(o)));return(e.get(n)||(()=>""))(t).split(" ")},Ze=t=>{const e=O(t),{padding:n}=a({padding:e},t),s=`${n}x${t.bits||0}`,o=new Map([["0x.*",""],[".*x24","byte trios"],[".*x3","bit trios"],[".*x4","nibbles"],[".*x8","bytes"],["1x.*","digits"],["2x.*","pairs"],["3x.*","trios"]]),r=[...o.keys()].find(l=>s.match(new RegExp(l)));return(o.get(r)||"").split(" ")},tn=t=>[t.name,en(t),...Ze(t),...Je(t)],en=({radix:t})=>new Map([[16,"hex"],[2,"binary"],[3,"ternary"],[4,"base-4"],[10,"decimal"],[0,"variable"]]).get(t)||`base-${t}`,St=t=>{const e=tn(t).filter(n=>n);return{text:De(e.join(" ")),value:e.join("-")}},nn=t=>{const e=!!t.choice,{choices:n,choose:s}=t,{choiceStyles:o}=t,r=n.map(St),i=()=>{s(null)},l=({key:g})=>{s(n.find((f,x)=>r[x].value===g)||null)},u="Explore encodings...",p=r.map(g=>({key:g.value,label:g.text})),d=(g,{label:f})=>e?!0:g.split(" ").some(x=>f.match(new RegExp(`(^| )${x}`,"i"))),h=m(a({},o),{placeholder:u,onSelect:l,items:p,match:d,onInput:i});return c.createElement(At,a({},h))},sn=t=>{const{togglePad:e,qualia:n,pad:s}=t,o=t.choice?2*!!s:1,{symbol:r}=n[o],{className:i}=n[o],l={dropdownClassName:S.dropdown,activeItemClassName:S.active,itemClassName:S.item};return c.createElement("div",{className:S.wrapper},c.createElement("div",{className:S.center},c.createElement("span",null,"Integer format")),c.createElement(nn,a({},m(a({},t),{choiceStyles:l}))),c.createElement("div",{className:S.right},c.createElement("button",{onClick:e,className:i},r," Padding")))},on=t=>t.target.value,rn=({setInput:t,setText:e,options:n})=>{const{textParser:s}=n.parse;return o=>{const r=on(o),i=ze(r,n);if(!Ae(i,n))return e(i);const{decode:u}=n.code;let p;try{const d=s(n)(i).join(""),h=Ge(d);p=u(h)}catch({message:d}){return console.warn(d),e(i)}t(p),e(null)}},cn="_error_hixcb_1",an="_worse_hixcb_11",ln="_equal_hixcb_21",un="_better_hixcb_41",dn="_bytes_hixcb_51";var D={error:cn,worse:an,equal:ln,better:un,bytes:dn};const Bt=t=>{const{uuid:e,label:n,editable:s=!0}=t,{cache:o,updateCache:r}=t,{setInput:i,options:l}=t,u=o.has(e),p=C=>r(e,C),d=u?o.get(e):t.text,h=t.text===d,g=rn({setInput:i,setText:p,options:l}),f={className:D.bytes},x=m(a({},f),{value:d,maxRows:12,minRows:1,onChange:g}),b=s?c.createElement(Qt,a({},x)):c.createElement("div",a({},f),d),I=h?D.equal:D.error;return c.createElement("div",null,c.createElement("div",{className:I},n),b)},pn="_result_gq5kq_1";var mn={result:pn};const hn=({El:t,cls:e=null,msg:n=""})=>c.createElement(t,{className:e},n),It=t=>{const{prefix:e,header:n,items:s,cache:o}=t,{updateCache:r,setInput:i}=t;return c.createElement("div",{className:t.cls},c.createElement(hn,a({},n)),c.createElement("div",{className:mn.result},s.map((l,u)=>c.createElement(Bt,a({},m(a({},l),{uuid:`${e}-${u}`,updateCache:r,setInput:i,cache:o,key:u}))))))},Ct=8,B={get uint8(){return{decode:t=>t,encode:t=>t,name:"Uint8",padding:Ct,bits:Ct,radix:2}},get uintVarQuat(){return{decode:xt,encode:dt,name:"Twoby",padding:2,radix:4,bits:3}}},J=t=>{const{parse:e,code:n,src:s}=t,o=a({bits:8},t),{name:r}=a(a({},n),t),i=St(m(a({},o),{name:r})).text,l=e.bitParser(o)(s);return{options:o,label:i,text:l}},gn=t=>{const{bits:e,code:n}=t,{radix:s}=n,o=Math.pow(2**n.bits,1/n.padding),r=O({radix:o,bits:e});return J(m(a({padding:r,sep:" "},t),{radix:s}))},Z=t=>{const e=O(t);return J(a({padding:e,sep:" "},t))},H=t=>J(a({padding:0,sep:","},t)),xn=({in8:t})=>{const e=B.uint8,s={parse:q.englishText,code:e,bits:8,radix:0,sep:""};return[H(m(a({},s),{name:"Text",src:w(t)}))]},fn=({value:t})=>{const n={parse:q.uint8,code:B.uint8,bits:8,radix:10};return[H(m(a({},n),{src:w([t])}))]},yn=({in8:t,code8:e,out8:n})=>{const s=q.uint8,o=B.uintVarQuat,r={parse:s,code:B.uint8,bits:8,radix:16};return[Z(m(a({},r),{name:"Input",src:w(t)})),Z(m(a({},r),{code:o,name:"Output",src:w(e)})),H(m(a({},r),{name:"",radix:10,src:w(n)}))]},bn=({in8:t,code8:e,choice:n})=>{const s=B.uint8,o=q.uint8,r=B.uintVarQuat,i=q.uintVarQuat,u=[H(m(a({},{parse:o,code:s,sep:" + ",radix:4}),{name:"Input",src:w(t)}))];if(n!==null){const p=a({parse:i,code:r},n),d=a({parse:o,code:r},n);return u.concat([gn(m(a({},p),{name:"Internal",src:w(e)})),Z(m(a({},d),{src:w(e)}))])}return u},_n=({result:t,in8:e,choice:n,qualia:s,noExplore:o})=>{const{code8:r,out8:i}=F(e),{className:l}=k(e,r,s),u=k(e,r,["\u2717 Encoding is longer than input","Encoding is same length as input","\u2713 Encoding is shorter than input"]),d=[m(a({},t),{prefix:"i0",header:{msg:u,El:"div",cls:l},items:yn({in8:e,code8:r,out8:i})}),...o?[]:[m(a({},t),{prefix:"i1",header:{msg:"See how it works",El:"h3"},items:bn({in8:e,code8:r,choice:n})})]].map(h=>c.createElement(It,a({key:h.prefix},h)));return c.createElement(c.Fragment,null,c.createElement("h3",null,"Input/Output Bytes"),d)},En=t=>{const e=t.history,{noChoices:n=!1}=t,{hash:s,updateHash:o}=K(),{cache:r,setCache:i,updateCache:l}=W(e),u=P=>o({input:P}),p=s.input,d=U(L),h=[{radix:2,bits:3},{radix:16,bits:8},{radix:16,bits:24}],[g,f]=E.exports.useState(!0),[x,b]=E.exports.useState(h[0]),I=P=>{i(new Map),b(P)},C=()=>{i(new Map),f(!g)},V=n,z={pad:g,qualia:d,choices:h,choice:x,choose:I,togglePad:C},A={result:{cls:L.row,cache:r,updateCache:l,setInput:u},in8:p,choice:x,qualia:d,noExplore:V},v=bt(),T=[c.createElement(_n,a({key:0},A)),n?"":c.createElement(sn,a({key:1},z)),c.createElement("div",{key:2,className:L.row},c.createElement(Yt,null))];v==="text"&&T.reverse();const Tt=[{to:"/list/",text:"Basic Examples"},{to:"/text/",text:"Text Encoding"},{to:"/heat/",text:"Heatmap Graph"}].filter(({to:P})=>!P.match(new RegExp("^/"+v)));return c.createElement(c.Fragment,null,c.createElement(Ce,{links:Tt}),c.createElement("div",{className:L.main},T))},wn="_error_7fqax_1",vn="_worse_7fqax_11",$n="_equal_7fqax_21",Sn="_better_7fqax_41",Bn="_bytes_7fqax_51",In="_examples_7fqax_64";var Pt={error:wn,worse:vn,equal:$n,better:Sn,bytes:Bn,examples:In};const Cn=t=>{const{inputs:e}=t,n=U(Pt);return c.createElement(c.Fragment,null,c.createElement("h3",null,"Examples"),c.createElement("div",{className:Pt.examples},e.map((s,o)=>{const r=s.join(", "),i=M(s),{code8:l}=F(i),u="/list/"+s.join(","),{className:p}=k(i,l,n),d={key:o,className:p,to:u};return c.createElement(at,a({},d),"[",r,"]")})))},Pn="_error_1933n_1",kn="_worse_1933n_11",Nn="_equal_1933n_21",Mn="_better_1933n_41",qn="_bytes_1933n_51",Tn="_row_1933n_64";var tt={error:Pn,worse:kn,equal:Nn,better:Mn,bytes:qn,row:Tn};const jn=t=>{const e=t.history,{hash:n,updateHash:s}=K(),{cache:o,updateCache:r}=W(e),i=b=>s({input:b}),l=n.input,{code8:u}=F(l),p=u.length-l.length,d=["-","","+"][Math.sign(p)+1],h=Math.abs(100*(p/l.length)).toFixed(1),g=k(l,u,[`\u2717 Encoding is ${p} more bytes (${d}${h}%).`,`Both ASCII and encoding are ${l.length} bytes.`,`\u2713 Encoding is ${-p} fewer bytes (${d}${h}%).`]),{className:f}=k(l,u,U(tt)),x={cache:o,setInput:i,updateCache:r,cls:tt.row,prefix:"unicode",items:xn({in8:l}),header:{msg:g,El:"div",cls:f}};return c.createElement(c.Fragment,null,c.createElement("h3",null,"ASCII"),c.createElement("div",{className:tt.examples},c.createElement(It,a({},x))))},Ln="_row_1mreh_1";var kt={row:Ln};const Rn=(t,e)=>{let n;return(...s)=>{const o=function(){n=null,t(...s)};clearTimeout(n),n=setTimeout(o,e)}},Nt=({innerWidth:t,innerHeight:e}=window)=>({width:t,height:e}),Fn=()=>{const[t,e]=E.exports.useState(Nt);return E.exports.useEffect(()=>{const n=Rn(()=>{e(Nt())},250);return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)},[]),t},On=8;function*et(t,e=0){for(let n=e;n<t;n+=1)yield n}const Hn=({reps:t,n1:e,n2:n})=>{const[s,o]=[e,n].map(u=>2**u-1),r=[].concat(...Y(et(t)).map(()=>[s,o])),{code8:i}=F(M(r)),l=i.length/(2*t);return{x:s,y:o,count:l}},Vn=t=>{const{reps:e}=t,n=On;return{table:Y(et(n+1)).reduce((o,r)=>[...o,...Y(et(n+1)).map(i=>Hn({reps:e,n1:r,n2:i}))],[])}},zn=[{name:"click",value:{},on:[{events:"rect:click",update:"datum"}]}],An={width:400,height:200,padding:5,$schema:"https://vega.github.io/schema/vega/v5.json",signals:zn,data:[{name:"table"},{name:"text",transform:[{type:"formula",as:"byteText",expr:"datum.nBytes + ' per Uint8'"}]}]},Qn={axes:[{orient:"top",title:"X",scale:"x"},{orient:"left",title:"Y",scale:"y"}]},Yn=t=>a(a({range:{scheme:"blueorange"},type:"linear"},{nice:!0,reverse:!0}),t),Mt=n=>{var s=n,{field:t}=s,e=Q(s,["field"]);return a({domain:{data:"table",field:t},type:"band"},e)},nt={color:t=>Yn(a({name:"color"},t)),x:t=>Mt(a({name:"x",range:"width"},t)),y:t=>Mt(a({name:"y",range:"height"},t))},Un=(t,e)=>{const n="x",s="y",o={field:n},r={field:s},i={domain:e};return m(a(a(a({},Qn),An),t),{scales:[nt.x(o),nt.y(r),nt.color(i)],marks:[{type:"rect",from:{data:"table"},encode:{enter:{x:{scale:"x",field:n},y:{scale:"y",field:s},width:{scale:"x",band:1},height:{scale:"y",band:1},fill:{scale:"color",field:"count"}},update:{fill:{scale:"color",field:"count"}},hover:{fill:{value:"red"}}}},{type:"text",interactive:!1,from:{data:"text"},encode:{enter:{x:{signal:"width",offset:-5},y:{signal:"height",offset:24},fill:{value:"black"},fontSize:{value:18},align:{value:"right"},text:{field:"byteText"}}}}],legends:[{fill:"color",type:"gradient",orient:"bottom",direction:"horizontal",title:["Bytes per int"],titleFontSize:12,titlePadding:4}]})},Wn=({width:t,height:e},n,s)=>({width:t*n,height:e*s}),Gn=(()=>{const t=e=>`rgba(244,244,255,${e})`;return[t(.2),t(.8),t(.9),t(1)].join(",")})(),Xn=$.div`
  background-image: linear-gradient(${Gn});
  grid-auto-rows: auto;
  position: fixed;
  display: grid;
  height: 40vh;
  width: 100%;
  z-index: 100;
  bottom: 0;
  left: 0;
`,Kn=$.div`
  height: ${t=>t.height}px;
  grid-template-rows: auto auto 1fr;
  display: grid;
`,Dn=(t={})=>["Width","Height"].every(e=>`client${e}`in t),Jn=t=>e=>{if(e&&Dn(e)){const n=e.clientHeight,s=e.clientWidth;t({width:s,height:n})}},Zn=()=>{const{hash:t,updateHash:e}=K(),[n,s]=c.useState(null);return{hash:t,choice:n,choose:r=>(i,l)=>{s(l);const u=ts(l,r);e({input:u,reps:r})}}},ts=(t,e)=>{const n=[];if(t&&"x"in t&&"y"in t)for(;n.length<e*2;)n.push(t.x)&&n.push(t.y);return n},es=t=>{const e={count:0,x:"X",y:"Y"},{count:n,x:s,y:o}=a(a({},e),t),r=n.toFixed(2).replace(/0?\.?0*$/,""),i=parseFloat(r)!==n?"~":"";return{nBytes:r?`${i+r} Bytes`:"??? Bytes",nXnY:`${s},${o}`}},ns=t=>{const e=!1,n=t.history,s=Fn(),[o,r]=c.useState(s),{cache:i,updateCache:l}=W(n),{hash:u,choice:p,choose:d}=Zn(),h=c.useMemo(()=>Jn(r),[s]),g=c.useMemo(()=>Un(Wn(o,.8,.5),[0,2]),[o]),{nBytes:f,nXnY:x}=es(p),b=m(a({},Vn(u)),{text:[{nBytes:f}]}),I=([v])=>{d(v)("",p)},C=c.useMemo(()=>Ut({spec:g}),[g]),V=c.createElement(Bt,a({},m(a({},fn({value:u.reps})[0]),{label:`Repetitions of "${x}"`,uuid:"repetitions",setInput:I,updateCache:(v,T)=>{l(v,T)},cache:i}))),z=o.height*2,st={click:d(u.reps)},A={data:b,actions:e,signalListeners:st};return c.createElement(c.Fragment,null,c.createElement(Xn,null,c.createElement("div",{className:kt.row},c.createElement("div",{ref:h},c.createElement(C,a({},A))))),c.createElement(Kn,{height:z},c.createElement("div",{className:kt.row},c.createElement("h3",null,"HeatMap Controls"),c.createElement("div",null,V))))},ss="203220",os="f4f4ff",rs=["Tahoma","Verdana","sans-serif"],cs=$.div`
  font-family: ${rs.join(",")};
  grid-template-columns: minmax(66vw, auto);
  justify-content: space-evenly;
  grid-auto-rows: auto;
  display: grid;
`,as=Wt`
  body {
    background-color: #${os};
    color: #${ss};
  }
`,qt=t=>{const{hist:e,inputs:n}=t,s=Gt(e),o={history:s},r=m(a({},o),{noChoices:!1}),i=a({},o),l=a({},o),u={inputs:n},p=c.createElement(En,a({},r)),d=c.createElement(ns,a({},i)),h=c.createElement(jn,a({},l)),g=c.createElement(Cn,a({},u));return c.createElement(Xt,{history:s},c.createElement(cs,null,c.createElement(Kt,null,c.createElement(_,{path:"/",element:p},c.createElement(_,{path:"heat/:reps/:input",element:d}),";",c.createElement(_,{path:"heat/:reps",element:d}),";",c.createElement(_,{path:"heat",element:d}),";",c.createElement(_,{path:"list/:input",element:g}),";",c.createElement(_,{path:"list",element:g}),";",c.createElement(_,{path:"text/:input",element:h}),";",c.createElement(_,{path:"text",element:h}),";",c.createElement(_,{path:"",element:h}),";"))),c.createElement(as,null))};qt.defaultProps=m(a({},it("default")),{inputs:[[0,0,0,0]]});const is=t=>t.getElementById("index"),ls=Dt.exports.createRoot(is(document)),us=[[],...[...Array(4**3).keys()].map(t=>t.toString(4).split("").map((n,s)=>(s+2)**parseInt(n)))],ds=[it("default")];ls.render(E.exports.createElement("div",null,[...ds.map((t,e)=>{const n=m(a({},t),{inputs:us,key:e});return E.exports.createElement(qt,n)})]));