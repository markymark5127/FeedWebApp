import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'post', component: PostComponent },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },  // Redirect to feed by default
  { path: '**', redirectTo: '/feed' }  // Wildcard route for a 404 page or redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
