
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { DeleteRoutingModule } from './delete-routing.module';
import { DeleteEntryComponent, DeleteComponent } from './delete.component';


@NgModule({
  declarations: [DeleteEntryComponent, DeleteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DeleteRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    MaterialModule
  ]

})
export class DeleteModule { }
