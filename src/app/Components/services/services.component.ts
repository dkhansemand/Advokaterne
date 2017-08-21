import { Component, OnInit } from '@angular/core';
import { GetService } from '../../Services/get-service.service'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private getService : GetService) { }
  serviceList : Array<object>
  ngOnInit() {
    this.getService.getServicesList().subscribe(res => {
      if(res.err){
        console.log('Get error:', res.data)
      }else{
        this.serviceList = res.data
        //console.log('services res: ', this.serviceList)
      }
    })
  }

}
