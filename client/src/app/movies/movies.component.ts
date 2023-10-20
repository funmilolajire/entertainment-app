import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { ContentHeadingComponent } from '../shared/content-heading/content-heading.component';
import { MovieCardComponent } from '../shared/movie-card/movie-card.component';
import { DataService } from '../shared/data.service';
import { IData } from '../shared/data.type';
import { SearchResultsComponent } from '../shared/search-results/search-results.component';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    ContentHeadingComponent,
    MovieCardComponent,
    SearchResultsComponent,
    LayoutComponent,
  ],
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: IData[] = [];
  searchTerm = '';

  constructor(private dataService: DataService) {}

  searchMovies(term: string) {
    this.searchTerm = term;
    this.dataService.dataChangeSub.subscribe((data) => {
      this.movies = data.filter(
        (data) =>
          data.category === 'Movie' &&
          data.title.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  ngOnInit(): void {
    this.dataService.dataChangeSub.subscribe((data) => {
      this.movies = data.filter((data) => data.category === 'Movie');
    });
  }
}
