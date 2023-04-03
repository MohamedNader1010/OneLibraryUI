"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[708],{3708:(q,y,o)=>{o.r(y),o.d(y,{ServiceModule:()=>d});var v=o(6895),h=o(1390),t=o(4650);class p{constructor(){}ngOnInit(){}}p.\u0275fac=function(e){return new(e||p)},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-service"]],decls:1,vars:0,template:function(e,i){1&e&&t._UZ(0,"router-outlet")},dependencies:[h.lC]});var b=o(7843),C=o(5412),S=o(7185),D=o(2893);class f{constructor(e,i,r){this._service=e,this.dialog=i,this.toastr=r,this.subscriptions=[],this.handleDelete=u=>this.subscriptions.push(this._service.delete(u).subscribe(()=>this.getAll()))}ngOnInit(){this.tableColumns=[{columnDef:"id",header:"#",cell:e=>e.id},{columnDef:"Name",header:"\u0627\u0644\u0623\u0633\u0645",cell:e=>e.name},{columnDef:"Material",header:"\u0627\u0644\u062e\u0627\u0645\u0629",cell:e=>e.material},{columnDef:"Type",header:"\u0627\u0644\u0646\u0648\u0639",cell:e=>e.serviceType}],this.getAll()}getAll(){this.loading=!0,this.subscriptions.push(this._service.getAll().subscribe({next:e=>{this.tableData=e,console.log(e)},error:e=>{this.toastr.error(e.message,"\u0644\u0627\u064a\u0645\u0643\u0646 \u062a\u062d\u0645\u064a\u0644 \u0627\u0628\u064a\u0627\u0646\u0627\u062a "),this.loading=!1},complete:()=>{this.loading=!1}}))}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}}f.\u0275fac=function(e){return new(e||f)(t.Y36(b.r),t.Y36(C.uw),t.Y36(S._W))},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-all"]],decls:1,vars:3,consts:[["dialogHeader","\u062d\u0630\u0641 \u0627\u0644\u062e\u062f\u0645\u0629","dialogDisplayName","name",3,"loading","tableColumns","tableData","OnDelete"]],template:function(e,i){1&e&&(t.TgZ(0,"app-table",0),t.NdJ("OnDelete",function(u){return i.handleDelete(u)}),t.qZA()),2&e&&t.Q6J("loading",i.loading)("tableColumns",i.tableColumns)("tableData",i.tableData)},dependencies:[D.a]});var n=o(4006),F=o(208),I=o(8634),A=o(9549),E=o(4144),O=o(4385),N=o(3238),U=o(4859);function Y(s,e){1&s&&(t.TgZ(0,"h2",16),t._uU(1,"\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u062e\u062f\u0645\u0627\u062a"),t.qZA())}function J(s,e){1&s&&(t.TgZ(0,"h2",16),t._uU(1,"\u062e\u062f\u0645\u0629 \u062c\u062f\u064a\u062f\u0629"),t.qZA())}function x(s,e){1&s&&(t.TgZ(0,"mat-error"),t._uU(1," Name is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA()())}function M(s,e){if(1&s&&(t.TgZ(0,"mat-option",17),t._uU(1),t.qZA()),2&s){const i=e.$implicit;t.Q6J("value",i.id),t.xp6(1),t.Oqu(i.name)}}function Q(s,e){if(1&s&&(t.TgZ(0,"mat-option",17),t._uU(1),t.qZA()),2&s){const i=e.$implicit;t.Q6J("value",i.id),t.xp6(1),t.Oqu(i.name)}}class c{constructor(e,i,r,u,T,g,B){this.router=e,this.route=i,this._service=r,this._material=u,this._type=T,this.fb=g,this.toastr=B,this.subscriptions=[],this.controllerName="services",this.isSubmitted=!1,this.MaterialDataSource=[],this.ServiceTypeDataSource=[],this.getSingle=a=>this.subscriptions.push(this._service.getOne(a).subscribe(W=>this.Form.patchValue(W))),this.getAllMaterials=()=>this.subscriptions.push(this._material.getAll().subscribe({next:a=>{this.MaterialDataSource=a},error:a=>{this.toastr.error(a.message,"\u0644\u0627\u064a\u0645\u0643\u0646 \u062a\u062d\u0645\u064a\u0644 \u0627\u0628\u064a\u0627\u0646\u0627\u062a ")}})),this.getAllServicesTypes=()=>this.subscriptions.push(this._type.getAll().subscribe({next:a=>{this.ServiceTypeDataSource=a},error:a=>{this.toastr.error(a.message,"\u0644\u0627\u064a\u0645\u0643\u0646 \u062a\u062d\u0645\u064a\u0644 \u0627\u0628\u064a\u0627\u0646\u0627\u062a ")}})),this.back=()=>this.router.navigate([this.controllerName]),this.Form=this.fb.group({name:["",[n.kI.required,n.kI.maxLength(100)]],materialId:["",[n.kI.required]],serviceTypeId:["",[n.kI.required]]})}get name(){return this.Form.get("name")}ngOnInit(){this.getAllMaterials(),this.getAllServicesTypes(),this.subscriptions.push(this.route.queryParams.subscribe(e=>{this.id=e.id,this.id&&this.getSingle(this.id)}))}handleSubmit(){this.Form.valid&&this.subscriptions.push(this.id?this._service.update(this.id,this.Form.value).subscribe(()=>{this.isSubmitted=!0,this.back()}):this._service.add(this.Form.value).subscribe(()=>{this.isSubmitted=!0,this.back()}))}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}}c.\u0275fac=function(e){return new(e||c)(t.Y36(h.F0),t.Y36(h.gz),t.Y36(b.r),t.Y36(F.U),t.Y36(I.E),t.Y36(n.qu),t.Y36(S._W))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-add-edit"]],decls:28,vars:7,consts:[["class","w-100 text-center mt-3",4,"ngIf","ngIfElse"],["update",""],[1,"container","d-flex","justify-content-center"],[1,"d-flex","flex-column","w-50",3,"formGroup","ngSubmit"],[1,"row"],[1,"col"],[1,"w-100"],["matInput","","formControlName","name"],[4,"ngIf"],["appearance","fill",1,"col-6"],["formControlName","materialId"],[3,"value",4,"ngFor","ngForOf"],["formControlName","serviceTypeId"],[1,"my-2","d-flex","flex-row-reverse"],["mat-flat-button","","color","warn",1,"mx-2","px-4",3,"disabled"],["type","button","mat-stroked-button","","color","basic",3,"click"],[1,"w-100","text-center","mt-3"],[3,"value"]],template:function(e,i){if(1&e&&(t.YNc(0,Y,2,0,"h2",0),t.YNc(1,J,2,0,"ng-template",null,1,t.W1O),t.TgZ(3,"section",2)(4,"form",3),t.NdJ("ngSubmit",function(){return i.handleSubmit()}),t.TgZ(5,"div",4)(6,"div",5)(7,"mat-form-field",6)(8,"mat-label"),t._uU(9,"\u0627\u0644\u0623\u0633\u0645"),t.qZA(),t._UZ(10,"input",7),t.YNc(11,x,4,0,"mat-error",8),t.qZA()()(),t.TgZ(12,"div",4)(13,"mat-form-field",9)(14,"mat-label"),t._uU(15,"\u0627\u0644\u062e\u0627\u0645\u0629"),t.qZA(),t.TgZ(16,"mat-select",10),t.YNc(17,M,2,2,"mat-option",11),t.qZA()(),t.TgZ(18,"mat-form-field",9)(19,"mat-label"),t._uU(20,"\u0627\u0644\u0646\u0648\u0639"),t.qZA(),t.TgZ(21,"mat-select",12),t.YNc(22,Q,2,2,"mat-option",11),t.qZA()()(),t.TgZ(23,"div",13)(24,"button",14),t._uU(25,"\u062d\u0641\u0638"),t.qZA(),t.TgZ(26,"button",15),t.NdJ("click",function(){return i.back()}),t._uU(27,"\u0631\u062c\u0648\u0639"),t.qZA()()()()),2&e){const r=t.MAs(2);t.Q6J("ngIf",i.id)("ngIfElse",r),t.xp6(4),t.Q6J("formGroup",i.Form),t.xp6(7),t.Q6J("ngIf",null==i.name.errors?null:i.name.errors.required),t.xp6(6),t.Q6J("ngForOf",i.MaterialDataSource),t.xp6(5),t.Q6J("ngForOf",i.ServiceTypeDataSource),t.xp6(2),t.s9C("disabled",!i.Form.valid)}},dependencies:[n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,v.sg,v.O5,A.KE,A.hX,A.TO,E.Nt,O.gD,N.ey,U.lW]});var G=o(5861),z=o(7957);class l{constructor(e){this.dialog=e}canDeactivate(e){var i=this;return(0,G.Z)(function*(){return!!(e.Form.touched&&e.Form.dirty&&e.isSubmitted||e.Form.untouched)||(yield new Promise((u,T)=>{i.dialog.closeAll(),i.dialog.open(z.a,{disableClose:!0,data:{location:"\u0644\u0645 \u064a\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a",msg:"\u0644\u0642\u062f \u0642\u0645\u062a \u0628\u062a\u0639\u062f\u064a\u0644 \u0628\u0639\u0636 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0644\u0645 \u062a\u0642\u0645 \u0628\u062d\u0641\u0638\u0647\u0627,\u0647\u0644 \u0627\u0646\u062a \u0645\u062a\u0627\u0643\u062f \u0645\u0646 \u0645\u063a\u0627\u062f\u0631\u0629 \u0627\u0644\u0635\u0641\u062d\u0629"}}).afterClosed().subscribe({next:g=>u(g),error:g=>T()})}))})()}}l.\u0275fac=function(e){return new(e||l)(t.LFG(C.uw))},l.\u0275prov=t.Yz7({token:l,factory:l.\u0275fac});var Z=o(6578);const L=[{path:"",component:p,title:"\u0627\u0644\u062e\u062f\u0645\u0627\u062a",canActivateChild:[Z.i],children:[{path:"all",component:f,title:"\u062c\u0645\u064a\u0639 \u0627\u0644\u062e\u062f\u0645\u0627\u062a"},{path:"new",component:c,title:"\u0627\u0636\u0627\u0641\u0629 \u062e\u062f\u0645\u0629 \u062c\u062f\u064a\u062f\u0629",canDeactivate:[l]},{path:"edit",component:c,title:"\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u062e\u062f\u0645\u0629",canDeactivate:[l]},{path:"",redirectTo:"all",pathMatch:"full"}]}];class m{}m.\u0275fac=function(e){return new(e||m)},m.\u0275mod=t.oAB({type:m}),m.\u0275inj=t.cJS({imports:[h.Bz.forChild(L),h.Bz]});var X=o(1697),j=o(7110);class d{}d.\u0275fac=function(e){return new(e||d)},d.\u0275mod=t.oAB({type:d}),d.\u0275inj=t.cJS({providers:[Z.i,b.r,l],imports:[n.u5,n.UX,v.ez,m,X.I,j.SharedModule]})}}]);