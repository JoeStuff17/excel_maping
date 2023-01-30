import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRouting } from './dashboard.routes';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    dashboardRouting,
    MatButtonModule
  ]
})
export class DashboardModule { }
