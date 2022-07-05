import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { AttributeFamilyService } from '../attribute-family.service';

@Component({
  selector: 'sb-add-attribute-family',
  templateUrl: './add-attribute-family.component.html',
  styleUrls: ['./add-attribute-family.component.scss']
})
export class AddAttributeFamilyComponent implements OnInit {

  addFamilyForm!: FormGroup;

  // For Validations
  get familyCode() {
    return this.addFamilyForm.get('attribute_family_code');
  }

  get name() {
    return this.addFamilyForm.get('attribute_family_name');
  }

  get gName() {
    return this.addFamilyForm.get('gName');
  }

  get position() {
    return this.addFamilyForm.get('position');
  }

  constructor(
    private fb: FormBuilder,
    private family: AttributeFamilyService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addFamilyForm = this.fb.group({
      attribute_family_code: ['', [Validators.required]],
      attribute_family_name: ['', [Validators.required]],
    });
  }

  // For submitting add attribute form data
  onSubmit(data: any) {
    this.family
      .postFamily(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added successfully.')
        this.router.navigate(['catalog/attributeFamily'], { queryParams: { attributeFamily: true } })
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
  }
}
