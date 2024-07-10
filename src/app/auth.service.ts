import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private facebookApiUrl = 'https://graph.facebook.com/v12.0/me/feed';
  private instagramApiUrl = 'https://graph.instagram.com/v12.0/me/media';

  private facebookAccessToken: string | null = null;
  private instagramAccessToken: string | null = null;

  private facebookAuthSubject$: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private instagramAuthSubject$: BehaviorSubject<any | null> = new BehaviorSubject(null);

  facebookAuth$: Observable<any | null> = this.facebookAuthSubject$.asObservable();
  instagramAuth$: Observable<any | null> = this.instagramAuthSubject$.asObservable();

  constructor(private http: HttpClient) {
    this.loadFacebookSDK();
  }

  private loadFacebookSDK() {
    if (typeof FB !== 'undefined') {
      return;
    }

    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '1395205587818906', // instagram id: 84026550426629
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      let js: HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      if (d.getElementById(id)) { return; }
      js = d.createElement(s) as HTMLScriptElement; 
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

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
      }, { scope: 'public_profile,email,user_posts' });
    });
  }

  loginWithInstagram(): Observable<boolean> {
    return new Observable(observer => {
      // Implement Instagram login logic here
      // Placeholder for now
      observer.next(false);
      observer.complete();
    });
  }

  logoutOfFacebook(): void {
    FB.logout((response: any) => {
      this.facebookAccessToken = null;
      this.facebookAuthSubject$.next(null);
    });
  }

  logoutOfInstagram(): void {
    this.instagramAccessToken = null;
    this.instagramAuthSubject$.next(null);
  }

  /*postToFeed(formData: FormData): Observable<any> {
    if (this.facebookAccessToken) {
      formData.append('access_token', this.facebookAccessToken);
      return this.http.post(this.facebookApiUrl, formData);
    } else if (this.instagramAccessToken) {
      formData.append('access_token', this.instagramAccessToken);
      return this.http.post(this.instagramApiUrl, formData);
    } else {
      return of({ error: 'User is not logged in' });
    }
  }*/
    postToFeed(formData: FormData): Observable<any> {
      if (this.facebookAccessToken) {
        const url = `${this.facebookApiUrl}?access_token=${this.facebookAccessToken}&message=${formData.get('message')}`;
        console.log('Posting to Facebook with token:', this.facebookAccessToken);
        return this.http.post(url, formData);
      } else if (this.instagramAccessToken) {
        formData.append('access_token', this.instagramAccessToken);
        return this.http.post(this.instagramApiUrl, formData);
      } else {
        return of({ error: 'User is not logged in' });
      }
    }
  

  isFacebookLoggedIn(): boolean {
    return this.facebookAccessToken !== null;
  }

  isInstagramLoggedIn(): boolean {
    return this.instagramAccessToken !== null;
  }

  getFacebookFeed(): Observable<any> {
    if (this.facebookAccessToken) {
      const url = `${this.facebookApiUrl}?access_token=${this.facebookAccessToken}`;
      return this.http.get<any>(url);
    } else {
      return of({ data: [] });
    }
  }

  getInstagramFeed(): Observable<any> {
    if (this.instagramAccessToken) {
      const url = `${this.instagramApiUrl}?access_token=${this.instagramAccessToken}`;
      return this.http.get<any>(url);
    } else {
      return of({ data: [] });
    }
  }
}
