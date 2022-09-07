import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any> = []

  user: any = {}
  userid: number = 0;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers()

    const user = localStorage.getItem("userId");
    this.userService.getUserById(user).subscribe(resp => {
      this.users = resp.data
      console.log("user by id" + resp.data.user);

    })
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(res => {
      console.log("get all users==>");
      console.log(res.users);
      this.users = res;
    })
  }

  deleteUser(userId: any) {
    console.log("delete user called..." + userId);
    this.userService.deleteUser(userId).subscribe(resp => {
      this.toastr.success("user Deleted...")
      this.users = this.users.filter(u => u.userId != userId)
      this.router.navigateByUrl("/home")
    }, err => {
      console.log(err);
      this.toastr.error(err);
    })
  }

}
