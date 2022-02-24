import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'sb-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public cdata: any = [];

  page = 1;
  pageSize = 5;
  
  constructor(private categories: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    
    this.categories.getCategoriesData()
      .subscribe( data => this.cdata = data);
    }

    onClick() {
      this.router.navigate(['/catalog/addcategory']);
    }

    deleteRow(d: any){
      const index = this.cdata.indexOf(d);
      this.cdata.splice(index, 1);
    }

    refreshCategories() { 
      this.cdata = this.cdata
        .map((user: any, i: any) => ({id: i + 1, ...user}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  

}
