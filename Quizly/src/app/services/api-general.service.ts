import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiGeneralService {

  constructor(private alertController: AlertController) { }


async reportBug(questionId: string) {
  // open popover (or more persistent field to enable scrolling/reading) asking
  // if an error in the question occurred and if they want to report it.

  // AlertConfirm with note field (textarea) and a send- and cancel-button
  const alert = await this.alertController.create({
    header: 'Fehler mitteilen',
    message:
      'Ist in der Aufgabenstellung ein Fehler, teile ihn uns bitte mit. Danke!',
    inputs: [
      {
        name: 'description_text',
        type: 'text',
        placeholder: 'wo genau?'
      }
    ],
    buttons: [
      {
        text: 'Abbrechen',
        cssClass: 'alert-quit'
      },
      {
        text: 'Senden',
        cssClass: 'alert-ok',
        handler: async data => {
          const description = data.description_text;
          // sent description with user info and question identifier to backend to store error report
          this.sendBugReport(description, questionId);

          const thanksAlert = await this.alertController.create({
            header: 'Vielen Dank',
            message: 'Dein Fehlerbericht wurde versendet.',
            buttons: [
              {
                text: 'ok',
                cssClass: 'alert-ok'
              }
            ]
          });
          await thanksAlert.present();
        }
      }
    ]
  });
  await alert.present();
}


  sendBugReport(text: string, question_id: string) {
    console.log("will send report:", text);
  }

  getPoints() {
    console.log("will get points")
  }
}
