import { Component, OnInit } from '@angular/core';

declare var FB: any;

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
}
