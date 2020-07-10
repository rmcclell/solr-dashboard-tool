import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
//import { CloneEntryComponent} from './clone/clone.component';
//import { DeleteEntryComponent, DeleteComponent } from './delete/delete.component';

import { MaterialModule } from '../material/material.module';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule) },
  { path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
  { path: 'clone', loadChildren: () => import('./clone/clone.module').then(m => m.CloneModule), outlet: 'popup' },
  { path: 'delete', loadChildren: () => import('./delete/delete.module').then(m => m.DeleteModule), outlet: 'popup' }
  //{ path: 'delete', component: DeleteEntryComponent, outlet: 'popup'}
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule, MaterialModule]
})
export class AdminRoutingModule { }
