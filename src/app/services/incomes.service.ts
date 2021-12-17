import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, from } from "rxjs";
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  // url : string = "http://localhost:8000";
  url : string = "http://localhost:8300";

  constructor(private http:HttpClient) { }

async getIncomeByUserIdAndYearAndMonth(userId: number, month: string) : Promise<any>{
    return this.http.get<any>(this.url+"/income/user-id/" + userId + "/year/2021/?month="+ month).toPromise();
  }

async getIncomeByUserIdAndYearAndCategory(userId: number, year: number, category:string): Promise<any>{
  return this.http.get<any>(this.url+"/income/user-id/" + userId + "/year/" + year + "/?category=" + category).toPromise();
}

async addIncome(
  amount: number,
  comment: string,
  date: string,
  category: string,
  month: string,
  userId: number,
  income: Income) : Promise<any>{
    const body = {"category":category, "comment":comment, "date":date, "amount":amount, "month":month, "year":income.year, "userId":userId};
    return this.http.post<any>(this.url + '/income/add/', body).toPromise();
  }

async deleteIncome(incomeId: number): Promise<any> {
  return this.http.delete<any>(this.url + '/income/delete/id/' + incomeId).toPromise();
}
}
