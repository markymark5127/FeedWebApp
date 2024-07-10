import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFacebookLoggedIn: boolean = false;
  isInstagramLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.facebookAuth$.subscribe(user => {
      this.isFacebookLoggedIn = !!user;
    });

    this.authService.instagramAuth$.subscribe(user => {
      this.isInstagramLoggedIn = !!user;
    });
  }

  loginWithFacebook() {
    if (this.isFacebookLoggedIn) {
      this.authService.logoutOfFacebook();
    } else {
      this.authService.loginWithFacebook().subscribe(success => {
        if (success) {
          alert('Logged in with Facebook');
        } else {
          alert('Facebook login failed');
        }
      });
    }
  }

  loginWithInstagram() {
    if (this.isInstagramLoggedIn) {
      this.authService.logoutOfInstagram();
    } else {
      this.authService.loginWithInstagram().subscribe(success => {
        if (success) {
          alert('Logged in with Instagram');
        } else {
          alert('Instagram login failed');
        }
      });
    }
  }
}
