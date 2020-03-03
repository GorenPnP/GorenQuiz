import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'accordeon-quiz-item',
  templateUrl: './accordeon-quiz-item.component.html',
  styleUrls: ['./accordeon-quiz-item.component.scss'],
})
export class AccordeonQuizItemComponent {

  @Input() item: any;
  @Input() class: string = '';
  @Input() hide: boolean = false;

  @Output() cClick = new EventEmitter<string>();
  @Output() cChange = new EventEmitter<string>();

  constructor() { }

  emitClick() { this.cClick.emit('toggled expanded'); }
  emitChanged() { this.cChange.emit('changed chosen'); }
}
