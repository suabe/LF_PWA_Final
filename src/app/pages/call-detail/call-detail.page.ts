import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallsService } from '../../services/calls.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { CallRateImproverPage } from '../call-rate-improver/call-rate-improver.page';


@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.page.html',
  styleUrls: ['./call-detail.page.scss'],
})
export class CallDetailPage implements OnInit {
  call
  complemento
  speaker
  recordings
  url
  duration
  constructor(
    private route: ActivatedRoute,
    private _calls: CallsService,
    private fbstore: AngularFirestore,
    private _user: DataUsuarioService,
    private http: HttpClient,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.speaker = this._user.dataUser
    this.route.params.subscribe( param => {      
      this._calls.detalle(param.id).subscribe(llamada => {
        this.call = llamada.payload.data();
        this.call['duraRedon'] = Math.ceil(llamada.payload.data()['RecordingDuration']/60)
        this.fbstore.collection('perfiles').doc(this.call['inmpId']).snapshotChanges().subscribe( impro => {
          this.call['improver'] = impro.payload.data()          
        })
      })
      this._calls.complemento(param.id).subscribe(compe => {
        this.complemento =  compe
      })
      this._calls.recordings(param.id).subscribe(grab => {
        this.recordings = grab        
        this.url = "https://api.twilio.com/2010-04-01/Accounts/ACf88cd2fcc4ec6d7c79baaaf73bdf4c71/Recordings/"+this.recordings['recordings'][0]['sid']+".mp3"
      })
    })
  }

  getFile() {
    this.http.get(this.url,{
      responseType: 'arraybuffer'} 
     ).subscribe(response => this.downLoadFile(response, "audio/mpeg"));

  }
  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  async calificaImprover() {
    const modal = await this.modal.create({
      component: CallRateImproverPage,
      componentProps: this.call
    });
    await modal.present();
  }

}
