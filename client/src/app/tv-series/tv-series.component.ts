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
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
})
export class TvSeriesComponent implements OnInit {
  series: IData[] = [];
  searchTerm = '';
  constructor(private dataService: DataService) {}
  searchSeries(term: string) {
    this.searchTerm = term;
    this.dataService.dataChangeSub.subscribe((data) => {
      this.series = data.filter(
        (data) =>
          data.category !== 'Movie' &&
          data.title.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
  ngOnInit(): void {
    this.dataService.dataChangeSub.subscribe((data) => {
      this.series = data.filter((data) => data.category !== 'Movie');
    });
  }
}
