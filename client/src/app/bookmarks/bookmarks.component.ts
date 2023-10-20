import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { ContentHeadingComponent } from '../shared/content-heading/content-heading.component';
import { MovieCardComponent } from '../shared/movie-card/movie-card.component';
import { IData } from '../shared/data.type';
import { DataService } from '../shared/data.service';
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
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks = { movies: [] as IData[], series: [] as IData[] };
  searchResults = [] as IData[];
  searchTerm = '';
  constructor(private dataService: DataService) {}
  searchBookmarks(term: string) {
    this.searchTerm = term;
    this.dataService.dataChangeSub.subscribe((data) => {
      this.searchResults = data.filter(
        (data) =>
          data.isBookmarked &&
          data.title.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
  ngOnInit(): void {
    this.dataService.dataChangeSub.subscribe((data) => {
      this.bookmarks.movies = data.filter(
        (data) => data.isBookmarked && data.category === 'Movie'
      );
      this.bookmarks.series = data.filter(
        (data) => data.isBookmarked && data.category !== 'Movie'
      );
    });
  }
}
