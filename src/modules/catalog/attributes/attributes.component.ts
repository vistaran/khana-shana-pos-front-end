import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttributesService } from '../attributes.service';

@Component({
  selector: 'sb-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  public adata: any = [];

  page = 1;
  pageSize = 5;
  
  constructor(private attributes: AttributesService, private router: Router) { }

  ngOnInit(): void {

    this.attributes.getAttributesData()
      .subscribe( data => this.adata = data);
    }

    onClick() {
      this.router.navigate(['/catalog/addattribute']);
    }

    deleteRow(d: any){
      const index = this.adata.indexOf(d);
      this.adata.splice(index, 1);
    }

    refreshAttributes() { 
      this.adata = this.adata
        .map((user: any, i: any) => ({id: i + 1, ...user}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
}

  
