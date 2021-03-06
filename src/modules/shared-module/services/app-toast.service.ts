import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  toasts: any[] = [];

  show(header: string, body: string, options: any = {}) {
    this.toasts.push({ header, body, ...options });
  }

  success(header: string, body: string, options: any = {className: 'bg-success text-light'}) {
    this.toasts.push({ header, body, ...options });
  }

  error(header: string, body: string, options: any = {className: 'bg-danger text-light'}) {
    this.toasts.push({ header, body, ...options });
  }

  warning(header: string, body: string, options: any = {className: 'bg-warning text-light'}) {
    this.toasts.push({ header, body, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
