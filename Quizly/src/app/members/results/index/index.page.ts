import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlexSizeService, WindowSize } from 'src/app/services/flex-size.service';
import { Platform } from '@ionic/angular';
import { LevelSelectorService } from 'src/app/services/level-selector.service';

export interface SolutionListEntry {
  title: string;
  id?: number;
  currScore: number;
  maxScore: number;
  openQuestions: number;
  children: SolutionListEntry[];

  expanded: boolean;
}

@Component({
  selector: "app-index",
  templateUrl: "./index.page.html",
  styleUrls: ["./index.page.scss"]
})
export class IndexPage implements OnInit {
  headerExpanded = false;
  WindowSize = WindowSize; // to use enum in template
  winSize: WindowSize;

  chosenQuestions = 0;
  sectionFilter;

  sectionOptions;
  sectionOptions2nd;
  sectionOptions3rd;

  // TODO this is dummy content. Replace later with API data
  totalPoints: number = 10000;
  openQuestionPoints: number = 77;
  maxOpenQuestionPoints: number = 128;
  data: SolutionListEntry[] = [
    {
      title: "Geschichte",
      currScore: 14,
      maxScore: 27,
      openQuestions: 4,
      expanded: false,
      children: [
        {
          title: "Der weiße Garten",
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          children: [
            {
              title: "Klasse 3",
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              children: [
                {
                  title: "1-1-1",
                  id: 1,
                  currScore: 4,
                  maxScore: 12,
                  openQuestions: null,
                  expanded: false,
                  children: []
                }
              ]
            },
            {
              title: "Klasse 4",
              currScore: 3,
              maxScore: 15,
              openQuestions: null,
              expanded: false,
              children: [
                {
                  title: "1-1-2",
                  id: 2,
                  currScore: 3,
                  maxScore: 15,
                  openQuestions: null,
                  expanded: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          title: "Der weiße Garten II",
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          children: [
            {
              title: "Klasse 3",
              currScore: 4,
              maxScore: 12,
              openQuestions: null,
              expanded: false,
              children: [
                {
                  title: "1-1-3",
                  id: 3,
                  currScore: 4,
                  maxScore: 12,
                  openQuestions: null,
                  expanded: false,
                  children: []
                }
              ]
            },
            {
              title: "Klasse 4",
              currScore: 3,
              maxScore: 15,
              openQuestions: null,
              expanded: false,
              children: [
                {
                  title: "1-1-4",
                  id: 4,
                  currScore: 3,
                  maxScore: 15,
                  openQuestions: null,
                  expanded: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Zauberkunst",
      currScore: 53,
      maxScore: 53,
      openQuestions: 10,
      expanded: false,
      children: [
        {
          title: "Mana",
          currScore: 53,
          maxScore: 53,
          openQuestions: 10,
          expanded: false,
          children: [
            {
              title: "Klasse 10",
              currScore: 53,
              maxScore: 53,
              openQuestions: null,
              expanded: false,
              children: [
                {
                  title: "1-1-5",
                  id: 5,
                  currScore: 53,
                  maxScore: 53,
                  openQuestions: null,
                  expanded: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];

//  data: SolutionListEntry[] = [];

  constructor(
    private authService: AuthService,
    private flexSizeService: FlexSizeService,
    private levelSelector: LevelSelectorService,
    private platform: Platform
  ) {}

  ngOnInit() {
    // get initial window size
    this.platform.ready().then(_ => {
      this.windowSizeOnResize(null, this.platform.width());

      this.flexSizeService
        .sizeSubscription()
        .subscribe(size => (this.winSize = size));

      this.levelSelector.changedSubscription().subscribe(_ => {
        const data = this.levelSelector.getFilterAndOptions();

        this.sectionFilter = data[0];
        this.sectionOptions = data[1];
        this.sectionOptions2nd = data[2];
        this.sectionOptions3rd = data[3];
      });
    });

    // TODO get initial this.sectionFilter from (local) db, then this.updateCategories() to retrieve accordion list
    this.levelSelector.updateCategories();
  }

  toggleExpanded1st(i: number) {
    this.data[i].expanded = !this.data[i].expanded;

    this.data
      .filter((_, itemIndex) => itemIndex !== i)
      .map(item => {
        item.expanded = false;
        item.children.map(child => {
          child.expanded = false;
          child.children.map(grandchild => (grandchild.expanded = false));
        });
      });
  }

  toggleExpanded2nd(i: number, j: number) {
    this.data[i].children[j].expanded = !this.data[i].children[j].expanded;

    this.data[i].children
      .filter((_, itemIndex) => itemIndex !== j)
      .map(item => (item.expanded = false));
  }

  toggleExpanded3rd(i: number, j: number, k: number) {
    this.data[i].children[j].children[k].expanded = !this.data[i].children[j]
      .children[k].expanded;

    this.data[i].children[j].children
      .filter((_, itemIndex) => itemIndex !== k)
      .map(item => (item.expanded = false));
  }

  changedSelect(level: number) {
    switch (level) {
      case 1:
        this.levelSelector.changed1stSelect();
        break;
      case 2:
        this.levelSelector.changed2ndSelect();
        break;
      case 3:
        this.levelSelector.changed3rdSelect();
        break;
      default:
    }
  }

  windowSizeOnResize(ev: any, width?: number) {
    this.flexSizeService.adaptSize(ev, width);
  }

  logout() {
    this.authService.logout();
  }
}
