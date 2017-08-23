import { Component, OnInit } from '@angular/core';
import { AdminGetService } from '../../Services/admin-get.service'
import { AdminPostService } from '../../Services/admin-post.service'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private adminGetService : AdminGetService, private adminPostService : AdminPostService) { }
  settingsList : Array<any> = []
  addSuccess : boolean = false
  addError : boolean = false
  formEmpty : boolean = false
  errMsg : string
  ngOnInit() {
    this.adminGetService.getSettings().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.settingsList = res.data
        console.log('settings: ', this.settingsList)
      }
    })
  }

  saveSettings(){
    this.adminPostService.settingsSave(this.settingsList).subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
        this.addError = true
        this.addSuccess = false
        this.errMsg = res.data
      }else{
        this.addError = false
        this.addSuccess = true
      }
    })
    console.log(this.settingsList)
  }

}
