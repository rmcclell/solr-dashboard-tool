import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';


@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CreateRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateModule { }
