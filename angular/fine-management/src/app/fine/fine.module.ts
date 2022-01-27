import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FineEntryComponent } from './fine-entry/fine-entry.component';
import { FineListComponent } from './fine-list/fine-list.component';
import { ReportComponent } from './report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    FineEntryComponent,
    FineListComponent,
    ReportComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FineModule { }
