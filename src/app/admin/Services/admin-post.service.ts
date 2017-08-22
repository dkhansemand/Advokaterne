import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router'
import { AppConfig } from '../../app.config'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminPostService {

  constructor(private http : Http) { }

  editService(serviceData : any){
/*     let headers = new Headers({ 'Content-Type': '' });
    let options = new RequestOptions({ headers: headers }); */
    let body = new FormData()
    body.append('id',serviceData.id)
    body.append('name', serviceData.name)
    body.append('content', serviceData.content)
    body.append('pictureId', serviceData.picture)
    return this.http.post(AppConfig.api + '/services/post/editservice', body).map((res:Response) => res.json())
  }

  addService(serviceData : any){
    let body = new FormData()
    body.append('id',serviceData.id)
    body.append('name', serviceData.name)
    body.append('content', serviceData.content)
    body.append('pictureId', serviceData.picture)
    return this.http.post(AppConfig.api + '/services/post/addservice', body).map((res:Response) => res.json())
  }

  addcategory(categoryData : any){
    let body = new FormData()
    body.append('name', categoryData.name)
    return this.http.post(AppConfig.api+'/blog/post/category', body).map((res:Response) => res.json())
  }

  editCategory(catId : any, catName : string){
    let body = new FormData()
    body.append('catId', catId)
    body.append('name', catName)
    return this.http.post(AppConfig.api + '/blog/post/editcategory', body).map((res : Response) => res.json())
  }

}
