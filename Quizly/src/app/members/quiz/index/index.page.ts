import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlexSizeService, WindowSize } from 'src/app/services/flex-size.service';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { LevelSelectorService } from 'src/app/services/level-selector.service';
import { AccordeonService } from 'src/app/services/accordeon.service';
import { HeaderConfig } from '../../../components/full-header/full-header.component';
import { AccordeonConfig } from 'src/app/components/accordeon-item/accordeon-item.component';

const { Filesystem } = Plugins;



export interface QuizListEntry {
  title: string;
  currScore: number;
  maxScore: number;
  openQuestions: number;
  children: QuizListEntry[];

  expanded: boolean;
  chosen: boolean;
  childChosen: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class IndexPage implements OnInit {
  headerExpanded = false;
  WindowSize = WindowSize; // to use enum in template
  winSize: WindowSize;

  headerConfig: HeaderConfig = {
      hideOnXS: true,
      sectionFilter: true,
      logout: true,
      totalPoints: true,
      relationAchievedPoints: true,
      chosenQuestions: true,
    };

  accordeonConfig: AccordeonConfig = {
    linkOnLast: false,
    choosable: true,
    hideOnXS: true,
    markChosenChildren: true,
    markCorrectAnswer: false,
  };

  chosenQuestions = 0;

  sectionFilter;
  sectionOptions;

  // TODO this is dummy content. Replace later with API data
  totalPoints: number = 10000;
  openQuestionPoints: number = 77;
  maxOpenQuestionPoints: number = 128;
  data: QuizListEntry[] = [
    {
      title: 'Geschichte',
      currScore: 14,
      maxScore: 27,
      openQuestions: 4,
      expanded: false,
      chosen: false,
      childChosen: 0,
      children: [
        {
          title: 'Der weiße Garten',
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          chosen: false,
          childChosen: 0,
          children: [
            {
              title: 'Klasse 3',
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              chosen: false,
              childChosen: 0,
              children: [
                {
                  title: 'Der Anfang',
                  currScore: 4,
                  maxScore: 12,
                  openQuestions: 1,
                  expanded: false,
                  chosen: false,
                  childChosen: 0,
                  children: []
                },
              ]
            },
            {
              title: 'Klasse 4',
              currScore: 3,
              maxScore: 15,
              openQuestions: 3,
              expanded: false,
              chosen: false,
              childChosen: 0,
              children: [
                {
                  title: 'weiter gehts',
                  currScore: 4,
                  maxScore: 12,
                  openQuestions: 1,
                  expanded: false,
                  chosen: false,
                  childChosen: 0,
                  children: []
                },
              ]
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
          childChosen: 0,
          children: [
            {
              title: 'Klasse 3 II',
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              chosen: false,
              childChosen: 0,
              children: []
            },
            {
              title: 'Klasse 4 II',
              currScore: 3,
              maxScore: 15,
              openQuestions: 3,
              expanded: false,
              chosen: false,
              childChosen: 0,
              children: [
                {
                  title: 'über die bekannte welt hinaus',
                  currScore: 4,
                  maxScore: 12,
                  openQuestions: 1,
                  expanded: false,
                  chosen: false,
                  childChosen: 0,
                  children: []
                },
              ]
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
      childChosen: 0,
      children: [
        {
          title: 'Mana',
          currScore: 0,
          maxScore: 53,
          openQuestions: 10,
          expanded: false,
          chosen: false,
          childChosen: 0,
          children: [
            {
              title: 'Klasse 10',
              currScore: 0,
              maxScore: 53,
              openQuestions: 10,
              expanded: false,
              chosen: false,
              childChosen: 0,
              children: [
                {
                  title: 'ganz schön weit',
                  currScore: 4,
                  maxScore: 12,
                  openQuestions: 1,
                  expanded: false,
                  chosen: false,
                  childChosen: 0,
                  children: []
                },
              ]
            }
          ]
        }
      ]
    }
  ];
// data: QuizListEntry[] = [];

  constructor(
    private authService: AuthService,
    private flexSizeService: FlexSizeService,
    private levelSelector: LevelSelectorService,
    private accordeon: AccordeonService) {}

  ngOnInit() {
    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => (this.winSize = size));

    this.levelSelector.changedSubscription().subscribe(_ => {

      [this.sectionFilter, this.sectionOptions]
        = this.levelSelector.getFilterAndOptions();
    });

    // get initial this.sectionFilter from (local) db, then this.updateCategories() to retrieve accordion list
    this.levelSelector.updateCategories(true);
  }

  changedSelect(level: number) {
    this.levelSelector.changedSelect(level, true);
  }

  toggleExpanded(...indices: number[]) {
    const index: number = indices.pop();
    let parent: any = null;
    indices.forEach(i => { parent = parent === null ? this.data[i] : parent.children[i]; });

    // service works on this.data directly (shallow copy with parent instance)
    this.accordeon.toggleExpanded(parent === null ? this.data : parent.children, index);
  }

  changedChosen(...indices: number[]) {

    indices.pop();
    let parent: any = null;
    indices.forEach(index => { parent = parent === null ? this.data[index] : parent.children[index]; });

    // service works on this.data directly (shallow copy with parent instance)
    this.accordeon.changedChosen(parent);
    this.chosenQuestions = this.accordeon.calcSelectedNum(this.data, true);
  }

  logout() {
    this.authService.logout();
  }

  /** testing file manipulation */
  dir = FilesystemDirectory.Cache;
  path = 'secrets/text.txt';

  async testing() {
    await this.readdir();
    await this.fileAppend();
    await this.readdir();
    await this.fileRead();
  }

  async readdir() {
    Filesystem.readdir({
      path: '',
      directory: this.dir
    })
      .then(data => console.log(data))
      .catch(e => console.error('Unable to read dir', e));
  }

  async fileAppend() {
    await Filesystem.appendFile({
      path: this.path,
      data: 'MORE TESTS',
      directory: this.dir,
      encoding: FilesystemEncoding.UTF8
    });
  }

  async fileRead() {
    const contents = await Filesystem.readFile({
      path: this.path,
      directory: this.dir,
      encoding: FilesystemEncoding.UTF8
    }).catch(e => {
      console.log(e);
    });
    console.log(contents);
  }
}
