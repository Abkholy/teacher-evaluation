import { Directive , HostListener , Output , EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', [`$event`])
  onDrop($event) {
    $event.preventdefault();
    this.dropped.emit($event.dataTransfter.files);
    this.hovered.emit(false);
  }

  @HostListener(`dragover`, [`$event`])
  ondragover($event) {
    $event.preventdefault();
this.hovered.emit(true);
  }
}
