import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { SBRouteData } from '@modules/navigation/models';
import { SettingsModule } from './settings.module';
import { ShowUserSettingsComponent } from './show-user-settings/show-user-settings.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [],
        component: ShowUserSettingsComponent,
        data: {
            title: 'User Settings',
            activeTopNav: 'Settings'
        } as SBRouteData,
    },
    {
        path: 'edit',
        canActivate: [],
        component: UserSettingsComponent,
        data: {
            title: 'User Settings',
            activeTopNav: 'Settings'
        } as SBRouteData,
    }
];

@NgModule({
    imports: [SettingsModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
