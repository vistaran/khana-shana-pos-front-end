import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ItemGroupsService } from '../item-groups.service';

@Component({
  selector: 'sb-item-groups',
  templateUrl: './item-groups.component.html',
  styleUrls: ['./item-groups.component.scss']
})
export class ItemGroupsComponent implements OnInit {

  public itemGroupsData: any = [];
  public length = 0;
  public total = 0;
  public id = 0;
  page = 1;
  pageSize = 100;
  itemsPerPage: any;
  searchValue: any
  showloader: any

  constructor(
    private itemGroupService: ItemGroupsService,
    private router: Router,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
    this.getItemGroupsData();
  }

  // For getting Item group data for listing
  getItemGroupsData() {
    this.showloader = true;
    this.itemGroupService.getItemGroupsData(this.page, this.pageSize).subscribe((result: any) => {
      this.itemGroupsData = result.data;
      this.total = result.total
      this.length = this.itemGroupsData.length
      this.showloader = false;

      // console.log(result);
    }, err => {
      this.toast.error('Error', 'Server error.');
      this.showloader = false;

    });
  }

  refreshItemsData(limit: any) {
    this.pageSize = limit
    this.getItemGroupsData()
  }

  // For navigating to add item group form on click
  onClick() {
    this.router.navigate(['/item_groups/add_item_group']);
  }

  // For updating data on page change
  onPageChange(event: number) {
    this.page = event;
    this.getItemGroupsData();
  }

  // For deleting Item group data
  deleteRow(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.itemGroupService.deleteItemGrpup(id).subscribe(data => {
        this.getItemGroupsData();
        this.toast.success('Success', 'Item Group Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

  search(event: any) {
    console.log(event);
    this.showloader = true
    this.page = 1
    this.itemGroupService.searchItemGroup(this.page, this.searchValue).subscribe((result: any) => {
      this.itemGroupsData = result.data;
      this.total = result.total
      this.length = this.itemGroupsData.length
      this.showloader = false
    }, err => {
      this.toast.error('Error', 'Server error.')
      this.showloader = false
    });
  }

}
