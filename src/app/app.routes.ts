import { Routes } from '@angular/router'
//import of gaurds
import { CanActivateRouteGuard } from './Guards/canActivate.guard'
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
import { ServicesListComponent } from './admin/Components/services/services-list/services-list.component'
import { EditServiceComponent } from './admin/Components/services/edit-service/edit-service.component';
import { NewServiceComponent } from './admin/Components/services/new-service/new-service.component';
import { ListMediaComponent } from './admin/Components/media/list-media/list-media.component';
import { AddMediaComponent } from './admin/Components/media/add-media/add-media.component';


export const RouterConfig : Routes = [
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'Services',
    component: ServicesComponent
  },
  {
    path: 'Blog',
    component: BlogComponent
  },
  {
    path: 'Blog/Post/:id',
    component: BlogPostViewComponent
  },
  {
    path: 'About',
    component: AboutComponent
  },
  {
    path: 'Contact',
    component: ContactComponent
  },
  {
    path: 'Admin',
    component: AdminHomeComponent,
    canActivate: [CanActivateRouteGuard],
    children : [
        {
            path: 'Dashboard',
            component: DashboardComponent
        },
        {
            path: 'Services',
            component: ServicesListComponent
        },
        {
            path: 'Services/Edit/:id',
            component: EditServiceComponent
        },
        {
          path: 'Services/New',
          component: NewServiceComponent
        },
        {
          path: 'Media',
          component: ListMediaComponent
        },
        {
          path: 'Media/Add',
          component: AddMediaComponent
        },
        {
            path: '',
            redirectTo: 'Dashboard',
            pathMatch: 'full'
        },
         {
            path: '**',
            redirectTo: 'Dashboard',
            pathMatch: 'full'
        }
    ]
  },
    {
        path: 'Admin-Login',
        component: AdminLoginComponent
    },
  { 
    path: '**',   
    redirectTo: 'Home', 
    pathMatch: 'full' 
  },
  { 
    path: '',   
    redirectTo: 'Home', 
    pathMatch: 'full' 
  }]