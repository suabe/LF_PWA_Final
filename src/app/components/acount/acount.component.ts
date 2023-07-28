import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.scss'],
})
export class AcountComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  onClick() {
    this.popoverCtrl.dismiss()
  }

}
