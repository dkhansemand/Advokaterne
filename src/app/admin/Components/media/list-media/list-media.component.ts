import { Component, OnInit } from '@angular/core';
import { AdminGetService } from '../../../Services/admin-get.service'
import { AppConfig } from '../../../../app.config'
@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.css']
})
export class ListMediaComponent implements OnInit {

  constructor(private adminGetService : AdminGetService) { }

  mediaPath : string = AppConfig.mediaUrl
  mediaList : Array<string>

  ngOnInit() {
    this.adminGetService.getMediaList().subscribe(res => {
      if(res.err){
        console.log('Error: ', res.err)
      }else{
        this.mediaList = res.data
      }
    })
  }

}
