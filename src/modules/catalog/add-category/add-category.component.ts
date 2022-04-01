import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { CategoriesService } from './../categories.service';

@Component({
  selector: 'sb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;
  parentCategroryData: any;
  visibleInMenu = ['Yes', 'No'];
  displayMode = ['Products and Description'];
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


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      visible_in_menu: ['', [Validators.required]],
      position: ['', [Validators.required]],
      display_mode: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      attri: ['', [Validators.required]],
      image: [''],
      category_logo: [''],
      parent_category: [''],
      meta_title: [''],
      slug: ['', [Validators.required]],
      meta_description: [''],
      meta_keyword: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.getParentCategrory()
  }

  // For submitting Add category form data
  onSubmit(data: any) {
    this.categoryService
      .postCategory(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added successfully.')
        this.router.navigate(['catalog/products'], { queryParams: { categories: true } })
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
  }

  // For parent category listing
  getParentCategrory() {
    this.categoryService.getCategoriesData(this.page).subscribe(data => {
      this.parentCategroryData = data.category.data
      console.log(this.parentCategroryData)
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  // onSelectName(id: any) {
  //   //this.parentCategoryId = id
  //   console.log(this.parentCategoryId)
  // }

  // To get parent categories id
  onItemChange(value: any) {
    console.log(' Value is : ', value);
    this.parentCategoryId = value
  }

}
