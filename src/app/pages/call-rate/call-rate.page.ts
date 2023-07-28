import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-call-rate',
  templateUrl: './call-rate.page.html',
  styleUrls: ['./call-rate.page.scss'],
})
export class CallRatePage implements OnInit {
  calificaForm = new FormGroup({
    fluency: new FormControl (null, [Validators.required]),
    // pronunciation: new FormControl (null, [Validators.required]),
    // grammar: new FormControl (null, [Validators.required]),
    //avg: new FormControl (null, [Validators.required])
  });
  @Input() sid;
  fl
  pr
  gr
  avg
  constructor(
    private modalCtrl: ModalController,
    private fbstore: AngularFirestore,
    private toastservice: ToastService
  ) { }

  ngOnInit() {
    console.log(this.sid);
    
  }

  async calificar() {
    let califica = {
      fl: this.fl,
      pr: this.pr,
      gr: this.gr,
      avg: this.avg
    }
    try {
      await this.fbstore.collection('calls').doc(this.sid).update({calSpe: this.fl,calificoSpea: true}).then(data=>{
        this.modalCtrl.dismiss();
        //console.log('exito?');
        
      })  
    } catch (error) {
      this.modalCtrl.dismiss();
      this.toastservice.showToast(error,5000);
      console.log(error);
      
    }
    
    //console.log(this.calificaForm.value);
    
    
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  changefl(fl) {
    this.fl = fl
    //console.log(fl);
    this.calculateavg()
  }

  changepr(pr) {
    this.pr = pr
    //console.log(pr);
    this.calculateavg()
  }

  changegr(gr) {
    this.gr = gr
    //console.log(gr);
    this.calculateavg()
  }

  calculateavg() {
    this.avg = (this.fl+this.gr+this.pr)/3
    //console.log(this.avg);
  }

}
