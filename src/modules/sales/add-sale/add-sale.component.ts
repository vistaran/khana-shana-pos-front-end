import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '@modules/catalog/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.scss']
})
export class AddSaleComponent implements OnInit {

  productData: any = [];
  addedProduct: any = [];
  addSaleForm!: FormGroup

  qtyForm!: FormGroup

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.addSaleForm = this.fb.group({
    })

    this.qtyForm = this.fb.group({
      quantity: ['']
    })
    this.getProductsData()
  }

  getProductsData() {
    this.productService.getProducts().subscribe(data => {
      this.productData = data.products.data
      console.log(this.productData);
    })
  }

  onSelectProduct(data: any, qty: any) {

    console.log('Quantity',qty.quantity);

    this.productData.forEach((g: any) => {
      g.quantity = 0;
      // console.log(g)
      if (g.id == data.id) {
        g.quantity += qty.quantity
        this.addedProduct.push(g)
        this.ngOnInit()
      }
    });
    console.log('Added Product', this.addedProduct);

  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
