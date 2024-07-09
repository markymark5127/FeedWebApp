import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var FB: any; // Declare FB here

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadFacebookSDK();
    this.loadInstagramSDK();
  }

  loadFacebookSDK() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId      : '2226367154394422', // Replace with your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      
      FB.AppEvents.logPageView();   
    };

    // Load the SDK asynchronously
    ((d, s, id) => {
      let js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s) as HTMLScriptElement; // Type assertion here
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs?.parentNode?.insertBefore(js, fjs);

    })(document, 'script', 'facebook-jssdk');
  }

  loadInstagramSDK() {
    // Load the Instagram SDK asynchronously
    ((d, s, id) => {
      let js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s) as HTMLScriptElement; // Type assertion here
      js.id = id;
      js.src = "https://www.instagram.com/static/bundles/es6/EmbedSDK.js";
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'instagram-sdk');
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook().subscribe(success => {
      if (success) {
        console.log('User logged in with Facebook successfully');
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  loginWithInstagram() {
    this.authService.loginWithInstagram().subscribe(success => {
      if (success) {
        console.log('User logged in with Instagram successfully');
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }
}
