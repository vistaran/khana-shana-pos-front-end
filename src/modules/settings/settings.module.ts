import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { AppCommonModule } from '@common/app-common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowUserSettingsComponent } from './show-user-settings/show-user-settings.component';
import { TaxesComponent } from './taxes/taxes.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { AddTaxComponent } from './add-tax/add-tax.component';


@NgModule({
    declarations: [
        UserSettingsComponent,
        ShowUserSettingsComponent,
        TaxesComponent,
        ShopDetailsComponent,
        AddTaxComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        AppCommonModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgSelectModule
    ]
})
export class SettingsModule { }
