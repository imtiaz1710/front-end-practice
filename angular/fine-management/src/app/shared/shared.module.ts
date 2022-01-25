import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideAndNavBarComponent } from './side-and-nav-bar/side-and-nav-bar.component';
import { Routes, RouterModule } from '@angular/router';  
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SideAndNavBarComponent],
  imports: [CommonModule, RouterModule, BrowserModule],
  exports: [SideAndNavBarComponent],
})
export class SharedModule {}
