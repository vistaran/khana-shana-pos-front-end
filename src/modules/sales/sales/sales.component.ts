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
  total = 0
  pageSize = 10
  page = 1
  showloader: any
  length = 0
  searchValue: any

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
    this.showloader = true
    this.saleService.getOrderData(this.page).subscribe((data: any) => {

      data.orders.data.forEach((element: any) => {
        if (element.payment_mode == 'cash') {
          element.payment_mode = 'Cash';
        }
        else if (element.payment_mode == 'credit_card') {
          element.payment_mode = 'Credit Card';
        } else if (element.payment_mode == 'debit_card') {
          element.payment_mode = 'Debit Card';
        } else if (element.payment_mode == 'net_banking') {
          element.payment_mode = 'Net Banking';
        } else if (element.payment_mode == 'upi') {
          element.payment_mode = 'UPI';
        }
      })

      this.orderData = data.orders.data
      this.total = data.orders.total
      console.log(this.orderData);
      this.showloader = false



    }, err => {
      this.toast.error('Error', 'Server error.')
      this.showloader = false
    });
  }

  onPageChange(event: number) {
    this.page = event;
    this.getOrderData();
  }

  getOrderDetail(id: number) {
    this.saleService.orderDetailData(id).subscribe((data: any) => {

      if (data.order.payment_mode == 'cash') {
        data.order.payment_mode = 'Cash';
      }
      else if (data.order.payment_mode == 'credit_card') {
        data.order.payment_mode = 'Credit Card';
      } else if (data.order.payment_mode == 'debit_card') {
        data.order.payment_mode = 'Debit Card';
      } else if (data.order.payment_mode == 'net_banking') {
        data.order.payment_mode = 'Net Banking';
      } else if (data.order.payment_mode == 'upi') {
        data.order.payment_mode = 'UPI';
      }

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

  search() {
    this.showloader = true
    this.page = 1
    this.saleService.searchSales(this.page, this.searchValue).subscribe((data: any) => {

      data.orders.data.forEach((element: any) => {
        if (element.payment_mode == 'cash') {
          element.payment_mode = 'Cash';
        }
        else if (element.payment_mode == 'credit_card') {
          element.payment_mode = 'Credit Card';
        } else if (element.payment_mode == 'debit_card') {
          element.payment_mode = 'Debit Card';
        } else if (element.payment_mode == 'net_banking') {
          element.payment_mode = 'Net Banking';
        } else if (element.payment_mode == 'upi') {
          element.payment_mode = 'UPI';
        }
      })

      this.orderData = data.orders.data
      this.total = data.orders.total
      this.length = this.orderData.length
      this.showloader = false
    }, err => {
      this.toast.error('Error', 'Server error.')
      this.showloader = false
    });
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

}
