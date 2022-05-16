import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ItemGroupsService } from '../item-groups.service';

@Component({
  selector: 'sb-edit-item-group',
  templateUrl: './edit-item-group.component.html',
  styleUrls: ['./edit-item-group.component.scss']
})
export class EditItemGroupComponent implements OnInit {

  editItemGroupForm!: FormGroup
  id: any
  showValidations = false;
  // For Validations
  get group_name() {
    return this.editItemGroupForm.get('group_name');
  }

  constructor(
    private fb: FormBuilder,
    private itemGroupService: ItemGroupsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
    this.editItemGroupForm = this.fb.group({
      group_name: ['', [Validators.required]]
    })

    // For item group id
    this.id = this.route.snapshot.params.id

    // To get edit item group form field values
    this.itemGroupService.patchItemGroupData(this.id).subscribe((data: any) => {
      this.editItemGroupForm.patchValue(data)
      console.log(data)
    })
  }

  // Submit edit item group form
  updateData(data: any) {

    if(this.editItemGroupForm.invalid) {
      alert('Please fill the required fields!');
      return;
    }


    this.itemGroupService.editItemGroup(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data);
      this.toast.success('Success', 'Edited successfully.')
      this.router.navigate(['/item_groups']);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

}
