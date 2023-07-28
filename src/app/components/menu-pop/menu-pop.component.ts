import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-pop',
  templateUrl: './menu-pop.component.html',
  styleUrls: ['./menu-pop.component.scss'],
})
export class MenuPopComponent implements OnInit {

  constructor(
    private popoverCtrl: PopoverController,
    private fbauth: AngularFireAuth,
    public route: Router,
    private menu: MenuController
  ) { }

  ngOnInit() {}

   salir() {
    this.popoverCtrl.dismiss({
      salir:true
    });
  }

  config() {
    this.popoverCtrl.dismiss({
      salir: false
    });
  }

  ayuda() {
    this.popoverCtrl.dismiss({
      salir: false
    });
  }

}
