(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const P="/assets/javascript-8dac5379.svg",L=`<!DOCTYPE html>\r
<html lang="en">\r
<head>\r
    <meta charset="UTF-8">\r
    <meta http-equiv="X-UA-Compatible" content="IE=edge">\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
    <title>Document</title>\r
</head>\r
<body>\r
    <div class="modal-dialog">\r
        <form novalidate>\r
            <span>User</span>\r
            <input type="text" name="firstName" placeholder="First Name" />\r
            <input type="text" name="lastName" placeholder="Last Name" />\r
            <input type="number" name="balance" placeholder="Balance" />\r
    \r
            <div>\r
                <input type="checkbox" id="is-active" name="isActive" checked/>\r
                <label for="is-active">is active?</label>\r
            </div>\r
    \r
            <button type="submit">\r
                Save\r
            </button>\r
    \r
        </form>\r
    \r
    </div>\r
</body>\r
</html>`;class y{constructor({id:t,isActive:n,balance:r,avatar:a,firstName:s,lastName:c,gender:m}){this.id=t,this.isActive=n,this.balance=r,this.avatar=a,this.firstName=s,this.lastName=c,this.gender=m}}const f=e=>{const{avatar:t,balance:n,first_name:r,gender:a,id:s,isActive:c,last_name:m}=e;return new y({avatar:t,balance:n,firstName:r,gender:a,id:s,isActive:c,lastName:m})},N=async(e=1)=>{const t=`http://localhost:3001/users/${e}`,r=await(await fetch(t)).json();return f(r)};let i,d,p={};const b=async e=>{if(i==null||i.classList.remove("hide-modal"),p={},!e)return;const t=await N(e);T(t)},g=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},T=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,p=e},E=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=L,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",n=>{n.target.className==="modal-container"&&g()}),d.addEventListener("submit",async n=>{n.preventDefault();const r=new FormData(d);r.get("isActive")||r.append("isActive","off");const a={...p};for(const[s,c]of r){if(s==="balance"){a[s]=+c;continue}if(s==="isActive"){a[s]=c==="on";continue}a[s]=c}await t(a),g()}),e.append(i))};const A=e=>{const t=document.createElement("button");t.innerText="Añadir nuevo usuario",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{b()})};const v=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(f)},o={currentPage:0,users:[]},U=async()=>{const e=await v(o.currentPage+1);e.length!==0&&(o.currentPage=o.currentPage+1,o.users=e)},w=async()=>{if(o.currentPage===1)return;const e=await v(o.currentPage-1);e.length!==0&&(o.currentPage=o.currentPage-1,o.users=e)},S=e=>{let t=!1;o.users=o.users.map(n=>n.id===e.id?(t=!0,e):n),o.users.length<10&&!t&&o.users.push(e)},$=async()=>{const e=await v(o.currentPage);if(e.length===0){await w();return}o.users=e},l={loadNextPage:U,loadPreviusPage:w,onUserChanged:S,reloadPage:$,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},M=async e=>{const t=`http://localhost:3001/users/${e}`;return await(await fetch(t,{method:"DELETE"})).json(),!0};let u;const x=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
    
        <tr>
            <th>#Id</th>
            <th>Balance</th>
            <th>Primer nombre</th>
            <th>Ultimo nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
        </tr>
    `;const n=document.createElement("tbody");return e.append(t,n),e},k=e=>{const t=e.target.closest(".select-user");if(!t)return;const n=t.getAttribute("data-id");b(n)},B=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const n=t.getAttribute("data-id");try{await M(n),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),h()}catch(r){console.log(r),alert("No se pudo eliminar")}},h=e=>{const t=l.getUsers();u||(u=x(),e.append(u),u.addEventListener("click",k),u.addEventListener("click",B));let n="";t.forEach(r=>{n+=`
        <tr>
            <td>${r.id}</td>
            <td>${r.balance}</td>
            <td>${r.firstName}</td>
            <td>${r.lastName}</td>
            <td>${r.isActive}</td>
            <td>
                <a href="#" class="select-user" data-id="${r.id}">Editar</a>
                |
                <a href="#" class="delete-user"data-id="${r.id}">Eliminar</a>
            </td>
        </tr>
        `}),u.querySelector("tbody").innerHTML=n},q=e=>{const t=document.createElement("button");t.innerText="Siguitente pagina";const n=document.createElement("button");n.innerText="Anterior pagina";const r=document.createElement("span");r.id="current-page",r.innerText=l.getCurrentPage(),e.append(n,r,t),t.addEventListener("click",async()=>{await l.loadNextPage(),r.innerText=l.getCurrentPage(),h(e)}),n.addEventListener("click",async()=>{await l.loadPreviusPage(),r.innerText=l.getCurrentPage(),h(e)})},C=e=>{const{avatar:t,balance:n,firstName:r,gender:a,id:s,isActive:c,lastName:m}=e;return{avatar:t,balance:n,first_name:r,gender:a,id:s,isActive:c,last_name:m}},H=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw new Error("Primer y ultimo nombres son requeridos");const n=C(t);let r;return t.id?r=await O(n):r=await j(n),f(r)},j=async e=>await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json(),O=async e=>{const t=`http://localhost:3001/users/${e.id}`;return await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json()},D=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),e.innerHTML="",h(e),q(e),A(e),E(e,async t=>{const n=await H(t);l.onUserChanged(n),h(),g()})};document.querySelector("#app").innerHTML=`
  <div>
    
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>

    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${P}" class="logo vanilla" alt="JavaScript logo" />
    </a>

    <h1 class="titulo">Tabla de usuarios</h1>
    <div class="card">
    </div>
  </div>
`;const _=document.querySelector(".card");D(_);
