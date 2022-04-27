import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SalesService } from '../sales.service';

@Component({
  selector: 'sb-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  orderData: any = [];
  orderDetail: any = [];
  itemDetail: any = [];


  constructor(
    private router: Router,
    private saleService: SalesService,
    private toast: AppToastService,
    private modalService: NgbModal
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

  getOrderDetail(id: number) {
    this.saleService.orderDetailData(id).subscribe((data) => {
      this.orderDetail = data.order
      this.itemDetail = data.items
      console.log(this.orderDetail);

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
        this.toast.success('Success', 'Order Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

}
