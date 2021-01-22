import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewWalkinsPageRoutingModule } from './view-walkins-routing.module';

import { ViewWalkinsPage } from './view-walkins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewWalkinsPageRoutingModule
  ],
  declarations: [ViewWalkinsPage]
})
export class ViewWalkinsPageModule {}
