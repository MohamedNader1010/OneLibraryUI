import { Component, Input } from '@angular/core';

@Component({
    selector: 'table-barcode',
    templateUrl: './table-barcode.component.html',
    styleUrls: ['./table-barcode.component.css']
})
export class TableBarcodeComponent {
    @Input({ required: true }) value!: any;
}
