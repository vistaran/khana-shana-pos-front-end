import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { UomService } from '../uom.service';

@Component({
  selector: 'sb-edit-uom',
  templateUrl: './edit-uom.component.html',
  styleUrls: ['./edit-uom.component.scss']
})
export class EditUomComponent implements OnInit {

  editUomForm!: FormGroup
  id: any

  // For Validations
  get name() {
    return this.editUomForm.get('unit_name');
  }

  get unit() {
    return this.editUomForm.get('unit');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uomService: UomService,
    private toast: AppToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editUomForm = this.fb.group({
      unit_name: ['', [Validators.required]],
      unit: ['', [Validators.required]]
    })

    this.id = this.route.snapshot.params.id

    this.uomService.patchUomData(this.id).subscribe((data: any) => {
      this.editUomForm.patchValue(data)
      console.log(data)
    })

  }

  updateData(data: any) {
    this.uomService.editUomData(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data);
      this.router.navigate(['/pos/uom']);
      this.toast.success('Success', 'Edited successfully.')
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

}
