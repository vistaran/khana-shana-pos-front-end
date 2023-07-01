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
      item_position: [''],
      category_id: ['', [Validators.required]],
      description: ['']
    });
    this.id = this.route.snapshot.params.id
    this.getCategoryData()

    this.productService.editPatchData(this.id).subscribe((data: any) => {
      this.editProductForm.patchValue(data)
    })
  }

  // For submitting edit product form data
  updateData(data: any) {


    if (this.editProductForm.invalid) {
      alert('Please fill all the required fields.');
      this.editProductForm.markAllAsTouched();
      return;
    }


    this.categoryData.forEach((g: any) => {
      if (g.id == data.category_id) {
        this.category_name = g.name
      }
    });

    const obj = {
      product_name: data.product_name,
      price: data.price,
      item_position: data.item_position,
      category_id: data.category_id,
      category_name: this.category_name,
      description: data.description,
    }

    this.productService.editProducts(this.id, obj).subscribe({
      next: data => {
        console.log('Data updated successfully! ', data)
        this.router.navigate(['/catalog/products']);
        this.toast.success('Success', 'Product Edited successfully.')
      }, error: err => {
        this.toast.error('Error', 'Server error.')
      }
    })
  }

  // For Category dropdown
  getCategoryData() {
    this.categoryService.getCategoriesData(this.page).subscribe(data => {
      this.categoryData = data.category.data.sort(function (a, b) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });;
    })
  }
}
