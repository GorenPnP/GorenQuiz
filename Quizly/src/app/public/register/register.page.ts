import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

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
      this.password !== this.passwordCheck ||
      !/^.+\@.+\..+$/.test(this.email)
    ) {
      this.messageService.alert(`Alle Felder müssen ausgefüllt werden und die Passwörter müssen gleich sein.`);
      return;
    }

    // TODO send sign in data to backend
    // if no other of that name exists and everything else worked as well, log in
    this.authService.register({email: this.email, password: this.password, name: this.name});
  }
}
