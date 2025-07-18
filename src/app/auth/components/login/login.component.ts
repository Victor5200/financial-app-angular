import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastService} from '../../../shared/services/toats.service';
import {AuthService} from '../../../services/auth.service'
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly toastService: ToastService,
              private readonly authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login attempt:', { email, password });

      this.authService.authenticate(email, password).subscribe({
        next: (response) => {
          debugger
          localStorage.setItem('token', response.token);

          localStorage.setItem('user', JSON.stringify({
            username: response.username,
            id: response.id,
          }));

          this.toastService.showToast('Login Successful', 'Welcome back!', 'SUCCESS');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.toastService.showToast('Login Failed', 'Invalid email or password.', 'ERROR');
        }
      });
    } else {
      this.toastService.showToast('Required Fields', 'Please fill in all required fields correctly.', 'WARNING');
    }
  }

  forgotPassword(): void {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this.router.navigate(['/forgot-password']);
    } else {
      this.toastService.showToast('Reset Password', 'Please enter your email to reset password.', 'WARNING');
    }
  }
}
