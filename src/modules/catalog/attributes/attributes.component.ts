import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AttributesService } from '../attributes.service';

@Component({
  selector: 'sb-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  public adata: any = [];
  public length = 0;
  public total = 0;

  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any

  constructor(private attributes: AttributesService, private router: Router) { }

  ngOnInit(): void {

    this.getAttributesData()

  }

  getAttributesData() {
    this.showloader = true
    this.attributes.getAttributesData(this.page).subscribe(result => {
      this.adata = result.Attributes.data;
      this.length = result.Attributes.per_page;
      this.total = result.Attributes.total;
      this.showloader = false
      console.log(this.adata, this.length, this.total, this.page);
    });
  }

  onClick() {
    this.router.navigate(['/catalog/addattribute']);
  }

  deleteRow(id: number) {
    this.attributes.deleteAttribute(id).subscribe(data => {
      this.getAttributesData();
    });
    console.log(this.adata);
  }

  onPageChange(event: any) {
    this.page = event;
    this.getAttributesData();
    console.log('Here >>>', this.page, this.adata);
  }

  search(event: any) {
    this.showloader = true
    this.attributes.searchAttribute(this.searchValue).subscribe(res => {
      this.adata = res.Attributes.data;
      this.length = this.adata.length;
      this.total = res.Attributes.total;
      this.showloader = false
      console.log(this.adata)
    })
  }
}


