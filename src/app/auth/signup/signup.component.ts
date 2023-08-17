import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SecondLayoutComponent } from 'src/app/layout/second-layout/second-layout.component';
import { SupabaseService } from 'src/app/supabase.service';
import { IsloggedinComponent } from '../isloggedin/isloggedin.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    SecondLayoutComponent,
    ReactiveFormsModule,
    IsloggedinComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  loading = false;
  isLoggedIn = false;
  signUpError = '';
  signupForm: FormGroup = new FormGroup({});
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  repeat_password = new FormControl('', [Validators.required]);
  passwordChange$ = new BehaviorSubject('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.repeat_password.addValidators(this.samePasswordValidator());
    this.password.addValidators(this.samePasswordValidator('password'));
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password,
      repeat_password: this.repeat_password,
    });
    this.passwordChange$.subscribe((password) =>
      this.repeat_password.setErrors(
        password === this.repeat_password.value
          ? this.repeat_password.errors
          : { ...(this.repeat_password.errors || {}), samePassword: true }
      )
    );
    this.isLoggedIn = !!this.route.snapshot.data['isLoggedIn'];
  }

  samePasswordValidator(mode?: string): ValidatorFn {
    return (): ValidationErrors | null => {
      const password = this.password.value;
      const repeat_password = this.repeat_password.value;
      if (mode === 'password') {
        this.passwordChange$.next(password || '');
        return null;
      }
      return password === repeat_password ? null : { samePassword: true };
    };
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signupForm.value.email as string;
      const password = this.signupForm.value.password as string;
      const { error, data } = await this.supabase.signUp(email, password);
      if (error) throw error;
      if (data.user) this.router.navigateByUrl('/login');
    } catch (error) {
      if (error instanceof Error) {
        this.signUpError = error.message;
        console.log(error.message);
      }
    } finally {
      this.signupForm.reset();
      this.loading = false;
    }
  }

  loggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.passwordChange$.unsubscribe();
  }
}
