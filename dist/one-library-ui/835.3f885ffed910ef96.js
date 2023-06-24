"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[835],{3835:(M,d,t)=>{t.r(d),t.d(d,{EmployeeModule:()=>m});var c=t(6895),p=t(4006),y=t(8019),v=t(6368),f=t(1390),N=t(9017),C=t(7014),E=t(1207),n=t(4650),h=t(3155),g=t(529),D=t(7185),u=t(9383),b=t(2893);class i extends E.D{constructor(e,a,r,o){super(a,r,e),this.database=e,this.httpClient=a,this.toastr=r,this.translate=o,this.formName=N.j.EmployeeFormDialogComponent,this.componentName=C.N.employee}ngOnInit(){this.initiateTableHeaders(),this.loadData()}initiateTableHeaders(){this.tableColumns=[{columnDef:this.translate.instant("form.name"),header:this.translate.instant("form.name.label"),cell:e=>e.name},{columnDef:this.translate.instant("form.username"),header:this.translate.instant("form.username.label"),cell:e=>e.userName},{columnDef:this.translate.instant("form.phoneNumber"),header:this.translate.instant("form.phoneNumber.label"),cell:e=>e.phoneNumber},{columnDef:this.translate.instant("form.email"),header:this.translate.instant("form.email.label"),cell:e=>e.email},{columnDef:this.translate.instant("form.emailComfirmed"),header:this.translate.instant("form.emailConfirmed.label"),cell:e=>this.translate.instant(e.emailConfirmed?"form.email.active":"form.email.inactive")}]}loadData(){this.loading=!0,this.database.getAllEmployees()}}i.\u0275fac=function(e){return new(e||i)(n.Y36(h.G),n.Y36(g.eN),n.Y36(D._W),n.Y36(u.sK))},i.\u0275cmp=n.Xpm({type:i,selectors:[["app-employee"]],features:[n.qOj],decls:1,vars:5,consts:[[3,"loading","tableColumns","formName","componentName","database","OnDelete","onNew","onEdit"]],template:function(e,a){1&e&&(n.TgZ(0,"app-table",0),n.NdJ("OnDelete",function(o){return a.handleDelete(o)})("onNew",function(o){return a.handleNewRow(o)})("onEdit",function(o){return a.handleEditRow(o)}),n.qZA()),2&e&&n.Q6J("loading",a.loading)("tableColumns",a.tableColumns)("formName",a.formName)("componentName",a.componentName)("database",a.database)},dependencies:[b.a]});var O=t(6578);const T=[{path:"",component:i,title:"\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646",canActivate:[O.i]}];class l{}l.\u0275fac=function(e){return new(e||l)},l.\u0275mod=n.oAB({type:l}),l.\u0275inj=n.cJS({imports:[f.Bz.forChild(T),f.Bz]});class m{}m.\u0275fac=function(e){return new(e||m)},m.\u0275mod=n.oAB({type:m}),m.\u0275inj=n.cJS({providers:[h.G],imports:[p.u5,p.UX,c.ez,l,y.I,v.SharedModule,u.aw]})}}]);