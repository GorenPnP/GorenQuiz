import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiStatsService {

  constructor() { }

  points() {
    console.log("will get points")
  }

  getStats() {
    console.log("will get stats")
  }
}
