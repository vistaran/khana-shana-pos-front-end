import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';

import { CategoriesService } from './../categories.service';

@Component({
  selector: 'sb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;
  visibleInMenu = ['Yes', 'No'];
  displayMode = ['Products and Description'];
  parentCategory = ['Yoga', 'Badminton'];
  status = ['active', 'inactive'];
  attribut = ['price', 'brand']


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


  constructor(private fb: FormBuilder, private categoryPost: CategoriesService) { }

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
      // parent_category: [''],
      meta_title: [''],
      slug: ['', [Validators.required]],
      meta_description: [''],
      meta_keyword: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }


  onSubmit(data: any) {
    this.categoryPost
      .postCategory(data)
      .subscribe((result: any) => console.log(result));
    console.log('Form Submitted', (data));
  }


}
