import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

import { SalesService } from '../sales.service';
import { Template } from '@angular/compiler/src/render3/r3_ast';

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
  resultDisplayArray: any

  constructor(
    private router: Router,
    private saleService: SalesService,
    private toast: AppToastService,
    private modalService: NgbModal,
    public datepipe: DatePipe
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
      console.log(this.itemDetail);

      this.getItems(this.itemDetail);


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
    console.log(content);
  }

  getItems(items: any) {
    this.resultDisplayArray = [];
    for (let i = 0; i < items.length; i++) {
      this.resultDisplayArray += `<tr>
      <td style="text-align:start">${items[i].product_name}</td>
      <td>${items[i].quantity}</td>
      <td>₹${items[i].price?.toFixed(2)}</td>
      <td>₹${items[i].subtotal?.toFixed(2)}</td>
      </tr>`;
    }
    // change code above this line
    console.log(this.resultDisplayArray);

    return this.resultDisplayArray;
  }

  openInvoice(content: any) {
    if (this.orderDetail.id != undefined) {

      let htmlContent = `  
      <!DOCTYPE html>
      <html lang="en">
      <style>
        .text-align {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          text-align: center
        }
  
      p {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
  
      .m-0 {
        margin-top: 0;
        margin-bottom: 0;
      }
  
      .font-bold {
        font-weight: bold;
      }
      .tax:before, .tax:after {
        content: "";
        flex: 1 1;
        border-bottom: 1px dashed #000;
        margin: auto;
      }
  
      .tax {
        display: flex;
        flex-direction: row;
      }
  
      .grid-container {
        display: grid;
        grid-template-columns: auto auto;
      }
  
  </style>
    <body>    
      <h3 class="text-align">Jamanvaar Kitchen</h3>
      <p class="text-align">FF-122, Infocity Supermall 2, Infocity Gandhinagar-382007 </p>
      <p class="text-align">Mo.: 6351637510</p>
      <p class="text-align">Fssai no. 20722009000398</p>
      <p class="tax text-align">INVOICE</p>
      <div class="grid-container">
        <p class="m-0">Date: <span class="font-bold">${this.orderDetail.order_date?.slice(0, 10)}</span></p>
        <p></p>
        <p class="m-0">Order No.: <span class="font-bold">${this.orderDetail.id}</span></p>
        <p></p>
        <p class="m-0">DBoy: <span class="font-bold">Rahul</span></p>
        <p class="m-0">Payment mode: <span class="font-bold">${this.orderDetail.payment_mode}</span></p>
      </div>
      <span class="tax" style="margin-top: 0.5rem; margin-bottom: 0.5rem;"></span>
      <table style="width:100%">
        <thead>
          <th style="text-align:start">Item name</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </thead>
        <tbody style="width:100%;text-align:center">
          ${this.getItems(this.itemDetail)}
          <tr>
            <td colspan="2"></td>
            <td colspan="2"><span class="tax"></span></td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: end;">Subtotal: </td>
            <td>₹${(this.orderDetail.total_amount?.toFixed(2) - this.orderDetail.shipping_charge?.toFixed(2)).toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: end;">Shipping charges: </td>
            <td>₹${this.orderDetail.shipping_charge?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="4"><span class="tax"></span></td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: end;">Total: </td>
            <td>₹${this.orderDetail.total_amount?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="4"><span class="tax"></span></td>
          </tr>
        </tbody>
      </table>
  
      <p class="text-align">Thank you! Please visit again.</p>
      <p class="text-align">Email: myjamanvaar@gmail.com</p>
    </body>
  </html>
  `;
      console.log(Date.now());

      let invoice = window.open("", "", "");
      invoice?.document.write(htmlContent);
      invoice?.print();
      invoice?.focus();
      invoice?.close();
    }
  }
}

