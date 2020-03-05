import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { WindowSize, FlexSizeService } from 'src/app/services/flex-size.service';
import { Router } from '@angular/router';

export interface AccordeonConfig {
  linkOnLast: boolean;
  choosable: boolean;
  hideOnXS: boolean;
  markChosenChildren: boolean;
  markCorrectAnswer: boolean;
}

@Component({
  selector: 'accordeon-item',
  templateUrl: './accordeon-item.component.html',
  styleUrls: ['./accordeon-item.component.scss'],
})
export class AccordeonItemComponent implements OnInit {

  @Input() config: AccordeonConfig =
  {
    linkOnLast: false,
    choosable: false,
    hideOnXS: false,
    markChosenChildren: false,
    markCorrectAnswer: false,
  };

  win: WindowSize = 0;
  WindowSize = WindowSize;

  @Input() item: any;
  @Input() class: string = '';

  @Output() cClick = new EventEmitter<string>();
  @Output() cChange = new EventEmitter<string>();

  constructor(private router: Router,
              private flexSizeService: FlexSizeService) { }

  ngOnInit() {
    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => (this.win = size));
  }

  navigateTo(questionId: number) {
    if (!this.config.linkOnLast) { return; }
    this.router.navigate(['/results/detail', questionId]);
  }

  emitClick() { this.cClick.emit('toggled expanded'); }
  emitChanged() { this.cChange.emit('changed chosen'); }
}
