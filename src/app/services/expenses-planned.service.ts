import { ExpensePlanned } from './../models/expensePlanned.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpensesPlannedService {
  // url : string = "http://localhost:8000"; 
  url : string = "http://localhost:8400"; 

  constructor(private http:HttpClient) { }


async getExpensesPlannedByUserIdAndYearAndMonth(userId: number, month: string) : Promise<any>{
    return this.http.get<any>(this.url+"/planned-expense/user-id/" + userId + "/year/2021/?month="+ month).toPromise();
  }

async getExpensesPlannedByUserIdAndYearAndCategory(userId: number, year: number, category: string) : Promise<any>{
    return this.http.get<any>(this.url+"/planned-expense/user-id/" + userId + "/year/" + year + "/?category=" + category).toPromise();
  }

async updateExpensePlanned (amount:number, expensePlanned: ExpensePlanned) : Promise<any>{
  const body = {"id":expensePlanned.id, "category":expensePlanned.category, "amount":amount, "month":expensePlanned.month, "year":expensePlanned.year, "userId":expensePlanned.userId};
  return this.http.put<any>(this.url+"/planned-expense/update", body).toPromise();
  }
}
