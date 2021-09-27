var e=Object.defineProperty,t=Object.defineProperties,s=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(t,s,r)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[s]=r;import{c as n,a as c,d as i,u as d,b as u,r as g,e as m,f as p,F as h,g as f,h as b,i as x,j as S,o as y,n as v,k as w,t as E,w as k,v as T,l as I,m as M,p as G,q as _,s as D,x as O,y as j,z as A,A as C,B as L,C as R}from"./vendor.6b38d1c0.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const Q=e=>e.map((e=>{return n=((e,t)=>{for(var s in t||(t={}))a.call(t,s)&&o(e,s,t[s]);if(r)for(var s of r(t))l.call(t,s)&&o(e,s,t[s]);return e})({},e),t(n,s({starred:!1,unread:!1,deleted:!1}));var n})),N=Symbol(),H=n({state:{loading:!1,error:!1,messages:[],selectedMessageIds:[],searchQuery:"",selectionGroup:"Inbox",selectedMessageId:null},actions:{async getMessages({commit:e}){var t;e("SET_LOADING",!0),e("SET_ERROR",null);try{const s=null==(t=(await c.get("/assets/emails.json")).data)?void 0:t.messages;e("SET_MESSAGES",Q(s))}catch(s){e("SET_ERROR",!0)}finally{e("SET_LOADING",!1)}},selectMessages({state:e,commit:t},{ids:s,isSelected:r}){let a=[...e.selectedMessageIds];r?a.push(...s):s.forEach((e=>a=a.filter((t=>t!==e)))),a=[...new Set(a)],t("SET_SELECTED_MESSAGE_IDS",a)},selectAllMessages({state:e,commit:t},{isSelected:s}){t("SET_SELECTED_MESSAGE_IDS",s?e.messages.map((e=>e.id)):[])},setSearchQuery({commit:e},t){e("SET_SEARCH_QUERY",t)},setSelectionGroup({commit:e},t){e("SET_SELECTION_GROUP",t)},toggleStarred({commit:e},{isStarred:t}){const{selectedMessageIds:s}=this.state;s.forEach((s=>{e("TOGGLE_STARRED",{id:s,isStarred:t})}))},toggleIndividualStar({commit:e},{id:t,isStarred:s}){e("TOGGLE_STARRED",{id:t,isStarred:s})},toggleUnread({commit:e},{isStarred:t}){const{selectedMessageIds:s}=this.state;s.forEach((s=>{e("TOGGLE_STARRED",{id:s,isStarred:t})}))},toggleDeleted({commit:e},{isDeleted:t}){const{selectedMessageIds:s}=this.state;s.forEach((s=>{e("TOGGLE_DELETED",{id:s,isDeleted:t})}))},deleteIndividualMessage({commit:e},{id:t}){e("TOGGLE_DELETED",{id:t,isDeleted:!0})}},mutations:{SET_LOADING(e,t){e.loading=t},SET_ERROR(e,t){e.error=t},SET_MESSAGES(e,t){e.messages=t},SET_SEARCH_QUERY(e,t){e.searchQuery=t},SET_SELECTION_GROUP(e,t){e.selectionGroup=t},TOGGLE_STARRED(e,{id:t,isStarred:s}){const r=e.messages.find((e=>e.id===t));r&&Object.assign(r,{starred:s})},TOGGLE_UNREAD(e,{id:t,isUnread:s}){const r=e.messages.find((e=>e.id===t));r&&Object.assign(r,{unread:s})},TOGGLE_DELETED(e,{id:t,isDeleted:s}){const r=e.messages.find((e=>e.id===t));r&&Object.assign(r,{deleted:s})},SET_SELECTED_MESSAGE_IDS(e,t){e.selectedMessageIds=t}},getters:{getAllTags(e){const t=e.messages.map((({tags:e})=>e));return[...new Set(t.flat())]},getFilteredMessages:e=>e.messages.filter((t=>{const{subject:s,body:r}=t,{searchQuery:a}=e;return s.includes(a)||r.includes(a)})).filter((t=>{const{selectionGroup:s}=e;return"Trash"===s?t.deleted:"Inbox"===s?!t.deleted:"Starred"===s?t.starred:t.tags.includes(s)})),isSelected:e=>t=>e.selectedMessageIds.includes(t),allSelected:e=>e.selectedMessageIds.length===e.messages.length}});var P=(e,t)=>{for(const[s,r]of t)e[s]=r;return e};const F=i({name:"InboxTable",setup(){const e=d(N);return{messages:u((()=>e.getters.getFilteredMessages)),searchQuery:u((()=>e.state.searchQuery)),loading:u((()=>e.state.loading)),error:u((()=>e.state.error)),formatDate:e=>x(new Date(e),new Date),toggleSelectedMessage:({isSelected:t,id:s})=>{e.dispatch("selectMessages",{ids:[s],isSelected:t})},starMessage:({id:t,isStarred:s})=>{e.dispatch("toggleIndividualStar",{id:t,isStarred:s})},deleteMessage:({id:t})=>{e.dispatch("deleteIndividualMessage",{id:t})},isSelected:t=>e.getters.isSelected(t),clearSearch:()=>{e.dispatch("setSearchQuery","")}}}}),U={class:"max-w bg-background"},B={key:0,class:"divide-y divide-gray-200 table-auto max-w border-2 border-gray-400"},z={class:"bg-background divide-y divide-gray-400"},q={class:"px-3 py-6 whitespace-nowrap flex flex-column justify-center items-center h-full"},V=["onChange","checked"],Y=["onClick"],K={class:"px-6 py-4"},J={class:"flex items-center"},W={class:"ml-4"},X={class:"text-sm font-medium text-gray-900"},Z={class:"px-6 py-4"},$={class:"text-sm text-gray-900"},ee=["innerHTML"],te=["title"],se=["onClick"],re={key:1,class:"flex flex-col justify-center items-center bg-white empty-container"},ae={key:0},le={key:1,class:"flex flex-col items-center"},oe=p("img",{src:"http://placekitten.com/g/200/200",class:"mb-3",alt:"kitty"},null,-1),ne=S(" No messages. Here is a cat. "),ce={key:0},ie=S("Try expanding or "),de=S(" your search");var ue=P(F,[["render",function(e,t,s,r,a,l){const o=g("FontAwesomeIcon");return y(),m("div",U,[e.messages.length?(y(),m("table",B,[p("tbody",z,[(y(!0),m(h,null,f(e.messages,(t=>(y(),m("tr",{key:t.id,class:v(["cursor-pointer transition-all bg-gray-100 hover:bg-gray-200",{selected:e.isSelected(t.id)}])},[p("td",q,[p("input",{onChange:s=>e.toggleSelectedMessage({isSelected:s.target.checked,id:t.id}),checked:e.isSelected(t.id),type:"checkbox",class:"form-checkbox h-4 w-4 text-gray-600 cursor-pointer"},null,40,V),p("button",{onClick:s=>e.starMessage({id:t.id,isStarred:!t.starred})},[w(o,{icon:"star",class:"ml-4 button star",color:t.starred?"#ffc107":"gray"},null,8,["color"])],8,Y)]),p("td",K,[p("div",J,[p("div",W,[p("div",X,E(t.sender),1)])])]),p("td",Z,[p("div",$,E(t.subject),1),p("div",{class:"text-sm text-gray-500 message-body overflow-ellipsis",innerHTML:t.body},null,8,ee)]),p("td",{class:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",title:t.date},[p("span",null,E(e.formatDate(t.date)),1),p("button",{onClick:s=>e.deleteMessage({id:t.id})},[w(o,{icon:"trash",class:"ml-3 button delete",color:"gray"})],8,se)],8,te)],2)))),128))])])):(y(),m("div",re,[e.loading?(y(),m("div",ae,"Loading...")):(y(),m("div",le,[oe,ne,e.searchQuery?(y(),m("span",ce,[ie,p("b",{class:"cursor-pointer text-blue-500 hover:text-blue-400",onClick:t[0]||(t[0]=(...t)=>e.clearSearch&&e.clearSearch(...t))},"clearing"),de])):b("",!0)]))]))])}]]);const ge=i({name:"ToolBar",setup(){const e=d(N);return{selectAllMessages:t=>{e.dispatch("selectAllMessages",{isSelected:t})},starSelectedMessages:()=>{e.dispatch("toggleStarred",{isStarred:!0})},deleteSelectedMessages:()=>{e.dispatch("toggleDeleted",{isDeleted:!0})},allSelected:u((()=>e.getters.allSelected)),selectionGroup:u((()=>e.state.selectionGroup)),selectedMessageIds:u((()=>e.state.selectedMessageIds))}}}),me={class:"bg-background"},pe={class:"p-3 text-4xl"},he={class:"toolbar px-3 py-2 border-2 border-gray-400 flex h-full items-center"},fe=["checked"];const be=i({name:"InboxComponent",components:{InboxTable:ue,ToolBar:P(ge,[["render",function(e,t,s,r,a,l){const o=g("FontAwesomeIcon");return y(),m(h,null,[p("div",me,[p("h1",pe,E(e.selectionGroup),1)]),p("div",he,[p("input",{onChange:t[0]||(t[0]=t=>e.selectAllMessages(t.target.checked||!1)),checked:e.allSelected,type:"checkbox",class:"form-checkbox h-4 w-4 text-gray-600 cursor-pointer"},null,40,fe),k(p("span",null,[p("button",{onClick:t[1]||(t[1]=(...t)=>e.starSelectedMessages&&e.starSelectedMessages(...t))},[w(o,{icon:"star",class:"ml-4 button star",color:"gray"})]),p("button",{onClick:t[2]||(t[2]=(...t)=>e.deleteSelectedMessages&&e.deleteSelectedMessages(...t))},[w(o,{icon:"trash",class:"ml-4 button star",color:"gray"})])],512),[[T,e.selectedMessageIds.length]])])],64)}]])},setup(){const e=d(N);return I((()=>{e.dispatch("getMessages")})),{messages:u((()=>e.getters.getFilteredMessages)),loading:u((()=>e.state.loading)),error:u((()=>e.state.error))}}}),xe={class:"mt-14 ml-14 md:ml-64"},Se={class:"shadow border-b border-gray-200 .inbox-wrapper"};var ye=P(be,[["render",function(e,t,s,r,a,l){const o=g("ToolBar"),n=g("InboxTable");return y(),m("div",xe,[p("div",Se,[w(o),w(n)])])}]]);const ve=i({name:"InboxIcon"}),we={class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Ee=[p("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"},null,-1)];const ke=i({name:"SideBarComponent",components:{InboxIcon:P(ve,[["render",function(e,t,s,r,a,l){return y(),m("svg",we,Ee)}]])},setup(){const e=d(N);return{setSelectionGroup:t=>{e.dispatch("setSelectionGroup",t)},selectionGroup:u((()=>e.state.selectionGroup)),allTags:u((()=>e.getters.getAllTags))}}}),Te={class:"fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-background h-full text-gray transition-all duration-300 border-none z-10 sidebar"},Ie={class:"overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow"},Me={class:"flex flex-col py-4 space-y-1 mr-1"},Ge={class:"hover:text-blue-600"},_e={class:"cursor-pointer flex flex-row items-center h-12 rounded text-blue-400 font-bold pr-6"},De={class:"inline-flex justify-center items-center ml-4"},Oe=p("span",{class:"ml-2 text-sm tracking-wide truncate"},"Compose",-1),je={class:"inline-flex justify-center items-center ml-4"},Ae=p("span",{class:"ml-2 text-sm tracking-wide truncate"},"Inbox",-1),Ce={class:"inline-flex justify-center items-center ml-4"},Le=p("span",{class:"ml-2 text-sm tracking-wide truncate"},"Starred",-1),Re={class:"inline-flex justify-center items-center ml-4"},Qe=p("span",{class:"ml-2 text-sm tracking-wide truncate"},"Trash",-1),Ne=p("li",{class:"px-5 hidden md:block"},[p("div",{class:"flex flex-row items-center mt-5 h-8"},[p("div",{class:"text-sm font-light tracking-wide text-gray-400 uppercase"}," Tags ")])],-1),He=["onClick"],Pe={class:"inline-flex justify-center items-center ml-4"},Fe={class:"ml-2 text-sm tracking-wide truncate"},Ue=p("p",{class:"mb-14 px-5 py-3 hidden md:block text-center text-xs"}," A Salesloft Interview Project. ",-1);var Be=P(ke,[["render",function(e,t,s,r,a,l){const o=g("FontAwesomeIcon"),n=g("InboxIcon");return y(),m("div",Te,[p("div",Ie,[p("ul",Me,[p("li",Ge,[p("a",_e,[p("span",De,[w(o,{icon:"plus-circle",class:"ml-1 button text-blue-400"})]),Oe])]),p("li",{onClick:t[0]||(t[0]=t=>e.setSelectionGroup("Inbox"))},[p("a",{class:v(["cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-white hover:border-gray-800 rounded text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6",{active:"Inbox"===e.selectionGroup}])},[p("span",je,[w(n)]),Ae],2)]),p("li",{class:v({selected:"Starred"===e.selectionGroup}),onClick:t[1]||(t[1]=t=>e.setSelectionGroup("Starred"))},[p("a",{href:"#",class:v(["cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-white hover:border-gray-800 rounded text-white-600 border-l-4 border-transparent pr-6",{active:"Starred"===e.selectionGroup}])},[p("span",Ce,[w(o,{icon:"star",class:"ml-1 button",color:"black"})]),Le],2)],2),p("li",{onClick:t[2]||(t[2]=t=>e.setSelectionGroup("Trash"))},[p("a",{href:"#",class:v(["cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-white hover:border-gray-800 rounded text-white-600 border-l-4 border-transparent pr-6",{active:"Trash"===e.selectionGroup}])},[p("span",Re,[w(o,{icon:"trash",class:"ml-1 button",color:"black"})]),Qe],2)]),Ne,(y(!0),m(h,null,f(e.allTags,(t=>(y(),m("li",{key:t,class:v({selected:e.selectionGroup===t}),onClick:s=>e.setSelectionGroup(t)},[p("a",{href:"#",class:v(["cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-white hover:border-gray-800 rounded text-white-600 border-l-4 border-transparent pr-6",{active:e.selectionGroup===t}]),title:""},[p("span",Pe,[w(o,{icon:"tag",class:"ml-1 button",color:"black"})]),p("span",Fe,E(t),1)],2)],10,He)))),128))]),Ue])])}]]);const ze=i({name:"SearchIcon"}),qe={class:"w-5 text-gray-600 h-5 cursor-pointer",fill:"none","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",stroke:"currentColor",viewBox:"0 0 24 24"},Ve=[p("path",{d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"},null,-1)];const Ye=i({name:"HeaderComponent",components:{SearchIcon:P(ze,[["render",function(e,t,s,r,a,l){return y(),m("svg",qe,Ve)}]])},setup(){const e=d(N);return{searchQuery:u({get:()=>e.state.searchQuery,set:t=>e.dispatch("setSearchQuery",t)})}}}),Ke={class:"fixed w-full flex items-center justify-between h-14 text-white z-10 border-b-2 border-gray-400"},Je=(e=>(G("data-v-36a48d58"),e=e(),_(),e))((()=>p("div",{class:"flex items-center justify-start md:justify-center md:w-64 pl-3 w-14 h-14 bg-background font-bold text-blue-500 text-xs"}," Smail ",-1))),We={class:"flex items-center justify-center h-14 bg-true-gray-200 header-right bg-background w-full"},Xe={class:"bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200"},Ze={class:"outline-none focus:outline-none"};var $e=P(Ye,[["render",function(e,t,s,r,a,l){const o=g("SearchIcon");return y(),m("div",Ke,[Je,p("div",We,[p("div",Xe,[p("button",Ze,[w(o)]),k(p("input",{"onUpdate:modelValue":t[0]||(t[0]=t=>e.searchQuery=t),type:"search",name:"search",placeholder:"Search Messages",class:"w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"},null,512),[[M,e.searchQuery]])])])])}],["__scopeId","data-v-36a48d58"]]);const et={class:"min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black"};const tt=D(i({setup:e=>(e,t)=>(y(),m("div",et,[w(Be),w($e),w(ye)]))}));tt.use(H,N),O.add(j,A,C,L),tt.component("FontAwesomeIcon",R),tt.mount("#app");
