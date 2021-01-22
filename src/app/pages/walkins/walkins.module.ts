import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {  ReactiveFormsModule } from '@angular/forms';
import { WalkinsPageRoutingModule } from './walkins-routing.module';

import { WalkinsPage } from './walkins.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    WalkinsPageRoutingModule
  ],
  declarations: [WalkinsPage]
})
export class WalkinsPageModule {}
