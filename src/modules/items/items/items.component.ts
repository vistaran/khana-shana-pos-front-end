import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemGroupsService } from '@modules/item-groups/item-groups.service';
import { UomService } from '@modules/pos/uom.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ItemsService } from '../items.service';

@Component({
  selector: 'sb-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public itemsData: any = [];
  public itemGroupsData: any = [];
  public unitData: any = [];
  public length = 0;
  public total = 0;
  public id = 0;
  page = 1;
  pageSize = 10;
  itemsPerPage: any;
  searchValue: any
  showloader: any

  constructor(
    private toast: AppToastService,
    private itemService: ItemsService,
    private router: Router,
    private itemGroupService: ItemGroupsService,
    private unitService: UomService
  ) { }

  ngOnInit(): void {
    this.getItemsData();
  }

  // For getting Item data for listing
  getItemsData() {
    this.itemService.getItemsData().subscribe(data => {
      this.itemsData = data.purchase_items.data;
      this.length = this.itemsData.length
      console.log(data);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  // For Item Group Data
  getItemGroupsData() {
    this.itemGroupService.getItemGroupsData().subscribe(data => {
      this.itemGroupsData = data.item_groups.data;
      console.log(data);
    })
  }

  // For Unit Measurements Data
  getUOMData() {
    this.unitService.getUOMData().subscribe(data => {
      this.unitData = data.units.data;
      console.log(data);
    })
  }

  // For navigating to add item form on click
  onClick() {
    this.router.navigate(['/items/add_item']);
  }

  // For updating data on page change
  onPageChange(event: number) {
    this.page = event;
    this.getItemsData();
  }

  // For deleting Item data
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.itemService.deleteItem(id).subscribe(data => {
        this.getItemsData();
        this.toast.success('Success', 'Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

}
