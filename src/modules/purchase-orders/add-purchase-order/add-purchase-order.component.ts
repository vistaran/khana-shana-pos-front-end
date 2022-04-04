import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutletDataService } from '@modules/pos/outlet-data.service';
import { UserDataService } from '@modules/pos/user-data.service';
import { VendorsService } from '@modules/pos/vendors.service';

@Component({
  selector: 'sb-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {

  addOrderForm!: FormGroup
  itemsForm!: FormGroup
  public vendorData: any = [];
  public outletData: any = [];
  public userData: any = [];
  page = 1

  // For Validations
  get vendor_id() {
    return this.addOrderForm.get('vendor_id');
  }

  get outlet_id() {
    return this.addOrderForm.get('outlet_id');
  }

  get user_id() {
    return this.addOrderForm.get('user_id');
  }

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorsService,
    private outletService: OutletDataService,
    private userService: UserDataService
  ) { }

  ngOnInit(): void {
    this.addOrderForm = this.fb.group({
      vendor_id: ['', [Validators.required]],
      outlet_id: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      notes: ['', Validators.required],
      shipping_charge: ['', Validators.required],
      total_amount: ['', Validators.required],

      items: this.itemsForm = this.fb.group({
        notes: ['', Validators.required],
        item_id: ['', Validators.required],
        // item_name: ['', Validators.required],
        item_group_id: ['', Validators.required],
        // item_group_name: ['', Validators.required],
        qty: ['', Validators.required],
        unit_id: ['', Validators.required],
        unit_name: ['', Validators.required],
        subtotal: ['', Validators.required]
      })
    })

    this.getVendorsData();
    this.getOutletsData();
  }

  // To get Vendors Data
  getVendorsData() {
    this.vendorService.getVendorsData().subscribe(data => {
      this.vendorData = data.vendors.data;
      console.log(this.vendorData)
    })
  }

  // To get Outlets Data
  getOutletsData() {
    this.outletService.getOutletData(this.page).subscribe(data => {
      this.outletData = data.outlets.data;
    })
  }

  // To get User Data
  getUserData() {
    this.userService.getUserData(this.page).subscribe(data => {
      this.userData = data.user.data
    })
  }

}
