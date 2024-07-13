import { Injectable } from '@angular/core';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { Employee } from '../interFaces/Iemployee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee> {
  override controller = 'Employee';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
