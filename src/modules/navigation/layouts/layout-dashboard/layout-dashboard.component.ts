import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { sideNavItems, sideNavSections } from '@modules/navigation/data';
import { NavigationService } from '@modules/navigation/services';
import { Subscription, BehaviorSubject } from 'rxjs';
declare var $ : any;

@Component({
    selector: 'sb-layout-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-dashboard.component.html',
    styleUrls: ['layout-dashboard.component.scss'],
})
export class LayoutDashboardComponent implements OnInit, OnDestroy {
    @Input() static = false;
    @Input() light = false;
    @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
    subscription: Subscription = new Subscription();
    sideNavItems = sideNavItems;
    sideNavSections = sideNavSections;
    sidenavStyle = 'sb-sidenav-dark';
    _sideNavVisible$ = new BehaviorSubject(false);

    constructor(
        public navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}
    ngOnInit() {
        if (this.light) {
            this.sidenavStyle = 'sb-sidenav-light';
        }
        this.subscription.add(
            this.navigationService.sideNavVisible$().subscribe(isVisible => {
                this.sideNavHidden = !isVisible;
                this.changeDetectorRef.markForCheck();
            })
        );
        
        

        const component = this;
        $("#layoutSidenav_content").click(function () {
            var ww = document.body.clientWidth;
        if (ww < 600) {
          $('#layoutSidenav_content').addClass('blue');
        } else if (ww >= 601) {
          $('#layoutSidenav_content').removeClass('blue');
        };
            if(component._sideNavVisible$.value == false && $("#layoutSidenav_content").hasClass("blue") == true){
                component.navigationService.toggleSideNav(component._sideNavVisible$.value);
            }
            
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
