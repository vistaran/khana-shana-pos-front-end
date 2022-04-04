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

  get notes() {
    return this.addOrderForm.get('notes');
  }

  get shipping_charge() {
    return this.addOrderForm.get('shipping_charge');
  }
  
  get total_amount() {
    return this.addOrderForm.get('shipping_charge');
  } 

  get item_name() {
    return this.itemsForm.get('item_name');
  }

  get item_group_name() {
    return this.itemsForm.get('item_group_name');
  }

  get qty() {
    return this.itemsForm.get('qty');
  }

  get unit_name() {
    return this.itemsForm.get('unit_name');
  } 

  get subtotal() {
    return this.itemsForm.get('subtotal');
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
      outlet_id: ['', Validators.required],
      user_id: ['', Validators.required],
      notes: [''],
      shipping_charge: ['', Validators.required],
      total_amount: ['', Validators.required],

      items: this.itemsForm = this.fb.group({
        notes: ['', Validators.required],
        // item_id: ['', Validators.required],
        item_name: ['', Validators.required],
        // item_group_id: ['', Validators.required],
        item_group_name: ['', Validators.required],
        qty: ['', Validators.required],
        // unit_id: ['', Validators.required],
        unit_name: ['', Validators.required],
        // subtotal: ['', Validators.required]
      })
    })

    this.getVendorsData();
    this.getOutletsData();
    this.getUserData();
    this.getItemsData();
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

  // TO get Item group data
  getItemsData() {
    this.itemService.getItemsData().subscribe(data=> {
      this.itemsData = data.purchase_items.data
    })
  }

  // To get Item groups data
  getItemGroupsData() {
    this.itemGroupService.getItemGroupsData().subscribe(data=> {
      this.itemGroupsData = data.item_groups.data
    })
  }

  //To get Units of Measurement Data
  getUnitsData() {
    this.unitService.getUOMData().subscribe(data=> {
      this.unitsData = data.units.data
    })
  }

  // For modal
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  addItemData(data: any) {
    // this.family.addGroup(data).subscribe(data => {
    //   console.log('Data added successfully! ', data)
    //   this.toast.success('Success', 'Added successfully.')
    // }, err => {
    //   this.toast.error('Error', 'Server error.')
    // })

    // extract name from original array using selected group id
    var name = '';
    console.log('Group data >', this.itemGroupsData, 'Form data > ', data);
    this.itemGroupsData.forEach((g: any) => {
      if(g.id == data.item_group_name) {
        name = g.group_name
      }
    });

    var obj = [{
      item_group_name: name,
      item_name: data.item_name,
      unit_name: data.unit_name,
      qty: data.qty
    }]
    console.log(obj);
    this.orderItemData = this.orderItemData.concat(obj);
    this.toast.success('Success', 'Item Added Successfully.')

    console.log(this.orderItemData);
    
  }

  // For submitting add purchase form data
  onSubmit(data: any) {
    var obj = {
      vendor_id: data.vendor_id,
      outlet_id: data.outlet_id,
      user_id: data.user_id,
      notes: data.notes,
      shipping_charge: data.shipping_charge,
      total_amount: data.total_amount,
      items: [{
        notes: this.orderItemData.notes,
        item_id: this.orderItemData.item_id, 
        item_group_id: this.orderItemData.item_group_id,
        qty: this.orderItemData.qty,
        unit_id: this.orderItemData.unit_id,
        subtotal: this.orderItemData.subtotal 
      } ]  
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
