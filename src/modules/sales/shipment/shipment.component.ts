import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';

@Component({
  selector: 'sb-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {

  sdata: Object = [];
  
  constructor(private shipmentData: ShipmentService) { }

  ngOnInit(): void {
    this.shipmentData.getOrdersData()
      .subscribe( data => this.sdata = data);
  }

}
