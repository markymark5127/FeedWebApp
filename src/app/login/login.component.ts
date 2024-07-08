import { Component, OnInit } from '@angular/core';

declare var FB: any;
declare var InstagramLogin: any; // Declare InstagramLogin variable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadFacebookSDK();
    this.loadInstagramSDK();
  }

  loadFacebookSDK() {
    (window as any).fbAsyncInit = function() {
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
    ((d, s, id, url) => {
      let js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s) as HTMLScriptElement; // Type assertion here
      js.id = id;
      js.src = url;
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'instagram-sdk', 'https://www.instagram.com/static/bundles/es6/EmbedSDK.js');
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        console.log('User logged in successfully:', response);
        // Handle further logic here, e.g., navigate to another component or fetch user data
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' }); // Add more scopes as needed
  }

  loginWithInstagram() {
    InstagramLogin.auth('instagram', {
      scope: ['user_profile', 'user_media'], // Add required scopes
      accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN', // Optional: Use if you have a persistent access token
      success: (response: any) => {
        console.log('User logged in successfully:', response);
        // Handle further logic here
      },
      error: (error: any) => {
        console.error('Error logging in with Instagram:', error);
      }
    });
  }
}
