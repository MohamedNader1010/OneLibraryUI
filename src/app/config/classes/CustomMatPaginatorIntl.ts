import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = '';
  override nextPageLabel = 'الصفحة التالية';
  override previousPageLabel = 'الصحفة السابقة';
  override firstPageLabel = 'الصفحة الاولي';
  override lastPageLabel = 'الصفحة الاخيرة';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `لا يوجد بيانات`;
    }
    const startIndex = page * pageSize;
    return `${startIndex + 1} - ${length}`;
  };
}
