import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregaPlanModalPage } from '../agrega-plan-modal/agrega-plan-modal.page';

@Component({
  selector: 'app-agrega-plan',
  templateUrl: './agrega-plan.page.html',
  styleUrls: ['./agrega-plan.page.scss'],
})
export class AgregaPlanPage implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalCtrl.dismiss()
  }

  async contratar(plan) {
    const modal = await this.modalCtrl.create({
      component: AgregaPlanModalPage,
      componentProps: {
        plan
      }
    })

    await modal.present();
  }

}
