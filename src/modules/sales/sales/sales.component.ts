import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { SalesService } from '../sales.service';

@Component({
  selector: 'sb-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  orderData: any = [];


  constructor(
    private router: Router,
    private saleService: SalesService,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
    this.getOrderData()
  }

  getOrderData() {
    this.saleService.getOrderData().subscribe(data => {
      this.orderData = data.orders.data
      console.log(this.orderData);

    })
  }

  onClick() {
    this.router.navigate(['/sales/add_sale'])
  }

  // For deleting Item data
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.saleService.deleteOrder(id).subscribe(data => {
        this.getOrderData();
        this.toast.success('Success', 'Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

}
