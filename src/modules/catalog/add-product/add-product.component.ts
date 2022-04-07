import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { AttributeFamilyService } from '../attribute-family.service';

import { ProductService } from '../product.service';

@Component({
  selector: 'sb-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  attributeFamilyData: any = [];
  page = 1

  // For validations
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

  constructor(
    private fb: FormBuilder,
    private products: ProductService,
    private toast: AppToastService,
    private router: Router,
    private attributeFamilyService: AttributeFamilyService
  ) { }

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
    this.getAttributeFamilyData()
  }

  getAttributeFamilyData() {
    this.attributeFamilyService.getFamily(this.page).subscribe(data => {
      this.attributeFamilyData = data.attributefamily.data
    })
  }

  // For submitting add product form data
  onSubmit(data: any) {
    this.products
      .postProducts(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added successfully.')
        this.router.navigate(['catalog/products'])
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
  }
}
