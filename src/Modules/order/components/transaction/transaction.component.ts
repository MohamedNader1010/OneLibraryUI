import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Order } from "../../interfaces/Iorder";
import { OrderService } from "../../services/orders.service";
import { ValidatePaid } from "../validators/customValidator";
@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  Form!: FormGroup;
  id!: number;
  controllerName: string = "orders";
  orderDetails!: Order;

  get f() {
    return this.Form.controls;
  }

  constructor(
    private _order: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params) => {
        this.id = params["id"];
      })
    );

    this.Form = this.createFormItems();
    this.f["orderId"].setValue(this.id);
  }
  ngOnInit(): void {}

  back = () => this.router.navigate([this.controllerName]);

  handleSubmit() {
    if (this.Form.valid) {
      if (this.id)
        this.subscriptions.push(
          this._order
            .addOrderTransaction(this.Form.value)
            .subscribe(() => this.back())
        );
    }
  }

  private createFormItems(): FormGroup {
    return this.fb.group({
      orderId: ["", [Validators.required]],
      date: ["", [Validators.required]],
      paid: ["", [Validators.required], [ValidatePaid(this._order, this.id)]],
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
