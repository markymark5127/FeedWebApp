import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var FB: any; // Declare FB here

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  facebookNotifications: any[] = [];
  instagramNotifications: any[] = [];

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
      this.getFacebookNotifications();
    };

    if (!(window as any).FB) {
      // Load the SDK asynchronously
      ((d, s, id) => {
        let js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs?.parentNode?.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    } else {
      this.getFacebookNotifications();
    }
  }

  loadInstagramSDK() {
    // Implement Instagram SDK loading if required
    // For now, this is a placeholder as Instagram does not have a direct JS SDK like Facebook
  }

  getFacebookNotifications() {
    FB.api('/me/notifications', 'GET', {}, (response: any) => {
      if (response && !response.error) {
        this.facebookNotifications = response.data;
        console.log('Facebook Notifications:', this.facebookNotifications);
      } else {
        console.error('Error fetching Facebook notifications:', response.error);
      }
    });
  }

  getInstagramNotifications() {
    // Implement Instagram notifications fetching logic
  }
}
