import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { Employee } from '../models/employee.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Employee', toastrService);
  }
}
