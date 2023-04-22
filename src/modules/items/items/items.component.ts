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
  public total = 5;
  public id = 0;
  page = 1;
  pageSize = 100;
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
    this.showloader = true
    this.itemService.getItemsData(this.page, this.pageSize).subscribe((data: any) => {
      this.showloader = false
      this.itemsData = data.data;
      this.length = this.itemsData.length
      this.total = data.total

    }, err => {
      this.showloader = false
      this.toast.error('Error', 'Server error.')
    });
  }

  refreshItemsData(limit: any) {
    this.pageSize = limit
    this.getItemsData()
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
        this.toast.success('Success', 'Item Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

  // For searching items table data
  search(event: any) {
    this.showloader = true
    this.itemService.searchItems(this.searchValue).subscribe((data: any) => {
      this.itemsData = data.data;
      this.length = this.itemsData.length
      this.total = data.total
      this.showloader = false
    }, err => {
      this.toast.error('Error', 'Server error.')
      this.showloader = false
    });
  }

}
