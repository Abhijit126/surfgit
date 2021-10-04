import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class UserService {
    constructor(private http:HttpClient) {}


    getUserRepos(userName: string, numContents: number = 5, pageNum: number = 1) {
        return this.http.get(`http://localhost:5000/users/${userName}/repos/${numContents}/${pageNum}`);
    }

    getUserDetails(userName:string) {
        return this.http.get(`http://localhost:5000/user/details/${userName}`);
    }
}