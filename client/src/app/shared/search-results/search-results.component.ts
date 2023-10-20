import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IData } from '../data.type';
import { ContentHeadingComponent } from '../content-heading/content-heading.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, ContentHeadingComponent, MovieCardComponent],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() searchResults = [] as IData[];
  @Input() searchTerm = '';
}
