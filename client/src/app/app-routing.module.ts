import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ErrorComponent } from './error/error.component';
import { LayoutComponent } from './layout/layout.component';
import { SecondLayoutComponent } from './layout/second-layout/second-layout.component';

const generateTitle = (title: string) => `Entertainment | ${title}`;

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        title: generateTitle('Home'),
        // canActivate: [canActivateGuard],
      },
      {
        path: 'movies',
        component: MoviesComponent,
        title: generateTitle('Movies'),
        // canActivate: [canActivateGuard],
      },
      {
        path: 'tv-series',
        component: TvSeriesComponent,
        title: generateTitle('Tv Series'),
        // canActivate: [canActivateGuard],
      },
      {
        path: 'bookmarks',
        component: BookmarksComponent,
        title: generateTitle('Bookmarks'),
        // canActivate: [canActivateGuard],
      },
    ],
  },
  {
    path: '',
    component: SecondLayoutComponent,
    children: [
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
    ],
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
