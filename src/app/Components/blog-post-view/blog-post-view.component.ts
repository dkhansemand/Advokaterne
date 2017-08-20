import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-blog-post-view',
  templateUrl: './blog-post-view.component.html',
  styleUrls: ['./blog-post-view.component.css']
})
export class BlogPostViewComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }
  
  blogId : number;

  ngOnInit() {
    this.route.params.subscribe( params => this.blogId = params.id );
  }

}
