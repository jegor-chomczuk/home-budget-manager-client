import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string ="";
  password:string ="";
  user:User;
  
  constructor(private loginService:LoginService) { 
    this.user = new User(0, '', '', '', false);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Form Submitted");

    if(this.username != "" && this.password != ""){
      console.log("Submit the form");

      this.loginService.verifyUser(this.username, this.password).subscribe(
        result =>{

          console.log(result.username);

          this.user = result;
          this.loginService.loginUser(this.user.username);
          window.location.href="/annual-report"; 
        },
        error=>{
          console.log(error);
        }
      )
    }
    else{
      console.log("don't submit");
    }
  }

}
