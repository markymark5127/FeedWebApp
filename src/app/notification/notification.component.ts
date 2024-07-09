import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var FB: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  facebookUser: any;
  instagramUser: any;
  facebookNotifications: any[] = [];
  instagramNotifications: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.facebookAuth$.subscribe(userData => {
      this.facebookUser = userData;
      if (this.facebookUser) {
        this.getFacebookNotifications();
      }
    });

    this.authService.instagramAuth$.subscribe(userData => {
      this.instagramUser = userData;
      if (this.instagramUser) {
        this.getInstagramNotifications();
      }
    });
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
    console.log('Instagram notifications fetching to be implemented');
  }
}
