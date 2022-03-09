import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AttributeFamilyService } from '../attribute-family.service';

@Component({
  selector: 'sb-edit-attribute-family',
  templateUrl: './edit-attribute-family.component.html',
  styleUrls: ['./edit-attribute-family.component.scss']
})
export class EditAttributeFamilyComponent implements OnInit {

  editFamilyForm!: FormGroup;
  id: any

  get name() {
    return this.editFamilyForm.get('name');
  }

  get code() {
    return this.editFamilyForm.get('attribute_family_code');
  }

  get gName() {
    return this.editFamilyForm.get('gName');
  }

  get position() {
    return this.editFamilyForm.get('position');
  }
  constructor(private fb: FormBuilder,
    private family: AttributeFamilyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.editFamilyForm = this.fb.group({
      attribute_family_code: ['', [Validators.required]],
      attribute_family_name: ['', [Validators.required]],
      // gName: ['', [Validators.required]],
      // position: ['', [Validators.required]]
    });

    this.id = this.route.snapshot.params.id
    // this.family.editCategoryForm(this.id).subscribe((data: any) => {
    //   this.editFamilyForm.patchValue(data.Show_Data)
    //   console.log(data)
    // })
  }

  updateData(data: any) {
    this.family.editFamily(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data)
    })
    this.router.navigate(['/catalog/products']);
  }

}
