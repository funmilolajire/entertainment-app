import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondLayoutComponent } from 'src/app/layout/second-layout/second-layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SecondLayoutComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;

  constructor(private router: Router) {}

  onSubmit(f: NgForm) {
    this.loading = true;
    console.log(f.value);
    this.loading = false;
    f.reset();
  }

  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }
}
