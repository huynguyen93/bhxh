(this.webpackJsonpbhxh=this.webpackJsonpbhxh||[]).push([[0],{18:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),r=n.n(c),s=n(5),i=n.n(s),l=(n(18),n(9)),j=n(6),o=n(11),d=(n(19),n(8));for(var h,b,u=function(e){var t=e.show,n=e.setShow;return Object(a.jsxs)(d.a,{show:t,onHide:function(){return n(!1)},dialogClassName:"modal-90w","aria-labelledby":"salary-explanation",children:[Object(a.jsx)(d.a.Header,{closeButton:!0,children:Object(a.jsx)(d.a.Title,{id:"salary-explanation",children:"Gi\u1ea3i th\xedch c\xe1c m\u1ee9c l\u01b0\u01a1ng"})}),Object(a.jsxs)(d.a.Body,{children:[Object(a.jsx)("h4",{children:"1. M\u1ee9c l\u01b0\u01a1ng \u0111\xf3ng BHXH"}),Object(a.jsx)("p",{children:"AB CD"}),Object(a.jsx)("h4",{children:"2. M\u1ee9c l\u01b0\u01a1ng ch\xednh th\u1ee9c"}),Object(a.jsx)("p",{children:"Lorem ipsum"})]})]})},O=n(4),x=1e6,m=Array(12).fill("").map((function(e,t){return"Th\xe1ng "+"".concat(t+1).padStart(2,"0")})),p=[],g=(new Date).getFullYear(),v=g-30,f=g;f>v;f--)p.push(f);var y="I",S="II",I="III",N="IV",C=(h={},Object(O.a)(h,y,"I"),Object(O.a)(h,S,"II"),Object(O.a)(h,I,"III"),Object(O.a)(h,N,"IV"),b={},Object(O.a)(b,y,Math.round(4.18*x)),Object(O.a)(b,S,Math.round(371e4)),Object(O.a)(b,I,Math.round(325e4)),Object(O.a)(b,N,Math.round(292e4)),"contracted");function M(e){var t={1995:4.85,1996:4.12,1997:3.89,1998:3.77,1999:3.5,2e3:3.41,2001:3.42,2002:3.29,2003:3.19,2004:2.96,2005:2.73,2006:2.54,2007:2.35,2008:1.91,2009:1.79,2010:1.64,2011:1.38,2012:1.26,2013:1.18,2014:1.14,2015:1.13,2016:1.1,2017:1.06,2018:1.03,2019:1,2020:1},n=Object.keys(t);return e<t[n[0]]?t[n[0]]:e>t[n[n.length-1]]?t[n[n.length-1]]:t[e]}var E={calculatePeriods:function(e){var t=0,n=0,a=0,c=0;e.forEach((function(e){for(var r=parseInt(e.monthStart),s=parseInt(e.yearStart),i=parseInt(e.monthEnd),l=parseInt(e.yearEnd),j=parseInt(e.salary.split(" ").join("")),o=e.salaryType===C?void 0:j,d=s;d<=l;d++){var h=M(d),b=0;a+=(b=s===l?i-r+1:d===s?12-r+1:d===l?i:12)*o*h,c+=b*o*20/100,l<2014?t+=b:n+=b}}));var r=t+n,s=a/r;return{estimatedContributed:c,adjustedSalary:a,adjustedAverageSalary:s,totalMonths:r,amountWillReceive:1.5*s*(t/12)+2*s*(n/12)}},validatePeriod:function(e){var t=e.salary,n=e.monthStart,a=e.monthEnd,c=e.yearStart,r=e.yearEnd,s="";return t&&n&&a&&c&&r||(s="Vui l\xf2ng \u0111i\u1ec1n h\u1ebft th\xf4ng tin!"),s},calculateAmountPaid:function(e){var t=17.5*e/100,n=8*e/100;return{byCompany:t,byWorker:n,total:t+n}},formatNumber:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?" vn\u0111":"";return Math.round(e).toLocaleString("en")+n}},k={salary:""};var H=function(){var e=r.a.useState([Object(j.a)({},k)]),t=Object(o.a)(e,2),n=t[0],c=t[1],s=r.a.useState(null),i=Object(o.a)(s,2),d=i[0],h=i[1],b=r.a.useState(!1),O=Object(o.a)(b,2),x=O[0],g=O[1],v=function(e,t){var a=Object(l.a)(n);a[e]=Object(j.a)(Object(j.a)(Object(j.a)({},n[e]),t),{},{errorMessage:""}),c(Object(l.a)(a))};return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsxs)("table",{className:"table table-bordered table-responsive-md",children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:"#"}),Object(a.jsx)("th",{children:"T\u1eeb... "}),Object(a.jsx)("th",{children:"\u0110\u1ebfn... "}),Object(a.jsxs)("th",{children:["L\u01b0\u01a1ng \u0111\xf3ng BHXH",Object(a.jsx)("button",{className:"btn btn-sm btn-link mx-1",onClick:function(){return g(!0)},disabled:x})]}),Object(a.jsx)("th",{})]})}),Object(a.jsx)("tbody",{children:n.map((function(e,t){var r=e.salary;return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:t+1}),Object(a.jsxs)("td",{children:[Object(a.jsxs)("select",{id:"inputState",className:"mr-3",onChange:function(e){return v(t,{monthStart:e.target.value})},children:[Object(a.jsx)("option",{children:"Th\xe1ng..."}),m.map((function(e,t){return Object(a.jsx)("option",{value:t+1,children:e},t)}))]}),Object(a.jsxs)("select",{id:"inputState",className:"",onChange:function(e){return v(t,{yearStart:e.target.value})},children:[Object(a.jsx)("option",{children:"N\u0103m..."}),p.map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))]})]}),Object(a.jsxs)("td",{children:[Object(a.jsxs)("select",{id:"inputState",className:"mr-3",onChange:function(e){return v(t,{monthEnd:e.target.value})},children:[Object(a.jsx)("option",{children:"Th\xe1ng..."}),m.map((function(e,t){return Object(a.jsx)("option",{value:t+1,children:e},t)}))]}),Object(a.jsxs)("select",{id:"inputState",onChange:function(e){return v(t,{yearEnd:e.target.value})},children:[Object(a.jsx)("option",{children:"N\u0103m..."}),p.map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))]})]}),Object(a.jsxs)("td",{children:[Object(a.jsx)("input",{type:"text",placeholder:"10 000 000",id:"exampleInputEmail1","aria-describedby":"emailHelp",value:r,onChange:function(e){return function(e,t){if(0!==t.length){var n=parseInt(t.replace(/[^0-9]/g,"")||0),a=n.toLocaleString("en").replace(/,/g," "),c=E.calculateAmountPaid(n);v(e,{salary:a,amountPaidForInsurance:c})}else v(e,{salary:""})}(t,e.target.value)},style:{width:"120px"}})," ","vn\u0111"]}),Object(a.jsx)("td",{children:Object(a.jsx)("button",{title:"X\xf3a",onClick:function(){return function(e){c(Object(l.a)(n.filter((function(t,n){return n!==e}))))}(t)},className:"btn btn-sm rounded btn-danger",children:"x\xf3a"})})]},t)}))})]}),Object(a.jsx)("div",{className:"mb-4",children:Object(a.jsxs)("button",{onClick:function(){c([].concat(Object(l.a)(n),[Object(j.a)({},k)]))},className:"btn btn-sm btn-secondary mr-2",children:[Object(a.jsx)("b",{children:"+"})," th\xeam d\xf2ng"]})}),Object(a.jsx)("ul",{children:n.map((function(e,t){var n=e.monthStart,c=e.monthEnd,r=e.yearStart,s=e.yearEnd,i=e.errorMessage,l=!0;return n&&c&&r&&s&&(s<r||s===r&&c<n)&&(l=!1),l&&!i?null:Object(a.jsxs)("li",{children:["L\u1ed7i \u1edf d\xf2ng ",t+1,":"," ",!l&&Object(a.jsx)("span",{className:"text-danger",children:"Th\u1eddi gian kh\xf4ng ph\xf9 h\u1ee3p, vui l\xf2ng ch\u1ecdn l\u1ea1i!"})," ",i&&Object(a.jsx)("span",{className:"text-danger",children:i})]},t)}))}),Object(a.jsx)("div",{className:"mt-5 mb-5",children:Object(a.jsx)("button",{className:"btn btn-lg btn-primary",onClick:function(){var e=[],t=!1;n.forEach((function(n){var a=E.validatePeriod(n);a&&(t=!0),e.push(Object(j.a)(Object(j.a)({},n),{},{errorMessage:a}))})),c(e),t||h(E.calculatePeriods(n))},disabled:0===n.length,children:"Xem k\u1ebft qu\u1ea3"})}),d&&Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"K\u1ebft qu\u1ea3"}),Object(a.jsxs)("p",{children:["S\u1ed1 th\xe1ng tham gia BHXH: ",d.totalMonths]}),Object(a.jsxs)("p",{children:["M\u1ee9c l\u01b0\u01a1ng \u0111\xf3ng BHXH b\xecnh qu\xe2n: ",E.formatNumber(d.adjustedAverageSalary,!0)," / th\xe1ng"]}),Object(a.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n ",Object(a.jsx)("i",{children:"\u01b0\u1edbc t\xednh"})," \u0111\xe3 \u0111\xf3ng: ",E.formatNumber(d.estimatedContributed,!0)]}),Object(a.jsx)("p",{className:"text-success",children:Object(a.jsxs)("b",{children:["S\u1ed1 ti\u1ec1n ",Object(a.jsx)("i",{children:"\u01b0\u1edbc t\xednh"})," s\u1ebd nh\u1eadn: ",Object(a.jsx)("u",{children:E.formatNumber(d.amountWillReceive,!0)})]})})]}),Object(a.jsx)(u,{show:x,setShow:g})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};i.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(H,{})}),document.getElementById("root")),w()}},[[23,1,2]]]);
//# sourceMappingURL=main.190a888e.chunk.js.map