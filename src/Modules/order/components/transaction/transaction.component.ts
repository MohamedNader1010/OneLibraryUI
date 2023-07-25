import { Component, Inject, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { OrderService } from "../../services/orders.service";
import { ValidatePaid } from "../validators/customValidator";
import { Response } from "src/Modules/shared/interfaces/Iresponse";
import { ToastrService } from "ngx-toastr";
import { Order } from "../../interfaces/Iorder";
@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"],
})
export class TransactionComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  Form!: FormGroup;
  isSubmitting: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private _order: OrderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.Form = this.fb.group({
      id: [0],
      orderId: [0, [Validators.required]],
      paid: [
       null,
        [Validators.required],
        [ValidatePaid(this._order, this.data.id)],
      ],
	  previousPaid: [data.paid],
      rest: [data.rest],

    });
    if (this.data) {
      this.orderId.setValue(this.data.id);
      this.onPaidControlChange();
    }
  }

  get id(): FormControl {
    return this.Form.get("id") as FormControl;
  }
  get orderId(): FormControl {
    return this.Form.get("orderId") as FormControl;
  }
  get paid(): FormControl {
    return this.Form.get("paid") as FormControl;
  }
  get rest(): FormControl {
    return this.Form.get("rest") as FormControl;
  }

  onPaidControlChange() {
    this.paid.valueChanges.subscribe((paidValue) => {
      this.rest.setValue(+this.data.rest - paidValue);
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      this.add();
    }
  }

  add() {
    this.subscriptions.push(
      this._order.addOrderTransaction(this.Form.value).subscribe({
        next: (res) => {
          this._order.DialogData = res.body;
          this.dialogRef.close({ data: res });
        },
        error: (e) => {
          this.isSubmitting = false;
          let res: Response = e.error ?? e;
          this.toastr.error(res.message);
        },
        complete: () => {
          this.isSubmitting = false;
        },
      })
    );
  }

  ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
