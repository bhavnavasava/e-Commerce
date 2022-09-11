import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  userss: any = {}
  categories: Array<any> = []
  constructor(private categoryService:CategoryService,private toastr:ToastrService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getCategories()
   
    const user = localStorage.getItem("userId");
    this.userService.getUserById(user).subscribe(resp => {
      this.userss = resp.data
    })
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      console.log("get all categories==>",res.categories);
   
      this.categories = res;
    })
  }

  deleteCategory(categoryId: any) {
    console.log("delete category called..." + categoryId);
    this.categoryService.deleteCategory(categoryId).subscribe(resp => {
      this.toastr.success("user Deleted...")
      this.categories = this.categories.filter(c => c.categoryId != categoryId)
      this.router.navigateByUrl("/allcategory")
    }, err => {
      console.log(err);
      this.toastr.error(err);
    })
  }


}
