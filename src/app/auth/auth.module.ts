import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';



@NgModule({
  declarations: [    
    LoginComponent,
    ResgisterComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [    
    LoginComponent,
    ResgisterComponent,
  ]
})
export class AuthModule { }
