import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OutletDataService } from '../outlet-data.service';

@Component({
  selector: 'sb-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {

  public odata: Object = [];

  constructor(private outletData: OutletDataService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.outletData.getOutletData()
      .subscribe( data => this.odata = data);
      
    }

    onClick() {
      this.router.navigate(['/pos/addoutlet']);
    }
  
  }

  

