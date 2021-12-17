import { ExpensesPlannedService } from './../../services/expenses-planned.service';
import { CategoryService } from './../../services/category.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { forkJoin, from, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpensesService } from './../../services/expenses.service';
import { Expense } from 'src/app/models/expense.model';
import { ExpensePlanned } from 'src/app/models/expensePlanned.model';

@Component({
  selector: 'app-annual-chart',
  templateUrl: './annual-chart.component.html',
  styleUrls: ['./annual-chart.component.css'],
})
export class AnnualChartComponent implements OnInit {
  expenseCategories: Category[];
  expenseCategoriesNames: string[];

  expensesPerCategoryAnnually: [Expense[]];
  expensesValuesAnnually: number[];

  expensesPlannedPerCategoryAnnually: [ExpensePlanned[]];
  expensesPlannedValuesAnnually: number[];

  username: string;
  userId: number;
  user: User;
  year: number;
  totalAmount: number;
  route: any;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private privateRoute: ActivatedRoute,
    private expenseService: ExpensesService,
    private expensesPlannedService: ExpensesPlannedService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.expenseCategories = [];
    this.expenseCategoriesNames = [];

    this.expensesPerCategoryAnnually = [[]];
    this.expensesValuesAnnually = [];

    this.expensesPlannedPerCategoryAnnually = [[]];
    this.expensesPlannedValuesAnnually = [];

    this.username = localStorage.getItem('username') || '';
    this.userId = 0;
    this.user = new User(0, '', '', '', false);
    this.year = new Date().getFullYear();
    this.totalAmount = 0;
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUserByUsername(this.username);
    this.userId = this.user.userId;

    this.expenseCategories = await this.categoryService.getExpenseCategoriesByUserId(this.userId);
    this.getExpensesCategoriesNames();

    for (let i = 0; i < this.expenseCategoriesNames.length; i++) {
      this.expensesPerCategoryAnnually.push(await this.expenseService.getExpenseByUserIdAndYearAndCategory(this.userId, this.year, this.expenseCategoriesNames[i]));
    }
    this.getExpensesValuesAnnually();

    for (let i = 0; i < this.expenseCategoriesNames.length; i++) {
      this.expensesPlannedPerCategoryAnnually.push(await this.expensesPlannedService.getExpensesPlannedByUserIdAndYearAndCategory(this.userId, this.year, this.expenseCategoriesNames[i]));
    }
    this.getExpensesPlannedValuesAnnually();

    var annualChart = new Chart('annualChart', {
      type: 'bar',
      data: {
        labels: this.expenseCategoriesNames,
        datasets: [
          {
            label: 'Planned expenses',
            data: this.expensesPlannedValuesAnnually,
            backgroundColor: 'rgb(250, 128, 15)',
            borderColor: [
            ],
            borderWidth: 1,
          },
          {
            label: 'Real expenses',
            data: this.expensesValuesAnnually,
            backgroundColor: 'rgb(16, 49, 156)',
            borderColor: [
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  getExpensesCategoriesNames(): void {
    for (let i = 0; i < this.expenseCategories.length; i++) {
      this.expenseCategoriesNames.push(this.expenseCategories[i].name);
    }
  }

  getExpensesValuesAnnually(): void {
    for (let j = 0; j < this.expensesPerCategoryAnnually.length; j++) {
      for (let k = 0; k < this.expensesPerCategoryAnnually[j].length; k++) {
        this.totalAmount += this.expensesPerCategoryAnnually[j][k].amount;
      }
      this.expensesValuesAnnually.push(this.totalAmount);
      this.totalAmount = 0;
    }
  }

  getExpensesPlannedValuesAnnually(): void {
    for (let j = 0; j < this.expensesPlannedPerCategoryAnnually.length; j++) {
      for (let k = 0; k < this.expensesPlannedPerCategoryAnnually[j].length; k++) {
        this.totalAmount += this.expensesPlannedPerCategoryAnnually[j][k].amount;
      }
      this.expensesPlannedValuesAnnually.push(this.totalAmount);
      this.totalAmount = 0;
    }
  }
}