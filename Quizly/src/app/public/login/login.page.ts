import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  name = '';
  password = '';

  constructor(private router: Router,
              private authService: AuthService,
              private messageService: MessageService) {}

  submit(): void {
    if (!this.name || !this.password || this.password.length < 8 || this.name.trim().length < 4) {
      this.messageService.alert(
        `Alle Felder müssen ausgefüllt werden.`
      );
      return;
    }

    // TODO send login data to backend
    this.authService.login().then(successful => {
      if (!successful) {
        // TODO open dialogue 'forgot password?'
      }
    });
  }
}
