import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FineModule } from './fine/fine.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AccessChecker } from './shared/access-checker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FineModule,
    UserModule
  ],
  providers: [AccessChecker],
  bootstrap: [AppComponent]
})
export class AppModule { }
