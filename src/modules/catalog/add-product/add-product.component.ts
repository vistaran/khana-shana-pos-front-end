import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sb-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;

  attributeFamily = ['Default'];

  get productType() {
    return this.addProductForm.get('productType');
  }

  get attributeFam() {
    return this.addProductForm.get('attributeFamily');
  }

  get sku() {
    return this.addProductForm.get('sku');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group( {
      productType: ['',[Validators.required]],
      attributeFamily: ['',[Validators.required]],
      sku: ['',[Validators.required]],
    });
  }

}
