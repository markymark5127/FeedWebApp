import { Component, OnInit } from '@angular/core';

declare var FB: any; // Declare FB variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadFacebookSDK();
  }

  loadFacebookSDK() {
    // Asynchronous loading handled by <script> tag in index.html
    // Initialization and usage handled here
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2226367154394422', // Replace with your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      
      FB.AppEvents.logPageView();   
    };

    // Load the SDK asynchronously (already done in index.html)
    // No need for direct DOM manipulation here
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', { fields: 'name,email' }, (response: any) => {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' }); // Add more scopes as needed
  }
}
