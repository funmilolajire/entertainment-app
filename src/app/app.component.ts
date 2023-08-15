import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { DataService } from './shared/data.service';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData();
  }

  ngOnDestroy(): void {
    // this.dataService.dataChangeSub.unsubscribe();
  }
}
