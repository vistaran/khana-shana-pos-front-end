import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemGroupsService } from '@modules/item-groups/item-groups.service';
import { UomService } from '@modules/pos/uom.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ItemsService } from '../items.service';

@Component({
  selector: 'sb-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  addItemForm!: FormGroup
  public itemGroupsData: any = [];
  public unitData: any = [];
  public unitId: any
  public itemGroupId: any
  selectedCity:any

// For Validations
  get item_name() {
    return this.addItemForm.get('item_name');
  }

  get unit_id() {
    return this.addItemForm.get('unit_id');
  }

  get item_group_id() {
    return this.addItemForm.get('item_group_id');
  }

  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private itemGroupService: ItemGroupsService,
    private unitService: UomService,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      item_name: ['', [Validators.required]],
      unit_id: [null, [Validators.required]],
      item_group_id: [null, [Validators.required]]
    })

    this.getUOMData();
    this.getItemGroupsData();
  }

  // For getting Item groups data
  getItemGroupsData() {
    this.itemGroupService.getItemGroupsData().subscribe(data => {
      this.itemGroupsData = data.item_groups.data;
      console.log(data);
    })
  }

  // For getting Units of Measurement data
  getUOMData() {
    this.unitService.getUOMData().subscribe(data => {
      this.unitData = data.units.data;
      console.log(data);
    })
  }

  // For submitting add item group form data
  onSubmit(data: any) {
    this.itemService.postItemsData(data)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added Successfully.')
        this.router.navigate(['/items']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }



}
