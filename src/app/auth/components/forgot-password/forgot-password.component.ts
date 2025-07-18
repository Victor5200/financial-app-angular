import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/services/toats.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly toastService: ToastService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(): void {
    if (this.forgotPasswordForm.valid) {
      this.toastService.showToast('Success', 'Password reset link sent!', 'SUCCESS');
      this.router.navigate(['/login']);
    } else {
      this.toastService.showToast('Error', 'Please enter a valid email address.', 'ERROR');
    }
  }
}
