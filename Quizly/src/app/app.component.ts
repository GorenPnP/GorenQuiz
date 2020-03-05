import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FlexSizeService } from './services/flex-size.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private flexSizeService: FlexSizeService
  ) {
    this.initializeApp();


    // get initial window size
    this.platform.ready().then(_ => {
      this.windowSizeOnResize(null, this.platform.width());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['quiz', 'index']);
        } else {
          this.router.navigate(['login']);
        }
      });
   });
  }

  windowSizeOnResize(ev: any, width?: number) {
    this.flexSizeService.adaptSize(ev, width);
  }
}
