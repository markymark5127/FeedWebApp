import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var FB: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  facebookUser: any;
  instagramUser: any;
  facebookPosts: any[] = [];
  instagramPosts: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.facebookAuth$.subscribe(userData => {
      this.facebookUser = userData;
      if (this.facebookUser) {
        this.getFacebookFeed();
      }
    });

    this.authService.instagramAuth$.subscribe(userData => {
      this.instagramUser = userData;
      if (this.instagramUser) {
        this.getInstagramFeed();
      }
    });
  }

  getFacebookFeed() {
    if (!(window as any).FB) {
      console.error('Facebook SDK not loaded.');
      return;
    }

    FB.api('/me/feed', 'GET', { fields: 'message,attachments{media{image,source},type,subattachments}' }, (response: any) => {
      if (response && !response.error) {
        this.facebookPosts = response.data;
        console.log('Facebook Feed:', this.facebookPosts);
      } else {
        console.error('Error fetching Facebook feed:', response.error);
      }
    });
  }

  getInstagramFeed() {
    console.log('Instagram feed fetching to be implemented');
  }
}
