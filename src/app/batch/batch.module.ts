import { DashboardModule } from './../dashboard/dashboard.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchComponent } from './batch.component';
import { batchRouting } from './batches.routes';



@NgModule({
  declarations: [
    BatchComponent
  ],
  imports: [
    CommonModule,
    batchRouting,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class BatchModule { }
