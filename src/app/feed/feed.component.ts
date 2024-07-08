import { Component, OnInit } from '@angular/core';

declare var FB: any;
declare var InstagramLogin: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  facebookPosts: any[] = [];
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
        appId      : '2226367154394422', // Replace with your Facebook app ID
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

    this.getFacebookFeed();
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

  getFacebookFeed() {
    FB.getLoginStatus((response: any) => {
      if (response.status === 'connected') {
        this.isLoggedInFacebook = true;
        FB.api('/me/feed', 'GET', {}, (apiResponse: any) => {
          if (apiResponse && !apiResponse.error) {
            this.facebookPosts = apiResponse.data;
            console.log('Facebook Feed:', this.facebookPosts);
          } else {
            console.error('Error fetching Facebook feed:', apiResponse.error);
          }
        });
      } else {
        this.isLoggedInFacebook = false;
      }
    });
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
