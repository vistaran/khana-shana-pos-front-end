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

  payment_mode: any

  today = new Date()
  dd = this.today.getDate();
  mm = this.today.getMonth()+1; // January is 0!
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

  get customer() {
    return this.customerForm.get('customer_id');
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
      quantity: ['']
    })

    this.customerForm = this.fb.group({
      customer_id: [null, [Validators.required]]
    })
    this.getProductsData()
    this.getCustomerData()

  }

  getProductsData() {
    this.productService.getProducts().subscribe(data => {
      this.productData = data.products.data
      // console.log(this.productData);
    })
  }

  getCustomerData() {
    this.saleService.getCustomerData(this.pageSize).subscribe((result: any) => {
      this.customerData = result.data
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

  onSelectDate(date: any) {
    console.log(date);
    this.date = date.year + '-' + date.month + '-' + date.day
    console.log(this.date);
  }

  onSelectProduct(data: any, qty: any) {
    let invalid;
    this.addedProduct.forEach((g: any) => {
      if (data.product_name == g.product_name) {
        invalid = true
      }
    })
    if (invalid) {
      this.toast.warning('Warning', 'Product is already added.')
      return;
    }
    console.log('Quantity', qty.quantity);

    this.productData.forEach((g: any) => {
      g.quantity = 0;
      g.subtotal = 0;
      // console.log(g)
      if (g.id == data.id) {
        g.quantity += qty.quantity
        g.subtotal += (data.price * qty.quantity)
        this.addedProduct.push(g)

        this.ngOnInit()
      }
      console.log(this.addedProduct);

    });

    this.semitotal = this.addedProduct.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })

    this.total += (data.quantity * data.price)
    this.calculateTotal()
    // console.log('Added Product', this.addedProduct);
  }

  onSelectCustomer(data: any) {
    // console.log(data.value.customer_id);
    this.customer_id = data.value.customer_id
    console.log('Customer id: ', this.customer_id);

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
    this.shipping_charge = Number(event.target.value);
    // console.log(typeof (this.shipping_charge));
    this.calculateTotal();
  }

  RemoveProduct(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.addedProduct = this.addedProduct.filter((item: any) => item.id !== id);
      console.log('afterdelete', this.addedProduct);
    }
  }

  calculateTotal() {
    this.total = Number(this.shipping_charge) + Number(this.semitotal);
  }

  onSubmit(data: any) {

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

    if(this.date == '') {
      this.date = this.curr_date.year + '-' + this.curr_date.month + '-' + this.curr_date.day
    }


    const obj = {
      shipping_charge: data.shipping_charge,
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
      this.toast.error('Error', 'Server error.')
    });
  }



}
