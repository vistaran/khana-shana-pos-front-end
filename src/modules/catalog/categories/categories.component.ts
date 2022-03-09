import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../categories.service';

@Component({
  selector: 'sb-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public cdata: any;
  public length = 0;
  public total = 0;

  page = 1;
  pageSize = 5;
  searchValue: any

  constructor(private categories: CategoriesService, private router: Router) {
    // this.getCategoriesData()
  }

  ngOnInit(): void {

    this.getCategoriesData()

  }

  getCategoriesData() {
    this.categories.getCategoriesData(this.page).subscribe(result => {
      this.cdata = result.Category.data;
      this.length = result.Category.per_page;
      this.total = result.Category.total;

    });
  }

  onPageChange(event: any) {
    this.page = event;
    this.getCategoriesData();
    console.log('Here >>>', this.page, this.cdata);
  }


  onClick() {
    this.router.navigate(['/catalog/addcategory']);
  }

  deleteRow(id: number) {
    this.categories.deleteCategory(id).subscribe(data => {
      this.getCategoriesData();
    });
    console.log(this.cdata);
  }

  search(event: any) {
    this.categories.searchCategory(this.searchValue).subscribe(res => {
      this.cdata = res.Category.data
      this.length = this.cdata.length;
      this.total = res.Category.total;
      console.log(this.cdata)
    })
  }
}
