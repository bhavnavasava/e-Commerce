import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<any> {
    
    return this.http.get(environment.url+ "private_api/getallusers")
  }
  deleteUser(userId:any):Observable<any>{
    return this.http.delete(environment.url+"private_api/delete/"+userId)
  }

  getUserById(userId:any):Observable<any>{
    return this.http.get(environment.url+"private_api/getuserbyid/"+userId)
  }
}
