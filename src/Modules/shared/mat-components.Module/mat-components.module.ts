import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from "@angular/material/form-field";

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatRadioModule } from '@angular/material/radio';

import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],

  exports: [
    MatCheckboxModule,
    MatChipsModule, 
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule, 
    MatRadioModule, 
    MatSelectModule, 
    MatTableModule, 
    MatTabsModule, 
    MatToolbarModule
  ]
})
export class MatComponentsModule { }
