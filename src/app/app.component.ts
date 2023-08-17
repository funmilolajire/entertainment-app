import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { DataService } from './shared/data.service';
import { SupabaseService } from './supabase.service';

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {
  session = this.supabase.session;

  constructor(
    private dataService: DataService,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => (this.session = session));
    this.dataService.fetchData();
  }

  ngOnDestroy(): void {
    // this.dataService.dataChangeSub.unsubscribe();
  }
}
