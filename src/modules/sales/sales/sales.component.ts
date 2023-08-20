import { TableManagementService } from './../table-management.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'

import { SalesService } from '../sales.service';
import { UserDataService } from '@modules/pos/user-data.service';

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
    subtotal = 0;
    pageSize = 10
    page = 1
    showloader: any
    length = 0
    searchValue: any
    resultDisplayArray: any
    newDate: any;
    discount_amount = 0;
    shopDetails: any;
    isMobile = false;

    constructor(
        private router: Router,
        private saleService: SalesService,
        private toast: AppToastService,
        private modalService: NgbModal,
        public datepipe: DatePipe,
        private TableManagementService: TableManagementService,
        private userService: UserDataService,
    ) { }

    ngOnInit(): void {
        if (window.navigator.userAgent.toLowerCase().includes("mobi")
        ) {
            this.isMobile = true;

        } else {
            this.isMobile = false;
        }

        this.getOrderData()
        this.getshopDetails()
    }

    getshopDetails() {
        this.shopDetails = JSON.parse(localStorage.getItem('ShopDetails') || '{}');
    }
    getOrderData() {
        this.showloader = true
        this.saleService.getOrderData(this.page).subscribe({
            next: (data: any) => {

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
                this.showloader = false;

                console.log('After', this.orderData);



            }, error: err => {
                this.toast.error('Error', 'Server error.')
                this.showloader = false
            }
        });
    }

    onPageChange(event: number) {
        this.page = event;
        this.getOrderData();
    }

    getOrderDetail(id: number, print: any) {
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

            console.log(this.orderDetail, 'orderDetails');


            let semitotal = 0, discount_store = 0, total = 0;
            this.subtotal = 0;
            this.itemDetail.forEach((element: any) => {
                semitotal += element.subtotal;
            });

            if (this.orderDetail.discount_type == "percentage") {
                total = (this.orderDetail.shipping_charge + semitotal) * (100 - this.orderDetail.discount_amount) / 100;

                this.discount_amount = (this.orderDetail.shipping_charge + semitotal) - total;
            }
            this.orderDetail.discount_amount = this.discount_amount;

            console.log(this.discount_amount);

            this.newDate = this.orderDetail.order_date.slice(0, 10).split("-").reverse().join("-");
            console.log(this.newDate, 'newdate');

            console.log(this.itemDetail);

            this.getItems(this.itemDetail);

            if (print == true) {
                this.openInvoice();
            }

        })
    }

    editSale(orderId: any) {
        // [routerLink]="['/sales/edit_sale/' + data.id]"
        this.router.navigate(['/sales/edit_sale/' + orderId]);
    }

    printChefCopy(id: any) {

        this.getOrderDetail(id, false);

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

      body {
        font-size: 10px;
        font-family: Consolas,monaco,monospace;
      }
}

  </style>
    <body>
      <p class="text-align"></p>
      <h3 class="text-align">${this.shopDetails.shop_name}</h3>
      <p class="tax text-align">Order Summary</p>

        <p class="m-0">Order No.: <span class="font-bold">${this.orderDetail.id}</span></p>
        <p class="m-0">Table No.: <span class="font-bold">${this.orderDetail.table_number}</span></p>

      <span class="tax" style="margin-top: 0.5rem; margin-bottom: 0.5rem;"></span>
      <table style="width:100%;">
        <thead>
          <th style="text-align:start">Item name</th>
          <th style="text-align:start">Quantity</th>
        </thead>
        <tbody style="width:100%;text-align:center">
          ${this.getChefItems(this.itemDetail)}
          <tr>
            <td colspan="2"></td>
            <td colspan="1"><span class="tax"></span></td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
            let printCopy = window.open("", "MsgWindow", "");
            printCopy?.document.write(htmlContent);
            setTimeout(() => {
                printCopy?.print();
                printCopy?.focus();
                printCopy?.close();
            });

        }
    }
    onClick() {
        this.router.navigate(['/sales/add_sale'])
    }

    // For deleting Item data
    deleteRow(id: number) {
        if (confirm('Are you sure you want to delete?')) {
            this.saleService.deleteOrder(id).subscribe({
                next: data => {
                    this.getOrderData();
                    this.toast.success('Success', 'Order Deleted Successfully.')
                }, error: err => {
                    this.toast.error('Error', 'Server error.')
                }
            });
        }
    }

    search() {
        this.showloader = true
        this.page = 1
        this.saleService.searchSales(this.page, this.searchValue).subscribe({
            next: (data: any) => {

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
            }, error: err => {
                this.toast.error('Error', 'Server error.')
                this.showloader = false
            }
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
      <td style="text-align:start">${items[i].product_name} x${items[i].quantity}</td>
      <td>₹${items[i].price?.toFixed(2)}</td>
      <td>₹${items[i].subtotal?.toFixed(2)}</td>
      </tr>`;
        }
        // change code above this line
        console.log(this.resultDisplayArray);

        return this.resultDisplayArray;
    }

    getChefItems(items: any) {
        this.resultDisplayArray = [];
        for (let i = 0; i < items.length; i++) {
            this.resultDisplayArray += `<tr>
      <td style="text-align:start">${items[i].product_name}</td>
      <td>x${items[i].quantity}</td>
      </tr>`;
        }
        // change code above this line
        console.log(this.resultDisplayArray);

        return this.resultDisplayArray;
    }

    openInvoice() {
        if (this.orderDetail.id != undefined) {

            let shopDetails = JSON.parse(localStorage.getItem('ShopDetails') || '{}');
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

      body {
        font-size: 10px;
        font-family: Consolas,monaco,monospace;
      }
}

  </style>
    <body>
      <p class="text-align"><img src="${this.shopDetails.logo}" alt="" width="30" /></p>
      <h3 class="text-align">${this.shopDetails.shop_name}</h3>
      <p class="text-align m-0">High quality meals</p>
      <p class="text-align m-0">(Takeaway, Delievery, Dining)</p>
      <p class="text-align">FF-122, Infocity Supermall 2, Infocity Gandhinagar-382007 </p>
      <p class="tax text-align">Order Summary</p>

        <p class="m-0">Date: <span class="font-bold">${this.newDate}</span></p>
        <p class="m-0">Order No.: <span class="font-bold">${this.orderDetail.id}</span></p>
        <p class="m-0">Payment mode: <span class="font-bold">${this.orderDetail.payment_mode}</span></p>

      <span class="tax" style="margin-top: 0.5rem; margin-bottom: 0.5rem;"></span>
      <table style="width:100%;">
        <thead>
          <th style="text-align:start">Item name</th>
          <th>Rate</th>
          <th>Amount</th>
        </thead>
        <tbody style="width:100%;text-align:center">
          ${this.getItems(this.itemDetail)}
          <tr>
            <td colspan="2"></td>
            <td colspan="1"><span class="tax"></span></td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: end;">Subtotal: </td>
            <td>₹${Math.round(this.orderDetail.total_amount?.toFixed(2) - this.orderDetail.shipping_charge?.toFixed(2) + Number(this.orderDetail.discount_amount?.toFixed(2))).toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: end;">Discount amt: </td>
            <td>₹${this.discount_amount?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: end;">Packaging charges: </td>
            <td>₹${this.orderDetail.shipping_charge?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3"><span class="tax"></span></td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: end;">Total: </td>
            <td>₹${this.orderDetail.total_amount?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3"><span class="tax"></span></td>
          </tr>
        </tbody>
      </table>

      <p class="text-align">FSSAI No. 20722009000398</p>
      <p class="text-align m-0">Mo.: 6351637510</p>
      <p class="text-align m-0">Email: myjamanvaar@gmail.com</p>
      <p class="text-align">Thank you! Please visit again.</p>
      <p class="text-align" style="font-size: 25px; color: black; filter: grayscale(1);">&#128578;</p>
    </body>
  </html>
  `;
            let invoice = window.open("", "MsgWindow", "");
            invoice?.document.write(htmlContent);
            // setTimeout(() => {
            //     invoice?.print();
            //     invoice?.focus();
            //     invoice?.close();
            // });

        }
    }

    unOccupyTable(data: any) {
        console.log(data, 'data');

        let submitData = {
            res_table_name: '',
            is_table_occupied: 0
        };

        let salesData = {
            table_number: null
        }

        this.TableManagementService.unOccupyTable(data.table_number, submitData).subscribe({
            next: (result: any) => {
                console.log(result);
                this.TableManagementService.unOccupyTableFromSales(data.id, salesData).subscribe({
                    next: (res2: any) => {
                        this.getOrderData();
                    }, error: err => {
                        this.toast.error('Error', 'Something went wrong. Please try again!');
                    }
                })

                this.getOrderData();
                // this.toast.success('Success', 'Table data updated successfully!');
                this.toast.success('Success', 'Table Marked as unoccupied!');
                // this.router.navigate(['/sales/table_management']);
            }, error: err => {
                this.toast.error('Error', 'Something went wrong. Please try again!');
            }
        })
    }
}

