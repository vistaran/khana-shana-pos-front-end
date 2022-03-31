import { Component, OnInit } from '@angular/core';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

@Component({
  selector: 'sb-app-toasts-component',
  templateUrl: './app-toasts-component.component.html',
  styleUrls: ['./app-toasts-component.component.scss']
})
export class AppToastsComponentComponent implements OnInit {

  constructor(public toastService: AppToastService) { }

  ngOnInit(): void {
  }

}
