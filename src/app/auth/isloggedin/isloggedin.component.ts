import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-isloggedin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './isloggedin.component.html',
  styleUrls: ['./isloggedin.component.scss'],
})
export class IsloggedinComponent {
  @Output() loggedIn = new EventEmitter<boolean>();
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private supabase: SupabaseService
  ) {}
  navigateAway() {
    this.location.back();
  }

  async signOut() {
    try {
      this.loading = true;
      await this.supabase.signOut();
      this.loggedIn.emit(false);
      this.router.navigate(['/login']);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      this.loading = false;
    }
  }
}
