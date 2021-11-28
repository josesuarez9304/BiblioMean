import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { SaveBookComponent } from './book/save-book/save-book.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { SaveVendorsComponent } from './admin/save-vendors/save-vendors.component';
import { UpdateVendorsComponent } from './admin/update-vendors/update-vendors.component';
import { ListVendorsComponent } from './admin/list-vendors/list-vendors.component';
import { SaveClientComponent } from './admin/save-client/save-client.component';
import { UpdateClientComponent } from './admin/update-client/update-client.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { UpdateBookComponent } from './admin/update-book/update-book.component';

import { AdminService } from './services/admin.service';
import { ClientService } from './services/client.service';
import { VendorsService } from './services/vendors.service';
import { BookService } from './services/book.service';
import { TokenInterceptorService } from './services/token-interceptor.service';


import { AuthAdminGuard } from './guard/auth-admin.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SaveBookComponent,
    ListBookComponent,
    SaveVendorsComponent,
    UpdateVendorsComponent,
    ListVendorsComponent,
    SaveClientComponent,
    UpdateClientComponent,
    ListClientComponent,
    RegisterAdminComponent,
    UpdateAdminComponent,
    ListAdminComponent,
    UpdateBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AdminService,ClientService,VendorsService,BookService,TokenInterceptorService,AuthAdminGuard,FormsModule,ReactiveFormsModule,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
