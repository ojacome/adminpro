import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInit();



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  

  constructor(
    private _serviceSettings: SettingsService,
    private sidebarSvc: SidebarService
  ) { }

  ngOnInit(): void {     
    customInit();   
    this.sidebarSvc.cargarMenu();
  }

}
