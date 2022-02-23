import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.scss']
})
export class AddAttributeComponent implements OnInit {

  addAttributeForm!: FormGroup;

  attributeType = ['Text', 'Select'];
  validation = ['Yes', 'No'];
  inputValid = [];

  get attributeCode() {
    return this.addAttributeForm.get('attributeCode');
  }

  get attributeTyp() {
    return this.addAttributeForm.get('attributeType')
  }

  get admin() {
    return this.addAttributeForm.get('admin');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.addAttributeForm = this.fb.group({
      attributeCode: ['', [Validators.required]],
      attributeType: ['', [Validators.required]],
      admin: ['', [Validators.required]],
      english: [''],
      arabic: [''],
      portugese: [''],
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
