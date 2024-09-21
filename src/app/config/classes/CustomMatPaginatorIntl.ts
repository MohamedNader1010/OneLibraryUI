import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = '';
  override nextPageLabel = 'الصفحة التالية';
  override previousPageLabel = 'الصحفة السابقة';
  override firstPageLabel = 'الصفحة الاولي';
  override lastPageLabel = 'الصفحة الاخيرة';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex}`;
  };
}
