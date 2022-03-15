import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AttributesService } from '../attributes.service';

@Component({
  selector: 'sb-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.scss']
})
export class EditAttributeComponent implements OnInit {

  editAttributeForm!: FormGroup;

  attributeType = ['Text', 'Select'];
  validation = ['Yes', 'No'];
  swatchType = ['Dropdown'];
  inputValid = ['Yes', 'No'];
  id: any

  get attributeCode() {
    return this.editAttributeForm.get('attributeCode');
  }

  get name() {
    return this.editAttributeForm.get('name');
  }

  get attributeTyp() {
    return this.editAttributeForm.get('attributeType')
  }

  get admin() {
    return this.editAttributeForm.get('admin');
  }

  constructor(private fb: FormBuilder,
    private attributes: AttributesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.editAttributeForm = this.fb.group({
      attribute_code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      admin: ['', [Validators.required]],
      english: [''],
      // arabic: [''],
      portuguse: [''],
      // swatchType: [''],
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
    // "attribute_code":"brand2",
    // "type":"textarea",
    // "name": "Arth",
    // "admin":"djh",
    // "english":"dkjfb",
    // "portuguse":"skjhdj",
    // "validation_required":"no",
    // "validation_unique":"no",
    // "input_validation":"decimal",
    // "value_per_local":"yes",
    // "value_per_channel":"yes",
    // "use_in_layered":"yes",
    // "use_to_create_configuration_product":"yes",
    // "visible_on_productview_page_front_end":"yes",
    // "create_in_product_flat_table":"yes",
    // "attribute_comparable":"yes"

    this.id = this.route.snapshot.params.id
  }

  updateData(data: any) {
    this.attributes.editAttribute(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data)
    })
    this.router.navigate(['/catalog/products']);
  }

}
