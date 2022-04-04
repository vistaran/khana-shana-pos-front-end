import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

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
  activeId = 1;


  constructor(
    private productService: ProductService,
    private router: Router,
    private toast: AppToastService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute.snapshot.queryParams.categories) {
      this.activeId = 2
    }
    if (this.activatedRoute.snapshot.queryParams.attributes) {
      this.activeId = 3
    }
    if (this.activatedRoute.snapshot.queryParams.attributeFamily) {
      this.activeId = 4
    }
  }

  ngOnInit() {

    this.getProductData()
  }

  // To get products data for table listing
  getProductData() {
    this.showloader = true
    this.productService.getProducts(this.page).subscribe(result => {
      this.productData = result.products.data;
      this.length = result.products.per_page;
      this.total = result.products.total;
      this.showloader = false
      console.log(this.showloader)
    }, err => {
      this.showloader = false
      this.toast.error('Error', 'Server error.')
    })
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
      this.toast.success('Success', 'Deleted Successfully.')
    }, err => {
      this.toast.error('Error', 'Server error.')
    });
    console.log(this.productData);
  }

  // For searching products from table data
  search(event: any) {
    this.showloader = true
    this.productService.searchProducts(this.searchValue).subscribe(res => {
      this.productData = res.products.data
      this.length = this.productData.length;
      this.total = res.products.total;
      this.showloader = false
      console.log(this.productData)
    }, err => {
      this.toast.error('Error', 'Server error.')
      this.showloader = false
    });
  }

}
