import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../../app.config'
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminPostService } from '../../../Services/admin-post.service'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private adminGetService : AdminGetService, private adminPostService : AdminPostService) { }
  addError : boolean = false
  errMsg : string
  addSuccess : boolean = false
  categoryList : Array<any>
  mediaPath = AppConfig.mediaUrl
  formEmpty : boolean = false

  blogPost = {
    title : '',
    content : '',
    category : '',
    picture : '',
    publish : false
  }

  ngOnInit() {
    this.adminGetService.getCategories().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }else{
        this.categoryList = res.data
      }
    })
  }

  addPost(){
    if(this.blogPost.title !== '' && this.blogPost.content !== '' && this.blogPost.category.length > 0){
      console.log('Blog data:', this.blogPost)
      this.adminPostService.addBlogPost(this.blogPost).subscribe(res => {
        if(res.err){
          this.addSuccess = false
          this.addError = true
          console.warn('Res Error: ', res.data)
        }else{
          console.log('Res data:', res)
          this.reset()
          this.addError = false
          this.addSuccess = true
        }
      })
    }else{
      this.formEmpty = true
      this.addError = true
      this.errMsg = 'Felterne skal udfyldes Og mindst en kategori vælges'
    }
  }

  reset(){
    this.blogPost = {
      title : '',
      content : '',
      category : '',
      picture : '',
      publish : false
    }
  }

  getMedia(item : any){
    document.getElementById("btnClose").click()
    this.blogPost.picture = item
    //console.log('ITEM: ', item)
  }

  removeMediaItem(){
    this.blogPost.picture = ''
  }
}
