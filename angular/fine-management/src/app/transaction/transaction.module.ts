import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAndViewTransactionComponent } from './add-and-view-transaction/add-and-view-transaction.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddAndViewTransactionComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class TransactionModule { }
