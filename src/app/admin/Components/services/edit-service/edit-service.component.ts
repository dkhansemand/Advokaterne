import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminPostService } from '../../../Services/admin-post.service'

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute, private adminGet : AdminGetService, private adminPost : AdminPostService) { }

  serviceEditId : number
  service = {
    id : 0,
    name : '',
    content : '',
    picture: ''
  }
  formEmpty : boolean = false
  editError : boolean = false
  editSuccess : boolean = false

  ngOnInit() {
    this.activeRoute.params.subscribe( params => this.serviceEditId = params.id )

    this.adminGet.getServiceById(this.serviceEditId).subscribe(res => {
      if(!res.err){
        //console.log(res.data[0].serviceName)
        this.service.id = res.data[0].serviceId
        this.service.name = res.data[0].serviceName
        this.service.content = res.data[0].serviceContent
        this.service.picture = res.data[0].servicePicture
      }else{
        console.log('Error:', res)
      }
    })
  }

  validName(){
    return true
  }

  editService(){
    this.adminPost.editService(this.service).subscribe( res => {
      if(!res.err){
        //console.log('success:',res)
        //console.log('service', this.service)
        this.editSuccess = true
      }else{
        this.editError = true
        console.log('Error', res)
      }
    })
  }

}
