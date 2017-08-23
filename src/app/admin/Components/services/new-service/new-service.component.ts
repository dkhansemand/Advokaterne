import { Component, OnInit } from '@angular/core';
import { AdminPostService } from '../../../Services/admin-post.service'
import { AppConfig } from '../../../../app.config'
@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit {

  constructor(private adminPost : AdminPostService) { }

  service = {
    name : '',
    content : '',
    shortdesc: '',
    picture: {id:0,file:''}
  }
  formEmpty : boolean = false
  addError : boolean = false
  addSuccess : boolean = false
  mediaPath = AppConfig.mediaUrl
  ngOnInit() {
  }

  validName(name : string){
    return true
  }

  addService(){
    if(this.service.name !== '' && this.service.content !== ''){
      this.adminPost.addService(this.service).subscribe( res => {
        if(!res.err){
          //console.log('success:',res)
          //console.log('service', this.service)
          this.addError = false
          this.addSuccess = true
          this.reset()
        }else{
          this.addError = true
          console.log('Error', res)
        }
      })
    }else{
      this.addError = true
    }
  }

  reset(){
    this.service = {
      name : '',
      content : '',
      shortdesc: '',
      picture: {id:0,file:''}
    }
  }

  getMedia(item : any){
    document.getElementById("btnClose").click()
    this.service.picture = item
    //console.log('ITEM: ', item)
  }

  removeMediaItem(){
    this.service.picture.file = ''
  }

}
