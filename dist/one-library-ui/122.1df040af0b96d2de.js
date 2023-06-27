"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[122],{4122:(b,i,n)=>{n.r(i),n.d(i,{IncomesOutcomesModule:()=>m});var d=n(6895),h=n(1390),f=n(6578),v=n(7014),g=n(9017),A=n(7163),O=n(1207),t=n(4650),C=n(529),I=n(7185),D=n(7753),Z=n(9383),T=n(5412),N=n(537),S=n(2893),r=n(3546);class c extends O.D{constructor(e,o,a,u,j,B){super(e,o,a),this.database=a,this.translate=u,this.dialog=j,this.shiftService=B,this.formName=g.j.incomeOutcomeFormDialogComponent,this.componentName=v.N.incomeOutcome}ngOnInit(){this.initiateTableHeaders(),this.loadData(),this.shiftService.GetCurrentShift().subscribe({next:e=>{console.log(e.body),this.currentShift=e.body}})}initiateTableHeaders(){this.tableColumns=[{columnDef:this.translate.instant("table.id"),header:this.translate.instant("table.id.label"),cell:e=>e.id},{columnDef:"amount",header:"\u0627\u0644\u0645\u0628\u0644\u063a",cell:e=>e.amount},{columnDef:"status",header:"\u0627\u0644\u062d\u0627\u0644\u0629",cell:e=>e.status==A.o.\u0635\u0627\u062f\u0631?"\u0635\u0627\u062f\u0631":"\u0648\u0627\u0631\u062f"},{columnDef:"comment",header:"\u0645\u0644\u0627\u062d\u0638\u0627\u062a",cell:e=>e.comment},{columnDef:"createdBy",header:"\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0628\u0648\u0627\u0633\u0637\u0629",cell:e=>e.createdBy},{columnDef:"time-createdOn",header:"\u0648\u0642\u062a \u0627\u0644\u062a\u0633\u062c\u064a\u0644",cell:e=>e.createdOn}]}loadData(){this.database.getAllIncomesOutcomes()}}c.\u0275fac=function(e){return new(e||c)(t.Y36(C.eN),t.Y36(I._W),t.Y36(D.T),t.Y36(Z.sK),t.Y36(T.uw),t.Y36(N.D))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-Incomes-outcomes"]],features:[t.qOj],decls:31,vars:11,consts:[[1,"container-fluid","my-3"],[1,"row"],[1,"col-3"],[1,"mat-elevation-z8"],[3,"loading","tableColumns","formName","componentName","canEdit","canDelete","database","OnDelete","onNew","onEdit"]],template:function(e,o){if(1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-card",3)(4,"mat-card-header"),t._uU(5,"\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0623\u0641\u062a\u062a\u0627\u062d\u064a"),t.qZA(),t.TgZ(6,"mat-card-content")(7,"p"),t._uU(8),t.qZA()()()(),t.TgZ(9,"div",2)(10,"mat-card")(11,"mat-card-header"),t._uU(12,"\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0648\u0627\u0631\u062f"),t.qZA(),t.TgZ(13,"mat-card-content")(14,"p"),t._uU(15),t.qZA()()()(),t.TgZ(16,"div",2)(17,"mat-card")(18,"mat-card-header"),t._uU(19,"\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0635\u0627\u062f\u0631"),t.qZA(),t.TgZ(20,"mat-card-content")(21,"p"),t._uU(22),t.qZA()()()(),t.TgZ(23,"div",2)(24,"mat-card")(25,"mat-card-header"),t._uU(26,"\u0627\u0644\u0631\u0635\u064a\u062f \u0627\u0644\u0646\u0647\u0627\u0626\u064a"),t.qZA(),t.TgZ(27,"mat-card-content")(28,"p"),t._uU(29),t.qZA()()()()()(),t.TgZ(30,"app-table",4),t.NdJ("OnDelete",function(u){return o.handleDelete(u)})("onNew",function(u){return o.handleNewRow(u)})("onEdit",function(u){return o.handleEditRow(u)}),t.qZA()),2&e){let a;t.xp6(8),t.hij(" ",null!==(a=null==o.currentShift?null:o.currentShift.startingBalance)&&void 0!==a?a:"-"," \u062c\u0646\u064a\u0629 "),t.xp6(7),t.hij(" ",null==o.currentShift?null:o.currentShift.totalIncome," \u062c\u0646\u064a\u0629 "),t.xp6(7),t.hij(" ",null==o.currentShift?null:o.currentShift.totalOutcome," \u062c\u0646\u064a\u0629 "),t.xp6(7),t.hij(" ",null==o.currentShift?null:o.currentShift.closingBalance," \u062c\u0646\u064a\u0629 "),t.xp6(1),t.Q6J("loading",o.loading)("tableColumns",o.tableColumns)("formName",o.formName)("componentName",o.componentName)("canEdit",!1)("canDelete",!1)("database",o.database)}},dependencies:[S.a,r.a8,r.dn,r.dk]});const y=[{path:"",component:c,title:"\u0627\u0644\u0645\u0627\u0644\u064a\u0627\u062a",canActivateChild:[f.i]}];class l{}l.\u0275fac=function(e){return new(e||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[h.Bz.forChild(y),h.Bz]});var p=n(4006),U=n(8019),F=n(8890);class m{}m.\u0275fac=function(e){return new(e||m)},m.\u0275mod=t.oAB({type:m}),m.\u0275inj=t.cJS({providers:[f.i,d.uU],imports:[d.ez,l,p.u5,p.UX,d.ez,F.SharedModule,U.I]})}}]);