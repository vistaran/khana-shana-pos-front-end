import { MenuComponent } from './menu/menu.component';
import { QrcodeMenuModule } from './qrcode-menu.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: MenuComponent,
    data: {
      title: 'Menu',
      activeTopNav: 'Menu'
    } as SBRouteData,
  },
];

@NgModule({
  imports: [QrcodeMenuModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrcodeMenuRoutingModule { }
