"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[747],{1747:(A,d,e)=>{e.r(d),e.d(d,{ServiceTypeModule:()=>s});var f=e(6895),p=e(1390),y=e(7014),T=e(9017),C=e(1207),t=e(4650),c=e(9383),N=e(529),S=e(5412),v=e(8634),g=e(7185),D=e(2893);class m extends C.D{constructor(n,a,r,o,M){super(a,M,o),this.translate=n,this.dialog=r,this.database=o,this.formName=T.j.ServiceTypeFormDialogComponent,this.componentName=y.N.serviceType}ngOnInit(){this.initiateTableHeaders(),this.loadData()}initiateTableHeaders(){this.tableColumns=[{columnDef:this.translate.instant("table.id"),header:this.translate.instant("table.id.label"),cell:n=>n.id},{columnDef:"Name",header:"\u0646\u0648\u0639 \u0627\u0644\u062e\u062f\u0645\u0629",cell:n=>n.name}]}loadData(){this.database.getAllServices()}}m.\u0275fac=function(n){return new(n||m)(t.Y36(c.sK),t.Y36(N.eN),t.Y36(S.uw),t.Y36(v.E),t.Y36(g._W))},m.\u0275cmp=t.Xpm({type:m,selectors:[["app-serviceType"]],features:[t.qOj],decls:1,vars:5,consts:[[3,"loading","tableColumns","formName","componentName","database","OnDelete","onNew","onEdit"]],template:function(n,a){1&n&&(t.TgZ(0,"app-table",0),t.NdJ("OnDelete",function(o){return a.handleDelete(o)})("onNew",function(o){return a.handleNewRow(o)})("onEdit",function(o){return a.handleEditRow(o)}),t.qZA()),2&n&&t.Q6J("loading",a.loading)("tableColumns",a.tableColumns)("formName",a.formName)("componentName",a.componentName)("database",a.database)},dependencies:[D.a]});var u=e(6578);const O=[{path:"",component:m,title:"\u0646\u0648\u0639 \u0627\u0644\u062e\u062f\u0645\u0629",canActivateChild:[u.i]}];class l{}l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[p.Bz.forChild(O),p.Bz]});var h=e(4006),b=e(8019),E=e(8890);class s{}s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[u.i,v.E],imports:[h.u5,h.UX,f.ez,l,b.I,E.SharedModule,c.aw]})}}]);