import { Component, OnInit } from '@angular/core';
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminDeleteService } from '../../../Services/admin-delete.service'
@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {

  constructor(private adminGetService : AdminGetService, private adminDeleteService : AdminDeleteService) { }

  blogPostList : Array<any>

  ngOnInit() {
    this.getBlogPosts()
  }

  getBlogPosts(){
    this.adminGetService.getBlogPosts().subscribe(res => {
      if(res.err){
        console.warn('Res Error: ', res.data)
      }
      console.log('Res:', res)
      this.blogPostList = res.data
    })
  }

  deletePost(postId : number){
    if(confirm('Er du sikker?')){
      this.adminDeleteService.deletePostId(postId).subscribe(res => {
        if(res.err){
          console.warn('Res Error:', res.data)
        } 
        this.blogPostList = []
        this.getBlogPosts()
        console.log('Res del: ', res)
      })
    }
  }

}
