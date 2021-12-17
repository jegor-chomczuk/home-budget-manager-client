import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { LoginService } from './services/login.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MonthChartComponent } from './components/month-chart/month-chart.component';
import { JanuaryComponent } from './components/months/january/january.component';
import { ExpensesService } from './services/expenses.service';
import { AnnualReportComponent } from './components/annual-report/annual-report.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AnnualChartComponent } from './components/annual-chart/annual-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MonthChartComponent,
    JanuaryComponent,
    AnnualReportComponent,
    SettingsComponent,
    AnnualChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    // RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
  ],
  providers: [LoginService, UserService, ExpensesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
