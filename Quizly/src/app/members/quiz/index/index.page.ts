import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlexSizeService, WindowSize } from 'src/app/services/flex-size.service';




import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { LevelSelectorService } from 'src/app/services/level-selector.service';
import { AccordeonService } from 'src/app/services/accordeon.service';

const { Filesystem } = Plugins;



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
  data: QuizListEntry[] = [
    {
      title: "Geschichte",
      currScore: 14,
      maxScore: 27,
      openQuestions: 4,
      expanded: false,
      chosen: false,
      children: [
        {
          title: "Der weiße Garten",
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          chosen: false,
          children: [
            {
              title: "Klasse 3",
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              chosen: false,
              children: []
            },
            {
              title: "Klasse 4",
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
          title: "Der weiße Garten II",
          currScore: 7,
          maxScore: 27,
          openQuestions: 4,
          expanded: false,
          chosen: false,
          children: [
            {
              title: "Klasse 3 II",
              currScore: 4,
              maxScore: 12,
              openQuestions: 1,
              expanded: false,
              chosen: false,
              children: []
            },
            {
              title: "Klasse 4 II",
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
      title: "Zauberkunst",
      currScore: 0,
      maxScore: 53,
      openQuestions: 10,
      expanded: false,
      chosen: false,
      children: [
        {
          title: "Mana",
          currScore: 0,
          maxScore: 53,
          openQuestions: 10,
          expanded: false,
          chosen: false,
          children: [
            {
              title: "Klasse 10",
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
//data: QuizListEntry[] = [];

  constructor(
    private authService: AuthService,
    private flexSizeService: FlexSizeService,
    private levelSelector: LevelSelectorService,
    private accordeon: AccordeonService,
    private platform: Platform
  ) {}

  ngOnInit() {
    // get initial window size
    this.platform.ready().then(_ => {
      this.windowSizeOnResize(null, this.platform.width());
    });

    this.flexSizeService
      .sizeSubscription()
      .subscribe(size => (this.winSize = size));

    this.levelSelector.changedSubscription().subscribe(_ => {
      [this.sectionFilter, this.sectionOptions, this.sectionOptions2nd, this.sectionOptions3rd]
        = this.levelSelector.getFilterAndOptions();
    });

    // TODO get initial this.sectionFilter from (local) db, then this.updateCategories() to retrieve accordion list
    this.levelSelector.updateCategories();
  }

  changedSelect(level: number) {
    this.levelSelector.changedSelect(level);
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
    this.chosenQuestions = this.accordeon.calcSelectedNum(this.data);
  }


  windowSizeOnResize(ev: any, width?: number) {
    this.flexSizeService.adaptSize(ev, width);
  }

  logout() {
    this.authService.logout();
  }

  /** testing file manipulation */
  dir = FilesystemDirectory.Cache;
  path = "secrets/text.txt";

  async testing() {
    await this.readdir();
    await this.fileAppend();
    await this.readdir();
    await this.fileRead();
  }

  async readdir() {
    Filesystem.readdir({
      path: "",
      directory: this.dir
    })
      .then(data => console.log(data))
      .catch(e => console.error("Unable to read dir", e));
  }

  async fileAppend() {
    await Filesystem.appendFile({
      path: this.path,
      data: "MORE TESTS",
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
