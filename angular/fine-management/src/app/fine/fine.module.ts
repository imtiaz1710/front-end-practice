import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FineEntryComponent } from './fine-entry/fine-entry.component';
import { SharedModule } from '../shared/shared.module';
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
    CommonModule,
    SharedModule
  ]
})
export class FineModule { }
