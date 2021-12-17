import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './../navigation.component.html',
  styleUrls: ['./../navigation.component.css']
})

export class NavigationComponent implements OnInit {
  username = localStorage.getItem('username');

  public loggedIn = false;


  constructor(private loginService: LoginService) {} 

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
  }

  logoutUser(){
    this.loginService.logout();
    location.reload();
  }

}
