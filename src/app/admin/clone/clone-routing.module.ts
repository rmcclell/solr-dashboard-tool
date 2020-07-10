import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloneEntryComponent, CloneComponent } from './clone.component';

const routes: Routes = [{ path: '', component: CloneEntryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloneRoutingModule { }
