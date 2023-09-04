import { Component, OnInit } from '@angular/core';
import { UserDataService } from '@modules/pos/user-data.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';

@Component({
    selector: 'sb-show-user-settings',
    templateUrl: './show-user-settings.component.html',
    styleUrls: ['./show-user-settings.component.scss']
})
export class ShowUserSettingsComponent implements OnInit {

    activeId = 1

    constructor(
    ) { }

    ngOnInit(): void {
    }
}
