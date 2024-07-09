import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

declare var FB: any; // Declare FB here

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private facebookApiUrl = 'https://graph.facebook.com/v12.0/me/feed'; // Update with the correct URL
  private instagramApiUrl = 'https://graph.instagram.com/v12.0/me/media'; // Update with the correct URL

  private facebookAccessToken: string | null = null;
  private instagramAccessToken: string | null = null;

  // Observable subjects for authentication state
  private facebookAuthSubject$: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private instagramAuthSubject$: BehaviorSubject<any | null> = new BehaviorSubject(null);

  // Expose observables for components to subscribe to
  facebookAuth$: Observable<any | null> = this.facebookAuthSubject$.asObservable();
  instagramAuth$: Observable<any | null> = this.instagramAuthSubject$.asObservable();

  constructor(private http: HttpClient) { }

  // Facebook login
  loginWithFacebook(): Observable<boolean> {
    return new Observable(observer => {
      FB.login((response: any) => {
        if (response.authResponse) {
          this.facebookAccessToken = response.authResponse.accessToken;
          this.facebookAuthSubject$.next(response.authResponse);
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, { scope: 'public_profile,email,publish_actions' });
    });
  }

  // Instagram login (Placeholder)
  loginWithInstagram(): Observable<boolean> {
    // Implement Instagram login logic here (requires backend support)
    return new Observable(observer => {
      // Placeholder logic for Instagram login
      observer.next(false);
      observer.complete();
    });
  }

  // Post to Facebook or Instagram based on which access token is set
  postToFeed(formData: FormData): Observable<any> {
    if (this.facebookAccessToken) {
      formData.append('access_token', this.facebookAccessToken);
      return this.http.post(this.facebookApiUrl, formData);
    } else if (this.instagramAccessToken) {
      formData.append('access_token', this.instagramAccessToken);
      return this.http.post(this.instagramApiUrl, formData);
    } else {
      return of({ error: 'User is not logged in' });
    }
  }

  // Check if the user is logged in to Facebook
  isFacebookLoggedIn(): boolean {
    return this.facebookAccessToken !== null;
  }

  // Check if the user is logged in to Instagram
  isInstagramLoggedIn(): boolean {
    return this.instagramAccessToken !== null;
  }
}
