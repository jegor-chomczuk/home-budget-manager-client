import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, from } from "rxjs";
import { IncomePlanned } from '../models/income-planned.model';

@Injectable({
  providedIn: 'root'
})
export class IncomesPlannedService {
  // url : string = "http://localhost:8000";
  url : string = "http://localhost:8500";

  constructor(private http:HttpClient) { }

async getIncomesPlannedByUserIdAndYearAndMonth(userId: number, month: string) : Promise<any>{
    return this.http.get<any>(this.url+"/planned-income/user-id/" + userId + "/year/2021/?month="+ month).toPromise();
  }

async getIncomesPlannedByUserIdAndYearAndCategory(userId: number, year: number, category: string) : Promise<any>{
    return this.http.get<any>(this.url+"/planned-income/user-id/" + userId + "/year/" + year + "/?category=" + category).toPromise();
  }

async updateIncomePlanned (amount:number, incomePlanned: IncomePlanned) : Promise<any>{
  const body = {"id":incomePlanned.id, "category":incomePlanned.category, "amount":amount, "month":incomePlanned.month, "year":incomePlanned.year, "userId":incomePlanned.userId};
  return this.http.put<any>(this.url+"/planned-income/update", body).toPromise();
  }
}
