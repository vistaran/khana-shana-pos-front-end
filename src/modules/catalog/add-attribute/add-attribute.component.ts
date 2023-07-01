import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { AttributesService } from '../attributes.service';

@Component({
  selector: 'sb-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss']
})
export class AddAttributeComponent implements OnInit {

  addAttributeForm!: FormGroup;

  attributeType = ['Text', 'Select'];
  validation = ['Yes', 'No'];
  inputValidation = ['Yes', 'No'];

  // For validations
  get attributeCode() {
    return this.addAttributeForm.get('attribute_code');
  }

  get name() {
    return this.addAttributeForm.get('name');
  }

  get attributeTyp() {
    return this.addAttributeForm.get('type')
  }

  get admin() {
    return this.addAttributeForm.get('admin');
  }

  constructor(
    private fb: FormBuilder,
    private attributeService: AttributesService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.addAttributeForm = this.fb.group({
      attribute_code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      admin: ['', [Validators.required]],
      english: [''],
      portuguse: [''],
      validation_required: [''],
      validation_unique: [''],
      input_validation: [''],
      value_per_local: [''],
      value_per_channel: [''],
      use_in_layered: [''],
      use_to_create_configuration_product: [''],
      visible_on_productview_page_front_end: [''],
      create_in_product_flat_table: [''],
      attribute_comparable: ['']
    })
  }

  // For submiting add attribute form data
  onSubmit(data: any) {
    this.attributeService
      .postAttribute(data)
      .subscribe({
        next: (result: any) => {
          console.log(result)
          this.toast.success('Success', 'Added successfully.')
          this.router.navigate(['catalog/products'], { queryParams: { attributes: true } })
        }, error: err => {
          this.toast.error('Error', 'Server error.')
        }
      });
  }

}
