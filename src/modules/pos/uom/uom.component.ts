import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { UomService } from '../uom.service';

@Component({
  selector: 'sb-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})
export class UomComponent implements OnInit {

  public uomData: any = [];
  public length = 0;
  public total = 0;
  public id = 0;

  activeId = 1;
  showloader: any;
  page = 1;
  pageSize = 10;
  itemsPerPage: any;
  searchValue: any

  constructor(
    private router: Router,
    private uomService: UomService,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
    this.getUOMData();
  }

  getUOMData() {
    this.showloader = true;
    this.uomService.getUOMData().subscribe(data => {
      this.uomData = data.units.data;
      this.length = this.uomData.length
      this.showloader = false;
      console.log(data);

    }, err => {
      this.showloader = false
      this.toast.show('Error', 'Server error', { className: 'bg-danger text-light' })
    });
  }

  onClick() {
    this.router.navigate(['/pos/adduom']);
  }

  deleteRow(id: number) {

    this.uomService.deleteUomData(id).subscribe(data => {
      this.getUOMData();
      this.toast.success('Success', 'Deleted Successfully.')
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
  }

  onPageChange(event: number) {
    this.page = event;
    this.getUOMData();
  }

}
