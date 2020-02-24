import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export interface QuizListEntry {
  title: string;
  currScore: number;
  maxScore: number;
  openQuestions: number;
  children: QuizListEntry[];

  expanded: boolean;
  chosen: boolean;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  headerExpanded = false;
  chosenQuestions = 0;
  sectionFilter = [null, null, null];

  sectionOptions = [{val: 'f', name: 'Fach'}, {val: 't', name: 'Thema'}, {val: 'k', name: 'Klasse'}];
  sectionOptions2nd = JSON.parse(JSON.stringify(this.sectionOptions));  // deep copy
  sectionOptions3rd = JSON.parse(JSON.stringify(this.sectionOptions));  // deep copy


  // TODO this is dummy content. Replace later with API data
  data: QuizListEntry[] = [
    {
      title: 'Geschichte',
      currScore: 7,
      maxScore: 27,
      openQuestions: 4,
      expanded: false,
      chosen: false,
      children: [
        {
          title: 'Der weiße Garten',
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          chosen: false,
          children: [
            {
              title: 'Klasse 3',
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              chosen: false,
              children: []
            },
            {
              title: 'Klasse 4',
              currScore: 3,
              maxScore: 15,
              openQuestions: 3,
              expanded: false,
              chosen: false,
              children: []
            }
          ]
        },
        {
          title: 'Der weiße Garten II',
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          chosen: false,
          children: [
            {
              title: 'Klasse 3',
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              chosen: false,
              children: []
            },
            {
              title: 'Klasse 4',
              currScore: 3,
              maxScore: 15,
              openQuestions: 3,
              expanded: false,
              chosen: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Zauberkunst',
      currScore: 0,
      maxScore: 53,
      openQuestions: 10,
      expanded: false,
      chosen: false,
      children: [
      {
        title: 'Mana',
        currScore: 0,
        maxScore: 53,
        openQuestions: 10,
        expanded: false,
        chosen: false,
        children: [
          {
            title: 'Klasse 10',
            currScore: 0,
            maxScore: 53,
            openQuestions: 10,
            expanded: false,
            chosen: false,
            children: []
          }
        ]
      }
    ]
  }
];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // TODO get initial this.sectionFilter from (local) db, then this.updateCategories() to retrieve accordion list
    this.updateCategories();
  }

  toggleExpanded1st(i: number) {
    this.data[i].expanded = !this.data[i].expanded;

    this.data.filter((_, itemIndex) => itemIndex !== i)
    .map(item => {
      item.expanded = false;
      item.children.map(child => {
        child.expanded = false;
        child.children.map(grandchild => grandchild.expanded = false);
      });
    });
  }

  toggleExpanded2nd(i: number, j: number) {
    this.data[i].children[j].expanded = !this.data[i].children[j].expanded;

    this.data[i].children.filter((_, itemIndex) => itemIndex !== j)
      .map(item => item.expanded = false);
  }

  changedChosen1st(i: number) {
    this.calcSelectedNum();
  }

  changedChosen2nd(i: number, j: number) {
    const parent = this.data[i];
    if (parent.children.every(child => child.chosen)) {
      parent.children.map(child => {child.chosen = false; child.expanded = false; });
      parent.chosen = true;
    }

    this.calcSelectedNum();
  }

  changedChosen3rd(i: number, j: number, k: number) {
    const parent = this.data[i].children[j];
    if (parent.children.every(child => child.chosen)) {
      parent.children.map(child => { child.chosen = false; child.expanded = false; });
      parent.chosen = true;
    }

    this.calcSelectedNum();
  }

  calcSelectedNum() {
    let sum = 0;
    this.data.filter(item => item.chosen).map(item => sum += item.openQuestions);
    this.data.filter(item => !item.chosen)
      .map(item =>
        item.children.filter(child => child.chosen)
          .map(child => sum += child.openQuestions));


    this.data.filter(item => !item.chosen)
      .map(item =>
        item.children.filter(child => !child.chosen)
          .map(child =>
            child.children.filter(grandchild => grandchild.chosen)
              .map(grandchild => sum += grandchild.openQuestions)));
    this.chosenQuestions = sum;
  }

  changed1stSelect() {
    this.sectionOptions2nd = this.sectionOptions.filter(section => section.val !== this.sectionFilter[0]);
    this.sectionOptions3rd = this.sectionOptions.filter(
      section => section.val !== this.sectionFilter[0] && section.val !== this.sectionFilter[1]);

    if (this.sectionFilter[0] === this.sectionFilter[1]) {this.sectionFilter[1] = null; }
    if (this.sectionFilter[0] === this.sectionFilter[2]) {this.sectionFilter[2] = null; }

    // special case for last selector:
    // if topic and grade are chosen and only subject remains as choice, there is no point in sorting with this 3rd information.
    console.log(this.sectionOptions3rd)
    if (this.sectionOptions3rd.length === 1 && this.sectionOptions3rd[0].val === 'f') { this.sectionOptions3rd = []; }

    this.updateCategories();
  }

  changed2ndSelect() {
    this.sectionOptions3rd = this.sectionOptions2nd.filter(section => section.val !== this.sectionFilter[1]);
    if (this.sectionFilter[1] === this.sectionFilter[2]) { this.sectionFilter[2] = null; }

    // special case for last selector:
    // if topic and grade are chosen and only subject remains as choice, there is no point in sorting with this 3rd information.
    console.log(this.sectionOptions3rd)
    if (this.sectionOptions3rd.length === 1 && this.sectionOptions3rd[0].val === 'f') { this.sectionOptions3rd = []; }

    this.updateCategories();
  }

  changed3rdSelect() {
    this.updateCategories();
  }

  private updateCategories() {
    // TODO do something with this.sectionFilter, send to backend and retrieve changed data, or order locally, if possible
    // if all 3 null => one field with "checkbox | alle | curr P./max P. open_Questions"
  }

  logout() {
    this.authService.logout();
  }
}
