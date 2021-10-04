import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  error:string =null;
  @ViewChild('username') user:ElementRef;
  @ViewChild('numrepos') numRep:ElementRef;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event:any) {
    if(event.keyCode == 13) {
      if (this.numRep.nativeElement.value >= 5 && this.numRep.nativeElement.value <= 100) {
      let userName: string = this.user.nativeElement.value;
      let numOfRepos = this.numRep.nativeElement.value;
      this.router.navigate(['/userdetails',userName,numOfRepos]);
      }
      else {
        this.error = "Please enter Repo/Page between 5 to 100";
        setTimeout(()=> {
          this.error=null;
        },2000);
      }
    }
  }

}
