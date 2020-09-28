import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'Grafica1', url: 'grafica1'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Promesas', url: 'promise'},
        { titulo: 'Rxjs', url: 'rxjs'},
      ]
    }
  ]



  constructor() { }
}
