import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnualChartComponent } from './components/annual-chart/annual-chart.component';
import { HomeComponent } from './components/home/home.component';
import { JanuaryComponent } from './components/months/january/january.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'annual-report',
    component: AnnualChartComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'month/:monthName',
    component: JanuaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
