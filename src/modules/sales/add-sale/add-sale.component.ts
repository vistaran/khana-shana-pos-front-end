import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@modules/catalog/product.service';
import { CustomerManagementService } from '@modules/customer-management/customer-management.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { SalesService } from '../sales.service';

@Component({
  selector: 'sb-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  productData: any = [];
  addedProduct: any = [];
  customerData: any = []
  addSaleForm!: FormGroup
  qtyForm!: FormGroup
  customerForm!: FormGroup
  selectedCity: any
  pageSize = 100
  showProducts = false;

  payment_mode: any

  today = new Date()
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1; // January is 0!
  yyyy = this.today.getFullYear();

  curr_date: NgbDate = new NgbDate(this.yyyy, this.mm, this.dd);
  date = ''

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
  ]

  shipping_charge = 0;
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

  get customer() {
    return this.customerForm.get('customer_id');
  }

  get quantity() {
    return this.qtyForm.get('quantity');
  }

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private customerService: CustomerManagementService,
    private saleService: SalesService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addSaleForm = this.fb.group({
      shipping_charge: [0],
      order_date: [this.curr_date],
      payment_mode: ['cash'],
      notes: ['']
    })

    this.qtyForm = this.fb.group({
      quantity: ['', [Validators.required]]
    })

    this.customerForm = this.fb.group({
      customer_id: [null, [Validators.required]]
    })
    this.getProductsData()
    this.getCustomerData()

  }

  getProductsData() {
    this.productData = [];
    this.productService.getProducts(this.page).subscribe((data: any) => {
      this.productData = data.products.data;
      console.log(data);
      if (data.products.last_page > 1) {
        console.log('greater');
        for (let i = 2; i <= data.products.last_page; i++) {
          console.log();
          this.productService.getProducts(i).subscribe((ele: any) => {
            this.productData = this.productData.concat(ele.products.data);
            console.log(ele.products.data);
          })
        }
        this.showProducts = true;
        console.log(this.productData, 'pro data');

      } else {
        this.showProducts = true;
      }
      // this.productData = data.products.data
      // console.log(this.productData);
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
    this.customerService.searchCustomer(event.term).subscribe((res: any) => {
      this.customerData = res.customers.data
      console.log(this.customerData);
    }, err => {
      this.toast.error('Error', 'Server error.')
      this.showloader = false
    });
  }

  qtyClose() {
    this.qtyForm = this.fb.group({
      quantity: ['', [Validators.required]]
    })
  }

  onSelectDate(date: any) {
    console.log(date);
    this.date = date.year + '-' + date.month + '-' + date.day
    console.log(this.date);
  }

  onSelectProduct(data: any, qty: any) {

    if (this.qtyForm.invalid) {
      this.showValidations = true;
      alert('Please enter quantity');
      return;
    }

    let invalid;

    this.modalService.dismissAll();

    this.addedProduct.forEach((g: any) => {
      if (data.product_name == g.product_name) {
        invalid = true
      }
    })
    if (invalid) {
      this.toast.warning('Warning', data.product_name + ' is already added.')
      return;
    }
    console.log('Quantity', qty.quantity);

    this.productData.forEach((g: any) => {
      // g.quantity = 0;
      // g.subtotal = 0;
      // console.log(g)
      if (g.id == data.id) {
        g.quantity = qty.quantity
        g.subtotal = (data.price * qty.quantity)
        this.addedProduct.push(g)

        // this.ngOnInit()
      }
      console.log(this.addedProduct);

    });

    this.semitotal = this.addedProduct.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })

    this.toast.success('Success', 'Product added successfully.');
    this.qtyForm = this.fb.group({
      quantity: ['', [Validators.required]]
    })

    this.total += (data.quantity * data.price)
    this.calculateTotal()
    // console.log('Added Product', this.addedProduct);
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
      alert('Please add atleast one item to input shipping charges!');
      this.shipping_charge = 0;
      return;
    }

    if (showShipping) {
      this.shipping_charge = Number(charges);
      this.calculateTotal();
    }
  }


  RemoveProduct(id: any) {
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
      setTimeout(() => { this.onKey(this.shipping_charge) }, 500);
      setTimeout(() => { this.calculateTotal() }, 500);
      this.toast.success('Success', 'Product deleted successfully.');
    }
  }

  calculateTotal() {
    this.total = Number(this.shipping_charge) + Number(this.semitotal);
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

    console.log(data);

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


    const obj = {
      shipping_charge: this.shipping_charge,
      total_amount: this.total,
      order_date: this.date,
      products: addedProductSubmit,
      payment_mode: data.payment_mode,
      customer_id: this.customer_id,
      notes: data.notes
    }

    console.log(obj);

    this.saleService.postOrder(obj).subscribe((result: any) => {
      console.log(result)
      this.toast.success('Success', 'Sales Order Added Successfully.')
      this.router.navigate(['/sales']);
    }, err => {
      this.toast.error('Error', 'Server Error')
      // this.router.navigate(['/auth/login'])
    });
  }



}
