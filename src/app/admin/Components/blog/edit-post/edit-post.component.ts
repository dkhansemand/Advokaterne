import { Component, OnInit, SecurityContext, Sanitizer, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { AppConfig } from '../../../../app.config'
import { ActivatedRoute } from '@angular/router'
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminPostService } from '../../../Services/admin-post.service'

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(
    private adminGetService : AdminGetService, 
    private adminPostService : AdminPostService, 
    private activeRoute : ActivatedRoute, 
    private sani : Sanitizer,
    private domSani : DomSanitizer
  ) { }

  addError : boolean = false
  errMsg : string
  addSuccess : boolean = false
  categoryList : Array<any>
  categoryListAdd : Array<any>
  mediaPath = AppConfig.mediaUrl
  formEmpty : boolean = false
  postEditId : number

  blogPost = {
    postId : 0,
    title : '',
    content : '',
    category : '',
    picture : {id: 0, file: ''},
    publish : false
  }
  safeContent : SafeHtml
  ngOnInit() {
    this.activeRoute.params.subscribe( params => this.postEditId = params.id )
    
    this.adminGetService.getBlogPost(this.postEditId).subscribe(res => {
      this.blogPost.postId = res.data.postID
      this.blogPost.title = res.data.postTitle
      this.blogPost.content = res.data.postContent
      this.blogPost.picture.id = res.data.mediaId
      this.blogPost.picture.file = res.data.filePath+res.data.filename
      this.blogPost.publish = res.data.postPublished == 0 ? false : true
      //console.log('Res post: ', res)

      this.adminGetService.getPostCategories(res.data.postID).subscribe(resC => {
        if(resC.err){
          console.warn('Res Error: ', resC.data)
        }else{
          this.categoryList = resC.data
          
        }
      })

      this.adminGetService.getCategories().subscribe(resD => {
        if(resD.err){
          console.warn('Res Error: ', resD.data)
        }else{
          this.categoryListAdd = resD.data
          
        }
      })
      
    })
  }

  
  editPost(){
    console.log('change', this.blogPost)
    this.adminPostService.editBlogPost(this.blogPost).subscribe(res => {
      if(res.err){
        this.addSuccess = false
        this.addError = true
        this.errMsg = res.data
        console.warn('Res Error: ', res.data)
      }else{
        this.addError = false
        this.addSuccess = true
      }
      //console.log('Edit res: ', res)
    })
  }

  getMedia(item : any){
    document.getElementById("btnClose").click()
    this.blogPost.picture = item
    //console.log('ITEM: ', item)
  }

  removeMediaItem(){
    this.blogPost.picture.id = 0
    this.blogPost.picture.file = ''
  }

}
