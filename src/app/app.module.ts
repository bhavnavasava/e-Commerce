import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import{DialogModule}from "primeng/dialog"
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { UsersComponent } from './users/users.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ForgotpasswordComponent } from './forget-password/forget-password.component';
import { AllSubCategoriesComponent } from './all-sub-categories/all-sub-categories.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AllUsersComponent,
    DashboardComponent,
    CategoryComponent,
    UsersComponent,
    AddCategoryComponent,
    AddProductComponent,
    SubCategoryComponent,
    ForgotpasswordComponent,
    AllCategoriesComponent,
    AllSubCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
