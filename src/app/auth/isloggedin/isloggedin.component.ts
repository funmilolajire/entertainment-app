import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-isloggedin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './isloggedin.component.html',
  styleUrls: ['./isloggedin.component.scss'],
})
export class IsloggedinComponent {
  loading = false;
  constructor(
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
      const { error } = await this.supabase.signOut();
      if (error) throw error;
      this.router.navigateByUrl('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      this.loading = false;
    }
  }
}
