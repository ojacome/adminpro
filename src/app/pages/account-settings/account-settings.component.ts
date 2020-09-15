import { Component, OnInit } from '@angular/core';
import { link } from 'fs';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {  


  constructor(
    private _settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    
    this._settingsService.checkCurrentTheme();
  }



  changeTheme(theme: string){    

    this._settingsService.changeTheme(theme);    
  }

  
}
