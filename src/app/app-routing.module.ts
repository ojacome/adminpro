import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ResgisterComponent } from './auth/resgister/resgister.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';



const routes: Routes = [
  { 
    path: '',             
    component: PagesComponent,
    children: [
      { path: 'dashboard',    component: DashboardComponent },
      { path: 'progress',     component: ProgressComponent },
      { path: 'grafica1',     component: Grafica1Component },
      { path: '',             redirectTo: '/dashboard', pathMatch: 'full'},
    ] 
  },

  { path: 'register',    component: ResgisterComponent },
  { path: 'login',        component: LoginComponent },
  { path: '**',           component: NotpagefoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
