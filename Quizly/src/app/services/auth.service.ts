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
  user: User = null;
  emailVerified: boolean = false;
  newUser: boolean = false;

  userEmail: string = '';

  constructor(
    private plt: Platform,
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private alertController: AlertController
  ) {

    // get initial status & updated data of user
    this.plt.ready().then(() => {
      this.afAuth.user.subscribe(user => this.updateUser(user));
    });
  }

  updateUser(user: any) {
    const oldUser = this.user;

    if (this.newUser) {
      this.newUser = false;
      user = null;  // set this not to be authenticated
    }

    if (user === null || !user.displayName) {
      this.user = null;
      this.emailVerified = false;
    } else {
      this.user = { name: user.displayName, email: user.email, password: null };
      this.emailVerified = user.emailVerified;
    }

    if (this.user === null) { this.verifyEmail(); }
    if ((this.user === null && oldUser === null) || (this.user && oldUser)) { return; }
    this.authenticate();
  }

  // for auth guard
  isAuthenticated() {
    return this.authenticationState.value;
  }

  username(): string {
    return this.user === null ? '' : this.user.name;
  }

  usermail(): string {
    return this.user === null ? this.userEmail : this.user.email;
  }

  private async authenticate() {
    this.authenticationState.next(this.user !== null && !this.authenticationState.getValue());
  }

  private async verifyEmail() {

    if (this.emailVerified) { return this.authenticate(); }

    let user = await this.afAuth.currentUser;
    if (user === null) { return; }
    user.sendEmailVerification()
      .then(async _ => {
        // prompt them to look for email
        const alert = await this.alertController.create({
          header: 'Email verifizieren',
          message: `An ${this.usermail()} wurde eine Email versendet. Bitte verifiziere diesen Account über den enthaltenen Link.`,
          backdropDismiss: false
        });
        await alert.present();

        setInterval(async _ => {

          (await this.afAuth.currentUser).reload().then(async _ => {

            user = await this.afAuth.currentUser;

            if (user !== null && user.emailVerified) {
              clearInterval(); alert.dismiss(); this.updateUser(user);
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
            this.afAuth.sendPasswordResetEmail(email).then(async _ => {// done sending
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
    this.userEmail = user.email;
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .catch(err => { this.messageService.alert(err.message); });
  }

  register(user: User) {
    this.userEmail = user.email;
    this.newUser = true;
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(async _ => {
        (await this.afAuth.currentUser).updateProfile({
          displayName: user.name,
        });
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
            this.afAuth.signOut();
          }
        }
      ]
    });
    await alert.present();
  }
}
