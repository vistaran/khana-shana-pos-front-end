import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { AttributesService } from '../attributes.service';

import { CategoriesService } from './../categories.service';

@Component({
  selector: 'sb-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm!: FormGroup;

  public attributesData: any = [];

  id: any;
  status = ['active', 'inactive'];
  visibleInMenu = ['Yes', 'No'];
  displayMode = ['Products and Descrpition'];
  parentCategory = ['Yoga', 'Badminton'];
  parentCategroryData: any
  parentCategoryId: any
  page = 1
  isCollapsed = false;

  // For validations
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

  get meta_title() {
    return this.editCategoryForm.get('meta_title');
  }

  get image() {
    return this.editCategoryForm.get('image');
  }

  get category_logo() {
    return this.editCategoryForm.get('category_logo');
  }


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: AppToastService,
    private attributeService: AttributesService
  ) { }

  ngOnInit(): void {

    this.editCategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      visible_in_menu: [0],
      position: ['', [Validators.required]],
      display_mode: [0],
      decription: [''],
      attributes: [0, [Validators.required]],
      image: ['', [Validators.required]],
      category_logo: ['', [Validators.required]],
      // parent_category: [''],
      meta_title: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      meta_description: [''],
      meta_keyword: ['', [Validators.required]],
      status: [0, [Validators.required]],
    });

    this.id = this.route.snapshot.params.id

    // To get Field values
    this.categoryService.getEditCategoryData(this.id).subscribe((data: any) => {
      this.editCategoryForm.patchValue({
        name: data.show_data.name,
        // visible_in_menu: Number(data.show_data.visible_in_menu),
        position: data.show_data.position,
        // display_mode: Number(data.show_data.display_mode),
        decription: data.show_data.decription,
        attributes: data.show_data.attributes,
        meta_title: data.show_data.meta_title,
        slug: data.show_data.slug,
        meta_description: data.show_data.meta_description,
        meta_keyword: data.show_data.meta_keyword,
        // status: data.show_data.status
      })

      this.visibleInMenu.forEach(element => {
        if (element == data.show_data.visible_in_menu) {
          this.editCategoryForm.patchValue({
            visible_in_menu: element
          })
        }
      })

      this.displayMode.forEach(element => {
        if (element == data.show_data.display_mode) {
          this.editCategoryForm.patchValue({
            display_mode: element
          })
        }
      })

      this.status.forEach(element => {
        if (element == data.show_data.status) {
          this.editCategoryForm.patchValue({
            status: element
          })
        }
      })

      // this.editCategoryForm.get('visible_in_menu')?.setValue(data.show_data.visible_in_menu)
      // this.editCategoryForm.get('display_mode')?.setValue(data.show_data.display_mode)


      // console.log(data)
    })
    this.getParentCategrory()
    this.getAttributesData()
  }

  // For parent category listing
  getParentCategrory() {
    this.categoryService.getCategoriesData(this.page).subscribe({
      next: data => {
        this.parentCategroryData = data.category.data
        console.log(this.parentCategroryData)
      }, error: err => {
        this.toast.error('Error', 'Server error.')
      }
    })
  }

  // For attributes dropdown
  getAttributesData() {
    this.attributeService.getAttributesData(this.page).subscribe(data => {
      this.attributesData = data.Attributes.data
    })
  }

  // For submitting edit category form data
  updateData(data: any) {

    if (this.editCategoryForm.invalid) {
      this.editCategoryForm.markAllAsTouched();
      alert('Please fill all the required fields');
      return;
    }

    this.categoryService.editCategory(this.id, data).subscribe({
      next: data => {
        console.log('Data updated successfully! ', data)
        this.router.navigate(['/catalog/categories']);
        this.toast.success('Success', 'Category Edited successfully.')
      }, error: err => {
        this.toast.error('Error', 'Server error.')
      }
    })
  }

  // To get parent categories id
  onItemChange(value: any) {
    console.log(' Value is : ', value);
    this.parentCategoryId = value
  }

}
