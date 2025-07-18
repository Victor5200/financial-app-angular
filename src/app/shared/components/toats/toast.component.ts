import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1050;">
      <div *ngFor="let toast of toasts"
           class="toast show"
           [ngClass]="{
             'bg-success text-white': toast.type === 'SUCCESS',
             'bg-warning text-dark': toast.type === 'WARNING',
             'bg-danger text-white': toast.type === 'ERROR'
           }"
           role="alert"
           aria-live="assertive"
           aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{ toast.title }}</strong>
          <button type="button" class="btn-close" (click)="removeToast(toast)"></button>
        </div>
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ToastComponent {
  @Input() toasts: { title: string; message: string; type: string; id: number }[] = [];

  removeToast(toast: { id: number }): void {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }
}
