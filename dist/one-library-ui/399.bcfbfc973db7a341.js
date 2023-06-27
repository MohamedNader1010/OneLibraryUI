"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[399],{1399:(Q,h,s)=>{s.r(h),s.d(h,{ServiceFormDialogComponent:()=>_});var n=s(4006),f=s(4128),C=s(4004),d=s(5412),e=s(4650),P=s(7843),y=s(8653),I=s(208),S=s(8634),D=s(7185),v=s(6895),A=s(4850),p=s(9549),M=s(7392),Z=s(4144),T=s(4859),E=s(5810),b=s(9383);function x(r,i){1&r&&(e.TgZ(0,"h2",23),e._uU(1),e.ALo(2,"translate"),e.qZA()),2&r&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"service.edit")))}function F(r,i){1&r&&(e.TgZ(0,"h2",23),e._uU(1),e.ALo(2,"translate"),e.qZA()),2&r&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"service.new")))}function O(r,i){1&r&&(e.TgZ(0,"mat-error"),e._uU(1,"\u064a\u062c\u0628 \u0627\u062f\u062e\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u062e\u062f\u0645\u0629 "),e.qZA())}function U(r,i){1&r&&(e.TgZ(0,"mat-error"),e._uU(1,"\u064a\u062c\u0628 \u0627\u062f\u062e\u0627\u0644 \u0627\u0644\u0643\u0645\u064a\u0629 "),e.qZA())}function N(r,i){if(1&r){const t=e.EpF();e.TgZ(0,"div",4),e.ynx(1,26),e.TgZ(2,"autocomplete",27),e.NdJ("selectedId",function(l){const c=e.CHM(t).index,m=e.oxw(2);return e.KtG(m.setServiceMaterialId(c,l))}),e.qZA(),e.TgZ(3,"mat-form-field",28)(4,"mat-label"),e._uU(5,"\u0627\u0644\u0643\u0645\u064a\u0629"),e.qZA(),e._UZ(6,"input",29),e.YNc(7,U,2,0,"mat-error",8),e.qZA(),e.TgZ(8,"div",30)(9,"button",31),e.NdJ("click",function(){const u=e.CHM(t).index,c=e.oxw(2);return e.KtG(c.handleDeleteServiceMaterial(u))}),e.TgZ(10,"mat-icon"),e._uU(11,"delete"),e.qZA()()(),e.BQk(),e.qZA()}if(2&r){const t=i.index,a=e.oxw(2);let l;e.xp6(1),e.Q6J("formGroupName",t),e.xp6(1),e.Q6J("dataSource",a.MaterialDataSource)("selectedValue",a.getServiceMaterial(t).value),e.xp6(5),e.Q6J("ngIf",null==(l=a.getServiceMaterialQuantity(t))||null==l.errors?null:l.errors.required)}}function q(r,i){if(1&r&&(e.TgZ(0,"div",24),e.YNc(1,N,12,4,"div",25),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.serviceMaterials.controls)}}function J(r,i){if(1&r&&(e.TgZ(0,"div",10)(1,"div",16),e._uU(2,"\u0633\u0639\u0631 \u0627\u0644\u062a\u0643\u0644\u0641\u0629"),e.qZA(),e.TgZ(3,"div",17),e._UZ(4,"mat-divider"),e.qZA(),e.TgZ(5,"div",30),e._uU(6),e.ALo(7,"json"),e.qZA()()),2&r){const t=e.oxw();e.xp6(6),e.hij(" ",e.lcZ(7,1,t.data.originalPrice)," ")}}function L(r,i){1&r&&(e.TgZ(0,"mat-error"),e._uU(1,"\u064a\u062c\u0628 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u062f\u062e\u0627\u0644 \u0627\u0644\u0633\u0639\u0631 "),e.qZA())}function K(r,i){if(1&r){const t=e.EpF();e.TgZ(0,"div",4),e.ynx(1,26),e.TgZ(2,"autocomplete",33),e.NdJ("selectedId",function(l){const c=e.CHM(t).index,m=e.oxw(2);return e.KtG(m.setServicePriceClientTypeId(c,l))}),e.qZA(),e.TgZ(3,"mat-form-field",28)(4,"mat-label"),e._uU(5,"\u0627\u0644\u0633\u0639\u0631"),e.qZA(),e._UZ(6,"input",34),e.YNc(7,L,2,0,"mat-error",8),e.qZA(),e.TgZ(8,"div",30)(9,"button",31),e.NdJ("click",function(){const u=e.CHM(t).index,c=e.oxw(2);return e.KtG(c.handleDeleteServicePrice(u))}),e.TgZ(10,"mat-icon"),e._uU(11,"delete"),e.qZA()()(),e.BQk(),e.qZA()}if(2&r){const t=i.index,a=e.oxw(2);let l;e.xp6(1),e.Q6J("formGroupName",t),e.xp6(1),e.Q6J("dataSource",a.clientsTypesDataSource)("selectedValue",a.getServicePriceClientTypeId(t).value),e.xp6(5),e.Q6J("ngIf",null==(l=a.getServicePrice(t))||null==l.errors?null:l.errors.required)}}function R(r,i){if(1&r&&(e.TgZ(0,"div",32),e.YNc(1,K,12,4,"div",25),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.servicePricePerClientTypes.controls)}}class _{constructor(i,t,a,l,u,c,m,W){this.data=i,this._service=t,this._clientType=a,this._material=l,this.fb=u,this._serviceType=c,this.toastr=m,this.matDialogRef=W,this.subscriptions=[],this.isSubmitting=!1,this.MaterialDataSource=[],this.ServiceTypeDataSource=[],this.clientsTypesDataSource=[],this.getServiceMaterialId=o=>this.serviceMaterials.at(o).get("id"),this.getServiceMaterial=o=>this.serviceMaterials.at(o).get("materialId"),this.getServiceMaterialQuantity=o=>this.serviceMaterials.at(o).get("quantity"),this.getServicePriceId=o=>this.servicePricePerClientTypes.at(o).get("id"),this.getServicePrice=o=>this.servicePricePerClientTypes.at(o).get("price"),this.getServicePriceClientTypeId=o=>this.servicePricePerClientTypes.at(o).get("clientTypeId"),this.handleNewServicePrice=()=>this.servicePricePerClientTypes.push(this.createFormItem("servicePricePerClientTypes")),this.handleDeleteServicePrice=o=>this.servicePricePerClientTypes.removeAt(o),this.handleNewServiceMaterial=()=>this.serviceMaterials.push(this.createFormItem("serviceMaterials")),this.handleDeleteServiceMaterial=o=>this.serviceMaterials.removeAt(o),this.setServiceTypeId=o=>this.serviceTypeId.setValue(o),this.setServiceMaterialId=(o,g)=>this.getServiceMaterial(o).setValue(g),this.setServicePriceClientTypeId=(o,g)=>this.getServicePriceClientTypeId(o).setValue(g),this.onNoClick=()=>this.matDialogRef.close(),this.ngOnDestroy=()=>this.subscriptions.forEach(o=>o.unsubscribe()),this.Form=this.createFormItem("init")}get id(){return this.Form.get("id")}get name(){return this.Form.get("name")}get serviceTypeId(){return this.Form.get("serviceTypeId")}get serviceMaterials(){return this.Form.get("serviceMaterials")}get servicePricePerClientTypes(){return this.Form.get("servicePricePerClientTypes")}ngOnInit(){this.forkJoins()}createFormItem(i){let t=this.fb.group({});switch(i){case"init":t=this.fb.group({id:[null],name:["",[n.kI.required,n.kI.maxLength(100)]],serviceTypeId:[null,[n.kI.required]],serviceMaterials:this.fb.array([]),servicePricePerClientTypes:this.fb.array([])});break;case"servicePricePerClientTypes":t=this.fb.group({id:[null],price:[null,[n.kI.required]],clientTypeId:[null,[n.kI.required]]});break;case"serviceMaterials":t=this.fb.group({id:[null],materialId:[null,[n.kI.required]],quantity:[1,[n.kI.required]]})}return t}forkJoins(){let i=[this._material.getAll(),this._serviceType.getAll(),this._clientType.getAll()];return(0,f.D)(i).pipe((0,C.U)(([t,a,l])=>({materials:t,clientsTypes:l,servicesTypes:a}))).subscribe({next:t=>{this.MaterialDataSource=t.materials.body,this.ServiceTypeDataSource=t.servicesTypes.body,this.clientsTypesDataSource=t.clientsTypes.body},error:t=>{this.isSubmitting=!1,this.toastr.error((t.error??t).message)},complete:()=>{this.data&&(this.data.serviceMaterials.forEach(()=>this.serviceMaterials.push(this.createFormItem("serviceMaterials"))),this.data.servicePricePerClientTypes.forEach(()=>this.servicePricePerClientTypes.push(this.createFormItem("servicePricePerClientTypes"))),this.Form.patchValue(this.data))}})}handleSubmit(){this.Form.valid&&(this.isSubmitting=!0,this.id.value?this.update():this.add())}update(){this.subscriptions.push(this._service.update(this.id.value,this.Form.value).subscribe({next:i=>{this._service.dialogData=i.body,this.matDialogRef.close({data:i})},error:i=>{this.isSubmitting=!1,this.toastr.error((i.error??i).message)},complete:()=>{this.isSubmitting=!1}}))}add(){this.subscriptions.push(this._service.add(this.Form.value).subscribe({next:i=>{this._service.dialogData=i.body,this.matDialogRef.close({data:i})},error:i=>{this.isSubmitting=!1,this.toastr.error((i.error??i).message)},complete:()=>{this.isSubmitting=!1}}))}}_.\u0275fac=function(i){return new(i||_)(e.Y36(d.WI),e.Y36(P.r),e.Y36(y.q),e.Y36(I.U),e.Y36(n.qu),e.Y36(S.E),e.Y36(D._W),e.Y36(d.so))},_.\u0275cmp=e.Xpm({type:_,selectors:[["app-service-form-dialog"]],decls:41,vars:18,consts:[[1,"container"],["mat-dialog-title","",4,"ngIf","ngIfElse"],["update",""],[1,"d-flex","flex-column","mat-dialog-content",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-6"],["color","warn",1,"w-100"],["matInput","","formControlName","name"],[4,"ngIf"],["label","\u0627\u0644\u0646\u0648\u0639",1,"col-6",3,"dataSource","selectedValue","selectedId"],[1,"row","my-2","align-items-center"],[1,"col-2"],[1,"col-8"],["type","button","mat-icon-button","","matTooltip","add","color","basic","aria-label","add service Material row",1,"col-1",3,"click"],["formArrayName","serviceMaterials",4,"ngIf"],["class","row my-2 align-items-center",4,"ngIf"],[1,"col-3"],[1,"col-7"],["type","button","mat-icon-button","","matTooltip","add","color","basic","aria-label","add service price row",1,"col-1",3,"click"],["formArrayName","servicePricePerClientTypes",4,"ngIf"],[1,"my-2","d-flex","flex-row-reverse"],["mat-raised-button","","color","warn",1,"mx-2","px-4",3,"disabled"],["type","button","mat-stroked-button","","color","warn",3,"click"],["mat-dialog-title",""],["formArrayName","serviceMaterials"],["class","row",4,"ngFor","ngForOf"],[3,"formGroupName"],["label","\u0627\u0644\u062e\u0627\u0645\u0629",1,"col-5",3,"dataSource","selectedValue","selectedId"],["color","warn",1,"col-5"],["type","number","matInput","","formControlName","quantity","min","0"],[1,"col-1"],["type","button","mat-icon-button","","matTooltip","delete","color","warn","aria-label","delete selected row",3,"click"],["formArrayName","servicePricePerClientTypes"],["label","\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u064a\u0644",1,"col-5",3,"dataSource","selectedValue","selectedId"],["type","number","matInput","","formControlName","price","min","0"]],template:function(i,t){if(1&i&&(e.TgZ(0,"div",0),e.YNc(1,x,3,3,"h2",1),e.YNc(2,F,3,3,"ng-template",null,2,e.W1O),e.TgZ(4,"mat-dialog-content")(5,"form",3),e.NdJ("ngSubmit",function(){return t.handleSubmit()}),e.TgZ(6,"div",4)(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),e._uU(10,"\u0627\u0644\u0623\u0633\u0645"),e.qZA(),e._UZ(11,"input",7),e.YNc(12,O,2,0,"mat-error",8),e.qZA()(),e.TgZ(13,"autocomplete",9),e.NdJ("selectedId",function(l){return t.setServiceTypeId(l)}),e.qZA()(),e.TgZ(14,"div",10)(15,"div",11),e._uU(16,"\u0627\u0644\u062e\u0627\u0645\u0627\u062a"),e.qZA(),e.TgZ(17,"div",12),e._UZ(18,"mat-divider"),e.qZA(),e.TgZ(19,"button",13),e.NdJ("click",function(){return t.handleNewServiceMaterial()}),e.TgZ(20,"mat-icon"),e._uU(21,"add"),e.qZA()()(),e.YNc(22,q,2,1,"div",14),e.YNc(23,J,8,3,"div",15),e.TgZ(24,"div",10)(25,"div",16),e._uU(26,"\u062a\u0633\u0639\u064a\u0631 \u0627\u0644\u062e\u062f\u0645\u0629"),e.qZA(),e.TgZ(27,"div",17),e._UZ(28,"mat-divider"),e.qZA(),e.TgZ(29,"button",18),e.NdJ("click",function(){return t.handleNewServicePrice()}),e.TgZ(30,"mat-icon"),e._uU(31,"add"),e.qZA()()(),e.YNc(32,R,2,1,"div",19),e.TgZ(33,"div",20)(34,"button",21),e._uU(35),e.ALo(36,"translate"),e.ALo(37,"translate"),e.qZA(),e.TgZ(38,"button",22),e.NdJ("click",function(){return t.onNoClick()}),e._uU(39),e.ALo(40,"translate"),e.qZA()()()()()),2&i){const a=e.MAs(3);e.xp6(1),e.Q6J("ngIf",t.id.value)("ngIfElse",a),e.xp6(4),e.Q6J("formGroup",t.Form),e.xp6(7),e.Q6J("ngIf",null==t.name.errors?null:t.name.errors.required),e.xp6(1),e.Q6J("dataSource",t.ServiceTypeDataSource)("selectedValue",t.serviceTypeId.value),e.xp6(9),e.Q6J("ngIf",t.serviceMaterials.controls.length),e.xp6(1),e.Q6J("ngIf",t.data),e.xp6(9),e.Q6J("ngIf",t.servicePricePerClientTypes.controls.length),e.xp6(2),e.Q6J("disabled",!t.Form.valid||t.isSubmitting),e.xp6(1),e.Oqu(t.isSubmitting?e.lcZ(36,12,"button.wait"):e.lcZ(37,14,"button.save")),e.xp6(4),e.Oqu(e.lcZ(40,16,"button.back"))}},dependencies:[n._Y,n.Fj,n.wV,n.JJ,n.JL,n.qQ,n.sg,n.u,n.x0,n.CE,v.sg,v.O5,A.d,d.uh,d.xY,p.KE,p.hX,p.TO,M.Hw,Z.Nt,T.lW,T.RK,E.Y,v.Ts,b.X$],styles:[".container[_ngcontent-%COMP%]{width:600px}"]})}}]);