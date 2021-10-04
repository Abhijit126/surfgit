import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './userdetail.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  numOfReposPerPage:number=null;
  userName:string=null;
  pageData=null;
  error:string=null;
  userRepos=null;
  userData:any=null;
  constructor(private route:ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.params.userName;
    this.numOfReposPerPage = +this.route.snapshot.params.numOfRepos;
    this.getUserDetails(this.userName).subscribe((data:any)=> {
      if(data.error) {
        this.error = data.error;
      }
      else {
      this.userData = data;
      this.getUserRepos(this.userName,this.numOfReposPerPage,1).subscribe((data:any)=> {
        if(data.message) {
          this.error = data.error;
        }
        else {
        this.pageData = data;
        this.userRepos = data.pageOfItems;
        }
      });
      }
    });
  }

  getUserDetails(userName:string) {
    return this.userService.getUserDetails(userName);
  }

  getUserRepos(userName: string, numContents: number = 5, pageNum: number = 1) {
    return this.userService.getUserRepos(userName,numContents,pageNum);
  }

  setPage(pageNum:number) {
    this.pageData = null;
    this.userRepos = null;
    this.getUserRepos(this.userName, this.numOfReposPerPage,pageNum).subscribe((data:any)=> {
      if (data.message) {
        this.error = data.error;
      }
      else {
        this.pageData = data;
        this.userRepos = data.pageOfItems;
      }
    });
  }
}
