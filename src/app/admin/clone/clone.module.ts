import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { CloneRoutingModule } from './clone-routing.module';
import { CloneEntryComponent, CloneComponent } from './clone.component';


@NgModule({
  declarations: [ CloneEntryComponent, CloneComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CloneRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    MaterialModule
  ]
})
export class CloneModule { }
