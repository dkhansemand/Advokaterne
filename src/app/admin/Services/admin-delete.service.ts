import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router'
import { AppConfig } from '../../app.config'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class AdminDeleteService {

  constructor(private http : Http) { }

  deleteServiceId(serviceId : number){
    return this.http.get(AppConfig.api + '/services/delete/service/'+serviceId).map( (res:Response) => res.json())
  }

  deleteCategoryId(catId : number){
    return this.http.get(AppConfig.api + '/blog/delete/category/' + catId).map( (res : Response) => res.json())
  }

  deletePostId(postId : number){
    return this.http.get(AppConfig.api + '/blog/delete/post/' + postId).map( (res : Response) => res.json() )
  }

  deleteMediaId(mediaId : number){
    return this.http.get(AppConfig.api + '/media/delete/item/' + mediaId).map( (res : Response) => res.json())
  }
}
