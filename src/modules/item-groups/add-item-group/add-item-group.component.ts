import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ItemGroupsService } from '../item-groups.service';

@Component({
  selector: 'sb-add-item-group',
  templateUrl: './add-item-group.component.html',
  styleUrls: ['./add-item-group.component.scss']
})
export class AddItemGroupComponent implements OnInit {

  addItemGroupForm!: FormGroup
  showValidations = false;

  // For Validations
  get group_name() {
    return this.addItemGroupForm.get('group_name');
  }

  constructor(
    private fb: FormBuilder,
    private itemGroupService: ItemGroupsService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addItemGroupForm = this.fb.group({
      group_name: ['', [Validators.required]]
    })
  }

  // For submitting add item group form data
  onSubmit(data: any) {

    if(this.addItemGroupForm.invalid) {
      alert('Please fill the required fields!');
      return;
    }

    this.itemGroupService
      .postItemGroupsData(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added Successfully.')
        this.router.navigate(['/item_groups']);

      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }



}
