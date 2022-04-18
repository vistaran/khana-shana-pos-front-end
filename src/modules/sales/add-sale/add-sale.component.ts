import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@modules/catalog/product.service';
import { CustomerManagementService } from '@modules/customer-management/customer-management.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  payment_mode: any

  payment_mode_copy = [
    {
      id: 1, name: 'Cash', alternate_name: 'cash'
    },
    {
      id: 2, name: 'UPI', alternate_name: 'upi'
    },
    {
      id: 3, name: 'Netbanking', alternate_name: 'net_banking'
    },
    {
      id: 3, name: 'Debit card', alternate_name: 'debit_card'
    },
    {
      id: 4, name: 'Credit card', alternate_name: 'credit_card'
    }
  ]

  // payment_mode_array = [
  //   {
  //     id: 1, name: 'cash',
  //   },
  //   {
  //     id: 2, name: 'upi'
  //   },
  //   {
  //     id: 3, name: 'net_banking'
  //   },
  //   {
  //     id: 3, name: 'debit_card'
  //   },
  //   {
  //     id: 4, name: 'credit_card'
  //   }
  // ]


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
      shipping_charge: [''],
      payment_mode: [''],
      notes: ['']
    })

    this.qtyForm = this.fb.group({
      quantity: ['']
    })

    this.customerForm = this.fb.group({
      customer_id: ['']
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
    this.customerService.getCustomerData(this.page).subscribe(data => {
      this.customerData = data.customers
    })
  }

  onSelectProduct(data: any, qty: any) {

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



    // this.payment_mode_array.forEach((g: any) => {
    //   // console.log(g);
    //   if (g.id == data.payment_mode) {
    //     this.payment_mode = g.name
    //   }
    // });

    const obj = {
      shipping_charge: data.shipping_charge,
      total_amount: this.total,
      products: addedProductSubmit,
      payment_mode: data.payment_mode,
      customer_id: this.customer_id,
      notes: data.notes
    }

    console.log(obj);

    this.saleService.postOrder(obj).subscribe((result: any) => {
      console.log(result)
      this.toast.success('Success', 'Added Successfully.')
      this.router.navigate(['/sales']);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  // search(event: any) {
  //   this.showloader = true
  //   this.customerService.searchCustomer(this.searchValue).subscribe(res => {
  //     this.customerData = res.customers
  //     this.showloader = false
  //     // console.log(this.outletData.length)
  //   }, err => {
  //     this.toast.error('Error', 'Server error.')
  //     this.showloader = false
  //   });
  // }


}
