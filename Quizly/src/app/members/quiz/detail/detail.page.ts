import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ApiQuizService } from 'src/app/services/api-quiz.service';

import { DetailQuestion, File } from 'src/app/interfaces/DetailQuestion';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { SortedByMimeType } from 'src/app/components/file-items/file-items.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {
  currScore: number = 67;
  maxScore: number = 153;
  currQuestion: number = 1;
  numQuestion: number = 1;

  fileImages: File[] = [];
  filesByMime: SortedByMimeType = {image: [], audio: [], video: [], inBrowser: [], other: []};
  userFilesByMime: SortedByMimeType = { image: [], audio: [], video: [], inBrowser: [], other: [] };

  questionData: DetailQuestion = null;

  /** config for the image slider */
  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 1,
    centeredSlides: true,
    zoom: true
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private apiQuiz: ApiQuizService,
    private browser: InAppBrowserService,
  ) {}

  ngOnInit() {
    // load new question
    this.getNewQuestion();
  }

  private async getNewQuestion(): Promise<void> {
    this.apiQuiz.getQuestion().then(newQuestion => {
      if (newQuestion) {
        this.questionData = newQuestion; // is a question to answer left? route to that
        this.constructMimeDict(this.questionData.files, this.filesByMime);
      }
      else { this.router.navigate(['quiz', 'end']); }       // if not, route to end screen
    });
  }

  async addFile() {
    // TODO fill this, let choose file and pack for api (or do that in service)

    // add new file to backend
    this.apiQuiz.addFile().then(file => {

      // add to list
      this.questionData.userFiles.push(file);
      this.constructMimeDict(this.questionData.userFiles, this.userFilesByMime);
    });
  }

  openFile(path: string) { this.browser.open(path); }

  async deleteFile(path: string) {
    // delete from backend
    this.apiQuiz.deleteFile(path).then(_ => {

      // delete file from list
      this.questionData.userFiles = this.questionData.userFiles.filter((file) => file.path !== path);
      this.constructMimeDict(this.questionData.userFiles, this.userFilesByMime);

    });
  }

  sendAnswer() {
    // send answer to backend
    this.apiQuiz.saveAnswer(this.questionData).then(_ => {
      this.getNewQuestion();
    });
  }

  reportBug() {
    this.apiQuiz.reportBug();
  }

  logout() {
    this.authService.logout();
  }

  goHome() {
    this.alert.goHome('', this.questionData);
  }

  constructMimeDict(files: File[], mimeDict: SortedByMimeType) {
    files.forEach(file => {
      if (file.mimeType.startsWith('image')) { mimeDict.image.push(file); }
      else if (file.mimeType.startsWith('audio')) { mimeDict.audio.push(file); }
      else if (file.mimeType.startsWith('video')) { mimeDict.video.push(file); }
      else if (['application/pdf', 'application/xhtml+xml'].indexOf(file.mimeType) !== -1) { mimeDict.inBrowser.push(file); }
      else { mimeDict.other.push(file); }
    });
  }
}
