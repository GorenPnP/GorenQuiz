import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';
import { WindowSize, FlexSizeService } from 'src/app/services/flex-size.service';
import { Platform } from '@ionic/angular';

enum TabNames { quiz, results, stats }

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  TabNames = TabNames;
  selectedTab = 0;

  WindowSize = WindowSize;
  win: WindowSize = 0;

  openQuiz: number = 9;
  openResults: number = 2;

  constructor(private flexSizeService: FlexSizeService,
              private platform: Platform,
              private router: Router) {

    this.router.events.subscribe((event: RouterEvent) => {

      if (event && Object.keys(event).indexOf('url') !== -1) {
        if ( event.url.endsWith('results/index') ) { this.selectedTab = TabNames.results; }
        else { if (event.url.endsWith('stats')) { this.selectedTab = TabNames.stats; }
               else { this.selectedTab = TabNames.quiz; }
        }
      }
    });
  }

  ngOnInit() {

    // get initial window size
    this.platform.ready().then(_ => {
      this.windowSizeOnResize(null, this.platform.width());
    });

    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => (this.win = size));
  }

  windowSizeOnResize(ev: any, width?: number) {
    this.flexSizeService.adaptSize(ev, width);
  }
}
