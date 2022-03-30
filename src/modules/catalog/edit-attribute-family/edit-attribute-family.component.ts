import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sb-edit-attribute-family',
  templateUrl: './edit-attribute-family.component.html',
  styleUrls: ['./edit-attribute-family.component.scss']
})
export class EditAttributeFamilyComponent implements OnInit {

  editFamilyForm!: FormGroup;
  
  get name() {
    return this.editFamilyForm.get('name');
  }

  get gName() {
    return this.editFamilyForm.get('gName');
  }

  get position() {
    return this.editFamilyForm.get('position');
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editFamilyForm = this.fb.group({
      familyCode: ['', [Validators.required]],
      name: ['', [Validators.required]],
      gName: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

}
