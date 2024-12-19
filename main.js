(()=>{"use strict";function e(e,t,n,r,o){var c,a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-counter");return(c=e.link,new Promise((function(e){var t=new Image;t.onload=function(){return e(!0)},t.onerror=function(){return e(!1)},t.src=c}))).then((function(o){o?(a.querySelector(".card__title").textContent=e.name,u.src=e.link,u.alt=e.name,s.textContent=e.likes.length,e.likes.some((function(e){return e._id===t._id}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return n(e._id,l,s)})),u.addEventListener("click",(function(){return r(e)}))):(a.querySelector(".card__title").textContent="Не найдено",u.src="",u.alt="",l.style.display="none",s.textContent=" ")})).catch((function(e){console.error("Ошибка проверки изображения:",e)})),e.owner._id===t._id&&(i.classList.remove("card__delete-button_hidden"),i.addEventListener("click",(function(){return o(e._id,a)}))),a}function t(e){e.classList.toggle("card__like-button_is-active")}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),document.addEventListener("mousedown",c)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),document.removeEventListener("mousedown",c)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&r(document.querySelector(".popup_is-opened"))}function a(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){i(e,n,t),n.setCustomValidity("")})),u(n,r,t)}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function i(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}var l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-28",headers:{authorization:"0534fa74-5ff8-42fb-b57c-ea4a34c93f29","Content-Type":"application/json"}};function s(e){return e.ok?e.json():Promise.reject("Ошибка ответа: ".concat(e.status))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f={cardId:"",card:""},p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);u(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),u(n,r,t)}))}))}(t,e)}))}(p);var m=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),_=document.querySelector(".profile__image"),h=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),C=document.querySelector(".popup__image"),q=document.querySelector(".popup__caption"),g=document.querySelector(".popup_type_image-avatar"),L=document.querySelector(".popup_type_image-author"),E=document.querySelector(".popup_type_image-timer"),k=document.querySelector(".popup_type_edit-avatar"),x=document.querySelector(".popup_type_delete-card"),w=document.forms["edit-profile"],A=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),I=w.elements.name,D=w.elements.description,T=document.forms["new-place"],j=T.elements["place-name"],M=T.elements.link,O=document.forms["edit-avatar"],P=O.elements.avatar,B=document.forms["delete-card"];function N(e){C.src=e.link,C.alt=e.name,q.textContent=e.name,g.style.backgroundImage="url(".concat(e.owner.avatar,")"),L.textContent=e.owner.name,function(e){var t=new Date-new Date(e.createdAt),n=Math.floor(t/6e4%60),r=Math.floor(t/36e5%24),o=Math.floor(t/864e5),c="";n>0&&(c="".concat(n," мин. назад")),r>0&&(c="".concat(r," ч. назад")),o>0&&(c="".concat(o," дн. назад")),""===c&&(c="только что"),E.textContent=c}(e),n(S)}function J(e,t){f.cardId=e,f.card=t,n(x)}function V(e){var t=e.querySelector(".popup__button");t.textContent={Сохранить:"Сохранение...","Сохранение...":"Сохранить",Да:"Удаление...","Удаление...":"Да"}[t.textContent]||"Сохранить"}function H(e,n,r){n.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:l.headers}).then(s)}(e).then((function(e){r.textContent=e.likes.length,t(n)})).catch((function(e){console.error("Ошбика при установке лайка:",e)})):function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then(s)}(e).then((function(e){r.textContent=e.likes.length,t(n)})).catch((function(e){console.error("Ошбика при установке лайка:",e)}))}y.addEventListener("click",(function(){I.value=A.textContent,D.value=U.textContent,a(w,p),n(h)})),v.addEventListener("click",(function(){j.value="",M.value="",a(T,p),n(b)})),_.addEventListener("click",(function(){P.value="",a(O,p),n(k)})),w.addEventListener("submit",(function(e){var t;e.preventDefault(),V(w),(t={name:I.value,about:D.value},fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify(t)}).then(s)).then((function(e){A.textContent=e.name,U.textContent=e.about,r(h)})).catch((function(e){console.error("Ошбика при отправке формы:",e)})).finally((function(){V(w)}))})),T.addEventListener("submit",(function(t){var n;t.preventDefault(),V(T),(n={name:j.value,link:M.value,likes:[]},fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify(n)}).then(s)).then((function(t){var n=e(t,t.owner,H,N,J);m.prepend(n),r(b),T.reset()})).catch((function(e){console.error("Ошбика при добавлении карточки:",e)})).finally((function(){V(T)}))})),O.addEventListener("submit",(function(e){var t;e.preventDefault(),V(O),(t=P.value,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:t})}).then(s)).then((function(e){_.style.backgroundImage="url(".concat(e.avatar,")"),r(k)})).catch((function(e){console.error("Ошбика при изменении аватара:",e)})).finally((function(){V(O)}))})),B.addEventListener("submit",(function(e){return function(e,t,n){e.preventDefault(),V(B),function(e){return fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).then(s)}(t).then((function(){!function(e){e.remove()}(n),r(x)})).catch((function(e){console.error("Ошбика при удалении карточки:",e)})).finally((function(){V(B)}))}(e,f.cardId,f.card)})),Promise.all([fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];c.forEach((function(t){return function(t,n){m.append(e(t,n,H,N,J))}(t,a)})),A.textContent=a.name,U.textContent=a.about,_.style.backgroundImage="url(".concat(a.avatar,")")})).catch((function(e){console.error("Ошбика при получении данных сервера:",e)}))})();