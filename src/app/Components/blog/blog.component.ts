import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeValue } from "@angular/platform-browser";
import { GetService } from '../../Services/get-service.service'
import { AppConfig } from '../../app.config'
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private getService : GetService, private sani : DomSanitizer) { }
  mediaPath = AppConfig.mediaUrl
  blogPostList : Array<any> = []
  postContent : any 
  ngOnInit() {
    this.getService.getBlogPosts().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.blogPostList = res.data
        this.postContent = this.sani.bypassSecurityTrustHtml(res.data[0].postContent)
        //console.log('POsts', res)
      }
    })
  }

  getDate(date : any){
    //console.log('Date', new Date(date))
    return new Date(date)
  }

}
