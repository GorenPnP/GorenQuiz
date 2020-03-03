import { Component, OnInit, Input } from '@angular/core';
import { stat } from '../../members/stats/stats.page';

@Component({
  selector: 'stat-item',
  templateUrl: './stat-item.component.html',
  styleUrls: ['./stat-item.component.scss'],
})
export class StatItemComponent implements OnInit {

  @Input() item: stat = null;

  constructor() { }

  ngOnInit() {}

}
