import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[cdkDetailRow]',
})
export class CdkDetailRowDirective {
  private _row: any;
  private _tRef!: TemplateRef<any>;
  private _rowId: string = '';
  expandedRows: string[] = [];

  @HostBinding('class.expanded')
  get expanded(): boolean {
    return this.isRowExpanded(this._rowId);
  }

  @Input()
  set cdkDetailRow(value: any) {
    if (value !== this._row) {
      this._row = value;
      this._rowId = this.getRowId();
    }
  }

  @Input('cdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this._tRef) {
      this._tRef = value;
    }
  }

  constructor(public vcRef: ViewContainerRef) {}

  @HostListener('click')
  onClick(): void {
    this.toggle();
  }

  toggle(): void {
    const rowId = this.getRowId();
    if (this.isRowExpanded(rowId)) {
      this.removeRowFromExpanded(rowId);
      this.vcRef.clear();
    } else {
      this.addRowToExpanded(rowId);
      this.render();
    }
  }
  collapseAllRows() {
    this.expandedRows = [];
    this.vcRef.clear();
  }
  private render(): void {
    this.vcRef.clear();
    if (this._tRef && this._row) {
      this.vcRef.createEmbeddedView(this._tRef, { $implicit: this._row });
    }
  }

  private getRowId(): string {
    return this._row.id;
  }

  public isRowExpanded(rowId: string): boolean {
    return this.expandedRows.includes(rowId);
  }

  private addRowToExpanded(rowId: string): void {
    this.expandedRows.push(rowId);
  }

  private removeRowFromExpanded(rowId: string): void {
    const index = this.expandedRows.indexOf(rowId);
    if (index > -1) {
      this.expandedRows.splice(index, 1);
    }
  }
}
