import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'sb-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public cdata: any;
  public cdata_prop: any;
  public length: number = 0;
  public total: number = 0;

  page = 1;
  pageSize = 5;
  id: any;
  
  constructor(private categories: CategoriesService, private router: Router) {
    this.getCategoriesData()
   }

  ngOnInit(): void {
    
    this.getCategoriesData()
      
    }

    getCategoriesData() {
      this.categories.getCategoriesData(this.page).subscribe( result => {
        this.cdata = result.category.data;
        this.length = result.category.per_page;
        this.total = result.category.total;

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

      //const index = this.odata.indexOf(this.id);
      //this.odata.splice(id, 1);
      this.categories.deleteCategory(id).subscribe(data => {
          this.getCategoriesData();
      });

      console.log(this.cdata);
      
  }

    refreshCategories() { 
      this.cdata = this.cdata
        .map((user: any, i: any) => ({id: i + 1, ...user}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }

    
  

}
