import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FineEntryComponent } from './fine-entry/fine-entry.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FineEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FineModule { }
