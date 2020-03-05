import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LevelSelectorService } from 'src/app/services/level-selector.service';
import { AccordeonService } from 'src/app/services/accordeon.service';
import { HeaderConfig } from 'src/app/components/full-header/full-header.component';
import { AccordeonConfig } from 'src/app/components/accordeon-item/accordeon-item.component';

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

  headerConfig: HeaderConfig = {
    hideOnXS: true,
    sectionFilter: true,
    logout: true,
    totalPoints: true,
    relationAchievedPoints: true,
    chosenQuestions: true,
  };

  accordeonConfig: AccordeonConfig = {
    linkOnLast: true,
    choosable: false,
    hideOnXS: true,
    markChosenChildren: false,
    markCorrectAnswer: true,
  };

  chosenQuestions = 0;

  sectionFilter;
  sectionOptions;

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
    private levelSelector: LevelSelectorService,
    private accordeon: AccordeonService,
  ) {}

  ngOnInit() {
    this.levelSelector.changedSubscription().subscribe(_ => {
      [this.sectionFilter, this.sectionOptions] = this.levelSelector.getFilterAndOptions();
    });

    // TODO get initial this.sectionFilter from (local) db, then this.updateCategories() to retrieve accordion list
    this.levelSelector.updateCategories();
  }

  toggleExpanded(...indices: number[]) {
    const index: number = indices.pop();
    let parent: any = null;
    indices.forEach(i => { parent = parent === null ? this.data[i] : parent.children[i]; });

    // service works on this.data directly (shallow copy with parent instance)
    this.accordeon.toggleExpanded(parent === null ? this.data : parent.children, index);
  }

  changedSelect(level: number) {
    this.levelSelector.changedSelect(level);
  }

  logout() {
    this.authService.logout();
  }
}
