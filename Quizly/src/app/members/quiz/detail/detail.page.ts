import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  currScore: number = 67;
  maxScore: number = 153;
  currQuestion: number = 1;
  numQuestion: number = 1;
  questionData =
  {
    topic: 'Hello Topic',
    bundle: 4,
    points: 6,
    question:
    {
      text: 'Can you read this?',
      images:
        [
          { resLocation: 'assets/Pokemon-Go.png' },
          { resLocation: 'assets/Pokédex-Skin_Cheren.png' },
        ]
    },
    answer_options:
    [
      {
        text: 'option 1',
        images: [],
        chosen: false,
        answer: null
      },
      {
        text: 'option 2 with image mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
        images: [
          { resLocation: 'assets/Pokemon-Go.png' },
//          { resLocation: 'assets/Pokédex-Skin_Cheren.png' },
        ],
        chosen: false,
        answer: null
      }
    ]
  };

  files = [
    {title: 'some pdf file'},
    {title: 'rand.txt'}
  ];

  /** config for the image slider */
  sliderConfig = {
    slidesPerView: 1.3,
    spaceBetween: 1,
    centeredSlides: true,
    zoom: true
  };

  constructor(private authService: AuthService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
    // TODO load new question

    // TODO maybe relocate this
    if (this.questionData.answer_options.length === 1) {
      this.questionData.answer_options[0].chosen = true;
    }
  }

  async addFile() {
    // TODO fill this + suitable service
    console.log('should add file');
  }

  async deleteFile(index: number) {
    // TODO fill this + suitable service
    console.log(this.files[index], index);
    this.files = this.files.filter((_, i) => i !== index);
  }

  sendAnswer() {
    // TODO send answer to backend
    // TODO is a question to answer left? route to that

    // if not, route to end screen
    this.router.navigate(['quiz', 'end']);
  }

  async reportError() {
    // open popover (or more persistent field to enable scrolling/reading) asking
    // if an error in the question occurred and if they want to report it.

    // AlertConfirm with note field (textarea) and a send- and cancel-button
      const alert = await this.alertController.create({
        header: 'Fehler mitteilen',
        message: 'Ist in der Fragestellung ein Fehler, teile ihn uns bitte mit. Danke!',
        inputs: [
          {
            name: 'description_text',
            type: 'text',
            placeholder: 'wo genau?'
          },
        ],
        buttons: [
          {
            text: 'Abbrechen',
            cssClass: 'alert-quit',
          }, {
            text: 'Senden',
            cssClass: 'alert-ok',
            handler: async (data) => {
              const description = data.description_text;
              // TODO: sent description with user info and question identifier to backend to store error report


              const thanksAlert = await this.alertController.create({
                header: 'Vielen Dank',
                message: 'Dein Fehlerbericht wurde versendet.',
                buttons: [
                  {
                    text: 'ok',
                    cssClass: 'alert-ok',
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

  logout() {
    this.authService.logout();
  }

  async goHome() {
    // TODO open dialog: last answer will be sent on leave. abandon session? y/n
    const alert = await this.alertController.create({
      header: 'Session beenden?',
      message: 'Willst du zur Startseite zurück? Die aktuelle Frage wird noch gewertet',
      buttons: [
        {
          text: 'Nein',
          cssClass: 'alert-quit',
        }, {
          text: 'Ja',
          cssClass: 'alert-ok',
          handler: async () => {
            // TODO eval current answer to question

            this.router.navigate(['quiz', 'index']);
          }
        }
      ]
    });
    await alert.present();
  }
}
