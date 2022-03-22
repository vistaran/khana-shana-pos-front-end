import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';

@Component({
  selector: 'sb-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productData: any = [];
  public length = 0;
  public total = 0;


  page = 1;
  pageSize = 5;
  searchValue: any
  showloader: any


  constructor(private productService: ProductService, private router: Router) {
    console.log('Loaded.');
  }

  ngOnInit() {

    this.getProductData()
  }

  // To get products data for table listing
  getProductData() {
    this.showloader = true
    this.productService.getProducts(this.page).subscribe(result => {
      this.productData = result.Products.data;
      this.length = result.Products.per_page;
      this.total = result.Products.total;
      this.showloader = false
      console.log(this.showloader)
    });
  }

  // For navigating to add product form on click
  onClick() {
    this.router.navigate(['/catalog/addproduct']);
  }

  // For updating data on page change
  onPageChange(event: any) {
    this.page = event;
    this.getProductData();
    console.log('Here >>>', this.page, this.productData);
  }

  // For deleting product
  deleteRow(id: number) {
    this.productService.deleteProducts(id).subscribe(data => {
      this.getProductData();
    });
    console.log(this.productData);
  }

  // For searching products from table data
  search(event: any) {
    this.showloader = true
    this.productService.searchProducts(this.searchValue).subscribe(res => {
      this.productData = res.Products.data
      this.length = this.productData.length;
      this.total = res.Products.total;
      this.showloader = false
      console.log(this.productData)
    })
  }

}
