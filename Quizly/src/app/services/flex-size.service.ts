import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


export enum WindowSize {
  xs,
  sm,
  md,
  lg,
  xl
}

@Injectable({
  providedIn: 'root'
})
export class FlexSizeService {
  winSize: BehaviorSubject<WindowSize> = new BehaviorSubject(0);
  constructor() {}

  sizeSubscription(): Observable<WindowSize> { return this.winSize.asObservable(); }

  size(): WindowSize { return this.winSize.getValue(); }

  adaptSize(ev: any, width?: number): void {
    const innerWidth = ev ? ev.target.innerWidth : width;

    if (innerWidth <= 575) {
      this.winSize.next(WindowSize.xs);
      return;
    }
    if (innerWidth <= 767) {
      this.winSize.next(WindowSize.sm);
      return;
    }
    if (innerWidth <= 991) {
      this.winSize.next(WindowSize.md);
      return;
    }
    if (innerWidth <= 1199) {
      this.winSize.next(WindowSize.lg);
      return;
    }
    this.winSize.next(WindowSize.xl);
  }
}
