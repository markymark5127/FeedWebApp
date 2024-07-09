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
    this.authService.loginWithFacebook().subscribe(success => {
      if (success) {
        alert('Logged in with Facebook');
      } else {
        alert('Facebook login failed');
      }
    });
  }

  loginWithInstagram() {
    this.authService.loginWithInstagram().subscribe(success => {
      if (success) {
        alert('Logged in with Instagram');
      } else {
        alert('Instagram login failed');
      }
    });
  }
}
