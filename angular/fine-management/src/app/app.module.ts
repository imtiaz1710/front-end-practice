import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FineModule } from './fine/fine.module';
import { UserModule } from './user/user.module';
import { AccessChecker } from './shared/access-checker';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TransactionModule } from './transaction/transaction.module';

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
