import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController, MenuController, ModalController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';
import { MessagingService } from '../../services/messaging.service';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { AngularFireStorage } from '@angular/fire/storage';
import { CambiarTelPage } from '../cambiar-tel/cambiar-tel.page';
const  { Camera } = Plugins;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  slideOptions = {
    
  };
  fileData: any;
  loading: any;
  impro:any  = ''
  userList = [];
  callList = [];
  filtrados = [];
  userPerfil
  //userPerfil = JSON.parse(localStorage.getItem('perfil'));
  emailVerified: false;
  color = 'azul';
  banners: any;
  langSelect
  loader: any;
  generaLink:boolean = false
  acountData:boolean = false
  hora = new Date().getHours()
  puedeLlamar = true
  
  constructor(
    public ngroute: Router,
    private fbauth: AngularFireAuth,
    private popoverCtrl: PopoverController,
    private menu: MenuController,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public _user: DataUsuarioService,
    private modalCtrl: ModalController,
    public messagingService: MessagingService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private lang: LanguageService,
    private translate: TranslateService,
    private asControler: ActionSheetController,
    private fbstorage: AngularFireStorage
  ) { 
    this.listenForMessages();
    this.cahngeLang();
  }

  
  ngOnInit() {    
  }

  

  ionViewDidEnter() {
    this.color = 'azul'
    this.userPerfil = this._user.dataUser
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
      this.getCallsImp()
    } else {
      this.getPlans();
      this.califico();
    }
    this.getBanners(this._user.dataUser.role)
    //this.verifica();
    this.menu.enable(true,'main');
    //this.requestPermission();
    this.langSelect = 'en';
    if (this._user.dataUser.csai) {
      this.acountData = true
      this.generaLink = false
      
    }    
      
  }

  cahngeLang() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      //console.log('cambio lang', event);
      this.getBanners(this._user.dataUser.role)
    })
  }

  async getBanners(role) {
    if (role == 'cliente') {
      const applocation = 'appimp'
      const language = this.lang.current
      await this.fbstore.collection('banners', ref => ref.where('language','array-contains',language)).snapshotChanges()
    .subscribe(data => {
      this.banners = data.map(result => {
        return {
          bid: result.payload.doc.id,
          img: result.payload.doc.data()['file'],
          lang: result.payload.doc.data()['language'],
          app: result.payload.doc.data()['location']
        }
      })
      this.banners.filter(banner => banner.app == applocation)

      //console.log(this.banners);
      
    })
    } else {
      const applocation = 'appspk'
      const language = this.lang.current
      await this.fbstore.collection('banners', ref => ref.where('language','array-contains',language)).snapshotChanges()
    .subscribe(data => {
      this.banners = data.map(result => {
        return {
          bid: result.payload.doc.id,
          img: result.payload.doc.data()['file'],
          lang: result.payload.doc.data()['language'],
          app: result.payload.doc.data()['location']
        }
      })
      this.banners.filter(banner => banner.app == applocation)
      //console.log(this.banners);
      
    })
    }

    
  }


  async mostrarNot(evento) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: false
    });
    
    await popover.present();
    
    //const {data} = await popover.onDidDismiss();
    const {data} = await popover.onWillDismiss();
    //console.log('Padre:', data);
    
  }
  
  async llamarCliente(user) {
    //this.toastservice.showToast('Llamando...',5000)
    this.loader = await this.loadingCtrl.create({
      message: 'Llamando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present()
    this.fbstore.collection('plans').doc(user.planID).update({enllamada: true})
    this.fbstore.collection('perfiles').doc(user.iUid).update({enllamada: true})
    await this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/llamadaSaliente', {
      source: this._user.dataUser.code.replace(/ /g, ""),//Numero del Speaker con codigo de pais
      speId: this._user.userID,//UID del speaker
      destination: user.imTel.replace(/ /g, ""),//Numero del Improver, con codigo de pais
      impId: user.iUid,//UID del Improver
      planId: user.planID
    }).subscribe( async (data: any) => {
      if ( data.sid) {
        console.log('callid =>',data);
        
        this.loader.dismiss()
        const modal = await this.modalCtrl.create({
          component: CalificaLlamadaPage,
          componentProps: {user, callId: data.sid},
          backdropDismiss: false
        });
        await modal.present();
      } else {
        this.loader.dismiss()
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Lammada',
          subHeader: 'Creando Llamada',
          message: 'Error al crear la llamada',
          buttons: [            
            {
              text: 'Ok',
              handler: (blah) => {
                console.log('Boton Ok');
              }
            }
          ]
        })
        await alert.present();
      }            
    } )
    
    // this.loader.dismiss()
    // const modal = await this.modalCtrl.create({
    //   component: CalificaLlamadaPage,
    //   componentProps: {user, callId: 'CA62a22bc4a4edb40495dc8a31559f3a74'}
    // });
    // await modal.present();      
    // console.log(user);
    
  }
  
  async doLogout(): Promise<void> {
    
    await this.fbauth.signOut().then(() => {
      this.ngroute.navigate(['login']);
    });
  }
  
  verifica() {
    this.emailVerified = this._user.emailVerified
    if (!this.emailVerified) {
      
      this.toastservice.showToast('Email no verificado, por favor revisa tu buzon',4000);
    }
  }
  
  listenForMessages() {
    this.messagingService.getMessages().subscribe(async (msg: any) => {
      const alert = await this.alertCtrl.create({
        header: msg.notification.title,
        subHeader: msg.notification.body,
        message: msg.data.info,
        buttons: ['OK'],
        mode: 'ios',
        backdropDismiss: false,
        animated: true
      });
      
      await alert.present();
    });
  }
  
  
  requestPermission() {
    if (!this._user.dataUser.mtoken) {
      this.messagingService.requestPermission().subscribe(
        async token => {
          this.toastservice.showToast('Got your token', 2000);
          
        },
        async (err) => {
          this.toastservice.showToast(err, 2000);
        }
        );  
    }
    
  }
    
  async getClientes() {
    try {
      await this.fbstore.collection('perfiles', ref => ref.where('role', '==', 'cliente')).snapshotChanges()
      .subscribe(data => {
        //console.log(data);
        this.userList = data.map( result => {
          //console.log(result);
          return {
            userId: result.payload.doc.id,
            userName: result.payload.doc.data()['name'],
            userLastName: result.payload.doc.data()['lastName']
          }
        })
      });
      
    } catch (error) {
      this.toastservice.showToast(error.message, 2000)
    }
  }

  async changeTel() {
    const modal = await this.modalCtrl.create({
      component: CambiarTelPage,
      animated: true,
      backdropDismiss: false,
      mode: 'ios'
    });
    await modal.present();
  }
  
  async califico() {
    console.log('lastCall', this._user.dataUser.lastCall);
    if (this._user.dataUser.lastCall) {
      
      this.fbstore.collection('calls').doc(this._user.dataUser.lastCall).snapshotChanges().subscribe(call => {
        if (!call.payload.data()['calificoImpr'] && call.payload.data()['CallStatus'] == 'completed') {
          console.log('no puede llamar');
          this.puedeLlamar = false
        } else {
          this.puedeLlamar = true
        }
      })
    } else {
      this.puedeLlamar = true
    }
  }

  async getPlans() {
      let hoy = new Date()
      let day = hoy.getDate()
      let month = hoy.getMonth() + 1
      let year = hoy.getFullYear()
      
      //console.log('fecha', year+'/'+month+'/'+day);
      //console.log('timeImpro', timeImprover);
      
      
      
      
      try {
        this.fbstore.collection('plans', ref => ref.where('activa', '==', true)
                                                    .where('enllamada', '==', false)
                                                    .where('idioma', 'in' , this._user.dataUser.idioma)).snapshotChanges()
        .subscribe( data => {
          this.userList = data.map( result => {
            return {
              planID: result.payload.doc.id,
              iUid: result.payload.doc.data()['uid'],
              plan: result.payload.doc.data(),
              inicio: parseInt(result.payload.doc.data()['schedule']),
              fin: parseInt(result.payload.doc.data()['schedule'])+3,
              weeks: result.payload.doc.data()['weeks']
            }            
            
          })
          
          
          for (let index = 0; index < this.userList.length; index++) {
            
            this.fbstore.collection('perfiles').doc(this.userList[index]['iUid']).snapshotChanges().subscribe(perfil => {
              let zone = perfil.payload.data()['timezone'];
              setInterval(()=> {
                let hora = new Date().toLocaleTimeString('en-US', {timeZone: zone.nameValue, hour12: false})
                this.userList[index]['timeActual'] = hora
                //console.log('hora=> ',hora);
              },1000)
              this.userList[index]['name'] = perfil.payload.data()['name'];
              this.userList[index]['lastName'] = perfil.payload.data()['lastName'];
              this.userList[index]['foto'] = perfil.payload.data()['foto'];
              this.userList[index]['imTel'] = perfil.payload.data()['code'];
              this.userList[index]['bio'] = perfil.payload.data()['bio'];
              this.userList[index]['creado'] = perfil.payload.data()['creado'];
              this.userList[index]['gender'] = perfil.payload.data()['gender'];
              this.userList[index]['country'] = perfil.payload.data()['country'];
              this.userList[index]['enllamada'] = perfil.payload.data()['enllamada'];
              this.userList[index]['timezone'] = perfil.payload.data()['timezone'];
              this.userList[index]['timeImprover'] = new Date().toLocaleTimeString('en-US', {timeZone: zone.nameValue, hour12: false});
              
              
              //console.log('hora', new Date().toLocaleTimeString('en-US', {timeZone: zone.nameValue, hour12: false}));
              
              //console.log('mayor 8am', new Date().toLocaleTimeString('en-US', {timeZone: zone.nameValue, hour12: false}),new Date().toLocaleTimeString('en-US', {timeZone: zone.nameValue, hour12: false}) >= '08:00:00' );
              
            })
            this.fbstore.collection('calls', ref => ref.where('create','>=',new Date(year+'/'+month+'/'+day)).where('planId','==',this.userList[index]['planID']).where('RecordingStatus','==','completed')).snapshotChanges().subscribe(calls => {
              let llamadas = calls.map(result => {
                return {
                  minutos: result.payload.doc.data()['minutos']
                }

              })
              
              this.userList[index]['llamadas'] = llamadas.length
              this.userList[index]['minutos'] = 0
              llamadas.forEach(element => {
                this.userList[index]['minutos'] += element.minutos
              })

              //Buscamos la semana del plan respecto al dia actual
              //console.log('segundos => ', hoy.getTime()/1000);
              
              let weeks = this.userList[index]['weeks']
              this.userList[index]['semana'] = weeks.findIndex(o => ( hoy.getTime()/1000 >= o.from.seconds && hoy.getTime()/1000 <= o.to.seconds ))
              
              this.filtrados = this.userList.filter(user => user.timeImprover >= '08:00:00' && user.timeImprover <= '20:00:00' && user.minutos == 0 && Math.round(user.minutos/60) < user.weeks[this.userList[index]['semana']].availableMinutesPerWeek && user.enllamada == false)
              console.log('filtrados =>', this.filtrados, this.hora);
              this.filtrados.sort(function(){return 0.5 - Math.random()})
              this.filtroHorario()
            })
            
          }
           console.log(this.userList);
           
        });
        
      } catch (error) {
        this.toastservice.showToast(error.message, 2000)
      }
  }

  filtroHorario() {
    console.log('filtrohorario');
    
  }

  async getCallsImp() {
    try {
      this.fbstore.collection('calls', ref => ref.where('inmpId', '==', this._user.userID)).snapshotChanges()
      .subscribe( data => {
        this.callList = data.map( result => {
          return result.payload.doc.data()
        })
      } )
    } catch (error) {
      this.toastservice.showToast(error.message, 2000)
    }
  }

  async contador() {
    var padLeft = n => "0000000".substring(0, "0000000".length - n.length) + n;
    try {
      this.fbstore.collection('perfiles', ref => ref.where('role', '==', 'cliente')).snapshotChanges().subscribe(data =>{
        let contador = data.length
        // console.log('Usuarios', 'I'+padLeft(contador + ""));
        
      })
    } catch (error) {
      
    }
  }

  async creaSId() {
    this.loader = await this.loadingCtrl.create({
      message: 'Cargando...',
      mode: 'ios'
    })    
    
    this.loader.present();
    this.http.post('https://us-central1-ejemplocrud-e7eb1.cloudfunctions.net/createAccount', {
      country: this._user.dataUser.country,
      email: this._user.dataUser.email
    }).subscribe( async (acount: any) => {
      console.log(acount);
      if (acount.id) {
        this.fbstore.collection('perfiles').doc(this._user.userID).update({'csai': acount.id}).then(() => {
          setTimeout(() => {
            
            this.ngroute.navigateByUrl("/acount-link");
            this.loader.dismiss();
          }, 3000);
        })
      } else {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: 'Error al Crear Cuenta',
          message: 'No se pudo generar ID.',
          buttons: [
            {
              text: 'Ok',
              handler: (blah) => {
                console.log('Boton Ok');
              }
            }
          ]
        });
        await alert.present();
        this.loader.dismiss();
      }
      
    })
  }

  async subirImgPerfil() {
    const actSheet = await this.asControler.create({
      header: 'Agregar Foto de Perfil',
      backdropDismiss: false,
      mode: "ios",
      buttons: [
        {
          text: 'Camara',
          icon: 'camera-outline',
          handler: () => {
            this.conCamara();
          }
        }, {
          text: 'Galeria',
          icon: 'images-outline',
          role: 'destructive',
          handler: () => {
            this.conGaleria()
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actSheet.present();
  }

  async presentLoading( message: string ) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      spinner: 'circular',
      duration: 3000,
      message
    });
    this.loading.present();
    
  }

  async conCamara() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });

    var imageUrl = await fetch(image.webPath);
    const fileName = new Date().getTime() + '.jpeg';
    var blob = await imageUrl.blob();
    var st  = this.fbstorage.storage.ref('fotosPerfil/'+fileName).put(blob);
    st.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      this.presentLoading('Guardando...');
    }, (error) => {

    }, () => {
      st.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        // console.log(downloadURL);
        this.guardarFoto(downloadURL);
        
      });
    })
  }

  async conGaleria() {
    this.filePickerRef.nativeElement.click();
    
  }

  async subirAlbum(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    // var imageUrl = await fetch(image.webPath);
    const fileName = new Date().getTime() + '.jpeg';
    // var blob = await imageUrl.blob();
    var st  = this.fbstorage.storage.ref('fotosPerfil/'+fileName).put(file);
    st.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      this.presentLoading('Guardando...');
    }, (error) => {

    }, () => {
      st.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        // console.log(downloadURL);
        this.guardarFoto(downloadURL);
        
      });
    })
  }

  async guardarFoto(url) {
    await this.fbstore.doc('perfiles/'+this._user.userID).update({foto: url}).then(() => {
      // console.log(data);
      window.location.reload();
      
    })
  }

  async getFile() {    
    let url
    await this.fbstore.collection('managerOptions').doc('manual').get().subscribe(manual => {
      url = manual.data()['stripe']
      console.log('URL=>',url);
      this.http.request('GET', url, {responseType: 'arraybuffer',headers:{'Access-Control-Allow-Origin':'*'}}).subscribe(response => this.downLoadFile(response, "application/pdf"));
      // this.http.get(url,{
      //   responseType: 'arraybuffer'} 
      //  ).subscribe(response => this.downLoadFile(response, "application/pdf"));
    })
    

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
  
}
