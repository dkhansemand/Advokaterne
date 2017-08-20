import { Component, OnInit, NgZone } from '@angular/core';
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminDeleteService } from '../../../Services/admin-delete.service'

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})

export class ServicesListComponent implements OnInit {

  constructor(private adminGetService : AdminGetService, private adminDeleteService : AdminDeleteService, private zone: NgZone) { }

  serviceList:Array<any>  = []
  ngOnInit() {
      this.getServiceList()
  }

  deleteId(serviceId : number){
    if(confirm('Er du sikker?')){
      this.adminDeleteService.deleteServiceId(serviceId).subscribe( res => {
          if(res.err){
            console.log('Error', res)
            alert('Kunne ikke slette services! Fejl: ' + res.data)
          }else{
            this.serviceList = []
            this.zone.run(() => this.getServiceList())
            console.log('Res:', res)
          }
        })
    }
  }

  getServiceList(){
    this.adminGetService.getServicesList().subscribe( res => {
      //console.log('Res:', res)
      if(!res.err){
        this.serviceList.push(res.data)
      }
    })
    //console.log('Data', this.serviceList)
  }

}
