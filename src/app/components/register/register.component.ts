import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { UserRegistered } from 'src/app/models/userRegistered.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string ="";
  email:string ="";
  password:string ="";
  passwordConfirmed ="";
  // userRegistered:UserRegistered;

  constructor(private registerService:RegisterService, private router: Router) {
    // this.userRegistered = new UserRegistered(this.username, this.email, this.password);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Form Submitted");

    if(
      this.username != "" 
      && this.email != "" 
      && this.password != "" 
      && this.passwordConfirmed != "" 
      && this.password == this.passwordConfirmed){

      // this.userRegistered = new UserRegistered(this.username, this.email, this.password);


      console.log("Submit the form");
      // console.log(this.userRegistered);

      // this.registerService.registerNewUser(this.userRegistered).subscribe(
      this.registerService.registerNewUser(this.username, this.email, this.password).subscribe(
        result =>{

          console.log(result);

          // window.location.href="/login";
          this.router.navigate(['/login']);
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