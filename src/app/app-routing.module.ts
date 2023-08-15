import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const generateTitle = (title: string) => `Entertainment | ${title}`;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: generateTitle('Home'),
  },
  {
    path: 'movies',
    component: MoviesComponent,
    title: generateTitle('Movies'),
  },
  {
    path: 'tv-series',
    component: TvSeriesComponent,
    title: generateTitle('Tv Series'),
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    title: generateTitle('Bookmarks'),
  },
  {
    path: 'login',
    component: LoginComponent,
    title: generateTitle('Login'),
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: generateTitle('Sign Up'),
  },
  {
    path: '404',
    component: ErrorComponent,
    data: { type: '404' },
    title: generateTitle('Not Found'),
  },
  {
    path: '401',
    component: ErrorComponent,
    data: { type: '401' },
    title: generateTitle('Unauthorized'),
  },
  {
    path: '500',
    component: ErrorComponent,
    data: { type: '500' },
    title: generateTitle('Server Error'),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
