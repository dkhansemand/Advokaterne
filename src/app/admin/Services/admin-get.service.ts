import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router'
import { AppConfig } from '../../app.config'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminGetService {

  constructor(private http : Http, private router : Router) { }

  getServicesList(){
    return this.http.get(AppConfig.api + '/services/get/list').map( (res:Response) => res.json())
  }

  getServiceById(serviceId : number){
    return this.http.get(AppConfig.api + '/services/get/service/' + serviceId).map((res:Response) => res.json())
  }

  getMediaList(){
    return this.http.get(AppConfig.api + '/media/get/list').map((res : Response) => res.json())
  }

}