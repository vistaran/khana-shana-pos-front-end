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
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseOrdersService } from '../purchase-orders.service';

@Component({
  selector: 'sb-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit {

  addOrderForm!: FormGroup
  itemsForm!: FormGroup
  editItemsForm!: FormGroup

  public vendorData: any = [];
  public outletData: any = [];
  public userData: any = [];
  public itemsData: any = [];
  public itemGroupsData: any = [];
  public unitsData: any = [];

  today = new Date()
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1; // January is 0!
  yyyy = this.today.getFullYear();

  curr_date: NgbDate = new NgbDate(this.yyyy, this.mm, this.dd);
  date = ''


  orderItemData: any = [];
  page = 1
  isInputShown = false
  isInputShown2 = false
  selectedVendor!: number;
  public name = '';
  // public unitName = '';
  public itemName = '';
  pageSize = 100
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

  // Edit Item Form

  get item_id2() {
    return this.editItemsForm.get('item_id');
  }

  get item_group_id2() {
    return this.editItemsForm.get('item_group_id');
  }

  get qty2() {
    return this.editItemsForm.get('qty');
  }

  get unit_id2() {
    return this.editItemsForm.get('unit_id');
  }

  get price2() {
    return this.editItemsForm.get('price');
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
      vendor_id: [0, Validators.required],
      outlet_id: [0, Validators.required],
      purchase_date: [this.curr_date],
      notes: [''],
      shipping_charge: [0],
    })

    this.itemsForm = this.fb.group({
      notes: [''],
      item_id: [null, Validators.required],
      item_group_id: [null, Validators.required],
      qty: ['', Validators.required],
      unit_id: [{ value: null, disabled: true }, Validators.required],
      price: ['', Validators.required],
    })

    this.editItemsForm = this.fb.group({
      notes: [''],
      item_id: [null, Validators.required],
      item_group_id: [null, Validators.required],
      qty: ['', Validators.required],
      unit_id: [{ value: null, disabled: true }, Validators.required],
      price: ['', Validators.required],
    })

    this.getVendorsData();
    this.getOutletsData();
    // this.getUserData();
    this.getItemGroupsData();

    // this.getUnitsData();


  }

  // To get Vendors Data
  getVendorsData() {
    this.vendorService.getVendorsData(this.page).subscribe(data => {
      this.vendorData = data.vendors.data.sort(function (a: any, b: any) {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      })
      this.addOrderForm.patchValue({
        vendor_id: this.vendorData[0].id
      })
    })
  }

  // To get Outlets Data
  getOutletsData() {
    this.outletService.getOutletData(this.page).subscribe(data => {
      this.outletData = data.outlets.data.sort(function (a: any, b: any) {
        const nameA = a.outlet_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.outlet_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      this.addOrderForm.patchValue({
        outlet_id: this.outletData[0].id
      })
    })
  }

  // To get User Data
  // getUserData() {
  //   this.userService.getUserData(this.page).subscribe(data => {
  //     this.userData = data.user.data
  //   })
  // }

  // To get Item groups data
  getItemGroupsData() {
    this.purchaseOrderService.getItemGroupsData(this.pageSize).subscribe((result: any) => {
      this.itemGroupsData = result.data.sort(function (a: any, b: any) {
        const nameA = a.group_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.group_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      // this.itemsForm.patchValue({
      //   item_group_id: this.itemGroupsData[0].id
      // })
    })
  }

  onSelectGroup(id: number) {
    // console.log(id);
    this.isInputShown = true
    this.group_id = id
    // console.log('Group id:', this.group_id);
    this.getItemsData();
  }

  onSelectDate(date: any) {
    // console.log(date);
    this.date = date.year + '-' + date.month + '-' + date.day
    // console.log(this.date);
  }

  // TO get Item group data
  getItemsData() {
    console.log('group_id', this.group_id);
    this.purchaseOrderService.getItemData(this.group_id, this.pageSize).subscribe((data: any) => {
      this.itemsData = data.data
      this.unit_name = this.itemsData.unit_name
      // console.log(this.itemsData, this.unit_name);
    })
  }

  searchItem(event: any) {
    // console.log(event.term);
    this.purchaseOrderService.searchItems(event.term).subscribe((res: any) => {
      this.itemsData = res.data
      // console.log(this.customerData);
    }, err => {
      this.toast.error('Error', 'Server error.')
      // this.showloader = false
    });
  }

  onSelectNameItem(id: any) {
    this.isInputShown2 = true
    this.itemsData.forEach((g: any) => {
      // console.log(g);
      if (g.id == id) {
        this.unit_name = g.unit_name
        this.unitId = g.unit_id
      }
    });
  }

  // To get Units of Measurement Data
  // getUnitsData() {
  //   this.unitService.getUOMData(this.page).subscribe(data => {
  //     this.unitsData = data.units.data
  //   })
  // }

  // For modal
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  // For shipping charges value
  onKey(event: any) {
    this.shippingCharge = Number(event.target.value);
    this.calculateTotal();
  }

  addItemData(data: any) {

    if(this.itemsForm.invalid) {
      this.itemsForm.markAllAsTouched();
      alert('Please fill all the required fields.');
      return;
    }

    this.modalService.dismissAll();
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
      item_group_id: Number(data.item_group_id),
      item_group_name: this.name,
      item_id: Number(data.item_id),
      item_name: this.itemName,
      unit_id: Number(this.unitId),
      unit_name: this.unit_name,
      qty: data.qty,
      notes: data.notes,
      price: data.price,
      subtotal: data.price * data.qty
    }]
    this.orderItemData = this.orderItemData.concat(obj);

    this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })
    this.toast.success('Success', 'Item Added Successfully.')

    this.calculateTotal();
    // this.isInputShown = false;
    // this.isInputShown2 = false;
  }

  editItemData(data: any) {

    if(this.editItemsForm.invalid) {
      this.editItemsForm.markAllAsTouched();
      alert('Please fill all the required fields.');
      return;
    }

    this.modalService.dismissAll();
    console.log('DAta', data);

    let group_name = '';
    let item_name = '';
    let unit_name = '';
    let unit_id = 0;

    this.itemGroupsData.forEach((g: any) => {
      if (g.id == data.item_group_id) {
        group_name = g.group_name
      }
    });

    this.itemsData.forEach((g: any) => {
      if (g.id == Number(data.item_id)) {
        item_name = g.item_name
        unit_name = g.unit_name
        unit_id = g.unit_id
      }
    });
    this.orderItemData.forEach((g: any) => {
      if (data.item_id == g.item_id) {
        g.item_group_id = data.item_group_id,
          g.item_group_name = group_name,
          g.item_id = data.item_id,
          g.item_name = item_name,
          g.unit_id = unit_id,
          g.unit_name = unit_name,
          g.qty = data.qty,
          g.notes = data.notes,
          g.price = data.price,
          g.subtotal = data.price * data.qty
      }
    })
    console.log(this.orderItemData);
    this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })
    this.toast.success('Success', 'Item Edited Successfully.')
    this.calculateTotal();

  }

  EditOrderPatchValue(id: any) {

    this.orderItemData.forEach((g: any) => {
      if (id == g.item_id) {
        console.log('G', g);
        this.unit_name = g.unit_name
        this.editItemsForm.patchValue({
          notes: g.notes,
          item_id: g.item_id,
          item_group_id: g.item_group_id,
          qty: g.qty,
          unit_id: g.unit_name,
          price: g.price
        })
      }
    })

  }

  RemoveOrder(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.orderItemData = this.orderItemData.filter((item: any) => {
        console.log('Item', item);
        return item.item_id !== id
      });
      console.log('len', this.orderItemData.length);

      if(this.orderItemData.length == 0) {
        this.semitotal = 0
      } else {
        this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
          return a + b;
        })
      }
      this.calculateTotal()
      console.log('afterdelete', this.orderItemData);

      this.toast.success('Success', 'Item Deleted Successfully.');
    }
  }

  calculateTotal() {
    this.total = Number(this.shippingCharge) + Number(this.semitotal);
  }

  // For submitting add purchase form data
  onSubmit(data: any) {

    if(this.orderItemData.length == 0) {
      alert('Please add atleast one item.');
      return;
    }

    if (this.date == '') {
      this.date = this.curr_date.year + '-' + this.curr_date.month + '-' + this.curr_date.day
    }


    const obj = {
      vendor_id: data.vendor_id,
      outlet_id: data.outlet_id,
      purchase_date: this.date,
      user_id: data.user_id,
      notes: data.notes,
      shipping_charge: data.shipping_charge,
      total_amount: this.total,
      items: this.orderItemData
    }
    this.purchaseOrderService.postPurchaseOrderData(obj)
      .subscribe((result: any) => {
        // console.log(result)
        this.toast.success('Success', 'Purchase Order Added Successfully.')
        this.router.navigate(['/purchase_orders']);
      }, err => {
        this.toast.error('Error', 'Token has expired. Please login again.')
      });

    console.log('Form Submitted', (obj));
  }

}
