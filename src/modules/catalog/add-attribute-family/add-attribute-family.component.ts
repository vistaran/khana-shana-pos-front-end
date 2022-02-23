import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-add-attribute-family',
  templateUrl: './add-attribute-family.component.html',
  styleUrls: ['./add-attribute-family.component.scss']
})
export class AddAttributeFamilyComponent implements OnInit {

  addFamilyForm!: FormGroup;

  get familyCode() {
    return this.addFamilyForm.get('familyCode');
  }
  
  get name() {
    return this.addFamilyForm.get('name');
  }

  get gName() {
    return this.addFamilyForm.get('gName');
  }

  get position() {
    return this.addFamilyForm.get('position');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addFamilyForm = this.fb.group({
      familyCode: ['', [Validators.required]],
      name: ['', [Validators.required]],
      gName: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

}
