import { Component, OnInit, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AppConfig } from "../../../../app.config";

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: AppConfig.api + '/media/file/upload'});

  uploadErrors : Array<string> = []
  uploadSuccess : Array<string> = []

  constructor(private http : Http, private el : ElementRef) {

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //console.log('API res:', response)
      var res = JSON.parse(response);
      if(res.err){
        item.isError = true
        item.isUploaded = false
        item.isSuccess = false
        item.progress = 0
        this.uploadErrors.push(res.data)
      }else{
        this.uploadSuccess.push(res.data)
      }
       // console.log(this.uploadErrors, item);// the url will be in the response
      }
      
  }

  ngOnInit() {
  }


  
    
}
