import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { AttributesService } from '../attributes.service';

import { CategoriesService } from './../categories.service';

@Component({
  selector: 'sb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;

  attributesData: any = [];
  parentCategroryData: any;

  visibleInMenu = ['Yes', 'No'];
  displayMode = ['Products and Descrpition'];
  parentCategory = ['Yoga', 'Badminton'];
  status = ['active', 'inactive'];
  attribut = ['price', 'brand'];
  page = 1;
  isCollapsed = false;
  parentCategoryId: any

  // For validations
  get name() {
    return this.addCategoryForm.get('name');
  }

  get visible() {
    return this.addCategoryForm.get('visibleInMenu');
  }

  get position() {
    return this.addCategoryForm.get('position');
  }

  get displayMod() {
    return this.addCategoryForm.get('displayMode');
  }

  get description() {
    return this.addCategoryForm.get('description');
  }

  get slug() {
    return this.addCategoryForm.get('slug');
  }

  get stat() {
    return this.addCategoryForm.get('status');
  }

  get attributes() {
    return this.addCategoryForm.get('attri');
  }

  get meta_keyword() {
    return this.addCategoryForm.get('meta_keyword');
  }

  get meta_title() {
    return this.addCategoryForm.get('meta_title');
  }

  get image() {
    return this.addCategoryForm.get('image');
  }

  get category_logo() {
    return this.addCategoryForm.get('category_logo');
  }

  // get number_of_products() {
  //   return this.addCategoryForm.get('number_of_products');
  // }


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private toast: AppToastService,
    private router: Router,
    private attributeService: AttributesService
  ) { }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
    //   visible_in_menu: [0, [Validators.required]],
    //   position: ['', [Validators.required]],
    //   display_mode: [0, [Validators.required]],
    //   decription: [''],
    //   attri: [0, [Validators.required]],
    //   image: ['', [Validators.required]],
    //   category_logo: ['', [Validators.required]],
      // parent_category: [''],
    //   meta_title: ['', [Validators.required]],
    //   slug: ['', [Validators.required]],
    //   meta_description: [''],
    //   meta_keyword: ['', [Validators.required]],
    //   status: [0, [Validators.required]],
      // number_of_products: ['', [Validators.required]]
    });
    // this.getParentCategrory()
    // this.getAttributesData()
  }

  // For submitting Add category form data
  onSubmit(data: any) {

    if (this.addCategoryForm.invalid) {
      alert('Please fill all the required fields');
      this.addCategoryForm.markAllAsTouched();
      return;
    }

    this.categoryService
      .postCategory(data)
      .subscribe({
        next: (result: any) => {
          // console.log(result)
          this.toast.success('Success', 'Category Added successfully.')
          this.router.navigate(['catalog/categories'])
        }, error: err => {
          this.toast.error('Error', 'Server error.')
        }
      });
  }

  // For parent category listing
  getParentCategrory() {
    this.categoryService.getCategoriesData(this.page).subscribe({
      next: data => {
        this.parentCategroryData = data.category.data
        // console.log(this.parentCategroryData)
      }, error: err => {
        this.toast.error('Error', 'Server error.')
      }
    });
  }

  // For attributes dropdown
  getAttributesData() {
    this.attributeService.getAttributesData(this.page).subscribe(data => {
      this.attributesData = data.Attributes.data
    })
  }

  // onSelectName(id: any) {
  //   //this.parentCategoryId = id
  //   console.log(this.parentCategoryId)
  // }

  // To get parent categories id
  onItemChange(value: any) {
    // console.log(' Value is : ', value);
    this.parentCategoryId = value
  }

}
