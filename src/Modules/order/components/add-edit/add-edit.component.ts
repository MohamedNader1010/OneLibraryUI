import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
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
export class AddEditComponent implements OnInit {
	orderForm: FormGroup;
	id!: number;
	DetailsDataSource: OrderDetail[] = [];
	TransactionsDataSource: OrderTransaction[] = [];
	///////////////////////
	ServicesDataSource: any[] = [];
	NotesDataSource: any[] = [];
	ClientsDataSource: any[] = [];
	constructor(private router: Router, private route: ActivatedRoute, private _order: OrderService, private _material: MaterialService, private _type: ServicesTypeService, private fb: FormBuilder) {
		this.orderForm = this.createFormItem("init");
	}
	ngOnInit(): void {
		// this.getAllDetails();
		// this.getAllTransactions();
		// this.route.queryParams.subscribe((params) => (this.id = params["id"]));
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
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case "init":
				formItem = this.fb.group({
					totalPrice: ["", [Validators.required]],
					rest: ["", [Validators.required]],
					paid: ["", [Validators.required]],
					status: ["", [Validators.required]],
					clientId: ["", [Validators.required]],
					details: this.fb.array([]),
				});
				break;
			case "detail":
				formItem = this.fb.group({
					price: ["", [Validators.required]],
					serviceId: ["", [Validators.required]],
					noteId: ["", [Validators.required]],
				});
				break;
		}
		return formItem;
	}
	fillFormWithData(datasource: any) {
		datasource.details.forEach(() => this.handleNewDetail());
		this.orderForm.patchValue(datasource);
	}
	get OrderDetails(): FormArray {
		return this.orderForm.get("details") as FormArray;
	}
	getSingle = (id: number) => this._order.getOne(id).subscribe((data) => (this.formDatasource = data));
	// getAllDetails = () => this._details.getAll().subscribe({next: (data) => (this.DetailsDataSource = data)});
	// getAllTransactions = () => this._transactions.getAll().subscribe({next: (data) => (this.TransactionsDataSource = data)});
	back = () => this.router.navigate(["orders"]);
	handleNewDetail = () => this.OrderDetails.push(this.createFormItem("detail"));
	handleDeleteDetail = (index: number) => this.OrderDetails.removeAt(index);
	handleSubmit() {
		if (this.orderForm.valid) {
			if (this.id) this._order.update(this.id, this.orderForm.value).subscribe(() => this.back());
			else this._order.add(this.orderForm.value).subscribe(() => this.back());
		}
	}
}
