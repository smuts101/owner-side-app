import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MassegesPage } from './masseges.page';

const routes: Routes = [
  {
    path: '',
    component: MassegesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MassegesPageRoutingModule {}
