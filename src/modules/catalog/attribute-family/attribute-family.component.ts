import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttributeFamilyService } from '../attribute-family.service';

@Component({
  selector: 'sb-attribute-family',
  templateUrl: './attribute-family.component.html',
  styleUrls: ['./attribute-family.component.scss']
})
export class AttributeFamilyComponent implements OnInit {

  afData: any = [];
  
  constructor(private attributeFamily: AttributeFamilyService, private router: Router) { }

  ngOnInit(): void {
    this.attributeFamily.getAttributeFamily()
      .subscribe( data => this.afData = data);
    }

    onClick() {
      this.router.navigate(['/catalog/addAttributeFamily']);
    }

    deleteRow(d: any){
      const index = this.afData.indexOf(d);
      this.afData.splice(index, 1);
    }
  }
