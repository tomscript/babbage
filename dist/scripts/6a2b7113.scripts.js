function m(a){var b=typeof a;if("object"==b){if(!a)return"null";if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function n(a){return"string"==typeof a}function p(a){return"function"==m(a)}function aa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function da(a){return a.call.apply(a.bind,arguments)}function ea(a,b){if(!a)throw Error();if(2<arguments.length){var c=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(d,c),a.apply(b,d)}}return function(){return a.apply(b,arguments)}}function q(){return q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?da:ea,q.apply(null,arguments)}function s(a,b){function c(){}c.prototype=b.prototype,a.ma=b.prototype,a.prototype=new c,a.oa=function(a,c){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}}function fa(){0!=ha&&(this[ba]||(this[ba]=++ca))}function u(a,b){this.type=a,this.currentTarget=this.target=b,this.defaultPrevented=this.S=!1}function w(a){if(Error.captureStackTrace)Error.captureStackTrace(this,w);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}function ia(a,b){return b>a?-1:a>b?1:0}function ja(a){p(l.setImmediate)?l.setImmediate(a):(ka||(ka=la()),ka(a))}function la(){var a=l.MessageChannel;if("undefined"==typeof a&&"undefined"!=typeof window&&window.postMessage&&window.addEventListener&&(a=function(){var a=document.createElement("iframe");a.style.display="none",a.src="",document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open(),a.write(""),a.close();var c="callImmediate"+Math.random(),d=b.location.protocol+"//"+b.location.host,a=q(function(a){(a.origin==d||a.data==c)&&this.port1.onmessage()},this);b.addEventListener("message",a,!1),this.port1={},this.port2={postMessage:function(){b.postMessage(c,d)}}}),"undefined"!=typeof a){var b=new a,c={},d=c;return b.port1.onmessage=function(){c=c.next;var a=c.J;c.J=null,a()},function(a){d.next={J:a},d=d.next,b.port2.postMessage(0)}}return"undefined"!=typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null,b.parentNode.removeChild(b),b=null,a(),a=null},document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}}function ma(a){ja(function(){throw a})}function na(a,b){oa||(ja(pa),oa=!0),x.push(new qa(a,b))}function pa(){for(;x.length;){var a=x;x=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.ea.call(c.scope)}catch(d){ma(d)}}}oa=!1}function qa(a,b){this.ea=a,this.scope=b}function ra(a){a.prototype.then=a.prototype.then,a.prototype.$goog_Thenable=!0}function sa(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}function y(a,b){this.a=z,this.d=void 0,this.b=this.c=null,this.m=this.A=!1,this.H=[],ta(this,Error("created")),this.L=0;try{var c=this;a.call(b,function(a){A(c,B,a)},function(a){A(c,C,a)})}catch(d){A(this,C,d)}}function va(a,b){if(a.a==z)if(a.c){var c=a.c;if(c.b){for(var d,e=0,f=-1,g=0;(d=c.b[g])&&!((d=d.l)&&(e++,d==a&&(f=g),f>=0&&e>1));g++);f>=0&&(c.a==z&&1==e?va(c,b):(e=c.b.splice(f,1)[0],C==B?e.D(b):(wa(c),e.F(b))))}}else A(a,C,b)}function xa(a,b){a.b&&a.b.length||a.a!=B&&a.a!=C||ya(a),a.b||(a.b=[]),a.b.push(b)}function ua(a,b,c,d){var e={l:null,D:null,F:null};return e.l=new y(function(a,f){e.D=b?function(c){try{var e=b.call(d,c);a(e)}catch(g){f(g)}}:a,e.F=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof D?f(b):a(e)}catch(g){f(g)}}:f}),e.l.c=a,xa(a,e),e.l}function A(a,b,c){if(a.a==z){if(a==c)b=C,c=new TypeError("Promise cannot resolve to itself");else{if(sa(c))return a.a=1,void c.then(a.U,a.V,a);if(aa(c))try{var d=c.then;if(p(d))return void za(a,c,d)}catch(e){b=C,c=e}}a.d=c,a.a=b,ya(a),b!=C||c instanceof D||Aa(a,c)}}function za(a,b,c){function d(b){f||(f=!0,a.V(b))}function e(b){f||(f=!0,a.U(b))}a.a=1;var f=!1;try{c.call(b,e,d)}catch(g){d(g)}}function ya(a){a.A||(a.A=!0,na(a.ba,a))}function ta(a,b){if(n(b.stack)){var c=b.stack.split("\n",4)[3],d=b.message,d=d+Array(11-d.length).join(" ");a.H.push(d+c)}}function wa(a){for(;a&&a.m;a=a.c)a.m=!1}function Aa(a,b){a.m=!0,na(function(){if(a.m){if(b&&n(b.stack)&&a.H.length){for(var c=["Promise trace:"],d=a;d;d=d.c){for(var e=a.L;e>=0;e--)c.push(d.H[e]);c.push("Value: ["+(d.a==C?"REJECTED":"FULFILLED")+"] <"+String(d.d)+">")}b.stack+="\n\n"+c.join("\n")}Ba.call(null,b)}})}function D(a){w.call(this,a)}function F(a,b){if(this.q=[],this.Q=a,this.M=b||null,this.i=this.f=!1,this.d=void 0,this.G=this.W=this.s=!1,this.r=0,this.c=null,this.t=0,this.w=null,Error.captureStackTrace){var c={stack:""};Error.captureStackTrace(c,F),"string"==typeof c.stack&&(this.w=c.stack.replace(/^[^\n]*\n/,""))}}function Fa(a,b){a.w&&aa(b)&&b.stack&&/^[^\n]+(\n   [^\n]+)+/.test(b.stack)&&(b.stack=b.stack+"\nDEFERRED OPERATION:\n"+a.w)}function Ha(a,b,c){a.q.push([b,c,void 0]),a.f&&Ga(a)}function Ia(a){return Da(a.q,function(a){return p(a[1])})}function Ga(a){if(a.r&&a.f&&Ia(a)){var b=a.r,c=H[b];c&&(l.clearTimeout(c.o),delete H[b]),a.r=0}a.c&&(a.c.t--,delete a.c);for(var b=a.d,d=c=!1;a.q.length&&!a.s;){var e=a.q.shift(),f=e[0],g=e[1],e=e[2];if(f=a.i?g:f)try{var h=f.call(e||a.M,b);void 0!==h&&(a.i=a.i&&(h==b||h instanceof Error),a.d=b=h),sa(b)&&(d=!0,a.s=!0)}catch(i){b=i,a.i=!0,Fa(a,b),Ia(a)||(c=!0)}}a.d=b,d&&(h=q(a.K,a,!0),d=q(a.K,a,!1),b instanceof F?(Ha(b,h,d),b.W=!0):b.then(h,d)),c&&(b=new Ja(b),H[b.o]=b,a.r=b.o)}function Ea(){w.call(this)}function G(){w.call(this)}function Ja(a){this.o=l.setTimeout(q(this.na,this),0),this.aa=a}function La(a){try{return!(!a||!a[Ka])}catch(b){return!1}}function Na(a,b,c,d,e){this.j=a,this.p=null,this.src=b,this.type=c,this.v=!!d,this.B=e,this.key=++Ma,this.k=this.u=!1}function Oa(a){a.k=!0,a.j=null,a.p=null,a.src=null,a.B=null}function Pa(a){this.src=a,this.g={},this.I=0}function Qa(a,b){var c=b.type;if(c in a.g){var d,e=a.g[c],f=Ca(e,b);(d=f>=0)&&E.splice.call(e,f,1),d&&(Oa(b),0==a.g[c].length&&(delete a.g[c],a.I--))}}function Sa(){return l.navigator?l.navigator.userAgent:null}function Va(){var a=l.document;return a?a.documentMode:void 0}function U(a){var b;if(!(b=Za[a])){b=0;for(var c=String(R).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&e>f;f++){var g=c[f]||"",h=d[f]||"",i=RegExp("(\\d*)(\\D*)","g"),j=RegExp("(\\d*)(\\D*)","g");do{var k=i.exec(g)||["","",""],l=j.exec(h)||["","",""];if(0==k[0].length&&0==l[0].length)break;b=ia(0==k[1].length?0:parseInt(k[1],10),0==l[1].length?0:parseInt(l[1],10))||ia(0==k[2].length,0==l[2].length)||ia(k[2],l[2])}while(0==b)}b=Za[a]=b>=0}return b}function db(a){return db[" "](a),a}function V(a,b){if(u.call(this,a?a.type:""),this.relatedTarget=this.currentTarget=this.target=null,this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0,this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.N=this.state=null,a){var c=this.type=a.type;this.target=a.target||a.srcElement,this.currentTarget=b;var d=a.relatedTarget;if(d){if(P){var e;a:{try{db(d.nodeName),e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d,this.offsetX=Q||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=Q||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0,this.button=a.button,this.keyCode=a.keyCode||0,this.charCode=a.charCode||("keypress"==c?a.keyCode:0),this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.state=a.state,this.N=a,a.defaultPrevented&&this.preventDefault()}}function gb(a,b,c,d,e){if("array"==m(b)){for(var f=0;f<b.length;f++)gb(a,b[f],c,d,e);return null}if(c=hb(c),La(a))a=a.C(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=ib(a);g||(a[eb]=g=new Pa(a)),c=g.add(b,c,!1,d,e),c.p||(d=jb(),c.p=d,d.src=a,d.j=c,a.addEventListener?a.addEventListener(b,d,f):a.attachEvent(b in W?W[b]:W[b]="on"+b,d),fb++),a=c}return a}function jb(){var a=kb,b=bb?function(c){return a.call(b.src,b.j,c)}:function(c){return c=a.call(b.src,b.j,c),c?void 0:c};return b}function lb(a,b,c,d){var e=1;if((a=ib(a))&&(b=a.g[b])){if(a=b.length,a>0){for(var f=Array(a),g=0;a>g;g++)f[g]=b[g];b=f}else b=[];for(a=0;a<b.length;a++)(f=b[a])&&f.v==c&&!f.k&&(e&=!1!==mb(f,d))}return Boolean(e)}function mb(a,b){var c=a.j,d=a.B||a.src;if(a.u&&"number"!=typeof a&&a&&!a.k){var e=a.src;if(La(e))Qa(e.pa,a);else{var f=a.type,g=a.p;e.removeEventListener?e.removeEventListener(f,g,a.v):e.detachEvent&&e.detachEvent(f in W?W[f]:W[f]="on"+f,g),fb--,(f=ib(e))?(Qa(f,a),0==f.I&&(f.src=null,e[eb]=null)):Oa(a)}}return c.call(d,b)}function kb(a,b){if(a.k)return!0;if(!bb){var c;if(!(c=b))a:{c=["window","event"];for(var d,e=l;d=c.shift();){if(null==e[d]){c=null;break a}e=e[d]}c=e}if(d=c,c=new V(d,this),e=!0,!(0>d.keyCode||void 0!=d.returnValue)){a:{var f=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){f=!0}(f||void 0==d.returnValue)&&(d.returnValue=!0)}for(d=[],f=c.currentTarget;f;f=f.parentNode)d.push(f);for(var f=a.type,h=d.length-1;!c.S&&h>=0;h--)c.currentTarget=d[h],e&=lb(d[h],f,!0,c);for(h=0;!c.S&&h<d.length;h++)c.currentTarget=d[h],e&=lb(d[h],f,!1,c)}return e}return mb(a,new V(b,this))}function ib(a){return a=a[eb],a instanceof Pa?a:null}function hb(a){return p(a)?a:a[nb]||(a[nb]=function(b){return a.handleEvent(b)})}function X(a){fa.call(this),this.n=a,this.ga={}}function rb(a){var b;if(qb)b=l.btoa(a);else{b=[];for(var c=0,d=0;d<a.length;d++){for(var e=a.charCodeAt(d);e>255;)b[c++]=255&e,e>>=8;b[c++]=e}if(a=m(b),"array"!=a&&("object"!=a||"number"!=typeof b.length))throw Error("encodeByteArray takes an array as a parameter");for(sb(),a=Y,c=[],d=0;d<b.length;d+=3){var f=b[d],g=(e=d+1<b.length)?b[d+1]:0,h=d+2<b.length,i=h?b[d+2]:0,j=f>>2,f=(3&f)<<4|g>>4,g=(15&g)<<2|i>>6,i=63&i;h||(i=64,e||(g=64)),c.push(a[j],a[f],a[g],a[i])}b=c.join("")}return b}function tb(a){if(qb)a=l.atob(a);else{sb();for(var b=pb,c=[],d=0;d<a.length;){var e=b[a.charAt(d++)],f=d<a.length?b[a.charAt(d)]:0;++d;var g=d<a.length?b[a.charAt(d)]:0;++d;var h=d<a.length?b[a.charAt(d)]:0;if(++d,null==e||null==f||null==g||null==h)throw Error();c.push(e<<2|f>>4),64!=g&&(c.push(f<<4&240|g>>2),64!=h&&c.push(g<<6&192|h))}a=String.fromCharCode.apply(null,c)}return a}function sb(){if(!Y){Y={},pb={};for(var a=0;65>a;a++)Y[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),pb[Y[a]]=a}}function Z(a){var b=document;return n(a)?b.getElementById(a):a}function ub(a,b,c,d){b.inputFile=!1,this.e=a,this.h=b,this.R=d,this.ha=Z($.OUTPUT),this.O=Z($.FILE_UPLOAD_INPUT),this.n=new X(this),this.h.T=[],this.h.ka=[],b.selectedPlugins=b.T,b.selectedPluginsEl=b.ka,a.ids=$,b=q(this.ia,this),a.removePlugin=b,b=q(this.fa,this),a.helpButtonClicked=b,b=q(this.ja,this),a.selectPlugin=b,b=q(this.X,this),a.clearButtonClicked=b,b=q(this.la,this),a.submitButtonClicked=b,b=q(this.Z,this),a.createUploadListener=b,b=q(this.$,this),a.downloadFile=b}function vb(){for(var a,b=Z($.SELECTED_PLUGINS),c=[],d=0;a=b.children[d];d++){var e=[];if(a.children)for(var f,g=0;f=a.children[g];g++)"text"==f.getAttribute("type")&&e.push(encodeURIComponent(f.value));c.push({name:a.getAttribute("data-plugin-name"),options:e})}return c}var k,l=this,ba="closure_uid_"+(1e9*Math.random()>>>0),ca=0,t=angular.module("babbage.directives",[]);t.directive("available",function(){return{restrict:"E",templateUrl:"views/availablePlugins.html",controller:"babbage.controllers.UiCtrl",link:function(a){a.listPlugins()}}}),t.directive("fileupload",function(){return{restrict:"E",templateUrl:"views/fileUpload.html",controller:"babbage.controllers.UiCtrl",link:function(a){a.createUploadListener()}}}),t.directive("selected",function(){return{restrict:"E",scope:{selectedPlugins:"="},templateUrl:"views/selectedPlugins.html",controller:"babbage.controllers.UiCtrl"}}),t.directive("outputoptions",function(){return{restrict:"E",templateUrl:"views/outputOptions.html"}}),angular.module("bababge.models",[]).factory("PluginsService",["$http",function(a){return{T:[],P:function(){return a.get("/listplugins").then(function(a){return a.data})},Y:function(b){return a.post("/convert",b).then(function(a){return a.data})}}}]);var ha=0;u.prototype.preventDefault=function(){this.defaultPrevented=!0},s(w,Error);var ka,oa=!1,x=[],z=0,B=2,C=3;y.prototype.then=function(a,b,c){return ta(this,Error("then")),ua(this,p(a)?a:null,p(b)?b:null,c)},ra(y),y.prototype.cancel=function(a){this.a==z&&na(function(){var b=new D(a);va(this,b)},this)},y.prototype.U=function(a){this.a=z,A(this,B,a)},y.prototype.V=function(a){this.a=z,A(this,C,a)},y.prototype.ba=function(){for(;this.b&&this.b.length;){var a=this.b;this.b=[];for(var b=0;b<a.length;b++){this.L++;var c=a[b],d=this.d;this.a==B?c.D(d):(wa(this),c.F(d))}}this.A=!1};var Ba=ma;s(D,w);var E=Array.prototype,Ca=E.indexOf?function(a,b,c){return E.indexOf.call(a,b,c)}:function(a,b,c){if(c=null==c?0:0>c?Math.max(0,a.length+c):c,n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Da=E.some?function(a,b,c){return E.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;d>f;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};F.prototype.cancel=function(a){if(this.f)this.d instanceof F&&this.d.cancel();else{if(this.c){var b=this.c;delete this.c,a?b.cancel(a):(b.t--,0>=b.t&&b.cancel())}if(this.Q?this.Q.call(this.M,this):this.G=!0,!this.f){if(a=new G,this.f){if(!this.G)throw new Ea;this.G=!1}Fa(this,a),this.f=!0,this.d=a,this.i=!0,Ga(this)}}},F.prototype.K=function(a,b){this.s=!1,this.f=!0,this.d=b,this.i=!a,Ga(this)},F.prototype.then=function(a,b,c){var d,e,f=new y(function(a,b){d=a,e=b});return Ha(this,d,function(a){a instanceof G?f.cancel():e(a)}),f.then(a,b,c)},ra(F),s(Ea,w),Ea.prototype.message="Deferred has already fired",s(G,w),G.prototype.message="Deferred was canceled",Ja.prototype.na=function(){throw delete H[this.o],this.aa};var H={},Ka="closure_listenable_"+(1e6*Math.random()|0),Ma=0;Pa.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.g[f],a||(a=this.g[f]=[],this.I++);var g;a:{for(g=0;g<a.length;++g){var h=a[g];if(!h.k&&h.j==b&&h.v==!!d&&h.B==e)break a}g=-1}return g>-1?(b=a[g],c||(b.u=!1)):(b=new Na(b,this.src,f,!!d,e),b.u=c,a.push(b)),b};var I,J,M,Ra;Ra=M=J=I=!1;var N;if(N=Sa()){var Ta=l.navigator;I=0==N.lastIndexOf("Opera",0),J=!I&&(-1!=N.indexOf("MSIE")||-1!=N.indexOf("Trident")),M=!I&&-1!=N.indexOf("WebKit"),Ra=!I&&!M&&!J&&"Gecko"==Ta.product}var Ua=I,O=J,P=Ra,Q=M,R;a:{var S="",T;if(Ua&&l.opera)var Wa=l.opera.version,S="function"==typeof Wa?Wa():Wa;else if(P?T=/rv\:([^\);]+)(\)|;)/:O?T=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Q&&(T=/WebKit\/(\S+)/),T)var Xa=T.exec(Sa()),S=Xa?Xa[1]:"";if(O){var Ya=Va();if(Ya>parseFloat(S)){R=String(Ya);break a}}R=S}var Za={},$a=l.document,ab=$a&&O?Va()||("CSS1Compat"==$a.compatMode?parseInt(R,10):5):void 0,bb=!O||O&&ab>=9,cb=O&&!U("9");!Q||U("528"),P&&U("1.9b")||O&&U("8")||Ua&&U("9.5")||Q&&U("528"),P&&!U("8")||O&&U("9"),db[" "]=function(){},s(V,u),V.prototype.preventDefault=function(){V.ma.preventDefault.call(this);var a=this.N;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,cb)try{(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)&&(a.keyCode=-1)}catch(b){}};var eb="closure_lm_"+(1e6*Math.random()|0),W={},fb=0,nb="__closure_events_fn_"+(1e9*Math.random()>>>0);s(X,fa);var ob=[];X.prototype.C=function(a,b,c,d){"array"!=m(b)&&(ob[0]=b,b=ob);for(var e=0;e<b.length;e++){var f=gb(a,b[e],c||this.handleEvent,d||!1,this.n||this);if(!f)break;this.ga[f.key]=f}return this},X.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Y=null,pb=null,qb=P||Q||Ua||"function"==typeof l.atob;!P&&!O||O&&O&&ab>=9||P&&U("1.9.1"),O&&U("9"),ub.$inject=["$scope","$rootScope","$location","PluginsService"];var $={SELECTED_PLUGINS:"selected-plugin-list",FILE_UPLOAD_INPUT:"fileUploadInput",INPUT:"input",OUTPUT:"output"};k=ub.prototype,k.P=function(){this.R.P().then(q(function(a){this.e.plugins=a},this))},k.ja=function(a){this.h.selectedPlugins.push(a)},k.ia=function(a,b){"LI"!=a.target.tagName&&"checkbox"!=a.target.getAttribute("type")||this.h.selectedPlugins.splice(this.h.selectedPlugins.indexOf(b),1)},k.fa=function(){alert("- Paste in text in the input text field.\n-Select a plugin on the left by clicking its name. Some plugins have options, hover over a plugin for more details on how they work. Chain together plugins for powerful results.\n-Hit Run to decode your text.")},k.X=function(){this.e.inputTextArea="",this.e.outputTextArea="",this.O.value=""},k.la=function(){var a=vb(),a={input:this.e.inputFile?this.e.inputFile:rb(this.e.inputTextArea),plugins:a};this.R.Y(a).then(q(function(a){a.hasOwnProperty("success")?(this.h.outputBase64=a.success,this.e.outputTextArea=tb(a.success),setTimeout(q(function(){this.ha.select()},this),100)):alert(a.failure)},this))},k.Z=function(){this.n.C(Z($.FILE_UPLOAD_INPUT),"change",this.ca)},k.ca=function(){if(this.O.files.length){var a=new FileReader;this.n.C(a,"loadend",this.da),a.readAsBinaryString(Z($.FILE_UPLOAD_INPUT).files[0])}},k.da=function(a){this.e.inputFile=rb(a.target.result),this.e.$digest()},k.$=function(){window.open("data:application/octet-stream;base64,"+this.h.outputBase64,"blank")},angular.module("bababge.controllers",[]).controller("babbage.controllers.UiCtrl",ub),angular.module("babbage",["bababge.controllers","babbage.directives","bababge.models","ngRoute"]).config(["$routeProvider","$locationProvider",function(a){a.when("/",{templateUrl:"views/main.html"}).otherwise({redirectTo:"/"})}]);