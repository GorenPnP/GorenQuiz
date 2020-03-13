import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { File } from 'src/app/interfaces/DetailQuestion';

export interface SortedByMimeType {
  image: File[];
  audio: File[];
  video: File[];
  inBrowser: File[];
  other: File[];
}


@Component({
  selector: 'file-items',
  templateUrl: './file-items.component.html',
  styleUrls: ['./file-items.component.scss'],
})
export class FileItemsComponent implements OnInit {

  @Input() byMime: SortedByMimeType = null;
  @Input() deletable: boolean = false;
  @Input() sliderConfig;

  @Output() openFile: EventEmitter<string> = new EventEmitter();
  @Output() deleteFile: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  open(path: string) { this.openFile.emit(path); }
  delete(path: string) { this.deleteFile.emit(path); }
}
