import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRouting } from './dashboard.routes';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    dashboardRouting
  ]
})
export class DashboardModule { }
