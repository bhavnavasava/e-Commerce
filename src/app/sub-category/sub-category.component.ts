import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  categories: Array<any> = []

userForm:FormGroup
  constructor(private categoryService:CategoryService,private toastr:ToastrService,private router:Router,private http:HttpClient) { 
    this.userForm = new FormGroup({
     subCategoryName: new FormControl('', [Validators.required]),

  })
}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res=>{
      this.categories=res
      console.log("response  ===== "+res); 
      console.log("all categories ============>>>>>>>"+this.categories);
    })
  }

  addSubCategory() {
    console.log("add subcategory method");
      this.categoryService.addSubCategory(this.userForm.value).subscribe(res => {
        if (res) {
          console.log("second if")
       
          this.toastr.success(" sub Category Added..", "", { timeOut: 3000 });
          this.router.navigateByUrl("/category");
        }
      }, err => {
        console.log(err)

        this.toastr.error("try again")
        this.router.navigateByUrl("/addSubCategory");
      })
    }
}
