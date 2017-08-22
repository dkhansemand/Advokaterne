import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdminGetService } from '../../../Services/admin-get.service'
import { AppConfig } from '../../../../app.config'

@Component({
  selector: 'app-media-select',
  templateUrl: './media-select.component.html',
  styleUrls: ['./media-select.component.css']
})
export class MediaSelectComponent implements OnInit {

  constructor(private adminGetService : AdminGetService) { }

  @Output() selectedItem = new EventEmitter<any>()

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

  itemId(item : any){
    
    this.selectedItem.emit(item)

  }

}
