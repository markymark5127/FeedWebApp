import { Component, OnInit } from '@angular/core';

declare var FB: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postText: string = '';
  postImage: File | null = null;
  postVideo: File | null = null;

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
  }
  

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'image') {
      this.postImage = file;
    } else if (fileType === 'video') {
      this.postVideo = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('message', this.postText);
    if (this.postImage) {
      formData.append('source', this.postImage);
    }
    if (this.postVideo) {
      formData.append('source', this.postVideo);
    }

    // Example: Posting to Facebook using FB.api
    FB.api('/me/photos', 'post', {
      message: this.postText,
      url: 'YOUR_IMAGE_URL' // Provide a URL to the image or video
    }, (response: any) => {
      if (response && !response.error) {
        console.log('Post was successful!', response);
      } else {
        console.log('Error while posting.', response.error);
      }
    });

    // Reset form
    this.postText = '';
    this.postImage = null;
    this.postVideo = null;
  }
}
