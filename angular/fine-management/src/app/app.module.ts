import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessChecker } from './shared/access-checker';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TransactionModule } from './core/pages/transaction/transaction.module';
import { FineModule } from './core/pages/fine/fine.module';
import { AuthModule } from './core/pages/auth/auth.module';
import { UserModule } from './core/pages/user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FineModule,
    UserModule,
    ToastrModule.forRoot(),
    SharedModule,
    TransactionModule
  ],
  providers: [
    AccessChecker,
    AlertConfig,
    BsDatepickerConfig,
    BsDropdownConfig,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
