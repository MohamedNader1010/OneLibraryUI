"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[74],{74:(F,d,e)=>{e.r(d),e.d(d,{materialTrackingModule:()=>i});var c=e(6895),u=e(4006),f=e(6578),h=e(8019),p=e(8890),g=e(1390),T=e(7014),v=e(9017),D=e(4662),C=e(1207),t=e(4650),N=e(529),y=e(9519),O=e(9383),M=e(7185),E=e(5412),B=e(2893);class r extends C.D{constructor(a,n,s,l,A){super(a,l,n),this.database=n,this.translate=s,this.dialog=A,this.formName=v.j.materialTrackingFormDialogComponent,this.componentName=T.N.materialTracking}ngOnInit(){this.initiateTableHeaders(),this.loadData()}initiateTableHeaders(){this.tableColumns=[{columnDef:this.translate.instant("table.id"),header:this.translate.instant("table.id.label"),cell:a=>a.id},{columnDef:"material",header:"\u0623\u0633\u0645 \u0627\u0644\u062e\u0627\u0645\u0629",cell:a=>a.material},{columnDef:"quantity",header:"\u0627\u0644\u0643\u0645\u064a\u0629",cell:a=>a.quantity},{columnDef:"status",header:"\u0627\u0644\u062d\u0627\u0644\u0629",cell:a=>a.status==D.o.\u0635\u0627\u062f\u0631?"\u0635\u0627\u062f\u0631":"\u0648\u0627\u0631\u062f"},{columnDef:"comment",header:"\u0645\u0644\u0627\u062d\u0638\u0627\u062a",cell:a=>a.comment},{columnDef:"createdBy",header:"\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0628\u0648\u0627\u0633\u0637\u0629",cell:a=>a.createdBy},{columnDef:"time-createdOn",header:"\u0648\u0642\u062a \u0627\u0644\u062a\u0633\u062c\u064a\u0644",cell:a=>a.createdOn}]}loadData(){this.database.getAllMaterialTracking()}}r.\u0275fac=function(a){return new(a||r)(t.Y36(N.eN),t.Y36(y.D),t.Y36(O.sK),t.Y36(M._W),t.Y36(E.uw))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-materialTracking"]],features:[t.qOj],decls:1,vars:7,consts:[[3,"loading","tableColumns","formName","componentName","canEdit","canDelete","database","OnDelete","onNew","onEdit"]],template:function(a,n){1&a&&(t.TgZ(0,"app-table",0),t.NdJ("OnDelete",function(l){return n.handleDelete(l)})("onNew",function(l){return n.handleNewRow(l)})("onEdit",function(l){return n.handleEditRow(l)}),t.qZA()),2&a&&t.Q6J("loading",n.loading)("tableColumns",n.tableColumns)("formName",n.formName)("componentName",n.componentName)("canEdit",!1)("canDelete",!1)("database",n.database)},dependencies:[B.a]});const b=[{path:"",component:r,title:"\u0623\u0633\u062a\u0647\u0644\u0627\u0643 \u0627\u0644\u062e\u0627\u0645\u0627\u062a",canActivateChild:[f.i]}];class o{}o.\u0275fac=function(a){return new(a||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[g.Bz.forChild(b),g.Bz]});class i{}i.\u0275fac=function(a){return new(a||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[f.i,c.uU],imports:[c.ez,o,u.u5,u.UX,c.ez,p.SharedModule,h.I]})}}]);