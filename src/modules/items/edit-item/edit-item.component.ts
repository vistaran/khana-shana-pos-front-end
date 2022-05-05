import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemGroupsService } from '@modules/item-groups/item-groups.service';
import { UomService } from '@modules/pos/uom.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ItemsService } from '../items.service';

@Component({
  selector: 'sb-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  editItemForm!: FormGroup
  public itemGroupsData: any = [];
  public unitData: any = [];
  public unitId: any
  public itemGroupId: any
  id: any
  page = 1
  pageSize = 100


  get item_name() {
    return this.editItemForm.get('item_name');
  }

  get unit_id() {
    return this.editItemForm.get('unit_id');
  }

  get item_group_id() {
    return this.editItemForm.get('item_group_id');
  }

  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private itemGroupService: ItemGroupsService,
    private unitService: UomService,
    private toast: AppToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.editItemForm = this.fb.group({
      item_name: ['', [Validators.required]],
      unit_id: ['', [Validators.required]],
      item_group_id: ['', [Validators.required]]
    })

    this.id = this.route.snapshot.params.id

    this.getUOMData();
    this.getItemGroupsData();

    // To get edit item form field values
    this.itemService.patchItemData(this.id).subscribe((data: any) => {
      this.editItemForm.patchValue({
        item_name: data.item_name,
        unit_id: Number(data.unit_id),
        item_group_id: data.item_group_id
      })
      console.log(data)
    })
  }

  getItemGroupsData() {
    this.itemGroupService.getItemGroupsData(this.page, this.pageSize).subscribe((result: any) => {
      this.itemGroupsData = result.data.sort(function (a: any, b: any) {
        const nameA = a.group_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.group_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      // console.log(data);
    })
  }

  getUOMData() {
    this.unitService.getUOMData(this.page).subscribe(data => {
      this.unitData = data.units.data.sort(function (a, b) {
        const nameA = a.unit_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.unit_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      console.log(data);
    })
  }

  // For submitting edit item form data
  updateData(data: any) {
    this.itemService.editItem(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data);
      this.router.navigate(['/items']);
      this.toast.success('Success', 'Edited successfully.')
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }




}
