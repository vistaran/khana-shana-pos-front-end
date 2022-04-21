import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { AttributeFamilyService } from '../attribute-family.service';
import { CategoriesService } from '../categories.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'sb-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  attributeFamilyData: any = [];
  categoryData: any = [];
  page = 1
  category_name: any

  // For validations

  get name() {
    return this.addProductForm.get('product_name');
  }

  get price() {
    return this.addProductForm.get('price');
  }

  get category() {
    return this.addProductForm.get('category_id')
  }

  get description() {
    return this.addProductForm.get('description')
  }

  constructor(
    private fb: FormBuilder,
    private products: ProductService,
    private toast: AppToastService,
    private router: Router,
    private attributeFamilyService: AttributeFamilyService,
    private categoryService: CategoriesService
  ) { }

  addProductForm!: FormGroup;

  attributeFamily = ['default'];

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      product_name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getCategoryData()
  }

  // For Category dropdown
  getCategoryData() {
    this.categoryService.getCategoriesData(this.page).subscribe(data => {
      this.categoryData = data.category.data
      this.addProductForm.patchValue({
        category_id: this.categoryData[0].id
      })
    })
  }

  // For submitting add product form data
  onSubmit(data: any) {

    this.categoryData.forEach((g: any) => {
      if (g.id == data.category_id) {
        this.category_name = g.name
      }
    });

    const obj = {
      product_name: data.product_name,
      price: data.price,
      category_id: data.category_id,
      category_name: this.category_name,
      description: data.description,
    }
    this.products
      .postProducts(obj)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added successfully.')
        this.router.navigate(['catalog/products'])
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log(data);

  }

}
