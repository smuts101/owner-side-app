import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'owner-landing',
    loadChildren: () => import('./pages/owner-landing/owner-landing.module').then( m => m.OwnerLandingPageModule)
  },
  {
    path: 'add-space',
    loadChildren: () => import('./pages/add-space/add-space.module').then( m => m.AddSpacePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-add',
    loadChildren: () => import('./pages/profile-add/profile-add.module').then( m => m.ProfileAddPageModule)
  },
 
  {
    path: 'update-space/:category',
    loadChildren: () => import('./pages/update-space/update-space.module').then( m => m.UpdateSpacePageModule)
  },
  {
    path: 'working-spaces',
    loadChildren: () => import('./pages/homepages/working-spaces/working-spaces.module').then( m => m.WorkingSpacesPageModule)
  },
  
  {
    path: 'view-space/:spaceuid/:profuid/:spaceId',
    loadChildren: () => import('./pages/homepages/view-space/view-space.module').then( m => m.ViewSpacePageModule)
  },
  {
    path: 'viewbooking/:reservuid/:profilesuid/:profileuid/:spaceuid/:useruid',
    loadChildren: () => import('./pages/viewbooking/viewbooking.module').then( m => m.ViewbookingPageModule)
  },
  {
    path: 'viewhistory/:reservuid/:profilesuid/:profileuid/:spaceuid/:useruid',
    loadChildren: () => import('./pages/viewhistory/viewhistory.module').then( m => m.ViewhistoryPageModule)
  },
  {
    path: 'previews/:uidprofiles/:uidprofile/:uidspace',
    loadChildren: () => import('./pages/previews/previews.module').then( m => m.PreviewsPageModule)
  },
  {
    path: 'previews',
    loadChildren: () => import('./pages/previews/previews.module').then( m => m.PreviewsPageModule)
  },
  {
    path: 'masseges',
    loadChildren: () => import('./feedback/masseges/masseges.module').then( m => m.MassegesPageModule)
  },
  {
    path: 'walkins',
    loadChildren: () => import('./pages/walkins/walkins.module').then( m => m.WalkinsPageModule)
  },
  {
    path: 'walkins/:spaceuid/:category/:profileuid',
    loadChildren: () => import('./pages/walkins/walkins.module').then( m => m.WalkinsPageModule)
  },
  {
    path: 'view-walkins/:spaceuid/:category/:profileuid',
    loadChildren: () => import('./pages/view-walkins/view-walkins.module').then( m => m.ViewWalkinsPageModule)
  },  {
    path: 'forget',
    loadChildren: () => import('./pages/forget/forget.module').then( m => m.ForgetPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
