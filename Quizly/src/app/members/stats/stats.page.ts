import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


export interface stat {
  label: string;
  value: number;
  buffer: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  sectionFilter = null;
  sectionOptions = [{val: 'f', name:'Fach'}, {val: 't', name: 'Thema'}, {val: 'k', name: 'Klasse'}, {val: 'b', name: 'Bundle'}];

  stats: stat[] = [
    {
      label: "Punkte",
      value: 0.128,
      buffer: 0.5
    },
    {
      label: "Geschichte",
      value: 0.7,
      buffer: 0.8
    },
    {
      label: "Erdkunde",
      value: 0.8,
      buffer: 0
    },
    {
      label: "Punkte",
      value: 0.128,
      buffer: 0.5
    },
    {
      label: "Geschichte",
      value: 0.7,
      buffer: 0.8
    },
    {
      label: "Erdkunde",
      value: 0.8,
      buffer: 0
    },
    {
      label: "Punkte",
      value: 0.128,
      buffer: 0.5
    },
    {
      label: "Geschichte",
      value: 0.7,
      buffer: 0.8
    },
    {
      label: "Erdkunde",
      value: 0.8,
      buffer: 0
    },
    {
      label: "Punkte",
      value: 0.128,
      buffer: 0.5
    },
    {
      label: "Geschichte",
      value: 0.7,
      buffer: 0.8
    },
    {
      label: "Erdkunde",
      value: 0.8,
      buffer: 0
    },
    {
      label: "Punkte",
      value: 0.128,
      buffer: 0.5
    },
    {
      label: "Geschichte",
      value: 0.7,
      buffer: 0.8
    },
    {
      label: "Erdkunde",
      value: 0.8,
      buffer: 0
    },
  ];

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  changedSelect() {}

  windowSizeOnResize(ev) {

  }

  logout() {
    this.authService.logout();
  }
}
