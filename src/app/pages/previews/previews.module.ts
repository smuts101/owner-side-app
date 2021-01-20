import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewsPageRoutingModule } from './previews-routing.module';

import { PreviewsPage } from './previews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewsPageRoutingModule
  ],
  declarations: [PreviewsPage]
})
export class PreviewsPageModule {}
