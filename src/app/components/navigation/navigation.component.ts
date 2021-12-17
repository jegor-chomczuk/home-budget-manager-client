import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  username = localStorage.getItem('username');
  public loggedIn = false;

  constructor(private loginService: LoginService) {} 

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    // localStorage.setItem('username', 'username');
  }

  logoutUser(){
    this.loginService.logout();
    location.href = '/login';
  }

  navigateToJanuary(){
    location.href = 'month/january';
  }
  navigateToFebruary(){
    location.href = 'month/february';
  }
  navigateToMarch(){
    location.href = 'month/march';
  }
  navigateToApril(){
    location.href = 'month/april';
  }
  navigateToMay(){
    location.href = 'month/may';
  }
  navigateToJune(){
    location.href = 'month/june';
  }
  navigateToJuly(){
    location.href = 'month/july';
  }
  navigateToAugust(){
    location.href = 'month/august';
  }
  navigateToSeptember(){
    location.href = 'month/september';
  }
  navigateToOctober(){
    location.href = 'month/october';
  }
  navigateToNovember(){
    location.href = 'month/november';
  }
  navigateToDecember(){
    location.href = 'month/december';
  }
}
