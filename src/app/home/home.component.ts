import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentHeadingComponent } from '../shared/content-heading/content-heading.component';
import { MovieCardComponent } from '../shared/movie-card/movie-card.component';
import { SearchbarComponent } from '../shared/searchbar/searchbar.component';
import { DataService } from '../shared/data.service';
import { IData } from '../shared/data.type';
import { SearchResultsComponent } from '../shared/search-results/search-results.component';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ContentHeadingComponent,
    MovieCardComponent,
    SearchbarComponent,
    SearchResultsComponent,
    LayoutComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data = { trending: [] as IData[], recommended: [] as IData[] };
  searchResults = [] as IData[];
  searchTerm = '';
  constructor(private dataService: DataService) {}

  searchData(term: string) {
    this.searchTerm = term;
    this.dataService.dataChangeSub.subscribe((data) => {
      this.searchResults = data.filter((data) =>
        data.title.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  ngOnInit(): void {
    this.dataService.dataChangeSub.subscribe((data) => {
      this.data.recommended = data.filter((data) => !data.isTrending);
      this.data.trending = data.filter((data) => data.isTrending);
    });
  }
}
