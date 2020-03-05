import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlexSizeService, WindowSize } from 'src/app/services/flex-size.service';

@Component({
  selector: 'basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.scss'],
})
export class BasicHeaderComponent implements OnInit {

  WindowSize = WindowSize;
  win: WindowSize = 0;

  @Input() currScore: number = 0;
  @Input() maxScore: number = 0;

  @Input() currQuestion: number = 0;
  @Input() maxQuestion: number = 0;

  @Output() returnHome: EventEmitter<void> = new EventEmitter();
  @Output() reportError: EventEmitter<number> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();

  constructor(private flexSizeService: FlexSizeService) { }

  ngOnInit() {
    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => this.win = size);
  }

  emitReturnHome() { this.returnHome.emit(); }
  emitReportError(id: number = 0) { this.reportError.emit(id); }
  emitLogout() { this.logout.emit(); }
}
