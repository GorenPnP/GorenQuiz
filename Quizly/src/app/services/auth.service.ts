import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';


export interface User {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private plt: Platform,
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private alertController: AlertController
  ) {
    this.afAuth.auth.languageCode = 'de';

    // get initial status
    this.plt.ready().then(() => { this.authenticate(); this.authenticationState.next(true)  });   // TODO: remove that last authState!!
  }

  // for auth guard
  isAuthenticated() {
    return this.authenticationState.value;
  }

  username(): string {
    return this.afAuth.auth.currentUser === null ? '' : this.afAuth.auth.currentUser.displayName;
  }

  usermail(): string {
    return this.afAuth.auth.currentUser === null ? '' : this.afAuth.auth.currentUser.email;
  }

  private async authenticate() {
    this.authenticationState.next(this.afAuth.auth.currentUser !== null && !this.authenticationState.getValue());
  }

  private async verifyEmail() {
    const email = this.afAuth.auth.currentUser.email;

    if (this.afAuth.auth.currentUser.emailVerified) { return this.authenticate(); }

    this.afAuth.auth.currentUser
      .sendEmailVerification()
      .then(async _ => {
        // prompt them to look for email
        const alert = await this.alertController.create({
          header: 'Email verifizieren',
          message: `An ${email} wurde eine Email versendet. Bitte verifiziere diesen Account über den enthaltenen Link.`,
          backdropDismiss: false
        });
        await alert.present();

        setInterval(_ => {
          this.afAuth.auth.currentUser.reload().then(_ => {
            if (this.afAuth.auth.currentUser.emailVerified) {
              clearInterval(); this.authenticate(); alert.dismiss();
            }
          });
        }, 1000);
      })
      .catch(err => {
        this.messageService.error(err.message + ' Versuchs doch nochmal.');
      });
  }

  async resetPassword(email: string) {
    // prompt them to look for email
    const alert = await this.alertController.create({
      header: 'Passwort zurücksetzen',
      message: `Soll an die unten genannte Email ein Reset-Link gesendet werden?`,
      backdropDismiss: false,
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email des Accounts',
          value: email
        }
      ],
      buttons: [
        {
          text: 'Nein',
          cssClass: 'alert-quit'
        },
        {
          text: 'Ja',
          cssClass: 'alert-ok',
          handler: async () => {
            this.afAuth.auth.sendPasswordResetEmail(email).then(async _ => {// done sending
              const thanksAlert = await this.alertController.create({
                header: '分かりました。',
                message: 'Die Email wurde versendet.',
                buttons: [
                  {
                    text: 'ok',
                    cssClass: 'alert-ok'
                  }
                ]
              });
              await thanksAlert.present();
            }).catch(err => this.messageService.error(err.message));
          }
        }
      ]
    });
    await alert.present();
  }

  async login(user: User): Promise<void> {
    this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password).then(_ => { this.verifyEmail(); })
      .catch(err => { this.messageService.alert(err.message); });
  }

  register(user: User) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password).then(_ => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: user.name,
        });

        this.verifyEmail();
      })
      .catch(err => { this.messageService.alert(err.message); });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout?',
      buttons: [
        {
          text: 'Nein',
          cssClass: 'alert-quit'
        },
        {
          text: 'Ja',
          cssClass: 'alert-ok',
          handler: async () => {
            this.afAuth.auth.signOut().then(_ => this.authenticate());
          }
        }
      ]
    });
    await alert.present();
  }
}
