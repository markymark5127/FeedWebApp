import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private facebookAuthSubject = new BehaviorSubject<any>(null);
  private instagramAuthSubject = new BehaviorSubject<any>(null);

  facebookAuth$ = this.facebookAuthSubject.asObservable();
  instagramAuth$ = this.instagramAuthSubject.asObservable();

  constructor() {
    this.loadFacebookSDK();
    this.loadInstagramSDK();
  }

  private loadFacebookSDK() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId      : '2226367154394422', // Replace with your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      FB.AppEvents.logPageView();
    };

    if (!(window as any).FB) {
      let js, fjs = document.getElementsByTagName('script')[0];
      if (fjs) {
        if (document.getElementById('facebook-jssdk')) { return; }
        js = document.createElement('script'); js.id = 'facebook-jssdk';
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode?.insertBefore(js, fjs);
      } else {
        console.error('Error: Script insertion point not found.');
      }
    }
  }

  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'name,email' }, (userData: any) => {
          this.facebookAuthSubject.next(userData);
          console.log('Facebook User Data:', userData);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  }

  private loadInstagramSDK() {
    let js, fjs = document.getElementsByTagName('script')[0];
    if (fjs) {
      if (document.getElementById('instagram-sdk')) { return; }
      js = document.createElement('script'); js.id = 'instagram-sdk';
      js.src = "https://www.instagram.com/static/bundles/es6/EmbedSDK.js";
      fjs.parentNode?.insertBefore(js, fjs);
    } else {
      console.error('Error: Script insertion point not found.');
    }
  }

  loginWithInstagram() {
    // Implement Instagram login logic and update instagramAuthSubject
    console.log('Instagram login functionality to be implemented');
  }
}
