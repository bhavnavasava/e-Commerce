import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup
  constructor(private tsService: ToastrService, private router: Router, private sessionService: SessionService) {
    console.log("constructor")
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.strongPassword]),
     
      gender: new FormControl(),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
  }


  signup() {

    console.log(this.userForm.value);
    console.log(this.userForm.valid);
    if (this.userForm.valid) {
    
      this.sessionService.signupApi(this.userForm.value).subscribe(res => {
        if (res) {
          console.log("second if")
          this.tsService.success("signup done", "", { timeOut: 30000 });
          this.router.navigateByUrl("/login");
        }
      }, err => {
        console.log(err)
      
        this.tsService.error("try again")
        this.router.navigateByUrl("/signup");
      })
      
  
  }
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
