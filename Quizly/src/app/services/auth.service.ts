import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
import { BehaviorSubject } from 'rxjs';

const key = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(private plt: Platform) {
    this.plt.ready().then(() => {
      //this.checkToken();  // set this to be logged in directly
    });
  }

  checkToken() {
    Storage.get({ key }).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  signin() {
    const value = 'Bearer 1234567';
    return Storage.set({ key, value }).then(() => {
      // TODO sent email with approval code
    });
  }

  checkCode(code: string) {
    if (code) {
      this.authenticationState.next(true);
    }
  }

  async login(): Promise<boolean> {
    const value = 'Bearer 1234567';
    return Storage.set({ key, value }).then(() => {
      this.authenticationState.next(true);
      return true;
    }).catch(err => {console.log(err); return false; });
  }

  logout() {
    return Storage.remove({ key }).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
