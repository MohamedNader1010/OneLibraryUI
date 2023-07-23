import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef, ViewChildren, QueryList } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subscription, fromEvent } from "rxjs";
import { FormDialogNames } from "src/Persistents/enums/forms-name";
import { FormHelpers } from "../../classes/form-helpers";
import { TableDataSource } from "../../classes/tableDataSource";
import { ComponentsName } from "src/Persistents/enums/components.name";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import * as signalR from '@microsoft/signalr';
import { Order } from 'src/Modules/order/interfaces/Iorder';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkDetailRowDirective } from '../../directives/cdk-detail-row.directive';
import { Response } from "../../interfaces/Iresponse";

const detailExpandAnimation = trigger('detailExpand', [
  state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
  state('*', style({ height: '*', visibility: 'visible' })),
  transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]);
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [detailExpandAnimation],
})
export class TableComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	displayedColumns!: string[];
	dataSource!: TableDataSource;
	activeSortColumn: string = "id";
	connection!: signalR.HubConnection;
  PAGE_SIZE_OPTIONS = [25, 50, 100];
  filteredDataLength = 0;

  @Output() OnDelete = new EventEmitter<any>();
  @Output() OnView = new EventEmitter<any>();
  @Output() onClose = new EventEmitter();
  @Output() onNew = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onTransaction = new EventEmitter<any>();

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

	@Input() database: any;
	@Input() loading: any;
	@Input() tableColumns: any;
	@Input() canAdd: boolean = true;
	@Input() toggleShift: boolean = false;
	@Input() canEdit: boolean = true;
	@Input() canDelete: boolean = false;
	@Input() canView: boolean = false;
	@Input() hasTransaction: boolean = false;
  @Input() canNavigateToDetails: boolean = false;
  @Input() canExpand: boolean = false;
	@Input() formName!: FormDialogNames;
	@Input() componentName!: ComponentsName;

  @ViewChildren(CdkDetailRowDirective)
  detailRowDirectives!: QueryList<CdkDetailRowDirective>;

	constructor(public dialog: MatDialog,private router: Router, private activatedRoute: ActivatedRoute) {}
	ngOnInit(): void {
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), "actions"];
		this.loadData();
    if(this.componentName == ComponentsName.order)
      this.connectToOrderHub();
  }


  connectToOrderHub(){
		this.connection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.host}OrderHub`)
    .withAutomaticReconnect()
    .build();
		this.connection.start().then(()=>console.log("connected")).catch((err) => console.log(err));

		this.connection.on("add", (res : Order) => {
      this.database.dataChange.value.push(res);
      this.onNew.emit(`تم تسجيل اوردر جديد بواسطة ${res.createdBy}`);
      this.refreshTable();
    });
	}

	setActiveSortColumn(column: string): void {
		this.activeSortColumn = column;
	}

	clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = "");

  isRowExpanded(rowId: string): boolean {
    if(this.detailRowDirectives) {
      const isExists = this.detailRowDirectives.find((x) =>
      x.isRowExpanded(rowId)
    );
    return isExists ? true : false;
    }
    return false;
  }

  collapseAllRows() {
    this.detailRowDirectives.forEach(x => x.collapseAllRows())
  }

  public loadData() {
		this.dataSource = new TableDataSource(this.database, this.paginator, this.sort);
    this.dataSource.filteredDataLength$.subscribe((length) => this.filteredDataLength = length);
    this.subscriptions.push(
      fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
        if (!this.dataSource) return;
        this.dataSource.filter = this.filter.nativeElement.value;
        this.dataSource.filteredDataLength$.subscribe((length) => this.filteredDataLength = length);
      })
    );
  }

  async HandleNew() {
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(
      this.formName
    );
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      minWidth: '30%',
    });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          if(result?.data){
            if(this.componentName == ComponentsName.order){
              let newOrder: Order = (result.data as Response).body;
              let lastOrder: Order = this.database.dataChange.value[this.database.dataChange.value.length -1];
              if(lastOrder.id != newOrder.id){
                this.onNew.emit(result.data.message);
              }
            }
            else{
              this.onNew.emit(result.data.message);
            }
          }
        },
        complete: () => this.refreshTable(),
      })
    );
  }
  async handleEdit(row: any, $event: any) {
    $event.stopPropagation();
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(
      this.formName
    );
    const dialogRef = this.dialog.open<any>(dialogComponent, { data: row });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          if (result?.data) this.onEdit.emit(result.data);
        },
        complete: () => this.refreshTable(),
      })
    );
  }

  async handleDelete(row: any, $event: any) {
    $event.stopPropagation();
    const deleteDialogComponent = await FormHelpers.getDeleteDialogComponent();
    const dialogRef = this.dialog.open<DeleteDialogComponent>(
      deleteDialogComponent,
      { data: { row: row, componentName: this.componentName }, minWidth: '30%' }
    );
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.data) {
          result.data.body = row;
          this.OnDelete.emit(result.data);
          this.refreshTable();
        }
      })
    );
  }

  async handleTransaction(row: any, $event: any) {
    $event.stopPropagation();
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(
      FormDialogNames.orderTransactionFormDialogComponent
    );
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe({
        next: (result) => {
          if (result?.data) this.onTransaction.emit(result.data);
        },
        complete: () => this.refreshTable(),
      })
    );
  }

  async handleView(row: any, $event: any) {
    $event.stopPropagation();
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(
      FormDialogNames.orderDetailsDialogComponent
    );
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      data: row,
      minWidth: '30%',
    });
  }

  navigate(row: any, $event: any) {
    $event.stopPropagation();
    this.router.navigate(["details",row.id], { relativeTo: this.activatedRoute });
  }

  handleViewPdf = (row: any, $event: any) => {
    $event.stopPropagation();
    const filePath = row.filePath;
    const uploadsIndex = filePath.indexOf('uploads');
    if (uploadsIndex !== -1) {
      const trimmedPath = filePath.substring(uploadsIndex);
      window.open(`${environment.host}${trimmedPath}`, '_blank');
    }
  };

  private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);

  ngOnDestroy = () => {
    this.subscriptions.forEach((s) => s.unsubscribe());
  };
}
