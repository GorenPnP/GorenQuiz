import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';
import { WindowSize, FlexSizeService } from 'src/app/services/flex-size.service';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { IonBadge } from '@ionic/angular';
import { ApiQuizService } from 'src/app/services/api-quiz.service';
import { ApiResultsService } from 'src/app/services/api-results.service';

// Initialize Cloud Functions through Firebase


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

  openQuiz: number = 0;
  openResults: number = 0;

  @ViewChild(IonBadge) openQuestionsBadge: IonBadge;

  constructor(private flexSizeService: FlexSizeService,
              private router: Router,
              private apiQuiz: ApiQuizService,
              private apiResults: ApiResultsService) {

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

    // get current open nums
    this.apiQuiz.getOpenQuestions().then(open => this.openQuiz = open);
    this.apiResults.getOpenCorrections().then(open => this.openResults = open);

    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => (this.win = size));
  }
}
