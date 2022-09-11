import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  emailform: FormGroup
  resetform: FormGroup
  constructor(private http: HttpClient) {
    let email = localStorage.getItem("email")

    this.emailform = new FormGroup({
      email: new FormControl(''),
      otp: new FormControl('', [Validators.required])
    })

    this.resetform = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.strongPassword])
    })
    this.emailform.controls['email'].setValue(email);
    this.resetform.controls['email'].setValue(email);
  }


  strongPassword(password: AbstractControl): ValidationErrors | null {
    let isUpper = false
    let isLower = false
    let isSpecial = false
    let isDigit = false
    let passwordValue = password.value as string

    if (passwordValue.length < 8)
      return null

    for (let i = 0; i < passwordValue.length; i++) {
      if (passwordValue.charAt(i) >= 'A' && passwordValue.charAt(i) <= 'Z') {
        isUpper = true
      } else if (passwordValue.charAt(i) >= 'a' && passwordValue.charAt(i) <= 'z') {
        isLower = true
      }
      else if (passwordValue.charAt(i) == '$' || passwordValue.charAt(i) == '#' || passwordValue.charAt(i) == '@') {
        isSpecial = true
      }
      else if (passwordValue.charAt(i) >= '0' && passwordValue.charAt(i) <= '9') {
        isDigit = true
      }
    }

    if (isLower && isUpper && isSpecial && isDigit)
      return null
    else
      return { "strongPassword": true }
    
  }
  signupApi(user: any): Observable<any> {
    console.log("signupApi")
    return this.http.post(environment.url + "public_api/signup", user)
  }

  loginApi(user: any): Observable<any> {
    console.log("loginApi")

    return this.http.post(environment.url + "public_api/login", user)
  }


  emailsend(email: any): Observable<any> {
    return this.http.post(environment.url + "public_api/otpsend", email)
  }
  checkotp(otpbean: any): Observable<any> {
    return this.http.post(environment.url + "public_api/otp", otpbean)
  }
  resetpassword(passwordbean: any): Observable<any> {
    return this.http.post(environment.url + "public_api/forgot", passwordbean)
  }
}
