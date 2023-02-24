import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/subscription'
  },
  {    
    path:'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {    
    path:'tagging',
    loadChildren: () => import('./tagging/tagging.module').then(m => m.TaggingModule)
  },
  {    
    path:'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {    
    path:'subscription',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {    
    path:'workshop',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {    
    path:'header',
    loadChildren: () => import('./header/header.module').then(m => m.HeaderModule)
  },
  {    
    path:'sidenav',
    loadChildren: () => import('./sidenav/sidenav.module').then(m => m.SidenavModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
