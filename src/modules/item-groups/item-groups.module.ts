import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { ItemGroupsRoutingModule } from './item-groups-routing.module';
import { AddItemGroupComponent } from './add-item-group/add-item-group.component';
import { EditItemGroupComponent } from './edit-item-group/edit-item-group.component';
import { ItemGroupsComponent } from './item-groups/item-groups.component';


@NgModule({
  declarations: [ItemGroupsComponent, AddItemGroupComponent, EditItemGroupComponent],
  imports: [
    CommonModule,
    NavigationModule,
    AppCommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
    // ItemGroupsRoutingModule
  ]
})
export class ItemGroupsModule { }
