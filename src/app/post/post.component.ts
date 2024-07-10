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

  constructor(private authService: AuthService) { }
  
  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'image') {
      this.postImage = file;
    } else if (fileType === 'video') {
      this.postVideo = file;
    }
  }
/*
  onSubmit() {
    const formData = new FormData();
    formData.append('message', this.postText);

    if (this.postImage) {
      formData.append('source', this.postImage);
    }

    if (this.postVideo) {
      formData.append('source', this.postVideo);
    }
    
    this.authService.postToFeed(formData).subscribe(response => {
      if (response.error) {
        alert('Failed to post: ' + response.error);
      } else {
        alert('Posted successfully');
        this.clearForm();
      }
    });
  }

  clearForm() {
    this.postText = '';
    this.postImage = null;
    this.postVideo = null;
  }*/
    onSubmit() {
      const formData = new FormData();
      formData.append('message', this.postText);
  
      console.log('Submitting post:', formData);
  
      this.authService.postToFeed(formData).subscribe(response => {
        console.log('Response from post:', response);
        if (response.error) {
          alert('Failed to post: ' + response.error.message);
        } else {
          alert('Posted successfully');
          this.clearForm();
        }
      });
    }
  
    clearForm() {
      this.postText = '';
    }
}
