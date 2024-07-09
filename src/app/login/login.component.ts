import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  loginWithInstagram() {
    this.authService.loginWithInstagram();
  }
}
