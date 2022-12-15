import { QrcodeDataService } from './../../qrcode-menu/qrcode-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

import { ProductService } from '../product.service';

@Component({
    selector: 'sb-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public productData: any = [];
    public length = 0;
    public total = 0;


    page = 1;
    pageSize = 10;
    searchValue: any
    showloader: any
    activeId = 1;

    qrCode: any;


    constructor(
        private productService: ProductService,
        private router: Router,
        private toast: AppToastService,
        private activatedRoute: ActivatedRoute,
        private qrCodeService: QrcodeDataService
    ) {

    }

    ngOnInit() {

        this.getProductData();
        this.generateQrCode();
    }

    // To get products data for table listing
    getProductData() {
        this.showloader = true
        this.productService.getProducts(this.page).subscribe(result => {
            this.productData = result.products.data;
            this.length = this.productData.length;
            this.total = result.products.total;
            this.showloader = false
            console.log(this.length)
        }, err => {
            this.showloader = false
            this.toast.error('Error', 'Server error.')
        })
    }

    // For navigating to add product form on click
    onClick() {
        this.router.navigate(['/catalog/addproduct']);
    }

    // For updating data on page change
    onPageChange(event: any) {
        this.page = event;
        this.getProductData();
        console.log('Here >>>', this.page, this.productData);
    }

    // For deleting product
    deleteRow(id: number) {
        if (confirm('Are you sure you want to delete?')) {
            this.productService.deleteProducts(id).subscribe(data => {
                this.getProductData();
                this.toast.success('Success', 'Product Deleted Successfully.')
            }, err => {
                this.toast.error('Error', 'Server error.')
            });
            console.log(this.productData);
        }
    }

    // For searching products from table data
    search(event: any) {
        this.showloader = true
        this.productService.searchProducts(this.searchValue).subscribe(res => {
            this.productData = res.products.data
            this.length = this.productData.length;
            this.total = res.products.total;
            this.showloader = false
            console.log(this.productData, this.length)
        }, err => {
            this.toast.error('Error', 'Server error.')
            this.showloader = false
        });
    }

    generateQrCode() {
        this.qrCodeService.getQrCode().subscribe(data => {
            console.log(data);
            // let htmlContent = `<div>`+ data.toString() + `</div>`;

            // let invoice = window.open("", "MsgWindow", "");
            // invoice?.document.write(htmlContent);
            // setTimeout(() => {
            //     // invoice?.print();
            //     invoice?.focus();
            //     invoice?.close();
            // });
        }, err => {
            console.log(err.error.text);
            let htmlContent = `<div style="text-align: center;">`+ err.error.text + `</div>
            <br>
            <p style="text-align: center;">Scan this QR code or <a href="https://posdemo.vistaran.com/menu">click here</a> to view menu.</p>`;
            let invoice = window.open("", "", "width=500,height=300,left=200,top=200");
            invoice?.document.write(htmlContent);
            setTimeout(() => {
                // invoice?.print();
                invoice?.focus();
                // invoice?.close();
            });
        })
    }

}
