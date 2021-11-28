import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListVendorsComponent } from './admin/list-vendors/list-vendors.component';
import { SaveClientComponent } from './admin/save-client/save-client.component';
import { SaveVendorsComponent } from './admin/save-vendors/save-vendors.component';
import { UpdateAdminComponent } from './admin/update-admin/update-admin.component';
import { UpdateBookComponent } from './admin/update-book/update-book.component';
import { UpdateClientComponent } from './admin/update-client/update-client.component';
import { UpdateVendorsComponent } from './admin/update-vendors/update-vendors.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { SaveBookComponent } from './book/save-book/save-book.component';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: "listAdmin",
    component: ListAdminComponent,
  },
  {
    path: 'listClient',
    component: ListClientComponent,
  },
  {
    path: 'listVendors',
    component: ListVendorsComponent,
  },
  {
    path: 'register',
    component: LoginComponent,
  },
  {
    path: 'saveClient',
    component: SaveClientComponent,
  },
  {
    path: 'saveVendors',
    component: SaveVendorsComponent,
  },
  {
    path: 'updateAdmin',
    component: UpdateAdminComponent,
  },
  {
    path: 'updateBook',
    component: UpdateBookComponent,
  },
  {
    path: 'updateClient',
    component: UpdateClientComponent,
  },
  {
    path: 'updateVendors',
    component: UpdateVendorsComponent,
  },
  {
    path: 'listBook',
    component: ListBookComponent,
  },
  {
    path: 'saveBook',
    component: SaveBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
