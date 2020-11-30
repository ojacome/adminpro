import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu_adminpro')) || [];
  }
    // {
    //   titulo: 'Dashboard',
    //   icono: 'mdi mdi-gauge',
    //   submenu: [
    //     { titulo: 'Main', url: '/'},
    //     { titulo: 'Grafica1', url: 'grafica1'},
    //     { titulo: 'ProgressBar', url: 'progress'},
    //     { titulo: 'Promesas', url: 'promise'},
    //     { titulo: 'Rxjs', url: 'rxjs'},
    //   ]
    // },
    // {
    //   titulo: 'Mantenimientos',
    //   icono: 'mdi mdi-folder-lock-open',
    //   submenu: [
    //     { titulo: 'Usuarios', url: 'usuarios'},
    //     { titulo: 'Hospitales', url: 'hospitales'},
    //     { titulo: 'Médicos', url: 'medicos'}
    //   ]
    // }
  
}
