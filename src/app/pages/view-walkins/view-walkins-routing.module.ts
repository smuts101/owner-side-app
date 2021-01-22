import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWalkinsPage } from './view-walkins.page';

const routes: Routes = [
  {
    path: '',
    component: ViewWalkinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewWalkinsPageRoutingModule {}
