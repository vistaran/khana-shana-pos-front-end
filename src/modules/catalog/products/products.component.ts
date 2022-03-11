import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';

@Component({
  selector: 'sb-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public pdata: any = [];
  public length = 0;
  public total = 0;


  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any


  constructor(private productList: ProductService, private router: Router) {
    console.log('Loaded.');
  }

  ngOnInit() {

    this.getProductData()
  }

  getProductData() {
    this.showloader = true
    this.productList.getProducts(this.page).subscribe(result => {
      this.pdata = result.Products.data;
      this.length = result.Products.per_page;
      this.total = result.Products.total;
      this.showloader = false
      console.log(this.showloader)
    });
  }

  onClick() {
    this.router.navigate(['/catalog/addproduct']);
  }

  onPageChange(event: any) {
    this.page = event;
    this.getProductData();
    console.log('Here >>>', this.page, this.pdata);
  }

  deleteRow(id: number) {
    this.productList.deleteProducts(id).subscribe(data => {
      this.getProductData();
    });
    console.log(this.pdata);
  }

  search(event: any) {
    this.showloader = true
    this.productList.searchProducts(this.searchValue).subscribe(res => {
      this.pdata = res.Products.data
      this.length = this.pdata.length;
      this.total = res.Products.total;
      this.showloader = false
      console.log(this.pdata)
    })
  }

}
