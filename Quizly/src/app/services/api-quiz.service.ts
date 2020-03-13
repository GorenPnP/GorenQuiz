import { Injectable } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MessageService } from './message.service';
import { DetailQuestion, File } from '../interfaces/DetailQuestion';
import { ApiGeneralService } from './api-general.service';

@Injectable({
  providedIn: 'root'
})
export class ApiQuizService {

  currQuestionId: string = null;

  constructor(private afn: AngularFireFunctions,
              private apiGeneral: ApiGeneralService,
              private messageService: MessageService) { }

  async getOpenQuestions(): Promise<number> {
    return this.afn.httpsCallable('quiz-getOpenQuestions')({}).toPromise().then(data => {
      return data ? data.open : null;
    });
  }

  async getOpenPoints(): Promise<number> {
    console.log("will get open points");
    return 0;
    /*
    return this.afn.httpsCallable('quiz-getOpenPoints')({}).toPromise().then(data => {
      console.log(data);
      if (data) { return data.open; }
      return null;
    });
    */
  }

  getAccordeon() {
    console.log("will get accordeon");
  }

  async getQuestion(): Promise<DetailQuestion> {
    return this.afn.httpsCallable('quiz-getQuestion')({}).toPromise().then(data => {
      this.currQuestionId = data.id;
      delete data.id;
      data.userFiles = [];

      data.answers.forEach(answer => {
        answer.chosen = (data.answers.length === 1);
        answer.answer = null;
        delete answer.correct;
      });

      const detailQuestion: DetailQuestion = data;
      return detailQuestion;
    });
  }

  async addFile(): Promise<File> {
    // TODO: implement something users can select a file from!

    // TODO: prevent from multiple additions of same file

    return this.afn.httpsCallable('quiz-addFile')({
      path: 'https://allthingslearning.files.wordpress.com/2012/06/learning-dummy.png',
      content: '',
      title: 'dummy link',
      question: this.currQuestionId }).toPromise().then(data => {
      console.log(data);

      // TODO: return path to new ressource
      return {
          path: 'https://allthingslearning.files.wordpress.com/2012/06/learning-dummy.png',
          title: 'dummy link',
          mimeType: 'image/png'
        };
    });
  }

  deleteFile(path: string) {
    return this.afn.httpsCallable('quiz-deleteFile')({path: path, question: this.currQuestionId}).toPromise().then(data => {
      console.log(data);
    });
  }

  async saveAnswer(data: DetailQuestion): Promise<void> {
    console.log("will save answer", data.question.text);
  }

  reportBug() {
    this.apiGeneral.reportBug(this.currQuestionId);
  }
}
