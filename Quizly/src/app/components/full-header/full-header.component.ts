import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WindowSize, FlexSizeService } from 'src/app/services/flex-size.service';

export interface HeaderConfig {
  hideOnXS: boolean;
  sectionFilter: boolean;
  logout: boolean;
  totalPoints: boolean;
  relationAchievedPoints: boolean;
  chosenQuestions: boolean;
}

@Component({
  selector: 'full-header',
  templateUrl: './full-header.component.html',
  styleUrls: ['./full-header.component.scss'],
})
export class FullHeaderComponent implements OnInit {

  expanded: boolean = false;
  WindowSize = WindowSize;
  win: WindowSize = 0;

  @Input() config: HeaderConfig =
    {
      hideOnXS: false,
      sectionFilter: false,
      logout: false,
      totalPoints: false,
      relationAchievedPoints: false,
      chosenQuestions: false,
    };

  @Input() secFilter = [];
  @Input() secOptions = [];

  @Input() totalPoints: number = 0;
  @Input() openQuestionPoints: number = 0;
  @Input() maxOpenQuestionPoints: number = 0;
  @Input() chosenQuestions = 0;

  @Output() levelChange = new EventEmitter<number>();
  @Output() logout = new EventEmitter<string>();

  constructor(private flexSizeService: FlexSizeService) { }

  ngOnInit() {
    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => (this.win = size));
  }

  emitChange(level: number) { this.levelChange.emit(level); }
  emitLogout() { this.logout.emit(); }
}
