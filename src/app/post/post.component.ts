import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  facebookUser: any;
  instagramUser: any;
  postContent: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.facebookAuth$.subscribe(userData => {
      this.facebookUser = userData;
    });

    this.authService.instagramAuth$.subscribe(userData => {
      this.instagramUser = userData;
    });
  }

  makePost() {
    if (this.facebookUser) {
      // Implement logic to post on Facebook
      console.log('Posting on Facebook:', this.postContent);
    }

    if (this.instagramUser) {
      // Implement logic to post on Instagram
      console.log('Posting on Instagram:', this.postContent);
    }
  }
}
