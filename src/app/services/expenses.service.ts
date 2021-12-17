import { Expense } from './../models/expense.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  // url: string = 'http://localhost:8000';
  url: string = 'http://localhost:8200';

  constructor(private http: HttpClient) {}

  async getExpenseByUserIdAndYearAndMonth(
    userId: number,
    month: string
  ): Promise<any> {
    return this.http
      .get<any>(
        this.url + '/expense/user-id/' + userId + '/year/2021/?month=' + month
      )
      .toPromise();
  }

  async getExpenseByUserIdAndYearAndCategory(
    userId: number,
    year: number,
    category: string
  ): Promise<any> {
    return this.http
      .get<any>(
        this.url +
          '/expense/user-id/' +
          userId +
          '/year/' +
          year +
          '/?category=' +
          category
      )
      .toPromise();
  }
  
  async getExpenseByUserIdAndYearAndCategoryAndMonth(
    userId: number,
    month: string,
    category: string
  ): Promise<any> {
    return this.http
      .get<any>(
        this.url +
          '/expense/user-id/' +
          userId +
          '/year/2021' +
          '?month=' +
          month +
          '&category=' +
          category
      )
      .toPromise();
  }

  // async updateExpense(
  //   amount: number,
  //   comment: string,
  //   date: string,
  //   expense: Expense
  //   ): Promise<any> {
  //   const body = {"id":expense.id, "category":expense.category, "comment":comment, "date":date, "amount":amount, "month":expense.month, "year":expense.year, "userId":expense.userId};
  //   return this.http.put<any>(this.url + '/expense/update/', body).toPromise();
  // }

  async addExpense(
    amount: number,
    comment: string,
    date: string,
    category: string,
    month: string,
    userId: number,
    expense: Expense) : Promise<any>{
      const body = {"category":category, "comment":comment, "date":date, "amount":amount, "month":month, "year":expense.year, "userId":userId};
      return this.http.post<any>(this.url + '/expense/add/', body).toPromise();
    }

  async deleteExpense(expenseId: number): Promise<any> {
    return this.http.delete<any>(this.url + '/expense/delete/id/' + expenseId).toPromise();
  }
}