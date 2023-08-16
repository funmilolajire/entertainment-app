import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondLayoutComponent } from 'src/app/layout/second-layout/second-layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SecondLayoutComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  signInError = '';

  constructor(private router: Router, private supabase: SupabaseService) {}

  async onSubmit(f: NgForm): Promise<void> {
    try {
      this.loading = true;
      const email = f.value.email as string;
      const password = f.value.password as string;
      const { error, data } = await this.supabase.signIn(email, password);
      console.log({ ...data });
      if (error) throw error;
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

  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }
}
