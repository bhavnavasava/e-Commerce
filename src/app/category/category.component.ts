import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  userForm:FormGroup

  categories: Array<any> = []
  display = false
  constructor(private categoryService:CategoryService,private toastr:ToastrService,private router:Router) {
    this.userForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),

   })
  }

  ngOnInit(): void {
    this.getCategories()
   
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
      this.router.navigateByUrl("/category")
    }, err => {
      console.log(err);
      this.toastr.error(err);
    })
  }

  addSubCategory() {
    console.log("add category method");
    
      this.categoryService.addSubCategory(this.userForm.value).subscribe(res => {
        if (res) {
          console.log("second if")
       
          this.toastr.success("Category Added..", "", { timeOut: 3000 });
          this.router.navigateByUrl("/category");
        }
      }, err => {
        console.log(err)

        this.toastr.error("try again")
        this.router.navigateByUrl("/addCategory");
      })

    }
}
