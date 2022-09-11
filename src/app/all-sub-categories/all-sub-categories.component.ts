import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-all-sub-categories',
  templateUrl: './all-sub-categories.component.html',
  styleUrls: ['./all-sub-categories.component.css']
})
export class AllSubCategoriesComponent implements OnInit {
  category: any = {}
  categories: Array<any> = []
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getSubCategories() 
  }

  getSubCategories() {
    this.categoryService.getAllSubCategories().subscribe(res => {
      console.log("get all categories==>",res.categories);
   
      this.categories = res;
    })
  }
}
