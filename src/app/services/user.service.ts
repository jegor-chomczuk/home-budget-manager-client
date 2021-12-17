import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url : string = "http://localhost:8000"; 
  url : string = "http://localhost:8100"; 

  constructor(private http:HttpClient) { }

  async getUserByUsername(username:string) : Promise<any>{
    return this.http.get<any>(this.url+"/user/username/"+ username).toPromise();
  }
}