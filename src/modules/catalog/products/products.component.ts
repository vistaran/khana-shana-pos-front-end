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

  constructor(private productList: ProductService, private router: Router) { }

  ngOnInit(){

    this.productList.getProductData()
      .subscribe( data => this.pdata = data);
    }

    onClick() {
      this.router.navigate(['/catalog/addproduct']);
    }

    deleteRow(d: any){
      const index = this.pdata.indexOf(d);
      this.pdata.splice(index, 1);
    }

}
