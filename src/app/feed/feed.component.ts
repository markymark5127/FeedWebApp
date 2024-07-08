import { Component, OnInit } from '@angular/core';

declare var FB: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  facebookPosts: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadFacebookSDK();
  }

  loadFacebookSDK() {
    // Asynchronous loading handled by <script> tag in index.html
    // Initialization and usage handled here
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '2226367154394422', // Replace with your Facebook app ID
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      
      FB.AppEvents.logPageView();   
    };

    // Ensure the SDK is only loaded once
    if (!(window as any).FB) {
      // Load the SDK asynchronously
      let js, fjs = document.getElementsByTagName('script')[0];
      if (fjs) {
        if (document.getElementById('facebook-jssdk')) { return; }
        js = document.createElement('script'); js.id = 'facebook-jssdk';
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode?.insertBefore(js, fjs); // Safe navigation operator
      } else {
        console.error('Error: Script insertion point not found.');
      }
    }

    // Load Facebook feed after SDK is initialized
    this.getFacebookFeed();
  }

  getFacebookFeed() {
    FB.api('/me/feed', 'GET', {}, (response: any) => {
      if (response && !response.error) {
        this.facebookPosts = response.data;
        console.log('Facebook Feed:', this.facebookPosts);
      } else {
        console.error('Error fetching Facebook feed:', response.error);
      }
    });
  }
}
