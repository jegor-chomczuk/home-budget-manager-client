import { IncomesPlannedService } from './../../services/incomes-planned.service';
import { ExpensePlanned } from './../../models/expensePlanned.model';
import { ExpensesPlannedService } from './../../services/expenses-planned.service';
import { CategoryService } from './../../services/category.service';
import { UserService } from './../../services/user.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { User } from 'src/app/models/user.model';
import { Category } from 'src/app/models/category.model';
import { forkJoin, from, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpensesService } from './../../services/expenses.service';
import { Expense } from 'src/app/models/expense.model';
import { IncomesService } from 'src/app/services/incomes.service';
import { IncomePlanned } from 'src/app/models/income-planned.model';
import { Income } from 'src/app/models/income.model';


@Component({
  selector: 'app-month-chart',
  templateUrl: './month-chart.component.html',
  styleUrls: ['./month-chart.component.css'],
})
export class MonthChartComponent implements OnInit, OnChanges {
  expenseCategories: Category[];
  incomeCategories: Category[];
  expenseCategoriesNames: string[];
  incomeCategoriesNames: string[];
  
  expenses: Expense[];
  incomes: Income[];
  expensesValues: number[];
  incomesValues: number[];
  totalExpensesValues: number;
  totalIncomesValues: number;
  
  expensesPlanned: ExpensePlanned[];
  incomesPlanned: IncomePlanned[];
  expensesPlannedValues: number[];
  incomesPlannedValues: number[];
  totalExpensesPlannedValues: number;
  totalIncomesPlannedValues: number;

  differenceBetweenExpensesAndExpensesPlanned: number[];
  differenceBetweenIncomesAndIncomesPlanned: number[];
  sumOfDifferencesBetweenExpensesAndExpensesPlanned: number;
  sumOfDifferencesBetweenIncomesAndIncomesPlanned: number;
  
  username: string;
  userId: number;
  user: User;
  monthName: string;
  route: any;
  tempValue: number;
  tempComment: string;
  tempDate: string;
  tempCategory: Category
  tempExpense: Expense;
  tempIncome: Income;
  leftToPlan: number;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private privateRoute: ActivatedRoute,
    private expenseService: ExpensesService,
    private expensesPlannedService: ExpensesPlannedService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private incomesService: IncomesService,
    private incomesPlannedService: IncomesPlannedService,
  ) {
      this.expenseCategories = [];
      this.incomeCategories = [];
      this.expenseCategoriesNames = [];
      this.incomeCategoriesNames = [];
      
      this.expenses = [];
      this.incomes = [];
      this.expensesValues = [];
      this.incomesValues = [];
      this.totalExpensesValues = 0;
      this.totalIncomesValues = 0;
      
      this.expensesPlanned = [];
      this.incomesPlanned = [];
      this.expensesPlannedValues = [];
      this.incomesPlannedValues = [];
      this.totalExpensesPlannedValues = 0;
      this.totalIncomesPlannedValues = 0;

      this.differenceBetweenExpensesAndExpensesPlanned = [];
      this.differenceBetweenIncomesAndIncomesPlanned = [];
      this.sumOfDifferencesBetweenExpensesAndExpensesPlanned = 0;
      this.sumOfDifferencesBetweenIncomesAndIncomesPlanned = 0;
      
      this.username = localStorage.getItem('username') || '';
      this.userId = 0;
      this.user = new User(0, '', '', '', false);
      this.monthName = "";
      this.leftToPlan = 0;
      this.tempValue = 0;
      this.tempComment = "";
      this.tempDate = new Date().toLocaleDateString();
      this.tempCategory = new Category(0, "", "", 0);
      this.tempExpense = new Expense(0, this.tempCategory.name, "", new Date, 0, this.monthName, 2021, this.userId);
      this.tempIncome = new Income(0, this.tempCategory.name, "", new Date, 0, this.monthName, 2021, this.userId);
  }

  async ngOnInit(): Promise<void> {

    this.monthName = this.privateRoute.snapshot.params['monthName'].toUpperCase();
    this.user = await this.userService.getUserByUsername(this.username);
    this.userId = this.user.userId;
    
    // EXPENSES
    this.expenseCategories = await this.categoryService.getExpenseCategoriesByUserId(this.userId);
    this.getExpensesCategoriesNames();

    this.expenses = await this.expenseService.getExpenseByUserIdAndYearAndMonth(this.userId, this.monthName);
    this.getExpensesValues();
    this.totalExpensesValues = this.expenses.reduce((a, b) => a + b.amount, 0);

    this.expensesPlanned = await this.expensesPlannedService.getExpensesPlannedByUserIdAndYearAndMonth(this.userId, this.monthName);
    this.getExpensesPlannedValues();
    this.totalExpensesPlannedValues = this.expensesPlanned.reduce((a, b) => a + b.amount, 0);

    this.differenceBetweenExpensesAndExpensesPlanned = this.expensesPlannedValues.map((value, index) => value - this.expensesValues[index]);
    this.sumOfDifferencesBetweenExpensesAndExpensesPlanned = this.differenceBetweenExpensesAndExpensesPlanned.reduce((a, b) => a + b, 0);

    // INCOMES
    this.incomeCategories = await this.categoryService.getIncomeCategoriesByUserId(this.userId);
    this.getIncomesCategoriesNames();

    this.incomes = await this.incomesService.getIncomeByUserIdAndYearAndMonth(this.userId, this.monthName);
    this.getIncomesValues();
    this.totalIncomesValues = this.incomes.reduce((a, b) => a + b.amount, 0);

    this.incomesPlanned = await this.incomesPlannedService.getIncomesPlannedByUserIdAndYearAndMonth(this.userId, this.monthName);
    this.getIncomesPlannedValues();
    this.totalIncomesPlannedValues = this.incomesPlanned.reduce((a, b) => a + b.amount, 0);

    this.differenceBetweenIncomesAndIncomesPlanned = this.incomesPlannedValues.map((value, index) => value - this.incomesValues[index]);
    this.sumOfDifferencesBetweenIncomesAndIncomesPlanned = this.differenceBetweenIncomesAndIncomesPlanned.reduce((a, b) => a + b, 0);
    
    this.leftToPlan = (this.totalIncomesPlannedValues - this.totalExpensesPlannedValues)
  // CHART
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['this.monthName'].currentValue);
}

// Chart 

  updateChart(){
    var monthChart = new Chart('monthChart', {
      type: 'bar',
      data: {
        labels: this.expenseCategoriesNames,
        datasets: [
          {
            label: 'Planned expenses',
            data: this.expensesPlannedValues,
            backgroundColor: 'rgb(250, 128, 15)',
            borderColor: [
            ],
            borderWidth: 1,
          },
          {
            label: 'Real expenses',
            data: this.expensesValues,
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
// Expenses methods
  getExpensesCategoriesNames(): void {
    for (let i = 0; i < this.expenseCategories.length; i++) {
      this.expenseCategoriesNames.push(this.expenseCategories[i].name);
    }
  }

  getExpensesValues(): void {
    for (let i = 0; i < this.expenses.length; i++) {
      this.expensesValues.push(this.expenses[i].amount);
    }
  }

  getExpensesPlannedValues(): void {
    for (let i = 0; i < this.expensesPlanned.length; i++) {
      this.expensesPlannedValues.push(this.expensesPlanned[i].amount);
    }
  }

  updateExpensePlanned(amount: number, expensePlanned: ExpensePlanned): void {
    this.expensesPlannedService.updateExpensePlanned(amount, expensePlanned);
    this.updateChart();
  }

  addExpense(): void {
    this.expenseService.addExpense(this.tempValue, this.tempComment, this.tempDate, this.tempCategory.name, this.monthName, this.userId, this.tempExpense);
    location.reload();
  }

  async deleteExpense(expenseId: number){
    this.expenseService.deleteExpense(expenseId);
    this.expenses = await this.expenseService.getExpenseByUserIdAndYearAndMonth(this.userId, this.monthName);
    location.reload();
  }

// Incomes methods
  getIncomesCategoriesNames(): void {
    for (let i = 0; i < this.incomeCategories.length; i++) {
      this.incomeCategoriesNames.push(this.incomeCategories[i].name);
    }
  }

  getIncomesValues(): void {
    for (let i = 0; i < this.incomes.length; i++) {
      this.incomesValues.push(this.incomes[i].amount);
    }
  }

  getIncomesPlannedValues(): void {
    for (let i = 0; i < this.incomesPlanned.length; i++) {
      this.incomesPlannedValues.push(this.incomesPlanned[i].amount);
    }
  }

  updateIncomePlanned(amount: number, incomePlanned: IncomePlanned): void {
    this.incomesPlannedService.updateIncomePlanned(amount, incomePlanned);
  }

  addIncome(): void {
    this.incomesService.addIncome(this.tempValue, this.tempComment, this.tempDate, this.tempCategory.name, this.monthName, this.userId, this.tempIncome);
    location.reload();
  }

  async deleteIncome(incomeId: number){
    this.incomesService.deleteIncome(incomeId);
    this.incomes = await this.incomesService.getIncomeByUserIdAndYearAndMonth(this.userId, this.monthName);
    location.reload();
  }
}