import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  
  { path: '',                   component: DashboardComponent, data: { titulo: 'Dashboard'} },
  { path: 'account-settings',   component: AccountSettingsComponent, data: { titulo: 'Configuraciones'} },  
  { path: 'busqueda/:termino',  component: BusquedaComponent, data: { titulo: 'Búsqueda'} }, 
  { path: 'grafica1',           component: Grafica1Component, data: { titulo: 'Graficas de pasteles'} },  
  { path: 'perfil',             component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },          
  { path: 'progress',           component: ProgressComponent, data: { titulo: 'Ejercicio de barras de progreso'} },
  { path: 'promise',            component: PromesasComponent, data: { titulo: 'Ejercicio de promesas'} },
  { path: 'rxjs',               component: RjxsComponent, data: { titulo: 'Ejercicio de rxjs'} },

  //mantennimientos
  { path: 'hospitales',         component: HospitalesComponent, data: { titulo: 'Hospitales'} },
  { path: 'medicos',            component: MedicosComponent, data: { titulo: 'Médicos'} },
  { path: 'medico/:id',         component: MedicoComponent, data: { titulo: 'Médico'} },

  //admin
  { path: 'usuarios',           component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'}, canActivate: [AdminGuard] },
]
@NgModule({
  imports: [ RouterModule.forChild( childRoutes )  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
