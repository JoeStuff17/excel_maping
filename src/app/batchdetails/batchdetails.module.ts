import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchdetailsComponent } from './batchdetails.component';
import { batchdetailsRouting } from './batchdetails.routes';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    BatchdetailsComponent
  ],
  imports: [
    CommonModule,
    batchdetailsRouting,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTabsModule,
    MatBadgeModule
  ]
})
export class BatchdetailsModule { }
