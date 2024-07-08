import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  postText: string = '';
  postImage: File | null = null;
  postVideo: File | null = null;

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
    formData.append('text', this.postText);
    if (this.postImage) {
      formData.append('image', this.postImage);
    }
    if (this.postVideo) {
      formData.append('video', this.postVideo);
    }

    // Here, you would send formData to your backend server.
    // For example:
    // this.http.post('your-backend-url', formData).subscribe(response => {
    //   console.log('Post submitted successfully!', response);
    // });

    console.log('Post submitted:', this.postText, this.postImage, this.postVideo);
    // Reset form
    this.postText = '';
    this.postImage = null;
    this.postVideo = null;
  }
}
