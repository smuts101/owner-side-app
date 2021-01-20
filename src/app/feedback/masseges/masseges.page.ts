import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-masseges',
  templateUrl: './masseges.page.html',
  styleUrls: ['./masseges.page.scss'],
})
export class MassegesPage implements OnInit {

  constructor(private popover:PopoverController) {} 

  ngOnInit() {
  }

   ClosePopover()
   {
     this.popover.dismiss();
   }
}
