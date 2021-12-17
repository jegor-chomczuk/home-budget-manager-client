import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  // url : string = "http://localhost:8000";
  url : string = "http://localhost:8100";

  constructor(private http:HttpClient) { 
  }

  registerNewUser(username: string, email: string, password: string){
    const body = { "username": username, "email": email, "password": password };
    return this.http.post(this.url+"/user/add", body);
  }
}