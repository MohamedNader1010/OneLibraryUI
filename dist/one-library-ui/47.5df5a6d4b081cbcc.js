"use strict";(self.webpackChunkOneLibraryUI=self.webpackChunkOneLibraryUI||[]).push([[47],{5047:(A,d,a)=>{a.r(d),a.d(d,{MaterialModule:()=>s});var v=a(6895),M=a(8019),u=a(4006),C=a(8890),c=a(208),h=a(1390),N=a(9017),g=a(7014),D=a(1207),e=a(4650),y=a(529),b=a(7185),p=a(9383),O=a(2893);class m extends D.D{constructor(t,n,r,o){super(n,r,t),this.database=t,this.httpClient=n,this.toastr=r,this.translate=o,this.formName=N.j.MaterialFormDialogComponent,this.componentName=g.N.material}ngOnInit(){this.initiateTableHeaders(),this.loadData()}initiateTableHeaders(){this.tableColumns=[{columnDef:this.translate.instant("table.id"),header:this.translate.instant("table.id.label"),cell:t=>t.id},{columnDef:this.translate.instant("form.name"),header:this.translate.instant("form.name.label"),cell:t=>t.name},{columnDef:"price",header:"\u0633\u0639\u0631 \u0627\u0644\u062c\u0645\u0644\u0629",cell:t=>t.price},{columnDef:"CurrentQty",header:"\u0627\u0644\u0643\u0645\u064a\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629",cell:t=>t.quantity}]}loadData(){this.database.getAllMaterials()}}m.\u0275fac=function(t){return new(t||m)(e.Y36(c.U),e.Y36(y.eN),e.Y36(b._W),e.Y36(p.sK))},m.\u0275cmp=e.Xpm({type:m,selectors:[["app-material"]],features:[e.qOj],decls:1,vars:5,consts:[[3,"loading","tableColumns","formName","componentName","database","OnDelete","onNew","onEdit"]],template:function(t,n){1&t&&(e.TgZ(0,"app-table",0),e.NdJ("OnDelete",function(o){return n.handleDelete(o)})("onNew",function(o){return n.handleNewRow(o)})("onEdit",function(o){return n.handleEditRow(o)}),e.qZA()),2&t&&e.Q6J("loading",n.loading)("tableColumns",n.tableColumns)("formName",n.formName)("componentName",n.componentName)("database",n.database)},dependencies:[O.a]});var f=a(6578);const T=[{path:"",component:m,title:"\u0627\u0644\u062e\u0627\u0645\u0627\u062a",canActivateChild:[f.i]}];class l{}l.\u0275fac=function(t){return new(t||l)},l.\u0275mod=e.oAB({type:l}),l.\u0275inj=e.cJS({imports:[h.Bz.forChild(T),h.Bz]});class s{}s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({providers:[f.i,c.U],imports:[u.u5,u.UX,v.ez,l,M.I,C.SharedModule,p.aw]})}}]);