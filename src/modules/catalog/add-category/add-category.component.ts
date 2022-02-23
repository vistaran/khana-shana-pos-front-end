import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm!: FormGroup;
  visibleInMenu = ['Yes','No'];
  displayMode = ['Products and Description'];

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


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      visibleInMenu: ['', [Validators.required]],
      position: ['', [Validators.required]],
      displayMode: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [''],
      categoryLogo: [''],
      metaTitle: [''],
      slug: ['', [Validators.required]],
      metaDescription: [''],
      metaKeywords: [''],
    });
  }


}
