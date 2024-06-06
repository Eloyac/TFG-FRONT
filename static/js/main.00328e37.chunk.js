(this["webpackJsonpfesachess-frontend"]=this["webpackJsonpfesachess-frontend"]||[]).push([[0],{146:function(e,t,c){},147:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),s=c(28),o=c.n(s),r=c(49),j=c(5),i=c(29),l=c.n(i),b=c(1);var d=()=>{const e=Object(j.p)();return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Welcome to FESACHESS"}),Object(b.jsx)("button",{onClick:async()=>{try{const t=localStorage.getItem("token");if(!t)return void console.error("No token found");const c=await l.a.post("".concat("https://tfg-back.onrender.com","/api/games/create"),{},{headers:{"x-auth-token":t}}),{_id:n}=c.data;e("/game/".concat(n))}catch(t){console.error("Error creating game",t)}},children:"Create New Game"})]})};var m=()=>{const[e,t]=Object(n.useState)(""),[c,a]=Object(n.useState)("");return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Login"}),Object(b.jsxs)("form",{onSubmit:async t=>{t.preventDefault();try{const t=await l.a.post("".concat("https://tfg-back.onrender.com","/api/auth/login"),{email:e,password:c});console.log(t.data),localStorage.setItem("token",t.data.token)}catch(n){console.error(n)}},children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Email:"}),Object(b.jsx)("input",{type:"email",value:e,onChange:e=>t(e.target.value)})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Password:"}),Object(b.jsx)("input",{type:"password",value:c,onChange:e=>a(e.target.value)})]}),Object(b.jsx)("button",{type:"submit",children:"Login"})]})]})};var h=()=>{const[e,t]=Object(n.useState)(""),[c,a]=Object(n.useState)(""),[s,o]=Object(n.useState)("");return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Register"}),Object(b.jsxs)("form",{onSubmit:async t=>{t.preventDefault();try{const t=await l.a.post("".concat("https://tfg-back.onrender.com","/api/auth/register"),{name:e,email:c,password:s});console.log(t.data),localStorage.setItem("token",t.data.token)}catch(n){console.error(n)}},children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Name:"}),Object(b.jsx)("input",{type:"text",value:e,onChange:e=>t(e.target.value)})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Email:"}),Object(b.jsx)("input",{type:"email",value:c,onChange:e=>a(e.target.value)})]}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{children:"Password:"}),Object(b.jsx)("input",{type:"password",value:s,onChange:e=>o(e.target.value)})]}),Object(b.jsx)("button",{type:"submit",children:"Register"})]})]})};var O=()=>{const[e,t]=Object(n.useState)([]),[c,a]=Object(n.useState)(""),s="https://tfg-back.onrender.com";return Object(n.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("token"),c=await l.a.get("".concat(s,"/api/games/mygames"),{headers:{"x-auth-token":e}});t(c.data)}catch(c){a("Error fetching games")}})()}),[s]),Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"My Games"}),c&&Object(b.jsx)("p",{children:c}),Object(b.jsx)("ul",{children:e.map((e=>Object(b.jsxs)("li",{children:["Game between ",e.player1," and ",e.player2," - Result: ",e.result]},e._id)))})]})},u=c(95),g=c(53),x=c(99);const p=localStorage.getItem("token"),v=Object(x.a)("https://tfg-back.onrender.com",{autoConnect:!1,query:{token:p}});v.on("connect",(()=>{console.log("Connected to socket.io server")})),v.on("disconnect",(()=>{console.log("Disconnected from socket.io server")}));var f=c(200),y=c(197),k=c(198),S=c(195),w=c(199);var I=e=>{let{gameId:t}=e;const[c,a]=Object(n.useState)([]),[s,o]=Object(n.useState)("");Object(n.useEffect)((()=>(v.emit("joinGame",t),v.on("message",(e=>{a((t=>[...t,e]))})),()=>{v.emit("leaveGame",t),v.off("message")})),[t]);return Object(b.jsxs)("div",{children:[Object(b.jsx)(f.a,{children:c.map(((e,t)=>Object(b.jsx)(y.a,{children:Object(b.jsx)(k.a,{primary:e.text})},t)))}),Object(b.jsxs)("form",{onSubmit:e=>{e.preventDefault(),v.emit("sendMessage",{gameId:t,text:s}),o("")},children:[Object(b.jsx)(S.a,{type:"text",value:s,onChange:e=>o(e.target.value),fullWidth:!0,margin:"normal"}),Object(b.jsx)(w.a,{type:"submit",variant:"contained",color:"primary",children:"Send"})]})]})};var C=()=>{const{gameId:e}=Object(j.r)(),[t,c]=Object(n.useState)(new g.a);Object(n.useEffect)((()=>(v.connect(),v.emit("joinGame",e),v.on("move",(e=>{const n=new g.a(t.fen());n.move(e),c(n)})),()=>{v.disconnect()})),[t,e]),Object(n.useEffect)((()=>{(async()=>{const t=await l.a.get("".concat("https://tfg-back.onrender.com","/api/games/").concat(e),{headers:{"x-auth-token":localStorage.getItem("token")}}),n=new g.a(t.data.boardState);c(n)})()}),[e]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Game"}),Object(b.jsx)(u.a,{position:t.fen(),onPieceDrop:(n,a)=>((n,a)=>{const s=new g.a(t.fen()),o=s.move({from:n,to:a,promotion:"q"});if(null===o)return;const r=(e=>e.in_checkmate()?"b"===e.turn()?"player1":"player2":e.in_draw()?"draw":"ongoing")(s);c(s),v.emit("move",{gameId:e,move:o,fen:s.fen(),turn:s.turn(),result:r})})(n,a)}),Object(b.jsx)(I,{gameId:e})]})};var E=e=>{let{children:t}=e;return localStorage.getItem("token")?t:Object(b.jsx)(j.a,{to:"/login"})};var G=function(){return Object(b.jsx)(r.a,{children:Object(b.jsxs)(j.d,{children:[Object(b.jsx)(j.b,{path:"/",element:Object(b.jsx)(m,{})}),Object(b.jsx)(j.b,{path:"/login",element:Object(b.jsx)(m,{})}),Object(b.jsx)(j.b,{path:"/register",element:Object(b.jsx)(h,{})}),Object(b.jsx)(j.b,{path:"/home",element:Object(b.jsx)(E,{children:Object(b.jsx)(d,{})})}),Object(b.jsx)(j.b,{path:"/games",element:Object(b.jsx)(E,{children:Object(b.jsx)(O,{})})}),Object(b.jsx)(j.b,{path:"/game/:gameId",element:Object(b.jsx)(E,{children:Object(b.jsx)(C,{})})})]})})};c(146);o.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(G,{})}),document.getElementById("root"))}},[[147,1,2]]]);
//# sourceMappingURL=main.00328e37.chunk.js.map