import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ErrorComponent } from './error/error.component';

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
  { path: '404', component: ErrorComponent, title: generateTitle('Not Found') },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
