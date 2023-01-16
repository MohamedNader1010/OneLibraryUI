import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { ServicesTypeService } from 'src/Modules/serviceType/services/serviceType.service';
import { ServicePricePerClientTypeService } from '../../API_Services/service-price-per-client-type.service';

import { ServicePricePerClientType } from './../../Interfaces/ServicePricePerClientType';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private _sp: ServicePricePerClientTypeService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.tableColumns = of(this.columns).pipe();
    this.getAll();
  }

  subscriptions: Subscription[] = [];
  tableColumns = new Observable();
  tableData = new BehaviorSubject([]);
  columns = [
    {
      columnDef: "Id",
      header: "Id",
      cell: (element: ServicePricePerClientType) => `${element.id}`,
    },
    {
      columnDef: "Price",
      header: "Price",
      cell: (element: ServicePricePerClientType) => `${element.price}`,
    },
    {
      columnDef: "Service Name",
      header: "Service Name",
      cell: (element: ServicePricePerClientType) => `${element.serviceName}`,
    },
    {
      columnDef: "Client Type",
      header: "CLient Type",
      cell: (element: ServicePricePerClientType) => `${element.clientType}`,
    },
  ];

  getAll = () => this.subscriptions.push(this._sp.getAll().subscribe((data: any) => this.tableData.next(data)));
  
  handleDelete = (id: number) => 
      this.subscriptions
          .push(
              this._sp.delete(id).subscribe(() => this.getAll()),
              );

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
