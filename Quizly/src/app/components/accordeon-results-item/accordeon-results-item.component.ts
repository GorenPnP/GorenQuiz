import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SolutionListEntry } from 'src/app/members/results/index/index.page';

@Component({
  selector: 'accordeon-results-item',
  templateUrl: './accordeon-results-item.component.html',
  styleUrls: ['./accordeon-results-item.component.scss'],
})
export class AccordeonResultsItemComponent {

  @Input() item: SolutionListEntry;
  @Input() class: string = '';

  @Output() cClick = new EventEmitter<string>();

  constructor() { }

  emitClick() { this.cClick.emit('click'); }
}
