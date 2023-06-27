"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[331],{3331:(T,c,a)=>{a.r(c),a.d(c,{FormDialogComponent:()=>r});var o=a(4006),m=a(5412),t=a(4650),f=a(2247),g=a(9648),h=a(7185),p=a(6895),D=a(5810),_=a(9602),d=a(9549),b=a(4144),A=a(4859);function C(s,e){1&s&&(t.TgZ(0,"h2",16),t._uU(1,"\u062a\u0639\u062f\u064a\u0644 \u062a\u0639\u0644\u064a\u0642 \u0627\u0644\u0639\u0645\u064a\u0644"),t.qZA())}function I(s,e){1&s&&(t.TgZ(0,"h2",16),t._uU(1,"\u062a\u0633\u062c\u064a\u0644 \u062a\u0639\u0644\u064a\u0642 \u062c\u062f\u064a\u062f"),t.qZA())}class r{constructor(e,i,l,n,v,O){this.dialogRef=e,this.data=i,this._feedback=l,this._client=n,this.fb=v,this.toastr=O,this.subscriptions=[],this.isSubmitting=!1,this.ClientsDataSource=[],this.getAllClients=()=>this.subscriptions.push(this._client.getAll().subscribe({next:u=>{this.ClientsDataSource=u.body},error:u=>{this.toastr.error((u.error??u).message)},complete:()=>{this.data&&this.form.patchValue(this.data)}})),this.setCleintId=u=>this.cleintId.setValue(u),this.ngOnDestroy=()=>this.subscriptions.forEach(u=>u.unsubscribe()),this.form=this.fb.group({id:[null],cleintId:[null,[o.kI.required]],feedBack:[null],feedBackDate:[null]})}get id(){return this.form.get("id")}get cleintId(){return this.form.get("cleintId")}get feedBack(){return this.form.get("feedBack")}get feedBackDate(){return this.form.get("feedBackDate")}ngOnInit(){this.getAllClients()}onNoClick(){this.dialogRef.close()}handleSubmit(){this.form.valid&&(this.isSubmitting=!0,this.id.value?this.update():this.add())}update(){this.subscriptions.push(this._feedback.update(this.id.value,this.form.value).subscribe({next:e=>{this._feedback.dialogData=e.body,this.dialogRef.close({data:e})},error:e=>{this.isSubmitting=!1,this.toastr.error((e.error??e).message)},complete:()=>{this.isSubmitting=!1}}))}add(){this.subscriptions.push(this._feedback.add(this.form.value).subscribe({next:e=>{this._feedback.dialogData=e.body,this.dialogRef.close({data:e})},error:e=>{this.isSubmitting=!1,this.toastr.error((e.error??e).message)},complete:()=>{this.isSubmitting=!1}}))}}r.\u0275fac=function(e){return new(e||r)(t.Y36(m.so),t.Y36(m.WI),t.Y36(f.T),t.Y36(g.y),t.Y36(o.qu),t.Y36(h._W))},r.\u0275cmp=t.Xpm({type:r,selectors:[["app-form",8,"dialog"]],attrs:["class","dialog"],decls:29,vars:9,consts:[[1,"container"],["mat-dialog-title","",4,"ngIf","ngIfElse"],["update",""],[1,"d-flex","flex-column","mat-dialog-content",3,"formGroup","ngSubmit"],[1,"row"],["label","\u0627\u0644\u0639\u0645\u064a\u0644",1,"col-6",3,"dataSource","selectedValue","selectedId"],[1,"col-6"],["appearance","fill","color","warn",1,"w-100"],["matInput","","formControlName","feedBackDate",3,"matDatepicker"],["matIconSuffix","",3,"for"],["datepicker",""],[1,"col"],["matInput","","formControlName","feedBack"],[1,"my-2","d-flex","flex-row-reverse"],["mat-raised-button","","type","submit","color","warn",1,"mx-2","px-4",3,"disabled"],["type","button","mat-stroked-button","","color","warn","tabindex","-1",3,"click"],["mat-dialog-title",""]],template:function(e,i){if(1&e&&(t.TgZ(0,"div",0),t.YNc(1,C,2,0,"h2",1),t.YNc(2,I,2,0,"ng-template",null,2,t.W1O),t.TgZ(4,"mat-dialog-content")(5,"form",3),t.NdJ("ngSubmit",function(){return i.handleSubmit()}),t.TgZ(6,"div",4)(7,"autocomplete",5),t.NdJ("selectedId",function(n){return i.setCleintId(n)}),t.qZA(),t.TgZ(8,"div",6)(9,"mat-form-field",7)(10,"mat-label"),t._uU(11,"\u0627\u0644\u062a\u0627\u0631\u064a\u062e"),t.qZA(),t.TgZ(12,"mat-hint"),t._uU(13,"MM/DD/YYYY"),t.qZA(),t._UZ(14,"input",8)(15,"mat-datepicker-toggle",9)(16,"mat-datepicker",null,10),t.qZA()()(),t.TgZ(18,"div",4)(19,"div",11)(20,"mat-form-field",7)(21,"mat-label"),t._uU(22,"\u0645\u0644\u0627\u062d\u0638\u0627\u062a"),t.qZA(),t._UZ(23,"textarea",12),t.qZA()()(),t.TgZ(24,"div",13)(25,"button",14),t._uU(26),t.qZA(),t.TgZ(27,"button",15),t.NdJ("click",function(){return i.onNoClick()}),t._uU(28,"\u0625\u0644\u063a\u0627\u0621"),t.qZA()()()()()),2&e){const l=t.MAs(3),n=t.MAs(17);t.xp6(1),t.Q6J("ngIf",i.id.value)("ngIfElse",l),t.xp6(4),t.Q6J("formGroup",i.form),t.xp6(2),t.Q6J("dataSource",i.ClientsDataSource)("selectedValue",i.cleintId.value),t.xp6(7),t.Q6J("matDatepicker",n),t.xp6(1),t.Q6J("for",n),t.xp6(10),t.Q6J("disabled",!i.form.valid||i.isSubmitting),t.xp6(1),t.Oqu(i.isSubmitting?"\u0627\u0646\u062a\u0638\u0631 \u0645\u0646 \u0641\u0636\u0644\u0643":"\u062d\u0641\u0638")}},dependencies:[p.O5,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,D.Y,_.Mq,_.hl,_.nW,m.uh,m.xY,d.KE,d.hX,d.bx,d.R9,b.Nt,A.lW],styles:[".container[_ngcontent-%COMP%]{min-width:450px}"]})}}]);