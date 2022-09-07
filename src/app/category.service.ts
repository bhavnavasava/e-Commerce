import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(category:any):Observable<any>{  
    console.log("add category  api");
    return this.http.post(environment.url+ "private_api/addcategory",category)
  }

  getAllCategories(): Observable<any> { 
    console.log("all category  api");
    return this.http.get(environment.url+ "private_api/getcategories")
  }

  deleteCategory(categoryId:any):Observable<any>{
    return this.http.delete(environment.url+"private_api/deletecategory/"+categoryId)
  }

  addSubCategory(subCategory:any):Observable<any>{  
    console.log("add subcategory  api");
    return this.http.post(environment.url+ "private_api/addsubcategory",subCategory)
  }
}
