import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ProductService } from '../product.service';

@Component({
  selector: 'sb-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  get productType() {
    return this.addProductForm.get('productType');
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get sku() {
    return this.addProductForm.get('sku');
  }

  get status() {
    return this.addProductForm.get('status');
  }

  get qty() {
    return this.addProductForm.get('quantity');
  }

  get price() {
    return this.addProductForm.get('price');
  }

  get family_name() {
    return this.addProductForm.get('attribute_family_name');
  }

  constructor(private fb: FormBuilder,
    private products: ProductService) { }

  addProductForm!: FormGroup;

  attributeFamily = ['default'];

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      product_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      status: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      attribute_family_name: ['', [Validators.required]]
    });
  }

  onSubmit(data: any) {
    this.products
      .postProducts(data)
      .subscribe((result: any) => console.log(result));
    console.log('Form Submitted', (data));
  }

}
