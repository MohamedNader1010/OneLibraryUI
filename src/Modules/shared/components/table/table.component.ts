import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MaterialService } from "src/Modules/material/services/material.service";
import { Service } from "src/Modules/service/interfaces/Iservice";
import { ServicesService } from "src/Modules/service/services/services.service";
import { ServicesTypeService } from "src/Modules/serviceType/services/serviceType.service";
import { DialogComponent } from "src/Modules/shared/components/dialog/dialog.component";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild(MatTable) servicesTable!: MatTable<any>;
  MaterialDataSource: any[] = [];
  ServiceTypeDataSource: any[] = [];

  constructor(
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private _material: MaterialService,
    private _serviceType: ServicesTypeService,
    private _service: ServicesService,
    public dialog: MatDialog
  ) { }

  columns = [
    {
      columnDef: "id",
      header: "id",
      cell: (element: Service) => `${element.id}`,
    },
    {
      columnDef: "Name",
      header: "Name",
      cell: (element: Service) => `${element.name}`,
    },
    {
      columnDef: "Material",
      header: "Material",
      cell: (element: Service) => this.MaterialDataSource.find((x) => x.id == element.materialId)?.Name,
    },
    {
      columnDef: "Type",
      header: "Type",
      cell: (element: Service) => this.ServiceTypeDataSource.find((x) => x.id == element.serivceTypeId)?.Name,
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Service> = new MatTableDataSource<Service>([]);

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllServicesTypes();
    this.getAll();
  }

  getAll() {
    this._service.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      // error: (e) => console.log(e),
    });
  }

  getAllMaterials = () => this._material.getAll().subscribe({ next: (data) => (this.MaterialDataSource = data) });

  getAllServicesTypes = () => this._serviceType.getAll().subscribe({ next: (data) => (this.ServiceTypeDataSource = data) });

  dcols = this.columns.map((c) => c.columnDef);

  displayedColumns = [...this.dcols, "actions"];

  announceSortChange = (sortState: Sort) => (sortState.direction ? this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`) : this._liveAnnouncer.announce("Sorting cleared"));

  applyFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  };

  HandleNew = () => this._router.navigate(["services/new"]);

  handleEdit = (row: Service) => this._router.navigate(["services/edit"], { queryParams: { id: row.id } });

  handleDelete = (row: Service) => {
    this.dialog
      .open(DialogComponent, { data: { location: "welder", msg: `are you sure you want to delete "${row.name}"?` } })
      .afterClosed()
      .subscribe((result) => {
        if (result) this._service.delete(row.id).subscribe({ complete: () => this.getAll() });
      });
  };

}
