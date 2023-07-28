import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';

@Component({
  selector: 'app-sessiones',
  templateUrl: './sessiones.page.html',
  styleUrls: ['./sessiones.page.scss'],
})
export class SessionesPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  async calificaCliente(userId) {
    const modal = await this.modalCtrl.create({
      component: CalificaLlamadaPage
    });
    await modal.present();
    console.log(userId);
    

  }

}
