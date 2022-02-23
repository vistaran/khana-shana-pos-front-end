import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm!: FormGroup;

  visibleInMenu = ['Yes', 'No'];
  displayMode = ['Products and Descrition'];

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.editCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      visibleInMenu: ['', [Validators.required]],
      position: ['', [Validators.required]],
      displayMode: ['', [Validators.required]],
      description: ['', [Validators.required]], 
      image: ['', [Validators.required]],
      categoryLogo: ['', [Validators.required]],
      metaTitle: [''],
      slug: ['', [Validators.required]],
      metaDescription: [''],
      metaKeywords: [''],
    });
  }

}
