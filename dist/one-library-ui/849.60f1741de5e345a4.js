"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[849],{6849:(M,r,n)=>{n.r(r),n.d(r,{AttendanceModule:()=>s});var i=n(6895),u=n(1390),h=n(6578),v=n(9017),A=n(7014),C=n(1207),t=n(4650),N=n(529),D=n(9943),f=n(9383),g=n(7185),y=n(2893);class m extends C.D{constructor(e,a,c,o){super(e,o,a),this.database=a,this.translate=c,this.formName=v.j.AttendanceFormDialogComponent,this.componentName=A.N.attendance}ngOnInit(){this.initiateTableHeaders(),this.loadData()}initiateTableHeaders(){this.tableColumns=[{columnDef:this.translate.instant("table.id"),header:this.translate.instant("table.id.label"),cell:e=>e.id},{columnDef:"name",header:"\u0623\u0633\u0645 \u0627\u0644\u0645\u0648\u0638\u0641",cell:e=>e.employee},{columnDef:"time-in",header:"\u062d\u0636\u0648\u0631",cell:e=>e.checkIn},{columnDef:"time-out",header:"\u0627\u0646\u0635\u0631\u0627\u0641",cell:e=>e.checkOut}]}loadData(){this.database.getAllAttendance()}}m.\u0275fac=function(e){return new(e||m)(t.Y36(N.eN),t.Y36(D.v),t.Y36(f.sK),t.Y36(g._W))},m.\u0275cmp=t.Xpm({type:m,selectors:[["attendance"]],features:[t.qOj],decls:1,vars:6,consts:[[3,"loading","tableColumns","formName","canDelete","componentName","database","OnDelete","onNew","onEdit"]],template:function(e,a){1&e&&(t.TgZ(0,"app-table",0),t.NdJ("OnDelete",function(o){return a.handleDelete(o)})("onNew",function(o){return a.handleNewRow(o)})("onEdit",function(o){return a.handleEditRow(o)}),t.qZA()),2&e&&t.Q6J("loading",a.loading)("tableColumns",a.tableColumns)("formName",a.formName)("canDelete",!1)("componentName",a.componentName)("database",a.database)},dependencies:[y.a]});const O=[{path:"",component:m,title:"\u0627\u0644\u062d\u0636\u0648\u0631 \u0648\u0627\u0644\u0627\u0646\u0635\u0631\u0627\u0641",canActivateChild:[h.i]}];class l{}l.\u0275fac=function(e){return new(e||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[u.Bz.forChild(O),u.Bz]});var p=n(4006),b=n(8019),T=n(6368);class s{}s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[h.i,i.uU],imports:[f.aw,i.ez,l,p.u5,p.UX,i.ez,T.SharedModule,b.I]})}}]);