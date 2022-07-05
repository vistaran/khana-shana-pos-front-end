import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemGroupsService } from '@modules/item-groups/item-groups.service';
import { ItemsModule } from '@modules/items/items.module';
import { ItemsService } from '@modules/items/items.service';
import { OutletDataService } from '@modules/pos/outlet-data.service';
import { UomService } from '@modules/pos/uom.service';
import { UserDataService } from '@modules/pos/user-data.service';
import { VendorsService } from '@modules/pos/vendors.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseOrdersService } from '../purchase-orders.service';

@Component({
  selector: 'sb-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.scss']
})
export class EditPurchaseOrderComponent implements OnInit {

  editOrderForm!: FormGroup
  itemsForm!: FormGroup
  editItemsForm!: FormGroup

  public vendorData: any = [];
  public outletData: any = [];
  public userData: any = [];
  public itemsData: any = [];
  public itemGroupsData: any = [];
  public unitsData: any = [];
  removedOrder: any = [];

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
  id: any
  curr_id: any
  curr_date!: NgbDate;
  year = 0
  month = 0
  day = 0
  date = ''

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
    private modalService: NgbModal,
    private toast: AppToastService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.editOrderForm = this.fb.group({
      vendor_id: [null, Validators.required],
      outlet_id: ['', Validators.required],
      purchase_date: [],
      order_date: [],
      notes: [''],
      shipping_charge: [0],
    })

    this.itemsForm = this.fb.group({
      notes: [''],
      item_id: [null, Validators.required],
      item_group_id: [0, Validators.required],
      qty: ['', Validators.required],
      unit_id: [{ value: null, disabled: true }, Validators.required],
      price: ['', Validators.required],
    })

    this.editItemsForm = this.fb.group({
      notes: [''],
      item_id: [{ value: null, disabled: true }, Validators.required],
      item_group_id: [{ value: null, disabled: true }, Validators.required],
      qty: ['', Validators.required],
      unit_id: [{ value: null, disabled: true }, Validators.required],
      price: ['', Validators.required],
    })

    this.curr_id = this.route.snapshot.params.id
    // console.log('Current id:', this.curr_id);


    // To get edit order form field values
    this.purchaseOrderService.patchOrderData(this.curr_id).subscribe((data: any) => {

      if (data.order[0].purchase_date) {
        this.year = Number(data.order[0].purchase_date.substr(0, 4))
        this.month = Number(data.order[0].purchase_date.substring(5, 7))
        this.day = Number(data.order[0].purchase_date.substring(8, 10))
        this.curr_date = new NgbDate(this.year, this.month, this.day)
      }
      // console.log('Year', this.year, 'Month', this.month, 'Day', this.day, 'Date', this.curr_date);

      this.editOrderForm.patchValue({
        vendor_id: data.order[0].vendor_id,
        outlet_id: data.order[0].outlet_id,
        purchase_date: this.curr_date,
        notes: data.order[0].notes,
        shipping_charge: data.order[0].shipping_charge
      })
      this.orderItemData = data.items
      this.orderItemData.forEach((g: any) => {
        g.flag = 'update';
      })
      console.log('Order data', this.orderItemData);
      this.shippingCharge = data.order[0].shipping_charge
      this.total = data.order[0].total_amount
      this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
        return a + b;
      })
      this.calculateTotal()
    })

    this.purchaseOrderService.patchOrderData(this.curr_id).subscribe((data: any) => {
      this.itemsForm.patchValue(data)
      // console.log(data)
    })

    this.getVendorsData();
    this.getOutletsData();
    // this.getUserData();
    this.getItemGroupsData();
    // this.getItemsData();
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
      });
    })
  }

  resetItemForm() {
    this.itemsForm = this.fb.group({
      notes: [''],
      item_id: [null, [Validators.required]],
      item_group_id: [0, [Validators.required]],
      qty: ['', [Validators.required]],
      unit_id: [{ value: null, disabled: true }],
      price: ['', [Validators.required]],
    })
  }

  onSelectDate(date: any) {
    this.date = date.year + '-' + date.month + '-' + date.day
    // console.log(this.date);
  }

  onSelectGroup(id: number) {
    console.log(id);
    this.isInputShown = true
    this.group_id = id
    // console.log('Group id:', this.group_id);
    this.getItemsData();
  }

  // TO get Item group data
  getItemsData() {
    this.purchaseOrderService.getItemData(this.group_id, this.pageSize).subscribe((data: any) => {
      this.itemsData = data.data.sort(function (a: any, b: any) {
        const nameA = a.item_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.item_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      this.unit_name = this.itemsData.unit_name
      // console.log(this.itemsData, this.unit_name);
    })
  }

  searchItem(event: any) {
    // console.log(event.term);
    this.purchaseOrderService.searchItems(event.term).subscribe((res: any) => {
      this.itemsData = res.data.sort(function (a: any, b: any) {
        const nameA = a.item_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.item_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      // console.log(this.customerData);
    }, err => {
      this.toast.error('Error', 'Server error.')
      // this.showloader = false
    });
  }

  onSelectNameItem(id: any) {
    this.isInputShown2 = true
    this.itemsData.forEach((g: any) => {

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
    console.log(typeof (event));

    let charges = 0;
    if (typeof (event) == 'object') {
      charges = event.target.value;
    } else {
      charges = event;
    }

    let showShipping = false;
    let total = 0;
    if (this.orderItemData.length != 0) {
      this.orderItemData.forEach((ele: any) => {
        total += ele.subtotal;
      })
      if (total <= charges) {
        alert('Shipping Charges cannot be greater than or equal to the total amount!');
        this.shippingCharge = 0;
        this.total = total;
        showShipping = false;
      }
      else {
        showShipping = true;
      }
    }
    else if(this.shippingCharge != 0){
      alert('Please add atleast one item to input shipping charges!');
      this.shippingCharge = 0;
      return;
    }

    if (showShipping) {
      this.shippingCharge = Number(charges);
      this.calculateTotal();
    }
  }

  addItemData(data: any) {

    if (this.itemsForm.invalid) {
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

    this.itemsForm = this.fb.group({
      notes: [''],
      item_id: [null, [Validators.required]],
      item_group_id: [0, [Validators.required]],
      qty: ['', [Validators.required]],
      unit_id: [{ value: null, disabled: true }],
      price: ['', [Validators.required]],
    })

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
      subtotal: data.price * data.qty,
      flag: 'add'
    }]
    this.orderItemData = this.orderItemData.concat(obj);

    this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })
    this.toast.success('Success', 'Item Added Successfully.')

    this.calculateTotal();
  }

  editItemData(data: any) {

    if (this.editItemsForm.invalid) {
      this.editItemsForm.markAllAsTouched();
      alert('Please fill all the required fields.');
      return;
    }

    this.modalService.dismissAll();

    console.log('DAta', data);

    const editData = data.getRawValue();

    let group_name = '';
    let item_name = '';
    let unit_name = '';
    let unit_id = 0;

    this.itemGroupsData.forEach((g: any) => {
      if (g.id == editData.item_group_id) {
        group_name = g.group_name
      }
    });

    this.itemsData.forEach((g: any) => {
      if (g.id == Number(editData.item_id)) {
        item_name = g.item_name
        unit_name = g.unit_name
        unit_id = g.unit_id
      }
    });
    this.orderItemData.forEach((g: any) => {
      if (editData.item_id == g.item_id) {
        g.item_group_id = editData.item_group_id,
          g.item_group_name = group_name,
          g.item_id = editData.item_id,
          g.item_name = item_name,
          g.unit_id = unit_id,
          g.unit_name = unit_name,
          g.qty = editData.qty,
          g.notes = editData.notes,
          g.price = editData.price,
          g.subtotal = editData.price * editData.qty
      }
    })
    console.log(this.orderItemData);
    this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
      return a + b;
    })
    this.toast.success('Success', 'Item Edited Successfully.')
    setTimeout(() => { this.onKey(this.shippingCharge) }, 500);
    setTimeout(() => { this.calculateTotal() }, 500);

  }


  EditOrderPatchValue(id: any) {
    console.log('ID', this.itemsData);
    console.log(this.orderItemData);

    this.orderItemData.forEach((g: any) => {
      if (id == g.item_id) {
        this.unit_name = g.unit_name
        console.log('G', g.item_id);
        this.group_id = g.item_group_id
        this.purchaseOrderService.getItemData(this.group_id, this.pageSize).subscribe((data: any) => {
          this.itemsData = data.data
        })
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

  RemoveOrder(itemId: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.orderItemData = this.orderItemData.filter((item: any) => {
        if (item.flag == 'update' && item.item_id == itemId) {
          this.removedOrder.push({ flag: 'delete', id: item.id })
        }
        return item.item_id !== itemId
      });
      if (this.orderItemData.length == 0) {
        this.semitotal = 0
      } else {
        this.semitotal = this.orderItemData.map((a: any) => (a.subtotal)).reduce(function (a: any, b: any) {
          return a + b;
        })
      }

      this.toast.success('Success', 'Item Deleted Successfully.');
      setTimeout(() => { this.onKey(this.shippingCharge) }, 500);
      setTimeout(() => { this.calculateTotal() }, 500);
      console.log('afterdelete', this.orderItemData);
    }
  }

  calculateTotal() {
    this.total = Number(this.shippingCharge) + Number(this.semitotal);
  }

  // For submitting add purchase form data
  onSubmit(data: any) {

    console.log(this.orderItemData.length);

    if (this.orderItemData.length == 0) {
      alert('Please add atleast one item.');
      return;
    }

    if (this.date == '') {
      this.date = this.curr_date.year + '-' + this.curr_date.month + '-' + this.curr_date.day
    }

    const finalItems = this.orderItemData.concat(this.removedOrder)
    console.log(finalItems);


    const obj = {
      vendor_id: data.vendor_id,
      outlet_id: data.outlet_id,
      purchase_date: this.date,
      user_id: data.user_id,
      notes: data.notes,
      shipping_charge: this.shippingCharge,
      total_amount: this.total,
      items: finalItems
    }
    this.purchaseOrderService.editPurchaseOrderData(this.curr_id, obj)
      .subscribe((result: any) => {
        console.log(result)
        this.toast.success('Success', 'Purchase Order Edited Successfully.')
        this.router.navigate(['/purchase_orders']);
      }, err => {
        this.toast.error('Error', 'Server error.')
      });
    console.log('Form Submitted', (data));
  }

}
