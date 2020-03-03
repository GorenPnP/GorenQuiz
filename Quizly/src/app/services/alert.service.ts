import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Url } from 'url';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async goHome(navTo: string) {
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
            // TODO eval current answer to question

            this.router.navigate([navTo]);
          }
        }
      ]
    });
    await alert.present();
  }

  async reportError(questionId: number) {
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
            // TODO: sent description with user info and question identifier to backend to store error report

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
}
