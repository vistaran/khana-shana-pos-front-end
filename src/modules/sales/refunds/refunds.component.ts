import { Component, OnInit } from '@angular/core';
import { RefundsService } from '../refunds.service';

@Component({
  selector: 'sb-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {

  rdata: Object = [];
  
  constructor(private refundData: RefundsService) { }

  ngOnInit(): void {
    this.refundData.getOrdersData()
      .subscribe( data => this.rdata = data);
  }

}
