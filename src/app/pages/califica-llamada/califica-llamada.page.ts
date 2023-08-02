import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { CallsService } from 'src/app/services/calls.service';

@Component({
  selector: 'app-califica-llamada',
  templateUrl: './califica-llamada.page.html',
  styleUrls: ['./califica-llamada.page.scss'],
})
export class CalificaLlamadaPage implements OnInit {

  calificaForm = new FormGroup({
    fluency: new FormControl (null, [Validators.required]),
    pronunciation: new FormControl (null, [Validators.required]),
    grammar: new FormControl (null, [Validators.required]),
    //avg: new FormControl (null, [Validators.required])
  });
  @Input() iUid;
  @Input() imTel;
  @Input() name;
  @Input() lastName;
  @Input() bio;
  @Input() creado;
  @Input() gender;
  @Input() country;
  @Input() foto;
  @Input() planID;
  @Input() callId;
  @Input() user;
  min = '00';
  seg = '00';
  fl
  pr
  gr
  avg
  callStatus = 'queued'
  childCallStatus = 'queued'
  recordingStatus = 'queued'
  complemento
  interval
  duracion = 0
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private _user: DataUsuarioService,
    private _calls: CallsService,
    private fbstore: AngularFirestore,
    public toastservice: ToastService
  ) { 
    
  }

  ngOnInit() {
    
    console.log('user =>',this.user);
    //this.llamar()
    this.getCalldetail(this.callId);
    this.lastCall(this.callId);
  }

  async lastCall(sid) {
    await this.fbstore.collection('perfiles').doc(this._user.userID).update({lastCall: sid})
  }

  async llamar() {
    this.fbstore.collection('plans').doc(this.planID).update({enllamada: true})
   await this.http.post('https://us-central1-pwa-lf.cloudfunctions.net/llamadaSaliente', {
      source: this._user.dataUser.code.replace(/ /g, ""),//Numero del Speaker con codigo de pais
      speId: this._user.userID,//UID del speaker
      destination: this.imTel.replace(/ /g, ""),//Numero del Improver, con codigo de pais
      impId: this.iUid,//UID del Improver
      planId: this.planID
    }).subscribe(  (data: any) => {
      console.log('callid =>',data);
      this.callId = data.sid
    } )
  }

  async getCalldetail(sid) {
    await this.fbstore.collection('calls').doc(sid).snapshotChanges().subscribe(detalle => {
      console.log('llamada?',detalle.payload.data()['CallStatus']);
      this.callStatus = detalle.payload.data()['CallStatus']
      this.childCallStatus = detalle.payload.data()['ChildCallStatus']
      this.recordingStatus = detalle.payload.data()['RecordingStatus']
      this.duracion = Math.ceil(detalle.payload.data()['RecordingDuration']/60)
      if (detalle.payload.data()['RecordingStatus'] == 'in-progress') {
        this.contador()
      }
      if (detalle.payload.data()['RecordingStatus'] == 'completed') {
        this.stopContador()
        
      }
    })
  }

  async calificar() {
    let califica = {
      fl: this.fl,
      pr: this.pr,
      gr: this.gr,
      avg: this.avg
    }
    try {
      await this.fbstore.collection('calls').doc(this.callId).update({calImp: califica}).then(data=>{
        this.getMinutesRemainingAfterCall(this.user.semana, this.callId, this.duracion, this.recordingStatus, this.user.planID)
        this.fbstore.collection('plans').doc(this.user.planID).update({enllamada: false})
        this.fbstore.collection('perfiles').doc(this.user.iUid).update({enllamada: false})
        this.modalCtrl.dismiss();
        //console.log('exito?');
      })
    } catch (error) {
      this.fbstore.collection('plans').doc(this.user.planID).update({enllamada: false})
      this.fbstore.collection('perfiles').doc(this.user.iUid).update({enllamada: false})
      this.modalCtrl.dismiss();
      this.toastservice.showToast(error,5000);
      console.log(error);
      
    }
    
    //console.log(this.calificaForm.value);
    
    
  }

  async intento() {
    await this.fbstore.collection('calls').doc(this.callId).update({CallStatus: 'no-answer'}).then(() => {
      this.fbstore.collection('plans').doc(this.user.planID).update({enllamada: false})
      this.fbstore.collection('perfiles').doc(this.user.iUid).update({enllamada: false})
      this.modalCtrl.dismiss();
    })
  }

  async getMinutesRemainingAfterCall(week, callSid, drtn, status,idPlan) {
    this.fbstore.collection('plans').doc(idPlan).get().subscribe((doc) => {
      if (doc.exists) {
        let weeks = (doc.data()['weeks'] === undefined) ? [] : doc.data()['weeks'];
        //Obtiene antes la posición de la semana en que estoy (la operación del final, week = index)
        //{
        //...
        //}
        weeks[week].calls.push({
          callSid: "",
          callStatus: "default|completed|no-answer",
          duration: 0,
          minutesRemaining: 0,
          availableMinutesPerCall: 10,
          availableMinutesPerCallCovered: ""
        });
        let call = weeks[week].calls.length - 1;

        //Calcula minutos remanentes
        let availableMinutesPerWeek = weeks[week].availableMinutesPerWeek;
        //let minutesRemaining = weeks[week].calls[(call == 0) ? call : call - 1].minutesRemaining;
        let minutesRemaining = doc.data()['minutesRemaining'];
        let statusCovered = "";

        let minutesTotal = (minutesRemaining + availableMinutesPerWeek);
        let duration = Math.ceil(drtn);

        if (duration >= 10) {
          duration = 10;
          statusCovered = "completed";
        }
        else {
          statusCovered = "notCompleted";
        }
        availableMinutesPerWeek = (minutesTotal - duration);

        //Solo para comprobación
        let minutesRemainingCall = (10 - duration);
        availableMinutesPerWeek = (availableMinutesPerWeek - minutesRemainingCall);

        //Guarda datos de llamada y minutos remanentes
        weeks[week].calls[call].callSid = callSid;
        weeks[week].calls[call].callStatus = status;
        weeks[week].calls[call].duration = duration;
        weeks[week].calls[call].minutesRemaining = minutesRemainingCall;
        weeks[week].calls[call].availableMinutesPerCallCovered = statusCovered;
        weeks[week].minutesRemaining = minutesRemaining + weeks[week].calls[call].minutesRemaining;
        weeks[week].availableMinutesPerWeek = weeks[week].availableMinutesPerWeek - weeks[week].calls[call].duration;

        this.fbstore.collection('plans').doc(idPlan).update({
          weeks: weeks,
          minutesRemaining: minutesRemaining + weeks[week].calls[call].minutesRemaining
        }).then(() => {
          console.log("Update weeks");
        });
      }
    })
  }

  contador() {
    var tiempo = new Date('2020/01/01 00:00')
    var padLeft = n => "00".substring(0, "00".length - n.length) + n;
    
    this.interval = setInterval(() => {
      // Asignar el valor de minutos
      var minutes = padLeft(tiempo.getMinutes() + "");
      // Asignqr el valor de segundos
      var seconds = padLeft(tiempo.getSeconds() + "");
      
      // console.log(minutes, seconds);
      // Restarle a la fecha actual 1000 milisegundos
      tiempo = new Date(tiempo.getTime() + 1000);

      // if( seconds == '05' ) {
      //   clearInterval(interval); 
      // }
      this.seg =  seconds 
      this.min = minutes
    }, 1000)    
  }

  stopContador() {
    clearInterval(this.interval)
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
