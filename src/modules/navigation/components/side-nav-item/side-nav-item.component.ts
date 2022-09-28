import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: SBRouteData;
    path: any;

    constructor(
        private activeRoute: ActivatedRoute
    ) {}
    ngOnInit() {
        this.path = this.activeRoute.snapshot.data?.activeTopNav;
    }
}
