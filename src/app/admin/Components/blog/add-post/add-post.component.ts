import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../../app.config'
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor() { }
  mediaPath = AppConfig.mediaUrl

  formEmpty : boolean = false
  blogPost = {
    title : '',
    content : '',
    picture : ''
  }

  ngOnInit() {
  }

  addPost(){
    if(this.blogPost.title !== '' && this.blogPost.content !== ''){

    }else{
      this.formEmpty = true
    }
  }

  reset(){
    this.blogPost = {
      title : '',
      content : '',
      picture : ''
    }
  }

  getMedia(item : any){
    document.getElementById("btnClose").click()
    this.blogPost.picture = item
    console.log('ITEM: ', item)
  }

  removeMediaItem(){
    this.blogPost.picture = ''
  }
}
