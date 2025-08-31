import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isBarcode' })
export class BarcodePipe implements PipeTransform {
    transform(columnDef: string): boolean {
        return columnDef?.toLowerCase().includes('barcode');
    }
}
