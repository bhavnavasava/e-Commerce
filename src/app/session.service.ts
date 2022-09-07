import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }
  signupApi(user:any):Observable<any>{
    console.log("signupApi")
    return  this.http.post("http://localhost:9292/public_api/signup",user)
   }
   
  loginApi(user:any):Observable<any>{
    console.log("loginApi")

   return this.http.post("http://localhost:9292/public_api/login",user)
  }
}
