import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { Employee } from '../interFaces/Iemployee';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Employee', toastrService);
  }
}
