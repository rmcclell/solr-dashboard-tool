import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CloneEntryComponent} from './clone/clone.component';
import { DeleteEntryComponent } from './delete/delete.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule) },
  { path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
  { path: 'clone', component: CloneEntryComponent, outlet: 'popup'},
  { path: 'delete', component: DeleteEntryComponent, outlet: 'popup'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
