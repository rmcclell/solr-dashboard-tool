import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { ResultsComponent } from './results/results.component';
import { ChartsComponent } from './charts/charts.component';
import { CriteriaComponent } from './criteria/criteria.component';

@NgModule({
  declarations: [DashboardComponent, PieChartComponent, BarChartComponent, ResultsComponent, ChartsComponent, CriteriaComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  entryComponents: [
    PieChartComponent, BarChartComponent
  ]
})
export class DashboardModule { }
