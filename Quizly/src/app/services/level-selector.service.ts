import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const numFilter = 4;

@Injectable({
  providedIn: 'root'
})
export class LevelSelectorService {

  sectionFilter = [];
  sectionOptions: any[] = [];

  changedValues: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    const defaultOption = [{ val: 'f', name: 'Fach' }, { val: 't', name: 'Thema' },
                           { val: 'k', name: 'Klasse' }, {val: 'b', name: 'Bundle' }];
    for (let i = 0; i < numFilter; i++) {
      this.sectionOptions[i] = defaultOption;
      this.sectionFilter[i] = null;
    }
  }

  changedSubscription(): Observable<any> {
    return this.changedValues.asObservable();
  }

  getFilterAndOptions(): any[] {
    return [this.sectionFilter, this.sectionOptions];
  }

  changedSelect(level: number) {

    this.sectionFilter.forEach((value: string, index: number) => {
      // sectionFilter would not adapt changes of its vals, so change them manually
      if (this.sectionFilter.slice(0, index).indexOf(value) !== -1 || (index > 0 && this.sectionFilter[index - 1] === null)) {
        this.sectionFilter[index] = null;
      }
    });


    // get levels with lower priority than the changed one
    this.sectionOptions.forEach((option: any[], index: number) => {
      if (index + 1 > level) {

        if (this.sectionFilter[index - 1] === null) {
          this.sectionOptions[index] = this.sectionOptions[index - 1];
          return;
        }

        // set new array for an option with all those values uncovered by previous options (with a smaller index)
        option = this.sectionOptions[0].filter(section => {
          return this.sectionFilter.slice(0, index).indexOf(section.val) === -1;
        });

        // special case for last selector:
        // if topic and grade are chosen and only subject remains as choice, there is no point in sorting with this 3rd information.
        // else: if both filters before are set, set this last one with the remaining choice
        if (option.length === 1) { this.sectionFilter[index] = option[0].val; }

        // sectionOptions does not adapt changes, set them here manually
        this.sectionOptions[index] = option;
      }
    });

    this.updateCategories();
  }

  updateCategories() {
    this.changedValues.next(null);

    // TODO do something with this.sectionFilter, send to backend and retrieve changed data, or order locally, if possible
    // if all 3 null => one field with 'checkbox | alle | curr P./max P. open_Questions'
  }
}
