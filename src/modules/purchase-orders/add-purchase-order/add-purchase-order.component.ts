import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemGroupsService } from '@modules/item-groups/item-groups.service';
import { ItemsService } from '@modules/items/items.service';
import { OutletDataService } from '@modules/pos/outlet-data.service';
import { UomService } from '@modules/pos/uom.service';
import { UserDataService } from '@modules/pos/user-data.service';
import { VendorsService } from '@modules/pos/vendors.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseOrdersService } from '../purchase-orders.service';

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
  public itemsData: any = [];
  public itemGroupsData: any = [];
  public unitsData: any = [];

  orderItemData: any = [];
  page = 1
  isInputShown = false
  isInputShown2 = false
  selectedVendor!: number;
  public name = '';
  // public unitName = '';
  public itemName = '';
  shippingCharge = 0
  semitotal = 0
  total = 0
  group_id: any
  unit_name: any
  unitId: any


  // For Validations

  // Add order form
  get vendor_id() {
    return this.addOrderForm.get('vendor_id');
  }

  get outlet_id() {
    return this.addOrderForm.get('outlet_id');
  }

  get user_id() {
    return this.addOrderForm.get('user_id');
  }

  get notes() {
    return this.addOrderForm.get('notes');
  }

  get shipping_charge() {
    return this.addOrderForm.get('shipping_charge');
  }

  get total_amount() {
    return this.addOrderForm.get('shipping_charge');
  }

  // Add item form

  get item_id() {
    return this.itemsForm.get('item_id');
  }

  get item_group_id() {
    return this.itemsForm.get('item_group_id');
  }

  get qty() {
    return this.itemsForm.get('qty');
  }

  get unit_id() {
    return this.itemsForm.get('unit_id');
  }

  get price() {
    return this.itemsForm.get('price');
  }

  constructor(
    private fb: FormBuilder,
    private purchaseOrderService: PurchaseOrdersService,
    private vendorService: VendorsService,
    private outletService: OutletDataService,
    private userService: UserDataService,
    private itemService: ItemsService,
    private itemGroupService: ItemGroupsService,
    private unitService: UomService,
    private modalService: NgbModal,
    private toast: AppToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addOrderForm = this.fb.group({
      vendor_id: ['', Validators.required],
      // user_id: ['', [Validators.required]],
      outlet_id: ['', Validators.required],
      notes: [''],
      shipping_charge: [0],
    })

    this.itemsForm = this.fb.group({
      notes: ['', Validators.required],
      item_id: ['', Validators.required],
      // item_name: ['', Validators.required],
      item_group_id: ['', Validators.required],
      // item_group_name: ['', Validators.required],
      qty: ['', Validators.required],
      unit_id: [{value: '', disabled: true}, Validators.required],
      // unit_name: ['', Validators.required],
      price: ['', Validators.required],
      // subtotal: ['', Validators.required]
    })

    this.getVendorsData();
    this.getOutletsData();
    this.getUserData();
    this.getItemGroupsData();

    this.getUnitsData();
  }

  // To get Vendors Data
  getVendorsData() {
    this.vendorService.getVendorsData(this.page).subscribe(data => {
      this.vendorData = data.vendors.data;
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

  // To get Item groups data
  getItemGroupsData() {
    this.itemGroupService.getItemGroupsData().subscribe(data => {
      this.itemGroupsData = data.item_groups.data
    })
  }

  onSelectGroup(id: number) {
    console.log(id);
    this.isInputShown = true
    this.group_id = id
    console.log('Group id:', this.group_id);
    this.getItemsData();
  }

  // TO get Item group data
  getItemsData() {
    console.log('group_id', this.group_id);
    this.purchaseOrderService.getItemData(this.group_id).subscribe(data => {
      this.itemsData = data.purchase_items.data
      this.unit_name = this.itemsData.unit_name
      console.log(this.itemsData, this.unit_name);
    })
  }

  onSelectNameItem(id: any) {
    this.isInputShown2 = true
    this.itemsData.forEach((g: any) => {
      console.log(g);

      if (g.id == id) {
        this.unit_name = g.unit_name
        this.unitId = g.unit_id
      }
    });
  }

  // To get Units of Measurement Data
  getUnitsData() {
    this.unitService.getUOMData().subscribe(data => {
      this.unitsData = data.units.data
    })
  }

  // For modal
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // For shipping charges value
  onKey(event: any) {
    this.shippingCharge = Number(event.target.value);
    console.log(typeof (this.shippingCharge));
    this.calculateTotal();
  }

  addItemData(data: any) {
    // this.family.addGroup(data).subscribe(data => {
    //   console.log('Data added successfully! ', data)
    //   this.toast.success('Success', 'Added successfully.')
    // }, err => {
    //   this.toast.error('Error', 'Server error.')
    // })

    // extract name from original array using selected group id

    this.itemGroupsData.forEach((g: any) => {
      if (g.id == data.item_group_id) {
        this.name = g.group_name
      }
    });

    this.itemsData.forEach((g: any) => {
      if (g.id == data.item_id) {
        this.itemName = g.item_name
      }
    });

    const obj = [{
      item_group_id: data.item_group_id,
      item_group_name: this.name,
      item_id: data.item_id,
      item_name: this.itemName,
      unit_id: this.unitId,
      unit_name: this.unit_name,
      qty: data.qty,
      notes: data.notes,
      price: data.price,
      subtotal: data.price * data.qty
    }]
    this.orderItemData = this.orderItemData.concat(obj);
    console.log(this.orderItemData);

    this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })
    console.log(this.total);
    // this.toast.success('Success', 'Item Added Successfully.')

    this.calculateTotal();

  }

  calculateTotal() {
    this.total = Number(this.shippingCharge) + Number(this.semitotal);
  }

  // For submitting add purchase form data
  onSubmit(data: any) {
    const obj = {
      vendor_id: data.vendor_id,
      outlet_id: data.outlet_id,
      user_id: data.user_id,
      notes: data.notes,
      shipping_charge: data.shipping_charge,
      total_amount: this.total,
      items: this.orderItemData
    }
    this.purchaseOrderService.postPurchaseOrderData(obj)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Added Successfully.')
        this.router.navigate(['/purchase_orders']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }





}
