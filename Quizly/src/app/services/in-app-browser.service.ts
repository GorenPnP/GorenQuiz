import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})
export class InAppBrowserService {

  private browser: InAppBrowserObject;

  constructor(private iab: InAppBrowser) { }

  open(url: string) {
    this.browser = this.iab.create(url, '_blank');
  }
}
