import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
userForm:FormGroup
  constructor(private categoryService:CategoryService,private toastr:ToastrService,private router:Router) { 
    this.userForm = new FormGroup({
     subCategoryName: new FormControl('', [Validators.required]),

  })
}

  ngOnInit(): void {
    
  }

  addSubCategory() {
    console.log("add subcategory method");
    
      this.categoryService.addSubCategory(this.userForm.value).subscribe(res => {
        if (res) {
          console.log("second if")
       
          this.toastr.success("Category Added..", "", { timeOut: 3000 });
          this.router.navigateByUrl("/category");
        }
      }, err => {
        console.log(err)

        this.toastr.error("try again")
        this.router.navigateByUrl("/addSubCategory");
      })
    }
}
