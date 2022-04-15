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
  pageSize = 10;
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
    this.itemGroupService.getItemGroupsData().subscribe(data => {
      this.itemGroupsData = data.item_groups.data;
      this.length = this.itemGroupsData.length
      console.log(data);
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
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
        this.toast.success('Success', 'Deleted Successfully.')
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    }
  }

}
