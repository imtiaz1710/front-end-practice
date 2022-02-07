import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FineEntryComponent } from './fine-entry/fine-entry.component';
import { FineListComponent } from './fine-list/fine-list.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FineEntryComponent,
    FineListComponent,
    ReportComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FineModule { }
