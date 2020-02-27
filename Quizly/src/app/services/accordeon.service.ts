import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccordeonService {

  constructor() { }

  toggleExpanded(allPeers: any[], index: number): void {

    allPeers.forEach((item, itemIndex) => {
      // toggle on 'index === itemIndex' and if unequal, set to false
      item.expanded = index === itemIndex && !item.expanded;

      item.children.forEach((child: any, childIndex: number) => {
        if (child.expanded) { this.toggleExpanded(item.children, childIndex); }
      });
    });
  }

  changedChosen(parent: any = null): void {
    if (parent === null) { return; }

    if (parent.children.every((child: any) => child.chosen)) {
      parent.children.map((child: any, childIndex: number) => {
        child.chosen = false;
        if (child.expanded) { this.toggleExpanded(parent, childIndex); }
      });
      parent.chosen = true;
    }
  }

  calcSelectedNum(allPeers: any[]): number {
    let sum = 0;
    allPeers.forEach((item: any) => {
      if (item.chosen) { sum += item.openQuestions; }
      else { sum += this.calcSelectedNum(item.children); }
    });
    return sum;
  }
}
