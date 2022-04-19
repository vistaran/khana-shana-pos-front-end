import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { NgSelectModule } from '@ng-select/ng-select';

// import { ItemsRoutingModule } from './items-routing.module';


@NgModule({
  declarations: [ItemsComponent, AddItemComponent, EditItemComponent],
  imports: [
    CommonModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule
    // ItemsRoutingModule
  ]
})
export class ItemsModule { }
