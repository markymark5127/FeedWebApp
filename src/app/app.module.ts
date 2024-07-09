import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { FeedComponent } from './feed/feed.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthService } from './auth.service';

// Define your routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'post', component: PostComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'notifications', component: NotificationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostComponent,
    FeedComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)  // Import RouterModule and set up routes
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
