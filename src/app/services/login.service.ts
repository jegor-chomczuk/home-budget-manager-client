import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // url : string = "http://localhost:8000"; 
  url : string = "http://localhost:8100"; 

  constructor(private http:HttpClient) { }

  verifyUser(username:string, password: string) : Observable<any>{
    return this.http.get<any>(this.url+"/user/username/"+username+"/password/"+password);
  }

  loginUser(username: string){
    localStorage.setItem("username",username);
    return true
  }

  isLoggedIn(){
    {
      let username = localStorage.getItem("username");
      if(username==undefined || username == "" || username == null){
        return false;
      }else{
        return true;
      }
    }
  }

  logout(){
    localStorage.removeItem('username');
    return true;
  }


  getUsername(){
    return localStorage.getItem("username");

  }

  registerNewUser(username: string, email: string, password: string){
    const body = { "username": username, "email": email, "password": password };
    return this.http.post(this.url+"/user/add", body);
  }
}