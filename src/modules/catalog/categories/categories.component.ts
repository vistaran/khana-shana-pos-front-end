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
  

}
