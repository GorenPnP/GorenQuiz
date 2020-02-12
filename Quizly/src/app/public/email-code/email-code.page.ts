import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-code',
  templateUrl: './email-code.page.html',
  styleUrls: ['./email-code.page.scss'],
})
export class EmailCodePage {

  code = '';

  constructor(private authService: AuthService) { }

  submit() {
    this.authService.checkCode(this.code);
  }
}
