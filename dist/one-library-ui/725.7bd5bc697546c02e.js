"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[725],{2725:(P,c,a)=>{a.r(c),a.d(c,{FormDialogComponent:()=>l});var u=a(4006),r=a(5412),t=a(4650),h=a(9943),g=a(7185),p=a(3155),d=a(6895),f=a(5810),m=a(9549),E=a(4144),I=a(4859),D=a(9383);function b(i,o){1&i&&(t.TgZ(0,"h2",14),t._uU(1,"\u062a\u0639\u062f\u064a\u0644 \u062d\u0636\u0648\u0631 \u0648\u0627\u0646\u0635\u0631\u0627\u0641"),t.qZA())}function O(i,o){1&i&&(t.TgZ(0,"h2",14),t._uU(1,"\u062a\u0633\u062c\u064a\u0644 \u062d\u0636\u0648\u0631 \u0648 \u0627\u0646\u0635\u0631\u0627\u0641"),t.qZA())}function y(i,o){if(1&i&&(t.TgZ(0,"h4")(1,"strong"),t._uU(2,"\u0627\u0644\u062a\u0627\u0631\u064a\u062e :"),t.qZA(),t._uU(3),t.ALo(4,"date"),t.qZA()),2&i){const e=t.oxw();t.xp6(3),t.hij(" ",t.xi3(4,1,e.data.checkIn,"dd/MM/yyyy"),"")}}function M(i,o){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," \u064a\u062c\u0628 \u0627\u062f\u062e\u0627\u0644 \u0648\u0642\u062a \u0627\u0644\u062d\u0636\u0648\u0631 "),t.qZA())}class l{constructor(o,e,s,_,T,v,C){this.dialogRef=o,this.data=e,this._attendance=s,this.fb=_,this.toastr=T,this._employee=v,this.datePipe=C,this.subscriptions=[],this.isSubmitting=!1,this.EmployeesDataSource=[],this.getAllEmployees=()=>this.subscriptions.push(this._employee.getAll().subscribe({next:n=>{this.EmployeesDataSource=n.body},error:n=>{this.isSubmitting=!1,this.toastr.error((n.error??n).message)},complete:()=>{this.data&&this.form.patchValue({id:this.data.id,employeeId:this.data.employeeId,employee:this.data.employee,checkIn:this.datePipe.transform(this.data.checkIn,"HH:mm"),checkOut:this.datePipe.transform(this.data.checkOut,"HH:mm")})}})),this.onNoClick=()=>this.dialogRef.close(),this.setEmpId=n=>this.employeeId.setValue(n),this.ngOnDestroy=()=>this.subscriptions.forEach(n=>n.unsubscribe()),this.form=this.fb.group({id:[null],employeeId:[null,[u.kI.required]],checkIn:[null,[u.kI.required]],checkOut:[null],employee:[""]})}get id(){return this.form.get("id")}get employeeId(){return this.form.get("employeeId")}get checkIn(){return this.form.get("checkIn")}get checkOut(){return this.form.get("checkOut")}ngOnInit(){this.getAllEmployees()}handleSubmit(){this.form.valid&&(this.id.value?this.update():this.add())}update(){this.subscriptions.push(this._attendance.update(this.id.value,this.form.value).subscribe({next:o=>{this.isSubmitting=!0,this._attendance.dialogData=o.body,this.dialogRef.close({data:o})},error:o=>{this.isSubmitting=!1,this.toastr.error((o.error??o).message)},complete:()=>{this.isSubmitting=!1}}))}add(){this.subscriptions.push(this._attendance.add(this.form.value).subscribe({next:o=>{this.isSubmitting=!0,this._attendance.dialogData=o.body,this.dialogRef.close({data:o})},error:o=>{this.isSubmitting=!1,this.toastr.error((o.error??o).message)},complete:()=>{this.isSubmitting=!1}}))}}l.\u0275fac=function(o){return new(o||l)(t.Y36(r.so),t.Y36(r.WI),t.Y36(h.v),t.Y36(u.qu),t.Y36(g._W),t.Y36(p.G),t.Y36(d.uU))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-form",8,"dialog"]],attrs:["class","dialog"],decls:32,vars:14,consts:[[1,"container"],["mat-dialog-title","",4,"ngIf","ngIfElse"],["update",""],[4,"ngIf"],[1,"d-flex","flex-column","mat-dialog-content",3,"formGroup","ngSubmit"],[1,"row"],["label","\u0627\u0644\u0645\u0648\u0638\u0641",3,"dataSource","selectedValue","selectedId"],[1,"col-6"],["appearance","fill","color","warn",1,"w-100"],["matInput","","type","time","formControlName","checkIn"],["matInput","","type","time","formControlName","checkOut"],[1,"my-2","d-flex","flex-row-reverse"],["mat-raised-button","","color","warn",1,"mx-2","px-4",3,"disabled"],["type","button","mat-stroked-button","","color","warn",3,"click"],["mat-dialog-title",""]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0),t.YNc(1,b,2,0,"h2",1),t.YNc(2,O,2,0,"ng-template",null,2,t.W1O),t.TgZ(4,"mat-dialog-content"),t.YNc(5,y,5,4,"h4",3),t.TgZ(6,"form",4),t.NdJ("ngSubmit",function(){return e.handleSubmit()}),t.TgZ(7,"div",5)(8,"autocomplete",6),t.NdJ("selectedId",function(_){return e.setEmpId(_)}),t.qZA()(),t.TgZ(9,"div",5)(10,"div",7)(11,"mat-form-field",8)(12,"mat-label"),t._uU(13,"\u062d\u0636\u0648\u0631"),t.qZA(),t.TgZ(14,"mat-hint"),t._uU(15,"HH:MM AM/PM"),t.qZA(),t._UZ(16,"input",9),t.YNc(17,M,2,0,"mat-error",3),t.qZA()(),t.TgZ(18,"div",7)(19,"mat-form-field",8)(20,"mat-label"),t._uU(21,"\u0627\u0646\u0635\u0631\u0627\u0641"),t.qZA(),t.TgZ(22,"mat-hint"),t._uU(23,"HH:MM AM/PM"),t.qZA(),t._UZ(24,"input",10),t.qZA()()(),t.TgZ(25,"div",11)(26,"button",12),t._uU(27),t.ALo(28,"translate"),t.qZA(),t.TgZ(29,"button",13),t.NdJ("click",function(){return e.onNoClick()}),t._uU(30),t.ALo(31,"translate"),t.qZA()()()()()),2&o){const s=t.MAs(3);t.xp6(1),t.Q6J("ngIf",e.id.value)("ngIfElse",s),t.xp6(4),t.Q6J("ngIf",e.data),t.xp6(1),t.Q6J("formGroup",e.form),t.xp6(2),t.Q6J("dataSource",e.EmployeesDataSource)("selectedValue",null==e||null==e.data?null:e.data.employeeId),t.xp6(9),t.Q6J("ngIf",e.checkIn.hasError("required")&&(e.checkIn.touched||e.checkIn.dirty)),t.xp6(9),t.Q6J("disabled",!e.form.valid||e.isSubmitting),t.xp6(1),t.Oqu(e.isSubmitting?"button.wait":t.lcZ(28,10,"button.save")),t.xp6(3),t.Oqu(t.lcZ(31,12,"button.back"))}},dependencies:[d.O5,u._Y,u.Fj,u.JJ,u.JL,u.sg,u.u,f.Y,r.uh,r.xY,m.KE,m.hX,m.bx,m.TO,E.Nt,I.lW,D.X$,d.uU],styles:[".container[_ngcontent-%COMP%]{min-width:450px}"]})}}]);