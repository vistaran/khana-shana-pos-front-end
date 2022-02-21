import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sb-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProductForm!: FormGroup;

  taxCategory = [];

  constructor() { }

  get sku() {
    return this.editProductForm.get('sku');
  }

  ngOnInit(): void {
    
  }

}
