import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private tsService: ToastrService, private router: Router, private sessionService: SessionService, private toastr: ToastrService) {
    console.log("constructore")
    this.loginForm = new FormGroup({

      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.strongPassword]),

    })
  }

  ngOnInit(): void {
  }
  login() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    this.sessionService.loginApi(this.loginForm.value).subscribe(res => {
      
      console.log("data", res)

     
      this.toastr.success("login done")
      localStorage.setItem("userId", res.data.userId)
      if (res.data.role.roleName == "customer") {
        // console.log(res.data.role.roleName)
        this.router.navigateByUrl("/dashboard")
      }
      else if (res.data.role.roleName == "admin") {

        this.router.navigateByUrl("/home")

      }
    }, err => {
      this.toastr.error("please again try")
    })
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
    // return null;//no errors 
  }

}
