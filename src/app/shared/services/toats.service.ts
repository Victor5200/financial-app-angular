import { Injectable } from '@angular/core';

type ToastType = 'SUCCESS' | 'WARNING' | 'ERROR';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: { title: string; message: string; type: ToastType; id: number }[] = [];
  private idCounter = 0;

  getToasts(): { title: string; message: string; type: ToastType; id: number }[] {
    return this.toasts;
  }

  showToast(title: string, message: string, type: ToastType, duration: number = 3000): void {
    const id = this.idCounter++;
    this.toasts.push({ title, message, type, id });

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, duration);
  }
}
