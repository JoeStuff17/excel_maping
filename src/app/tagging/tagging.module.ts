import { MatInputModule } from '@angular/material/input';
import { taggingRouting } from './tagging.routes';
import { TaggingComponent } from './tagging.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [TaggingComponent],
  imports: [
    CommonModule,
    taggingRouting,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class TaggingModule { }
