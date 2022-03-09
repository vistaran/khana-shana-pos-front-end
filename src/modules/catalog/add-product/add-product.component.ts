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

  get attributeFam() {
    return this.addProductForm.get('attributeFamily');
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

  constructor(private fb: FormBuilder,
    private products: ProductService) { }

  addProductForm!: FormGroup;

  attributeFamily = ['Default'];

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      product_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      status: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  onSubmit(data: any) {
    this.products
      .postProducts(data)
      .subscribe((result: any) => console.log(result));
    console.log('Form Submitted', (data));
  }

}
