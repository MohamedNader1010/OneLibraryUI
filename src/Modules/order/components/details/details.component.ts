import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {Order} from "../../interfaces/Iorder";
import {OrderService} from "../../services/orders.service";
@Component({
	selector: "app-details",
	templateUrl: "./details.component.html",
	styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = "orders";
	orderDetails!: Order;
	constructor(private _order: OrderService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder) {
		this.Form = this.createFormItem("init");
	}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params["id"])));
		// if (this.id) this.getSingle(this.id);
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
	getSingle = (id: number) => this.subscriptions.push(this._order.getOne(id).subscribe((data) => (this.orderDetails = data)));
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id) this.subscriptions.push(this._order.update(this.id, this.Form.value).subscribe(() => this.back()));
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
