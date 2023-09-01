import { TableManagementService } from './../table-management.service';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@modules/catalog/product.service';
import { CustomerManagementService } from '@modules/customer-management/customer-management.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { SalesService } from '../sales.service';
import { UserDataService } from '@modules/pos/user-data.service';

@Component({
    selector: 'sb-add-sale',
    templateUrl: './add-sale.component.html',
    styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

    @HostListener('document:keydown.shift.s')
    categoryData: any = [];
    addedProduct: any = [];
    customerData: any = [];
    orderDetail: any = [];
    itemDetail: any = [];
    activeIds: any = [];
    addSaleForm!: FormGroup
    qtyForm!: FormGroup
    customerForm!: FormGroup
    discountForm!: FormGroup
    selectedCity: any
    pageSize = 100
    showProducts = false;
    shopDetails: any

    payment_mode: any

    today = new Date()
    dd = this.today.getDate();
    mm = this.today.getMonth() + 1; // January is 0!
    yyyy = this.today.getFullYear();

    curr_date: NgbDate = new NgbDate(this.yyyy, this.mm, this.dd);
    date = ''
    panels = ['First', 'Second', 'Third'];

    payment_mode_copy = [
        {
            id: 1, name: 'Cash', alternate_name: 'cash'
        },
        {
            id: 2, name: 'Credit card', alternate_name: 'credit_card'
        },
        {
            id: 3, name: 'Debit card', alternate_name: 'debit_card'
        },
        {
            id: 4, name: 'Netbanking', alternate_name: 'net_banking'
        },
        {
            id: 5, name: 'UPI', alternate_name: 'upi'
        }
    ];
    productQuantity: any = [];

    tableList: any = [];
    selectedTableId: any;

    qty = 1;
    shipping_charge = 0;
    discount_amount = 0;
    discount_store = 0;
    total = 0;
    semitotal = 0
    page = 1
    showloader: any
    searchValue: any
    showCustomerDetail = false;
    customerName: any
    customerNumber: any
    customer_id: any
    showValidations = false;
    showCustomerValidation = false;
    addCustomerForm!: FormGroup;
    newDate: any;
    resultDisplayArray: any
    showDiscount: any;
    showDiscountOption = false;
    discount_type: any;
    table_number: any;
    default_table_number: any;
    showCartSummary = false;



    get customer() {
        return this.customerForm.get('customer_id');
    }

    get quantity() {
        return this.qtyForm.get('quantity');
    }


    get firstname() {
        return this.addCustomerForm.get('first_name');
    }

    get lastname() {
        return this.addCustomerForm.get('last_name');
    }

    get phone() {
        return this.addCustomerForm.get('phone_number');
    }

    get getFormData(): FormArray {
        return <FormArray>this.qtyForm.get('quantity');
    }



    constructor(
        private productService: ProductService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        private customerService: CustomerManagementService,
        private saleService: SalesService,
        private toast: AppToastService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private renderer: Renderer2,
        private TableManagementService: TableManagementService,
        private userService: UserDataService,
    ) { }

    ngOnInit(): void {

        this.addSaleForm = this.fb.group({
            shipping_charge: [0],
            order_date: [this.curr_date],
            payment_mode: ['cash'],
            notes: [''],
            table_number: []
        })

        this.discountForm = this.fb.group({
            discount: [0]
        })

        // this.qtyForm = this.fb.group({
        //     quantity: ['', [Validators.required]]
        // })

        this.qtyForm = this.fb.group({
            quantity: this.fb.array([])
        });

        this.customerForm = this.fb.group({
            customer_id: [null, [Validators.required]]
        })

        this.addCustomerForm = this.fb.group({
            first_name: ['', [Validators.required]],
            last_name: [''],
            phone_number: ['']
        })

        this.activeRoute.queryParams.subscribe((params: any) => {
            if (params['table_number']) {
                this.default_table_number = params['table_number'];
            }
        });

        this.getProductsData()
        this.getCustomerData()
        this.getTableData()
        this.getshopDetails()
        // this.renderer.listen(document, 'keydown.shift.s', handler)
    }

    getshopDetails() {
        this.shopDetails = JSON.parse(localStorage.getItem('ShopDetails') || '{}');

    }
    validateNumber(event: any) {

        var inp = String.fromCharCode(event.keyCode);

        if (/[0-9]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    getProductsData() {
        this.categoryData = [];
        this.productService.getProducts(this.page).subscribe((data: any) => {
            data.data.forEach((element: any, index: any) => {
                console.log(element.products.length, 'len');

                if (element.products.length == 0) data.data.splice(index, 1);
            });

            data.data.forEach((element: any) => {
                element.products.forEach((pro: any) => {
                    pro.product_count = 0;
                });
            });
            this.categoryData = data.data;
            console.log(this.categoryData, 'pro');

            for (let i = 0; i < this.categoryData.length; i++) {
                this.activeIds.push("ngb-panel-" + i);
            }
            this.showProducts = true;
            // if (data.products.last_page > 1) {
            //     console.log('greater');
            //     for (let i = 2; i <= data.products.last_page; i++) {
            //         this.productService.getProducts(i).subscribe((ele: any) => {
            //             ele.forEach((element: any) => {
            //                 element.product_count = 0;
            //             });
            //             this.categoryData = this.categoryData.concat(ele.products.data);
            //             console.log(ele.products.data);
            //         })
            //     }
            //     console.log(this.categoryData, 'pro data');
            //     this.showProducts = true;

            // } else {
            //     this.showProducts = true;
            // }
            // this.categoryData = data.products.data
            // console.log(this.categoryData);
        })
    }

    getCustomerData() {
        this.saleService.getCustomerData(this.pageSize).subscribe((result: any) => {
            this.customerData = result.data.sort(function (a: any, b: any) {
                const nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            })
        })
    }

    searchCustomer(event: any) {
        console.log(event.term);
        this.customerService.searchCustomer(event.term).subscribe({
            next: (res: any) => {
                this.customerData = res.customers.data
                console.log(this.customerData);
            }, error: err => {
                this.toast.error('Error', 'Server error.')
                this.showloader = false
            }
        });
    }

    search(event: any) {
        this.showloader = true

        // this.filteredData = this.rowData.filter((item: templogRecord) => {
        //     return item.sensor.toLowerCase().includes(searchValue.toLowerCase());
        //   });
        console.log(this.searchValue);

        this.productService.searchProducts(this.searchValue).subscribe({
            next: (res: any) => {
                this.categoryData = res.data;

                for (let i = 0; i < this.categoryData.length; i++) {
                    this.activeIds.push("ngb-panel-" + i);
                }

                this.showloader = false
            }, error: err => {
                this.toast.error('Error', 'Server error.')
                this.showloader = false
            }
        });
    }

    getTableData() {
        this.TableManagementService.getTableManagementData().subscribe((data: any) => {
            console.log('table0', data);
            data.data.forEach((element: any) => {
                if (element.is_table_occupied == 0 && element.is_table_active == 1) {
                    console.log('true', element.is_table_occupied, element.is_table_active);

                    this.tableList.push(element);
                }
            });
            console.log(this.tableList, 'tableList');

            // this.tableList = data.data;
            if (this.default_table_number) {
                this.addSaleForm.get('table_number')?.setValue(this.default_table_number);
            } else {

                if (this.tableList.length > 0) {
                    this.addSaleForm.get('table_number')?.setValue(this.tableList[0].res_table_number);
                }
            }
        })
    }

    decreaseCount(catID: any, prodId: any, count: any) {
        this.categoryData.forEach((element: any, key: any) => {
            if (element.id == catID) {
                element.products.forEach((prod: any, key2: any) => {
                    if (prodId == prod.id) {
                        console.log(prod);
                        if (prod.product_count > 0) {
                            console.log(element, 'key');
                            prod.product_count = count - 1;
                        } else {
                            prod.product_count = 0;
                        }

                    }
                });
            }
        });
        this.onSelectProduct(this.categoryData);
    }

    increaseCount(catID: any, prodId: any, count: any) {

        this.categoryData.forEach((element: any, key: any) => {
            console.log(element, 'key');
            if (element.id == catID) {
                element.products.forEach((prod: any, key2: any) => {
                    if (prodId == prod.id) {
                        console.log(this.categoryData[key].products[key2]);
                        this.categoryData[key].products[key2].product_count = count + 1;
                    }
                });
            }
        });
        this.onSelectProduct(this.categoryData);
    }

    onTableChange(event: any) {
        console.log(event);
        this.tableList.forEach((element: any) => {
            if (element.res_table_number == event) {
                console.log(element.id);
                this.selectedTableId = element.id;
            }
        });

    }

    onSubmitCustomer(data: any) {

        if (this.addCustomerForm.invalid) {
            alert('Please fill all the required fields!');
            return;
        }

        this.modalService.dismissAll();

        this.customerService.postCustomerData(data)
            .subscribe({
                next: (result: any) => {
                    console.log(result.customers)
                    this.toast.success('Success', 'Customer Added Successfully.')
                    this.getCustomerData();
                    this.getCustomerDetail(result.customers);
                }, error: err => {
                    this.toast.error('Error', 'Server error.')
                }
            });
        console.log('Form Submitted', (data));
    }

    getCustomerDetail(id: any) {
        this.customerService.editCustomerForm(id).subscribe((data: any) => {
            this.customerName = data.first_name + ' ' + data.last_name;
            this.customerNumber = data.phone_number;
            this.customer_id = id;
            this.showCustomerDetail = true;
        })
    }

    selectCustomerClose() {

        this.customerForm = this.fb.group({
            customer_id: [null, [Validators.required]]
        });
        this.modalService.dismissAll();
    }

    qtyClose() {
        this.qtyForm = this.fb.group({
            quantity: ['', [Validators.required]]
        })
    }

    addCustomerClose() {

        this.addCustomerForm = this.fb.group({
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            phone_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
        });
        this.modalService.dismissAll();
    }

    onSelectDate(date: any) {
        console.log(date);
        this.date = date.year + '-' + date.month + '-' + date.day
        console.log(this.date);
    }

    onSelectProduct(data: any) {


        this.modalService.dismissAll();

        this.addedProduct = [];

        data.forEach((element: any) => {
            element.products.forEach((prod: any) => {
                if (prod.product_count > 0) {
                    prod.subtotal = prod.price * prod.product_count;
                    prod.quantity = prod.product_count;
                    this.addedProduct.push(prod);
                }
            });
        });

        console.log(this.addedProduct, 'added');

        // this.addedProduct.forEach((g: any) => {
        //     if (g.id == data.id) {
        //         g.quantity = 1;
        //         g.subtotal = data.price
        //         this.addedProduct.push(g)
        //         // this.ngOnInit()
        //     }
        //     // console.log(this.addedProduct);
        // });

        // if (this.qtyForm.invalid) {
        //     this.showValidations = true;
        //     alert('Please enter quantity');
        //     return;
        // }

        // let invalid;

        // this.addedProduct.forEach((g: any) => {
        //     if (data.product_name == g.product_name) {
        //         invalid = true
        //     }
        // })
        // if (invalid) {
        //     this.toast.warning('Warning', data.product_name + ' is already added.')
        //     return;
        // }
        // console.log('Quantity', data.qty);

        // this.categoryData.forEach((g: any) => {
        //     // g.quantity = 0;
        //     // g.subtotal = 0;
        //     // console.log(g)
        //     if (g.id == data.id) {
        //         g.quantity = 1;
        //         g.subtotal = data.price
        //         this.addedProduct.push(g)
        //         // this.ngOnInit()
        //     }
        //     // console.log(this.addedProduct);
        // });

        this.semitotal = this.addedProduct.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
            return a + b;
        })

        // this.toast.success('Success', 'Product added successfully.');

        this.productQuantity[this.addedProduct.length - 1] = 1;
        // this.qtyForm = this.fb.group({
        //     quantity: ['', [Validators.required]]
        // })

        console.log(this.productQuantity, 'quantity');


        this.total += (data.quantity * data.price);
        this.calculateTotal();
        // console.log('Added Product', this.addedProduct);
    }

    qtyChange(event: any, i: any) {
        console.log(event, 'val');

        let qty = Number(event?.target.value);
        console.log(qty);

        this.productQuantity[i] = qty;
        console.log(this.productQuantity);

        if (this.productQuantity[i] == 0) {
            console.log(true);
            this.productQuantity[i] = 1;
            qty = 1;
        }

        this.addedProduct[i].quantity = qty;
        this.addedProduct[i].subtotal = qty * this.addedProduct[i].price;
        this.semitotal = this.addedProduct.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
            return a + b;
        })

        console.log(this.addedProduct);


        this.calculateTotal();
    }

    addDiscount(obj: any) {
        console.log(obj);
        if (obj.discount == true) {
            this.showDiscountOption = true;
        } else {
            this.showDiscountOption = false;
            this.discount_amount = 0;
            this.calculateTotal();
        }
    }

    getDiscountType(event: any) {
        console.log(event);
        this.discount_type = event.target.value;
        this.calculateTotal(this.discount_amount);

    }

    getDiscountAmount(event: any) {

        console.log(typeof (event));

        let discount = 0;
        if (typeof (event) == 'object') {
            discount = event.target.value;
        } else {
            discount = event;
        }

        let showShipping = false;
        let total = 0;
        if (this.addedProduct.length != 0) {
            this.addedProduct.forEach((ele: any) => {
                total += ele.subtotal;
            })
            if (total <= discount) {
                alert('Discount cannot be greater than or equal to the total amount!');
                this.discount_amount = 0;
                this.total = total;
                showShipping = false;
            }
            else {
                showShipping = true;
            }
        }
        else {
            alert('Please add atleast one item to input discount!');
            this.discount_amount = 0;
            return;
        }

        if (showShipping) {
            this.discount_amount = Number(discount);
            this.calculateTotal(this.discount_amount);
            console.log(this.discount_amount, 'dis amount');

        }
    }

    onSelectCustomer(data: any) {
        // console.log(data.value.customer_id);

        if (this.customerForm.invalid) {
            this.showCustomerValidation = true;
            alert('Please select customer');
            return;
        }

        this.customer_id = data.value.customer_id
        console.log('Customer id: ', this.customer_id);

        this.modalService.dismissAll();

        this.customerData.forEach((g: any) => {

            if (g.id == data.value.customer_id) {
                this.customerName = g.first_name + ' ' + g.last_name
                this.customerNumber = g.phone_number
                this.showCustomerDetail = true
            }
        });
    }

    openVerticallyCentered(content: any) {
        this.modalService.open(content, { centered: true, size: 'sm' });
    }

    openModal(content: any) {
        this.modalService.open(content, { centered: true });
    }

    onKey(event: any) {

        console.log(typeof (event));

        let charges = 0;
        if (typeof (event) == 'object') {
            charges = event.target.value;
        } else {
            charges = event;
        }

        let showShipping = false;
        let total = 0;
        if (this.addedProduct.length != 0) {
            this.addedProduct.forEach((ele: any) => {
                total += ele.subtotal;
            })
            if (total <= charges) {
                alert('Shipping Charges cannot be greater than or equal to the total amount!');
                this.shipping_charge = 0;
                this.total = total;
                showShipping = false;
            }
            else {
                showShipping = true;
            }
        }
        else {
            // alert('Please add atleast one item to input shipping charges!');
            this.shipping_charge = 0;
            return;
        }

        if (showShipping) {
            this.shipping_charge = Number(charges);
            this.calculateTotal();
        }
    }

    removeProduct(id: any, catId: any) {
        if (confirm('Are you sure you want to delete?')) {
            this.addedProduct = this.addedProduct.filter((item: any) => item.id !== id);
            // console.log('afterdelete', this.addedProduct);
            if (this.addedProduct.length == 0) {
                this.semitotal = 0
            } else {
                this.semitotal = this.addedProduct.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
                    return a + b;
                })
            }

            console.log(this.addedProduct);
            this.decreaseCount(catId, id, 1);
            setTimeout(() => { this.onKey(this.shipping_charge) }, 500);
            setTimeout(() => { this.calculateTotal() }, 500);
            this.toast.success('Success', 'Product deleted successfully.');
        }
    }

    calculateTotal(discount?: any) {
        // console.log(discount);
        if (discount) {
            if (this.discount_type == "percentage") {
                console.log((Number(this.shipping_charge) + Number(this.semitotal)) * this.discount_amount);

                this.total = (Number(this.shipping_charge) + Number(this.semitotal)) * (100 - this.discount_amount) / 100;
                this.discount_store = (Number(this.shipping_charge) + Number(this.semitotal)) - this.total;
                console.log(this.discount_store);

            } else {
                this.total = Number(this.shipping_charge) + Number(this.semitotal) - Number(discount);
                this.discount_store = (Number(this.shipping_charge) + Number(this.semitotal)) - this.total;
                console.log(this.discount_store);
            }
        } else {
            this.total = Number(this.shipping_charge) + Number(this.semitotal);
            this.discount_store = 0;
        }
    }

    getItems(items: any) {
        console.log(items);


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

    getOrderDetail(id: number, print: any) {
        this.saleService.orderDetailData(id).subscribe((data: any) => {
            console.log(data, 'order data');

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

            this.newDate = this.orderDetail.order_date.slice(0, 10).split("-").reverse().join("-");
            console.log(this.newDate, 'newdate');

            console.log(this.itemDetail);

            this.getItems(this.itemDetail);

            if (print == true) {
                this.openInvoice();
            }

        })
    }

    openInvoice() {
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
      <p class="text-align"><img src="${this.shopDetails.logo}" alt="" width="25" /></p>
      <h3 class="text-align">${this.shopDetails.shop_name}</h3>
      <p class="text-align m-0">High quality meals</p>
      <p class="text-align m-0">(Takeaway, Delievery, Dining)</p>
      <p class="text-align">FF-122, Infocity Supermall 2, Infocity Gandhinagar-382007 </p>
      <p class="tax text-align">Order Summary</p>

        <p class="m-0">Date: <span class="font-bold">${this.newDate}</span></p>
        <p class="m-0">Order No.: <span class="font-bold">${this.orderDetail.id}</span></p>
        <p class="m-0">Payment mode: <span class="font-bold">${this.orderDetail.payment_mode}</span></p>
        <p class="m-0">Customer Name: : <span class="font-bold">${this.customerName ? this.customerName : '-'}</span></p>
        <p class="m-0">Table Number: <span class="font-bold">${this.table_number ? this.table_number : '-'}</span></p>

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
            <td>₹${this.discount_store?.toFixed(2)}</td>
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
            setTimeout(() => {
                invoice?.print();
                invoice?.focus();
                invoice?.close();
            });

        }
    }

    onSubmit(data: any) {

        // if (this.customerForm.invalid) {
        //   alert('Please select customer!');
        //   return;
        // }

        if (this.addSaleForm.invalid) {
            alert('Please fill all the required fields!');
            return;
        }

        if (this.addedProduct.length == 0) {
            alert('Please add atleast one product!');
            return;
        }

        // console.log(data);

        const addedProductSubmit: any = []

        this.addedProduct.forEach((g: any) => {
            addedProductSubmit.push({
                product_id: g.id,
                category_id: g.category_id,
                price: g.price,
                quantity: g.quantity,
                subtotal: g.subtotal
            })
            // console.log(g);

        });
        console.log('addedProductSubmit: ', addedProductSubmit);

        if (this.date == '') {
            this.date = this.curr_date.year + '-' + this.curr_date.month + '-' + this.curr_date.day
        }

        this.table_number = data.table_number;
        const obj = {
            shipping_charge: this.shipping_charge,
            total_amount: this.total,
            order_date: this.date,
            products: addedProductSubmit,
            payment_mode: data.payment_mode,
            customer_id: this.customer_id,
            notes: data.notes,
            table_number: data.table_number,
            discount_amount: this.discount_amount,
            discount_type: this.discount_type
        }

        console.log(obj);

        this.saleService.postOrder(obj).subscribe({
            next: (result: any) => {
                console.log(result, 'result data')
                this.toast.success('Success', 'Sales Order Added Successfully.');
                this.getOrderDetail(result.order.id, true);
                this.router.navigate(['/sales']);

                let table_name;
                if (this.customerName) {
                    table_name = this.customerName
                } else {
                    table_name = '-';
                }

                let tableData = {
                    table_number: data.table_number,
                    table_name: table_name,
                    table_occupied: 1,
                    table_active: 1
                }
                this.TableManagementService.editTableData(this.selectedTableId, tableData).subscribe({
                    next: data => {

                    }, error: err => {
                        this.toast.error('Error', 'Table could not be marked as occupied');
                    }
                })
            }, error: err => {
                this.toast.error('Error', 'Server Error')
                // this.router.navigate(['/auth/login'])
            }
        });
    }



}
