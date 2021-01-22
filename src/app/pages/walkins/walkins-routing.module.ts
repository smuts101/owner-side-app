import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalkinsPage } from './walkins.page';

const routes: Routes = [
  {
    path: '',
    component: WalkinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalkinsPageRoutingModule {}
