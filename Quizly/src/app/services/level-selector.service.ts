import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelSelectorService {

  sectionFilter = [null, null, null];

  sectionOptions = [
    { val: 'f', name: 'Fach' },
    { val: 't', name: 'Thema' },
    { val: 'k', name: 'Klasse' }
  ];
  sectionOptions2nd = JSON.parse(JSON.stringify(this.sectionOptions)); // deep copy
  sectionOptions3rd = JSON.parse(JSON.stringify(this.sectionOptions)); // deep copy

  changedValues: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  changedSubscription(): Observable<any> {
    return this.changedValues.asObservable();
  }

  getFilterAndOptions() {
    return [this.sectionFilter, this.sectionOptions, this.sectionOptions2nd, this.sectionOptions3rd];
  }

  changed1stSelect() {
    this.sectionOptions2nd = this.sectionOptions.filter(
      section => section.val !== this.sectionFilter[0]
    );
    this.sectionOptions3rd = this.sectionOptions.filter(
      section =>
        section.val !== this.sectionFilter[0] &&
        section.val !== this.sectionFilter[1]
    );

    if (this.sectionFilter[0] === this.sectionFilter[1]) {
      this.sectionFilter[1] = null;
    }
    if (this.sectionFilter[0] === this.sectionFilter[2]) {
      this.sectionFilter[2] = null;
    }

    // special case for last selector:
    // if topic and grade are chosen and only subject remains as choice, there is no point in sorting with this 3rd information.
    // else: if both filters before are set, set this last one with the remaining choice
    if (this.sectionOptions3rd.length === 1) {
      if (this.sectionOptions3rd[0].val === 'f') {
        this.sectionOptions3rd = [];
      }
      this.sectionFilter[2] = this.sectionOptions3rd.length
        ? this.sectionOptions3rd[0].val
        : null;
    }

    this.updateCategories();
  }

  changed2ndSelect() {
    this.sectionOptions3rd = this.sectionOptions2nd.filter(
      section => section.val !== this.sectionFilter[1]
    );
    if (this.sectionFilter[1] === this.sectionFilter[2]) {
      this.sectionFilter[2] = null;
    }

    // special case for last selector:
    // if topic and grade are chosen and only subject remains as choice, there is no point in sorting with this 3rd information.
    // else: if both filters before are set, set this last one with the remaining choice
    if (this.sectionOptions3rd.length === 1) {
      if (this.sectionOptions3rd[0].val === 'f') {
        this.sectionOptions3rd = [];
      }
      this.sectionFilter[2] = this.sectionOptions3rd.length
        ? this.sectionOptions3rd[0].val
        : null;
    }

    this.updateCategories();
  }

  changed3rdSelect() {
    this.updateCategories();
  }

  updateCategories() {
    this.changedValues.next(null);

    // TODO do something with this.sectionFilter, send to backend and retrieve changed data, or order locally, if possible
    // if all 3 null => one field with 'checkbox | alle | curr P./max P. open_Questions'
  }
}
