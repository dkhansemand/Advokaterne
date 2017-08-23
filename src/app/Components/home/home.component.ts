import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetService } from '../../Services/get-service.service'
import { AppConfig } from '../../app.config'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private getService : GetService) { }

  serviceList: Array<any>
  mediaList: Array<any> = []
  mediaPath = AppConfig.mediaUrl
  blogList : Array<any>

  ngOnInit() {
    this.getService.getServicesList().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.serviceList = res.data
        //console.log('SL', this.serviceList)
      }
    })
    this.getService.getMediaListByTag('service').subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.mediaList = res.data
        //console.log('ML', this.mediaList)
      }
    })

    this.getService.getBlogPosts().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.blogList = res.data
        console.log('Res: ', res)
      }
    })
  }

}
