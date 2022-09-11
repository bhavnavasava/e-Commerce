import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm=FormGroup
  userss: any = {}
  categories: any = {}
  constructor(private userService: UserService, private categoryService: CategoryService) { 
    
  //   this.productForm = new FormGroup({
  //     productName: new FormControl('', [Validators.required]),

  // })
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
      console.log("get all categories==>", res.categories);

      this.categories = res;
    })
  }
}
