import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../categories.service';

@Component({
  selector: 'sb-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categoryData: any;
  public length = 0;
  public total = 0;

  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any

  constructor(private categories: CategoriesService, private router: Router) { }

  ngOnInit(): void {

    this.getCategoriesData()

  }

  // For getting categories data for table listing
  getCategoriesData() {
    this.showloader = true
    this.categories.getCategoriesData(this.page).subscribe(result => {
      this.categoryData = result.category.data;
      this.length = result.category.per_page;
      this.total = result.category.total;
      this.showloader = false
      console.log(this.categoryData);

    });
  }

  // For updating data on page change
  onPageChange(event: any) {
    this.page = event;
    this.getCategoriesData();
    console.log('Here >>>', this.page, this.categoryData);
  }

  // For navigating to add category form on click
  onClick() {
    this.router.navigate(['/catalog/addcategory']);
  }

  // For deleting category data
  deleteRow(id: number) {
    this.categories.deleteCategory(id).subscribe(data => {
      this.getCategoriesData();
    });
    console.log(this.categoryData);
  }

  // For searching category data from table
  search(event: any) {
    this.showloader = true
    this.categories.searchCategory(this.searchValue).subscribe(res => {
      this.categoryData = res.category.data
      this.length = this.categoryData.length;
      this.total = res.category.total;
      this.showloader = false
      console.log(this.categoryData)
    })
  }
}
