import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ComponentsName } from "src/Persistents/enums/components.name";
import { FormDialogNames } from "src/Persistents/enums/forms-name";
import { NoteService } from "./services/note.service";
import { Note } from "./interfaces/Inote";
import { TableCommonFunctionality } from "../shared/classes/tableCommonFunctionality";
import { TranslateService } from "@ngx-translate/core";
import { TableDataSource } from "../shared/classes/tableDataSource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { environment } from "../../environments/environment";
import { FormHelpers } from "../shared/classes/form-helpers";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { fromEvent } from "rxjs";

@Component({
	selector: "app-note",
	templateUrl: "./note.component.html",
	styleUrls: ["./note.component.css"],
	animations: [
		trigger("detailExpand", [
			state("collapsed", style({ height: "0px", minHeight: "0" })),
			state("expanded", style({ height: "*" })),
			transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
		]),
	],
})
export class NoteComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	loading!: boolean;
	formName = FormDialogNames.NoteFormDialogComponent;
	componentName = ComponentsName.note;
	displayedColumns!: string[];
	columnsToDisplayWithExpand!: string[];
	dataSource!: TableDataSource;
	expandedElement: any;
	activeSortColumn: string = "id";

	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;
	@ViewChild("filter", { static: true }) filter!: ElementRef;

	constructor(private translate: TranslateService, public dialog: MatDialog, public override database: NoteService, public override toastr: ToastrService, public override httpClient: HttpClient) {
		super(httpClient, toastr, database);
	}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant("table.id"),
				header: this.translate.instant("table.id.label"),
				cell: (element: Note) => element.id,
			},
			{
				columnDef: "name",
				header: "الأسم",
				cell: (element: Note) => element.name,
			},
			{
				columnDef: "teacher",
				header: "المدرس",
				cell: (element: Note) => element.client,
			},
			{
				columnDef: "stage",
				header: "المرحلة",
				cell: (element: Note) => element.stage ?? "-",
			},
			{
				columnDef: "term",
				header: "الترم",
				cell: (element: Note) => element.term ?? "-",
			},
			{
				columnDef: "actualPrice",
				header: "السعر الفعلي",
				cell: (element: Note) => element.actualPrice,
			},
			{
				columnDef: "originalPrice",
				header: "سعر التكلفة",
				cell: (element: Note) => element.originalPrice,
			},
			{
				columnDef: "earning",
				header: "الربح",
				cell: (element: Note) => element.earning,
			},
			{
				columnDef: "teacherPrice",
				header: "ربح المدرس",
				cell: (element: Note) => element.teacherPrice,
			},
			{
				columnDef: "finalPrice",
				header: "السعر النهائي",
				cell: (element: Note) => element.finalPrice,
			},
			{
				columnDef: "quantity",
				header: "الكمية",
				cell: (element: Note) => element.quantity,
			},
			{
				columnDef: "pdf",
				header: "pdf",
				cell: (element: Note) => element.fileName ?? "-",
			},
		];
	}

	public loadData() {
		this.initiateTableHeaders();
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef)];
		this.columnsToDisplayWithExpand = [...this.displayedColumns, "expand"];
		this.dataSource = new TableDataSource(this.database, this.paginator, this.sort);
		this.subscriptions.push(
			fromEvent(this.filter.nativeElement, "keyup").subscribe(() => {
				if (!this.dataSource) return;
				this.dataSource.filter = this.filter.nativeElement.value;
			}),
		);
		this.database.getAllNotes();
	}

	async HandleNew($event: any) {
		$event.stopPropagation();
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
		const dialogRef = this.dialog.open<any>(dialogComponent, {
			minWidth: "30%",
		});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe({
				next: (result) => {
					if (result?.data) this.handleNewRow(result.data.message);
				},
				complete: () => this.refreshTable(),
			}),
		);
	}
	async handleEdit(row: any, $event: any) {
		$event.stopPropagation();
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
		const dialogRef = this.dialog.open<any>(dialogComponent, { data: row });
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe({
				next: (result) => {
					if (result?.data) this.handleEditRow(result.data);
				},
				complete: () => this.refreshTable(),
			}),
		);
	}

	handleViewPdf = (row: any, $event: any) => {
		$event.stopPropagation();
		const filePath = row.filePath;
		const uploadsIndex = filePath.indexOf("uploads");
		if (uploadsIndex !== -1) {
			const trimmedPath = filePath.substring(uploadsIndex);
			window.open(`${environment.host}${trimmedPath}`, "_blank");
		}
	};

	setActiveSortColumn(column: string): void {
		this.activeSortColumn = column;
	}

	private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);

	clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = "");
}
