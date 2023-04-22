import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    CommonModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    RouterModule,
    NgSelectModule,
    // QrcodeMenuRoutingModule
  ]
})
export class QrcodeMenuModule { }
