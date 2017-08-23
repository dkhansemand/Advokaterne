import { Component, OnInit } from '@angular/core';
import { AdminGetService } from '../../Services/admin-get.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private adminGetService : AdminGetService) { }
  settingsList : Array<any> = []
  settings = {
    addr: ''
  }

  ngOnInit() {
    this.adminGetService.getSettings().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.settingsList = res.data
        console.log('settings: ', res)
      }
    })
  }

}
