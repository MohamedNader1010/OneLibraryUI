import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MaterialService} from "src/Modules/material/services/material.service";
import {ServicesTypeService} from "src/Modules/serviceType/services/serviceType.service";
import {OrderDetail} from "../../interfaces/IorderDetail";
import {OrderTransaction} from "../../interfaces/IorderTransaction";
import {OrderService} from "../../services/orders.service";

@Component({
	selector: "app-add-edit",
	templateUrl: "./add-edit.component.html",
	styleUrls: ["./add-edit.component.css"],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = "orders";
	DetailsDataSource: OrderDetail[] = [];
	TransactionsDataSource: OrderTransaction[] = [];
	///////////////////////
	ServicesDataSource: any[] = [];
	NotesDataSource: any[] = [];
	ClientsDataSource: any[] = [];
	constructor(private router: Router, private route: ActivatedRoute, private _order: OrderService, private _material: MaterialService, private _type: ServicesTypeService, private fb: FormBuilder) {
		this.Form = this.createFormItem("init");
		this.RestControl.disable();
	}

	ngOnInit(): void {
		// this.getAllDetails();
		// this.getAllTransactions();
		// this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params["id"])));
		// if (this.id) this.getSingle(this.id);
		this.fillFormWithData(this.formDatasource);
	}
	formDatasource: any = {
		totalPrice: 3,
		rest: 0,
		paid: 3,
		status: false,
		clientId: 1,
		details: [
			{
				price: 1,
				serviceId: 1,
				noteId: 1,
			},
			{
				price: 2,
				serviceId: 2,
				noteId: 2,
			},
		],
	};
	get RestControl(): FormControl {
		return this.Form.get("rest") as FormControl;
	}
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case "init":
				formItem = this.fb.group({
					totalPrice: ["", [Validators.required]],
					finalPrice: [""],
					descountAmount: [""],
					descountPercent: [""],
					rest: ["", [Validators.required]],
					paid: ["", [Validators.required]],
					status: ["", [Validators.required]],
					clientId: ["", [Validators.required]],
					details: this.fb.array([]),
					remarks: [""],
				});
				break;
			case "detail":
				formItem = this.fb.group({
					price: ["", [Validators.required]],
					serviceId: [""],
					noteId: [""],
				});
				break;
		}
		return formItem;
	}
	fillFormWithData(datasource: any) {
		datasource.details.forEach(() => this.handleNewDetail());
		this.Form.patchValue(datasource);
	}
	get OrderDetails(): FormArray {
		return this.Form.get("details") as FormArray;
	}
	getSingle = (id: number) => this.subscriptions.push(this._order.getOne(id).subscribe((data) => (this.formDatasource = data)));
	// getAllDetails = () => this.subscriptions.push(this._details.getAll().subscribe({next: (data) => (this.DetailsDataSource = data)}));
	// getAllTransactions = () => this.subscriptions.push(this._transactions.getAll().subscribe({next: (data) => (this.TransactionsDataSource = data)}));
	back = () => this.router.navigate([this.controllerName]);
	handleNewDetail = () => this.OrderDetails.push(this.createFormItem("detail"));
	handleDeleteDetail = (index: number) => this.OrderDetails.removeAt(index);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id) this.subscriptions.push(this._order.update(this.id, this.Form.value).subscribe(() => this.back()));
			else this.subscriptions.push(this._order.add(this.Form.value).subscribe(() => this.back()));
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
