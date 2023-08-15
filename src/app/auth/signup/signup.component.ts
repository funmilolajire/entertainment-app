import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SecondLayoutComponent } from 'src/app/layout/second-layout/second-layout.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, SecondLayoutComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loading = false;
  signupForm: FormGroup = new FormGroup({});
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  repeat_password = new FormControl('', [Validators.required]);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.repeat_password.addValidators(this.samePasswordValidator());
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password,
      repeat_password: this.repeat_password,
    });
  }

  samePasswordValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const password = this.password.value;
      const repeat_password = this.repeat_password.value;
      return password === repeat_password ? null : { samePassword: true };
    };
  }

  onSubmit() {
    this.loading = true;
    console.log(this.signupForm.value);
    this.loading = false;
    this.signupForm.reset();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
