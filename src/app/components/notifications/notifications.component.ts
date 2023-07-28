import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  constructor( private popoverCtrl: PopoverController) { }
  items = Array(4);
  ngOnInit() {}

  onClick( valor: number ) {
    console.log('item:', valor);
    this.popoverCtrl.dismiss({
      item: valor
    });
  }

}
