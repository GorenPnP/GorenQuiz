import { Injectable } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MessageService } from './message.service';
import { database } from 'firebase';

import { ApiGeneralService } from './api-general.service';


@Injectable({
  providedIn: 'root'
})
export class ApiResultsService {

  currQuestionId: string = null;

  constructor(private afn: AngularFireFunctions,
              private apiGeneral: ApiGeneralService,
              private messageService: MessageService) { }

  async getOpenCorrections(): Promise<number> {
    return this.afn.httpsCallable('results-getOpenCorrections')({}).toPromise().then(data => {
      if (data) { return data.open; }
      return null;
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


  async getQuestion(id: string): Promise<any> {
    console.log("get question with", id);
    return this.afn.httpsCallable('quiz-getQuestion')({id}).toPromise().then(data => {

      this.currQuestionId = data.id;
      delete data.id;

      console.log(data, this.currQuestionId);
      return data;
    });
  }


  async archive(): Promise<void> {
    console.log("will archice question");
  }

  reportBug() {
    this.apiGeneral.reportBug(this.currQuestionId);
  }
}
