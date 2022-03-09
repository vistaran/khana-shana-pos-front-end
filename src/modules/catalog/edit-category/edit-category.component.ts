import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from './../categories.service';

@Component({
  selector: 'sb-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm!: FormGroup;
  id: any;
  status = ['active', 'inactive'];
  attribut = ['price', 'brand']


  visibleInMenu = ['Yes', 'No'];
  displayMode = ['Products and Descrition'];
  parentCategory = ['Yoga', 'Badminton'];

  get name() {
    return this.editCategoryForm.get('name');
  }

  get visible() {
    return this.editCategoryForm.get('visibleInMenu');
  }

  get position() {
    return this.editCategoryForm.get('position');
  }

  get displayMod() {
    return this.editCategoryForm.get('displayMode');
  }

  get description() {
    return this.editCategoryForm.get('description');
  }

  get slug() {
    return this.editCategoryForm.get('slug');
  }

  get stat() {
    return this.editCategoryForm.get('status');
  }

  get attributes() {
    return this.editCategoryForm.get('attributes');
  }

  get meta_keyword() {
    return this.editCategoryForm.get('meta_keyword');
  }

  constructor(
    private fb: FormBuilder,
    private categories: CategoriesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.editCategoryForm = this.fb.group({
      attri: ['', [Validators.required]],
      category_logo: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      display_mode: ['', [Validators.required]],
      image: ['', [Validators.required]],
      meta_description: ['', [Validators.required]],
      meta_keyword: [''],
      meta_title: [''],
      name: ['', [Validators.required]],
      parent_category: ['', [Validators.required]],
      position: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      status: ['', [Validators.required]],
      visible_in_menu: ['', [Validators.required]],
    });

    this.id = this.route.snapshot.params.id

    // this.categories.editCategoryForm(this.id).subscribe((data: any) => {
    //   this.editCategoryForm.patchValue(data.Show_Data)
    //   console.log(data)
    // })
  }

  updateData(data: any) {
    this.categories.editCategory(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data)
    })
    this.router.navigate(['/catalog/products']);
  }


  upload() {
    //
  }

}
