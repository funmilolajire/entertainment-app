import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIconComponent } from 'src/app/shared/icons/search.icon';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, SearchIconComponent, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  term = '';
  @Input() placeholder = '';
  @Output() searchData = new EventEmitter<string>();

  handleSearch() {
    this.searchData.emit(this.term);
  }
}
