import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsEntryComponent, SettingsComponent } from './settings/settings.component';

const routes: Routes = [{ path: 'settings', component: SettingsEntryComponent, outlet: 'popup'}, { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
