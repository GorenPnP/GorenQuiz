import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {

  name: string;
  email: string;

  password: string;
  passwordCheck: string;

  passwordLength = 8;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private router: Router) { }

  submit(): void {
    if (
      !this.name ||
      !this.password ||
      this.password.length < this.passwordLength ||
      this.name.trim().length < 4 ||
      this.password.length < 8 ||
      !/^.+\@.+\..+$/.test(this.email)
    ) {
      this.messageService.alert(`Alle Felder müssen ausgefüllt werden und die Passwörter müssen gleich sein.`);
      return;
    }

    if (this.password !== this.passwordCheck) {
      return;
    }

    // TODO send sign in data to backend
    // if no other of that name exists and everything else worked as well, log in
    this.authService.signin();
    this.router.navigate(['email-code']);
  }
}
