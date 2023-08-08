import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavHomeIconComponent } from 'src/app/shared/icons/nav-home.icon';
import { NavMoviesIconComponent } from 'src/app/shared/icons/nav-movies.icon';
import { NavTvSeriesIconComponent } from 'src/app/shared/icons/nav-tv-series.icon';
import { NavBookMarksIconComponent } from 'src/app/shared/icons/nav-bookmarks.icon';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavBookMarksIconComponent,
    NavHomeIconComponent,
    NavMoviesIconComponent,
    NavTvSeriesIconComponent,
    NavItemComponent,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {}
