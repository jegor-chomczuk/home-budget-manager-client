import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { NewCategory } from '../models/new-category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // url : string = "http://localhost:8000"; 
  url : string = "http://localhost:8100"; 
  

  constructor(private http:HttpClient) { }

  async getExpenseCategoriesByUserId(userId: number) : Promise<Category[]>{
    return this.http.get<Category[]>(this.url+"/category/type/expenses/user-id/" + userId).toPromise();
  }
 
  async getIncomeCategoriesByUserId(userId: number) : Promise<Category[]>{
    return this.http.get<Category[]>(this.url+"/category/type/income/user-id/" + userId).toPromise();
  }

  async getExpenseCategoriesByUserIdAndType(userId: number, type: string) : Promise<Category[]>{
    return this.http.get<Category[]>(this.url+"/category/type/"+ type + "/user-id/" + userId).toPromise();
  }

  addCategory(newCategory: NewCategory){
    const body = {"name": newCategory.name, "type": newCategory.type, "userId": newCategory.userId};
    return this.http.post(this.url+"/category", body);
  }

  deleteCategory(categoryId: number): Observable<Object>{
    return this.http.delete(this.url+"/category/delete/id/"+categoryId);
  }
}
