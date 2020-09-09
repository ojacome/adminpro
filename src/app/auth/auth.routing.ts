import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResgisterComponent } from './resgister/resgister.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    
    { path: 'register',    component: ResgisterComponent },
    { path: 'login',        component: LoginComponent },
        
  ]
  
  @NgModule({
    declarations: [],
    imports: [ RouterModule.forChild( routes )  ],
    exports: [ RouterModule ]
  })
  export class AuthRoutingModule { }