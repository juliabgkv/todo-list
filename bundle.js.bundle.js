(()=>{"use strict";const e=function(e){localStorage.setItem(e.id,JSON.stringify([e.value,e.progress]))},t=function(e){localStorage.removeItem(e)},c="list-item-completed",o="active",s=document.querySelector("#addForm"),n=document.querySelector("#todoInput"),l=document.querySelector("#list"),i=document.querySelector("#listItemTemplate"),r=document.querySelector("#clearCompletedBtn"),a=document.querySelector("#filterBtns"),d=document.querySelector("#leftCounter"),u={all:"all",active:"active",completed:"completed"};let m=u.all,p=[];function v(){let e;return l.innerHTML="",m===u.all?e=p:m===u.active?e=p.filter((e=>"active"===e.progress)):m===u.completed&&(e=p.filter((e=>"completed"===e.progress))),e}function f(e){v().map(g),a.querySelector(".active").classList.remove(o),e.classList.add(o)}function g(e){const t=i.content.cloneNode(!0);t.querySelector("#itemContent").textContent=e.value,t.querySelector("li").dataset.itemId=e.id,"completed"===e.progress&&t.querySelector("li").classList.add(c),l.appendChild(t)}function L(){d.innerText=p.filter((e=>"active"===e.progress)).length}!function(){const e={...localStorage};var t;t=e,p=Object.keys(t).map((e=>{const c=JSON.parse(t[e]);return{id:e,value:c[0],progress:c[1]}})),p.map(g),L()}(),l.addEventListener("click",(function(o){const s=o.target.closest(".list-item");if(s){const n=s.dataset.itemId;if(o.target.classList.contains("delete-btn"))t(n),p=p.filter((e=>e.id!=n)),s.remove(),L();else{const t=p.find((e=>e.id==n));t.progress="active"===t.progress?"completed":"active",s.classList.toggle(c),m!==t.progress&&"all"!==m&&s.remove(),e(t),L()}}})),r.addEventListener("click",(function(){p.filter((e=>"completed"===e.progress)).map((e=>{t(e.id)})),p=p.filter((e=>"active"===e.progress)),l.innerHTML="",(m==u.completed?v(u.completed):p).map(g)})),a.addEventListener("click",(function(e){const t=e.target,c=t.classList.contains(o);t.classList.contains("filter-btn")&&!c&&(t.classList.contains("all-btn")?(m=u.all,f(t)):t.classList.contains("active-todos-btn")?(m=u.active,f(t)):t.classList.contains("completed-todos-btn")&&(m=u.completed,f(t)))})),s.addEventListener("submit",(function(t){t.preventDefault();const c=n.value.trim();if(c){const t=function(e){return{id:(new Date).valueOf(),value:e,progress:"active"}}(c);p.push(t),e(t),g(t),s.reset(),L()}}))})();