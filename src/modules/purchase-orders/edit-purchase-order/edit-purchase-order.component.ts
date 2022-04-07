import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'sb-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.scss']
})
export class EditPurchaseOrderComponent implements OnInit {

  editOrderForm!: FormGroup
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
  id: any
  curr_id: any

  // For Validations

  // Add order form
  get vendor_id() {
    return this.editOrderForm.get('vendor_id');
  }

  get outlet_id() {
    return this.editOrderForm.get('outlet_id');
  }

  get user_id() {
    return this.editOrderForm.get('user_id');
  }

  get notes() {
    return this.editOrderForm.get('notes');
  }

  get shipping_charge() {
    return this.editOrderForm.get('shipping_charge');
  }

  get total_amount() {
    return this.editOrderForm.get('shipping_charge');
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.editOrderForm = this.fb.group({
      vendor_id: ['', Validators.required],
      outlet_id: ['', Validators.required],
      notes: [''],
      shipping_charge: [0],
    })

    this.itemsForm = this.fb.group({
      notes: ['', Validators.required],
      item_id: ['', Validators.required],
      item_group_id: ['', Validators.required],
      qty: ['', Validators.required],
      unit_id: [{ value: '', disabled: true }, Validators.required],
      price: ['', Validators.required],
    })

    this.curr_id = this.route.snapshot.params.id
    console.log('Current id:', this.curr_id);
    

    // To get edit order form field values
    this.purchaseOrderService.patchOrderData(this.curr_id).subscribe((data: any) => {
      this.editOrderForm.patchValue({
        vendor_id: data.order.vendor_id,
        outlet_id: data.order.outlet_id,
        notes: data.order.notes,
        shipping_charge: data.order.shipping_charge
      })
      this.orderItemData = data.items
      this.total = data.order.total_amount
      console.log('Data: ', this.orderItemData);
      // this.calculateTotal()
      console.log(data)
    })

    this.purchaseOrderService.patchOrderData(this.curr_id).subscribe((data: any) => {
      this.itemsForm.patchValue(data)
      console.log(data)
    })

    this.getVendorsData();
    this.getOutletsData();
    this.getUserData();
    this.getItemGroupsData();

    this.getUnitsData();


  }



  // To get Vendors Data
  getVendorsData() {
    this.vendorService.getVendorsData().subscribe(data => {
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
      if (g.id == id) {
        this.unit_name = g.unit_name
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
      unit_id: data.unit_id,
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
    this.toast.success('Success', 'Item Added Successfully.')

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
    this.purchaseOrderService.editPurchaseOrderData(this.curr_id, obj)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Edited Successfully.')
        this.router.navigate(['/purchase_orders']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

}
