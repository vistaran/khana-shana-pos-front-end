import { QrcodeDataService } from './../qrcode-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  menuData: any = [];
  constructor(
    public qrCodeService: QrcodeDataService
  ) { }

  ngOnInit(): void {
    this.getMenuData();
  }

  getMenuData() {
    this.qrCodeService.getMenuData().subscribe((data: any) => {
      console.log(data, 'menudata');
      this.menuData = data.qrcode_data;

    })
  }

}
