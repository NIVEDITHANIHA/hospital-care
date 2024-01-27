import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { PatientAddformComponent } from './patient-addform/patient-addform.component';
import { PatientEditformComponent } from './patient-editform/patient-editform.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "patient-addform", component: PatientAddformComponent },
  { path: "patient-editform/:id", component: PatientEditformComponent },
  { path: "patient-detail", component: PatientDetailsComponent,canActivate:[authGuard] },
  { path: "dashboard", component: DashboardComponent,canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
