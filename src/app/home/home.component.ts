import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  data = { trending: [] as IData[], recommended: [] as IData[] };
  searchResults = [] as IData[];
  searchTerm = '';

  // ? draggable props
  @ViewChild('sliderContainer') sliderContainerRef:
    | ElementRef<HTMLDivElement>
    | undefined;
  @ViewChild('slider') sliderRef: ElementRef<HTMLDivElement> | undefined;
  mousePressed = false;
  startPosition: number | undefined;
  currentPosition: number | undefined;

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

  ngAfterViewInit(): void {
    // this.startPosition = this.sliderRef
    //   ? this.sliderRef.nativeElement.offsetLeft
    //   : 0;
  }

  // ? handlers for draggable logic
  onMouseEnter(event: MouseEvent) {
    if (this.sliderContainerRef)
      this.sliderContainerRef.nativeElement.style.cursor = 'grab';
  }

  onMouseLeave(event: MouseEvent) {
    this.mousePressed = false;
  }

  onMouseUp(event: MouseEvent) {
    this.mousePressed = false;
    if (this.sliderContainerRef)
      this.sliderContainerRef.nativeElement.style.cursor = 'grab';
  }

  onMouseDown(event: MouseEvent) {
    this.mousePressed = true;
    this.startPosition =
      event.clientX - (this.sliderRef?.nativeElement.offsetLeft as number);
    if (this.sliderContainerRef)
      this.sliderContainerRef.nativeElement.style.cursor = 'grabbing';
  }

  checkBoundary() {
    let outer =
      this.sliderContainerRef?.nativeElement.getBoundingClientRect() as DOMRect;
    let inner =
      this.sliderRef?.nativeElement.getBoundingClientRect() as DOMRect;

    if (
      this.sliderRef &&
      parseInt(this.sliderRef?.nativeElement.style.left) > 0
    ) {
      this.sliderRef.nativeElement.style.left = '0px';
    }

    if (this.sliderRef && inner.right < outer.right) {
      this.sliderRef.nativeElement.style.left = `-${
        inner.width - outer.width
      }px`;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.mousePressed) return;
    event.preventDefault();

    this.currentPosition = event.clientX;
    if (this.sliderRef)
      this.sliderRef.nativeElement.style.left = `${
        this.currentPosition - (this.startPosition as number)
      }px`;
    this.checkBoundary();
  }
}
