import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMovieIconComponent } from '../icons/category-movie.icon';
import { CategoryTvIconComponent } from '../icons/category-tv.icon';
import { BookMarkFullIconComponent } from '../icons/bookmark-full.icon';
import { BookMarkEmptyIconComponent } from '../icons/bookmark-empty.icon';
import { PlayIconComponent } from '../icons/play.icon';
import { IData } from '../data.type';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    CategoryMovieIconComponent,
    CategoryTvIconComponent,
    BookMarkFullIconComponent,
    BookMarkEmptyIconComponent,
    PlayIconComponent,
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  // @Input({ required: true }) movie = {} as IMovie;
  @Input() movie = {} as IData;
  @Input() mode: 'regular' | 'trending' = 'regular';

  constructor(private dataService: DataService) {}

  bookmarkControl(id: string) {
    this.dataService.bookmarkControl(id);
  }
}
