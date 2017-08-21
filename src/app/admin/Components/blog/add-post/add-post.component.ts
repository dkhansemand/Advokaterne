import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor() { }
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
}
