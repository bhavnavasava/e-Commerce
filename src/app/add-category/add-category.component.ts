import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  userForm: FormGroup

  constructor(private toastr: ToastrService, private router: Router, private categoryService: CategoryService) {
    console.log("constructor")

    this.userForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),

    })
  }
  ngOnInit(): void {
  }

  addCategory() {
    console.log("add category method");
    
      this.categoryService.addCategory(this.userForm.value).subscribe(res => {
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

