import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {

    public totalProducts: any = 0;
    totalCategories: any = 0;
    orders: any = 0;
    expenses: any = 0;
    customers: any = 0;
    repeatCustomers: any = 0;
    interval: any;
    cnt2 = 0;
    profit = 0;

    get playingValue() {
        return this.totalProducts;
    }

    set playingValue(totalProducts) {
        this.totalProducts = totalProducts;
    }

    constructor(
        private ref: ChangeDetectorRef
    ) {

    }
    ngOnInit() {
        this.totalProducts = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        this.totalCategories = Math.floor(Math.random() * (100 - 50 + 1) + 50);
        this.expenses = Math.floor(Math.random() * (5000 - 4000 + 1) + 4000);
        this.profit = Math.floor(Math.random() * (6000 - 5500 + 1) + 5500);

        this.updateValues();
        setInterval(() => {
            this.interval = this.updateValues();
            this.ref.detectChanges();
        }, 2000);
    }

    updateValues() {
        this.orders = Math.floor(Math.random() * (300 - 200 + 1) + 200);
        this.customers = Math.floor(Math.random() * (200 - 100 + 1) + 100);
        this.repeatCustomers = Math.floor(Math.random() * (100 - 50 + 1) + 50);
        this.profit = Math.floor(Math.random() * (6000 - 5500 + 1) + 5500);
        console.log(this.totalProducts);

    }

}
