import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondLayoutComponent } from 'src/app/layout/second-layout/second-layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';
import { IsloggedinComponent } from '../isloggedin/isloggedin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SecondLayoutComponent,
    FormsModule,
    IsloggedinComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  signInError = '';
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isLoggedIn = data['isLoggedIn'];
    });
  }

  async onSubmit(f: NgForm): Promise<void> {
    try {
      this.loading = true;
      const email = f.value.email as string;
      const password = f.value.password as string;
      const { error, data } = await this.supabase.signIn(email, password);
      if (error) throw error;
      if (data.session) this.router.navigateByUrl('/');
    } catch (error) {
      if (error instanceof Error) {
        this.signInError = error.message || 'An error occurred';
        console.log(error.message);
      }
    } finally {
      f.reset();
      this.loading = false;
    }
  }

  loggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }
}
