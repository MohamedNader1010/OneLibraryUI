import { Directive, Output, EventEmitter, HostListener, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  el = inject(ElementRef);
  renderer = inject(Renderer2);

  @Output() fileDropped = new EventEmitter<any>();
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    let icon = this.el.nativeElement.children[1];
    this.renderer.addClass(icon, 'fileover');
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    let icon = this.el.nativeElement.children[1];
    this.renderer.removeClass(icon, 'fileover');
  }
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    let icon = this.el.nativeElement.children[1];
    this.renderer.removeClass(icon, 'fileover');
    let file = evt.dataTransfer.files[0];
    if (file) this.fileDropped.emit(file);
  }
}
