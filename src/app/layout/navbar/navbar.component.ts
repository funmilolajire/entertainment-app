import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavHomeComponent } from 'src/app/shared/icons/nav-home';
import { NavMoviesComponent } from 'src/app/shared/icons/nav-movies';
import { NavTvSeriesComponent } from 'src/app/shared/icons/nav-tv-series';
import { NavBookMarksComponent } from 'src/app/shared/icons/nav-bookmarks';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBookMarksComponent,
    NavHomeComponent,
    NavMoviesComponent,
    NavTvSeriesComponent,
    NavItemComponent,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {}
