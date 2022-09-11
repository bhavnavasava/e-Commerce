import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup
  userss: any = {}
  categories:any={}
  constructor(private toastr: ToastrService, private router: Router, private categoryService: CategoryService,private userService:UserService) {
    console.log("constructor")

    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),

    })
  }
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


  addCategory() {
    console.log("add category method");
    
      this.categoryService.addCategory(this.categoryForm.value).subscribe(res => {
        if (res) {
          console.log("second if")
       
          this.toastr.success("Category Added..", "", { timeOut: 3000 });
          this.router.navigateByUrl("/allcategories");
        }
      }, err => {
        console.log(err)

        this.toastr.error("try again")
        this.router.navigateByUrl("/addCategory");
      })

    }
  }

