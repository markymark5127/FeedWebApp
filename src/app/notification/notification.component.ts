import { Component, OnInit } from '@angular/core';

declare var FB: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  facebookNotifications: any[] = [];
  instagramNotifications: any[] = [];
  isLoggedInFacebook: boolean = false;
  isLoggedInInstagram: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadFacebookSDK();
    this.loadInstagramSDK();
  }

  loadFacebookSDK() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook app ID
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

    this.getFacebookNotifications();
  }

  loadInstagramSDK() {
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

  getFacebookNotifications() {
    FB.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        this.isLoggedInFacebook = true;
        FB.api('/me/notifications', 'GET', {}, (apiResponse: any) => {
          if (apiResponse && !apiResponse.error) {
            this.facebookNotifications = apiResponse.data;
            console.log('Facebook Notifications:', this.facebookNotifications);
          } else {
            console.error('Error fetching Facebook notifications:', apiResponse.error);
          }
        });
      } else {
        this.isLoggedInFacebook = false;
      }
    });
  }

  getInstagramNotifications() {
    // Example logic for fetching Instagram notifications
    // Replace with your actual implementation
    if (this.isLoggedInInstagram) {
      // Call Instagram API to get notifications
      // This is just a placeholder and needs to be replaced with actual API calls
      this.instagramNotifications = [
        { message: 'New follower: user123' },
        { message: 'New comment on your post: Nice photo!' }
      ];
    }
  }

  isLoggedIn(platform: string): boolean {
    if (platform === 'facebook') {
      return this.isLoggedInFacebook;
    } else if (platform === 'instagram') {
      // Add logic to check Instagram login status
      return this.isLoggedInInstagram;
    }
    return false;
  }
}
