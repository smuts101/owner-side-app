import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MassegesPageRoutingModule } from './masseges-routing.module';

import { MassegesPage } from './masseges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MassegesPageRoutingModule
  ],
  declarations: [MassegesPage]
})
export class MassegesPageModule {}
