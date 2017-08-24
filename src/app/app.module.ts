import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterConfig } from './app.routes'
import { Keyobject } from './mainPipe'
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload'
//Import of Services
import { AuthService } from './Services/auth.service'
import { GetService } from './Services/get-service.service'
import { AdminGetService } from './admin/Services/admin-get.service'
import { AdminPostService } from './admin/Services/admin-post.service'
import { AdminDeleteService } from './admin/Services/admin-delete.service'
//import of gaurds
import { CanActivateRouteGuard } from './Guards/canActivate.guard'
import { CheckRoleRouteGuard } from './Guards/checkRole.gaurd'
//Import of Components
import { AppComponent } from './app.component'
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ServicesComponent } from './Components/services/services.component';
import { BlogComponent } from './Components/blog/blog.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { BlogPostViewComponent } from './Components/blog-post-view/blog-post-view.component';
//import of Admin components
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { ServicesListComponent } from './admin/Components/services/services-list/services-list.component';
import { EditServiceComponent } from './admin/Components/services/edit-service/edit-service.component';
import { NewServiceComponent } from './admin/Components/services/new-service/new-service.component';
import { ListMediaComponent } from './admin/Components/media/list-media/list-media.component';
import { AddMediaComponent } from './admin/Components/media/add-media/add-media.component';
import { BlogPostsComponent } from './admin/Components/blog/blog-posts/blog-posts.component';
import { AddPostComponent } from './admin/Components/Blog/add-post/add-post.component';
import { EditPostComponent } from './admin/Components/Blog/edit-post/edit-post.component';
import { MediaSelectComponent } from './admin/Components/-directives/media-select/media-select.component';
import { CategoriesComponent } from './admin/Components/Blog/categories/categories.component';
import { SettingsComponent } from './admin/Components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ServicesComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    BlogPostViewComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    DashboardComponent,
    ServicesListComponent,
    Keyobject,
    EditServiceComponent,
    NewServiceComponent,
    ListMediaComponent,
    AddMediaComponent,
    FileDropDirective,
    FileSelectDirective,
    BlogPostsComponent,
    AddPostComponent,
    EditPostComponent,
    MediaSelectComponent,
    CategoriesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(RouterConfig)
  ],
  providers: [
    AuthService,
    GetService,
    CanActivateRouteGuard,
    CheckRoleRouteGuard,
    AdminGetService,
    AdminPostService,
    AdminDeleteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
