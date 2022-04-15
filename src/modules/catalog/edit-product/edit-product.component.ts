import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { CategoriesService } from '../categories.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'sb-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProductForm!: FormGroup;
  id: any

  categoryData: any = [];
  category_name: any

  page = 1;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: AppToastService,
    private categoryService: CategoriesService
  ) { }

  // For validations

  get name() {
    return this.editProductForm.get('product_name');
  }

  get description() {
    return this.editProductForm.get('description');
  }

  get price() {
    return this.editProductForm.get('price');
  }

  get category() {
    return this.editProductForm.get('category_id');
  }

  ngOnInit(): void {

    this.editProductForm = this.fb.group({
      product_name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.id = this.route.snapshot.params.id
    this.getCategoryData()

    this.productService.editPatchData(this.id).subscribe((data: any) => {
      this.editProductForm.patchValue(data)
      console.log(data.products)
    })
  }

  // For submitting edit product form data
  updateData(data: any) {

    this.categoryData.forEach((g: any) => {
      if (g.id == data.category_id) {
        this.category_name = g.name
      }
    });

    const obj = {
      product_name: data.product_name,
      price: data.price,
      category_id: data.category_id,
      category_name: this.category_name ,
      description: data.description,
    }

    this.productService.editProducts(this.id, obj).subscribe(data => {
      console.log('Data updated successfully! ', data)
      this.router.navigate(['/catalog/products']);
      this.toast.success('Success', 'Edited successfully.')
    }, err => {
      this.toast.error('Error', 'Server error.')
    })
  }

  // For Category dropdown
  getCategoryData() {
    this.categoryService.getCategoriesData(this.page).subscribe(data => {
      this.categoryData = data.category.data
      console.log(data);
    })
  }
}
