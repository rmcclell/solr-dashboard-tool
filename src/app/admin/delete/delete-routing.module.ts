
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteEntryComponent, DeleteComponent } from './delete.component';

const routes: Routes = [{ path: '', component: DeleteEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteRoutingModule { }
