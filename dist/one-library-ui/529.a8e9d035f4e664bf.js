"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[529],{9529:(U,_,a)=>{a.r(_),a.d(_,{FormDialogComponent:()=>l});var i=a(4006),r=a(5412),d=a(4662),t=a(4650),c=a(9519),h=a(208),f=a(9383),p=a(7185),E=a(6895),D=a(5810),g=a(9549),A=a(4144),I=a(4859);function O(n,u){1&n&&(t.TgZ(0,"h2",14),t._uU(1,"\u062a\u0639\u062f\u064a\u0644 \u0627\u0644\u062e\u0627\u0645\u0627\u062a \u0627\u0644\u0635\u0627\u062f\u0631\u0629/\u0627\u0644\u0648\u0627\u0631\u062f\u0629"),t.qZA())}function T(n,u){1&n&&(t.TgZ(0,"h2",14),t._uU(1,"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0627\u0645\u0627\u062a \u0627\u0644\u0635\u0627\u062f\u0631\u0629/\u0627\u0644\u0648\u0627\u0631\u062f\u0629"),t.qZA())}class l{constructor(u,e,s,m,v,b,C){this.dialogRef=u,this.data=e,this._matTracking=s,this._mat=m,this.fb=v,this.translate=b,this.toastr=C,this.subscriptions=[],this.isSubmitting=!1,this.MaterialDataSource=[],this.getAllMaterial=()=>this.subscriptions.push(this._mat.getAll().subscribe({next:o=>{this.MaterialDataSource=o.body},error:o=>{this.toastr.error((o.error??o).message)},complete:()=>{this.data&&this.form.patchValue(this.data)}})),this.setMaterialId=o=>this.materialId.setValue(o),this.ngOnDestroy=()=>this.subscriptions.forEach(o=>o.unsubscribe()),this.form=this.fb.group({id:[null],materialId:[null,[i.kI.required]],status:[null],quantity:[0],comment:[""]})}get id(){return this.form.get("id")}get quantity(){return this.form.get("quantity")}get materialId(){return this.form.get("materialId")}get status(){return this.form.get("status")}ngOnInit(){this.getAllMaterial()}onNoClick(){this.dialogRef.close()}handleSubmit(){this.form.valid&&(this.isSubmitting=!0,this.add())}add(){this.status.setValue(this.quantity.value>0?d.o.\u0648\u0627\u0631\u062f:d.o.\u0635\u0627\u062f\u0631),this.subscriptions.push(this._matTracking.add(this.form.value).subscribe({next:u=>{this._matTracking.dialogData=u.body,this.dialogRef.close({data:u})},error:u=>{this.isSubmitting=!1,this.toastr.error((u.error??u).message)},complete:()=>{this.isSubmitting=!1}}))}}l.\u0275fac=function(u){return new(u||l)(t.Y36(r.so),t.Y36(r.WI),t.Y36(c.D),t.Y36(h.U),t.Y36(i.qu),t.Y36(f.sK),t.Y36(p._W))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-form",8,"dialog"]],attrs:["class","dialog"],decls:24,vars:7,consts:[[1,"container"],["mat-dialog-title","",4,"ngIf","ngIfElse"],["update",""],[1,"d-flex","flex-column","mat-dialog-content",3,"formGroup","ngSubmit"],[1,"row"],["label","\u0627\u0644\u062e\u0627\u0645\u0629",1,"col-9",3,"dataSource","selectedValue","selectedId"],[1,"col-3"],["appearance","fill","color","warn",1,"w-100"],["type","number","matInput","","formControlName","quantity"],[1,"col"],["type","text","matInput","","formControlName","comment"],[1,"my-2","d-flex","flex-row-reverse"],["mat-raised-button","","type","submit","color","warn",1,"mx-2","px-4",3,"disabled"],["type","button","mat-stroked-button","","color","warn","tabindex","-1",3,"click"],["mat-dialog-title",""]],template:function(u,e){if(1&u&&(t.TgZ(0,"div",0),t.YNc(1,O,2,0,"h2",1),t.YNc(2,T,2,0,"ng-template",null,2,t.W1O),t.TgZ(4,"mat-dialog-content")(5,"form",3),t.NdJ("ngSubmit",function(){return e.handleSubmit()}),t.TgZ(6,"div",4)(7,"autocomplete",5),t.NdJ("selectedId",function(m){return e.setMaterialId(m)}),t.qZA(),t.TgZ(8,"div",6)(9,"mat-form-field",7)(10,"mat-label"),t._uU(11,"\u0627\u0644\u0643\u0645\u064a\u0629"),t.qZA(),t._UZ(12,"input",8),t.qZA()()(),t.TgZ(13,"div",4)(14,"div",9)(15,"mat-form-field",7)(16,"mat-label"),t._uU(17,"\u0645\u0644\u0627\u062d\u0638\u0627\u062a"),t.qZA(),t._UZ(18,"input",10),t.qZA()()(),t.TgZ(19,"div",11)(20,"button",12),t._uU(21),t.qZA(),t.TgZ(22,"button",13),t.NdJ("click",function(){return e.onNoClick()}),t._uU(23,"\u0625\u0644\u063a\u0627\u0621"),t.qZA()()()()()),2&u){const s=t.MAs(3);t.xp6(1),t.Q6J("ngIf",e.id.value)("ngIfElse",s),t.xp6(4),t.Q6J("formGroup",e.form),t.xp6(2),t.Q6J("dataSource",e.MaterialDataSource)("selectedValue",e.materialId.value),t.xp6(13),t.Q6J("disabled",!e.form.valid||e.isSubmitting),t.xp6(1),t.Oqu(e.isSubmitting?"\u0627\u0646\u062a\u0638\u0631 \u0645\u0646 \u0641\u0636\u0644\u0643":"\u062d\u0641\u0638")}},dependencies:[E.O5,i._Y,i.Fj,i.wV,i.JJ,i.JL,i.sg,i.u,D.Y,r.uh,r.xY,g.KE,g.hX,A.Nt,I.lW],styles:[".container[_ngcontent-%COMP%]{min-width:450px}"]})}}]);