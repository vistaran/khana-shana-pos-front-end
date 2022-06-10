import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseOrdersService } from '../purchase-orders.service';

@Component({
  selector: 'sb-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {

  public purchaseOrdersData: any = [];
  orderDetail: any = []
  itemDetail: any = []
  public length = 0;
  public total = 0;
  public id = 0;
  page = 1;
  pageSize = 10;
  itemsPerPage: any;
  searchValue: any
  showloader: any

  constructor(
    private purchaseOrderService: PurchaseOrdersService,
    private toast: AppToastService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPurchaseOrdersData();
  }

  // For getting Item group data for listing
  getPurchaseOrdersData() {
    this.showloader = true
    this.purchaseOrderService.getPurchaseOrdersData(this.page).subscribe(data => {
      this.showloader = false
      this.purchaseOrdersData = data.orders.data;
      this.length = this.purchaseOrdersData.length
      this.total = data.orders.total
      console.log(this.purchaseOrdersData);
    }, err => {
      this.showloader = false
      this.toast.error('Error', 'Server error.')
    });
  }

  // For navigating to add purchase order form on click
  onClick() {
    this.router.navigate(['/purchase_orders/add_purchase_order']);
  }


  // For updating data on page change
  onPageChange(event: number) {
    this.page = event;
    this.getPurchaseOrdersData();
  }

  // For deleting Item data
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.purchaseOrderService.deleteOrder(id).subscribe(data => {
        this.getPurchaseOrdersData();
        this.toast.success('Success', 'Puchase Order Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

  getOrderDetail(id: number) {
    this.purchaseOrderService.patchOrderData(id).subscribe((data: any) => {
      this.orderDetail = data.order[0]
      this.itemDetail = data.items
      console.log(this.orderDetail);

    })
  }

  search() {
    this.showloader = true
    this.page = 1
    this.purchaseOrderService.searchPurchaseOrder(this.searchValue, this.page).subscribe((data: any) => {
      this.purchaseOrdersData = data.orders.data;
      this.length = this.purchaseOrdersData.length
      this.total = data.orders.total
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
