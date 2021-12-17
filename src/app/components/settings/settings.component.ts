import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { NewCategory } from 'src/app/models/new-category.model';
import { User } from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';
import { ExpensesPlannedService } from 'src/app/services/expenses-planned.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { UserService } from 'src/app/services/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  newCategoryType: string;
  newCategoryName: string;
  username: string;
  userId: number;
  user: User;
  expenseCategories: Category[];
  incomeCategories: Category[];
  typeExpenses: string;
  typeIncome: string;
  
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private privateRoute: ActivatedRoute,
    private expenseService: ExpensesService,
    private expensesPlannedService: ExpensesPlannedService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal
    ) { 
    this.username = localStorage.getItem('username') || '';
    this.userId = 0;
    this.user = new User(0, '', '', '', false);
    this.newCategoryName = '';
    this.newCategoryType = '';
    this.typeExpenses = "expenses";
    this.typeIncome = "income";


    this.expenseCategories = [];
    this.incomeCategories = [];
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUserByUsername(this.username);
    this.userId = this.user.userId;

    this.expenseCategories = await this.categoryService.getExpenseCategoriesByUserIdAndType(this.userId, 'expenses');
    this.incomeCategories = await this.categoryService.getExpenseCategoriesByUserIdAndType(this.userId, 'income');
  }

  addExpenseCategory(): void {
    let newCategory = new NewCategory(this.newCategoryName, this.typeExpenses, this.userId);
    this.categoryService.addCategory(newCategory).subscribe(
      () => 
      location.reload()
    );
  }

  addIncomeCategory(): void {
    let newCategory = new NewCategory(this.newCategoryName, this.typeIncome, this.userId);
    this.categoryService.addCategory(newCategory).subscribe(
      () => 
      location.reload()
    );
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => 
      location.reload()
    );
  }
}
