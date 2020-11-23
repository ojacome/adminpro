import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    { 
        path: 'dashboard',             
        component: PagesComponent,
        canActivate: [ AuthGuard],
        children: [
          { path: '',                   component: DashboardComponent, data: { titulo: 'Dashboard'} },
          { path: 'account-settings',   component: AccountSettingsComponent, data: { titulo: 'Configuraciones'} },  
          { path: 'grafica1',           component: Grafica1Component, data: { titulo: 'Graficas de pasteles'} },  
          { path: 'perfil',             component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },          
          { path: 'progress',           component: ProgressComponent, data: { titulo: 'Ejercicio de barras de progreso'} },
          { path: 'promise',            component: PromesasComponent, data: { titulo: 'Ejercicio de promesas'} },
          { path: 'rxjs',               component: RjxsComponent, data: { titulo: 'Ejercicio de rxjs'} },
        ] 
      },
  ]
  
  @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild( routes )  ],
    exports: [ RouterModule ]
  })
  export class PagesRoutingModule { }