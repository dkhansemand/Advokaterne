import { Component, OnInit } from '@angular/core';
import { AdminPostService } from '../../../Services/admin-post.service'
import { AdminGetService } from '../../../Services/admin-get.service'
import { AdminDeleteService } from '../../../Services/admin-delete.service'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private adminPostService : AdminPostService, private adminGetService : AdminGetService, private adminDeleteService : AdminDeleteService) { }

  addSuccess : boolean = false
  addError : boolean = false
  errMsg : string
  category = {
    name: ''
  }
  categoryList : Array<any>
  showEditId : number = 0
  edit = {
    name : ''
  }

  ngOnInit() {
    this.getCategoryList()
  }

  addCategory(){
      if(this.category.name !== ''){
        this.adminPostService.addcategory(this.category).subscribe(res => {
          if(res.err){
            this.addSuccess = false
            this.addError = true
            this.errMsg = res.data
          }else{
            this.addError = false
            this.addSuccess = true
          }
          this.category.name = ''
          this.categoryList = []
          this.getCategoryList()
          //console.log('Category res:', res)
        })
      }
  }

  getCategoryList(){
    this.adminGetService.getCategories().subscribe( res => {
        if(res.err){
          console.warn('Res Error: ', res.data)
        }
        this.categoryList = res.data
        //console.log('Res: ', res)
    })
  }

  editCategory(catId : number){
    this.adminPostService.editCategory(catId, this.edit.name).subscribe(res => {
        if(res.err){
          console.warn('Res Error: ', res.data)
        }else{
          this.edit.name = ''
          this.showEditId = 0
          this.categoryList = []
          this.getCategoryList()
        }
    })
  }

  deleteCategory(catId : number){
    if(confirm('Er du sikker?')){
      this.adminDeleteService.deleteCategoryId(catId).subscribe(res => {
        if(res.err){
          console.warn('Res Error: ', res.data)
        }else{
          this.categoryList = []
          this.getCategoryList()
        }
      })
    }
  }

}
