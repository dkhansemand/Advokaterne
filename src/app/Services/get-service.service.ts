import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { AppConfig } from '../app.config'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class GetService {

  constructor(private http : Http) { }

  getServicesList(){
    return this.http.get(AppConfig.api + '/services/get/list').map( (res:Response) => res.json())
  }

  getMediaListByTag(tag : string){
    return this.http.get(AppConfig.api + '/media/get/bytag/'+tag).map((res : Response) => res.json())
  }

  getMediaById(mediaId : number){
    return this.http.get(AppConfig.api + '/media/get/itembyid/'+mediaId).map((res : Response) => res.json())
  }

  getBlogPosts(){
    return this.http.get(AppConfig.api + '/blog/get/posts').map((res : Response) => res.json())
  }


}
