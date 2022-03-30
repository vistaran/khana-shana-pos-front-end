import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  inputValid = [];

  get attributeCode() {
    return this.editAttributeForm.get('attributeCode');
  }

  get attributeTyp() {
    return this.editAttributeForm.get('attributeType')
  }

  get admin() {
    return this.editAttributeForm.get('admin');
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.editAttributeForm = this.fb.group({
      attributeCode: ['', [Validators.required]],
      attributeType: ['', [Validators.required]],
      admin: ['',[Validators.required]],
      english: [''],
      arabic: [''],
      portugese: [''],
      swatchType: [''],
      isRequired: [''],
      isUnique: [''],
      inputValidation: [''],
      valuePerLocale: [''],
      valuePerChannel: [''],
      layeredNav: [''],
      cofigProduct: [''],
      frontEnd: [''],
      flatTable: [''],
      comparable: ['']
    })
  }

}
