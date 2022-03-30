import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'sb-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  odata: any = [];
  
  constructor(private orderData: OrdersService) { }

  ngOnInit(): void {
    this.orderData.getOrdersData()
      .subscribe( data => this.odata = data);
  }
}
