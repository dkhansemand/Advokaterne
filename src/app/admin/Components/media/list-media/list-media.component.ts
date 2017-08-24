import { Component, OnInit } from '@angular/core';
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminDeleteService } from '../../../Services/admin-delete.service'
import { AppConfig } from '../../../../app.config'
@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.css']
})
export class ListMediaComponent implements OnInit {

  constructor(private adminGetService : AdminGetService, private adminDeleteService : AdminDeleteService) { }

  mediaPath : string = AppConfig.mediaUrl
  mediaList : Array<string>
  addError : boolean = false
  errMsg : string
  ngOnInit() {
    this.adminGetService.getMediaList().subscribe(res => {
      if(res.err){
        console.log('Error: ', res.err)
      }else{
        this.mediaList = res.data
      }
    })
  }

  deleteMediaItem(mediaId : number){
    this.adminDeleteService.deleteMediaId(mediaId).subscribe( res => {
      if(confirm('Er du sikker?')){
        if(res.err){
          console.warn('Res Error: ', res.data)
          this.addError = true
          this.errMsg = res.data
        }else{
          this.addError = false
          this.mediaList = []
          this.adminGetService.getMediaList().subscribe(res => {
            if(res.err){
              console.log('Error: ', res.err)
            }else{
              this.mediaList = res.data
            }
          })
        }
      }
    })
  }

}
