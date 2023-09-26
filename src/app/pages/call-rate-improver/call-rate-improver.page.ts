import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-call-rate-improver',
  templateUrl: './call-rate-improver.page.html',
  styleUrls: ['./call-rate-improver.page.scss'],
})
export class CallRateImproverPage implements OnInit {
  calificaForm = new FormGroup({
    fluency: new FormControl (null, [Validators.required]),
    pronunciation: new FormControl (null, [Validators.required]),
    grammar: new FormControl (null, [Validators.required])
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
      await this.fbstore.collection('calls').doc(this.sid).update({calImp: califica,calificoImpr: true}).then(data=>{
        this.modalCtrl.dismiss();
        
        
      })  
    } catch (error) {
      this.modalCtrl.dismiss();
      this.toastservice.showToast(error,5000);
      console.log(error);
      
    }
    
    
    
    
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  changefl(fl) {
    this.fl = fl
    
    this.calculateavg()
  }

  changepr(pr) {
    this.pr = pr
    
    this.calculateavg()
  }

  changegr(gr) {
    this.gr = gr
    
    this.calculateavg()
  }

  calculateavg() {
    this.avg = (this.fl+this.gr+this.pr)/3
    
  }

}
