import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  postText: string = '';
  postImage: File | null = null;
  postVideo: File | null = null;

  constructor(private authService: AuthService) {}

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'image') {
      this.postImage = file;
    } else if (type === 'video') {
      this.postVideo = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('message', this.postText); // Updated to 'message' as it is required for Facebook API
    if (this.postImage) {
      formData.append('source', this.postImage);
    }
    if (this.postVideo) {
      formData.append('source', this.postVideo);
    }

    this.authService.postToFeed(formData).subscribe(response => {
      console.log('Post successful', response);
      // Reset the form
      this.postText = '';
      this.postImage = null;
      this.postVideo = null;
    }, error => {
      console.error('Error posting', error);
    });
  }
}
