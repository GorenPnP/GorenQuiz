import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiGeneralService } from './api-general.service';
import { ApiQuizService } from './api-quiz.service';
import { DetailQuestion } from '../interfaces/DetailQuestion';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private router: Router,
    private apiGeneral: ApiGeneralService,
    private apiQuiz: ApiQuizService
  ) {}

  async goHome(navTo: string, data: DetailQuestion) {
    // open dialog: last answer will be sent on leave. abandon session? y/n
    const alert = await this.alertController.create({
      header: 'Session beenden?',
      message:
        'Willst du zur Startseite zurück? Die aktuelle Frage wird noch gewertet',
      buttons: [
        {
          text: 'Nein',
          cssClass: 'alert-quit'
        },
        {
          text: 'Ja',
          cssClass: 'alert-ok',
          handler: async () => {
            // eval current answer to question
            this.apiQuiz.saveAnswer(data);

            this.router.navigate([navTo]);
          }
        }
      ]
    });
    await alert.present();
  }
}
