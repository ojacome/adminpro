import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [    
    LoginComponent,
    ResgisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [    
    LoginComponent,
    ResgisterComponent,
  ]
})
export class AuthModule { }
