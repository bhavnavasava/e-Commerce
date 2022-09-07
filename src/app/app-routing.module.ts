import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {component:LoginComponent,path:""},
{component:SignupComponent,path:"signup"},
{component:LoginComponent,path:"login"},
{component: HomeComponent, path: "home" },
{component:AllUsersComponent,path:"allusers"},
{component:DashboardComponent,path:"dashboard"},
{component:CategoryComponent,path:"category"},
{component:UsersComponent,path:"user"},
{component:AddCategoryComponent,path:"addCategory"},
{component:AddProductComponent,path:"addProduct"},
{component:SubCategoryComponent,path:"addSubCategory"},
{component:ForgetPasswordComponent,path:"forgetPassword"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
