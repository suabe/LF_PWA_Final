import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController, MenuController, ModalController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from '../../services/toast.service';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { CalificaLlamadaPage } from '../califica-llamada/califica-llamada.page';
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
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private lang: LanguageService,
    private translate: TranslateService,
    private asControler: ActionSheetController,
    private fbstorage: AngularFireStorage
  ) {     
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
    this.menu.enable(true,'main');    
    this.langSelect = 'en';
    if (this._user.dataUser.csai) {
      this.acountData = true
      this.generaLink = false
      
    }    
      
  }

  cahngeLang() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
      this.banners.filter(banner => banner.app == applocation);      
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
      this.banners.filter(banner => banner.app == applocation);      
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
    
    const {data} = await popover.onWillDismiss();
        
  }
  
  async llamarCliente(user) {    
    this.loader = await this.loadingCtrl.create({
      message: 'Llamando...',
      mode: 'ios',
      spinner: 'bubbles'
    })
    this.loader.present()
    this.fbstore.collection('plans').doc(user.planID).update({enllamada: true})
    this.fbstore.collection('perfiles').doc(user.iUid).update({enllamada: true})
    await this.http.post('https://us-central1-pwa-lf.cloudfunctions.net/llamadaSaliente', {
      source: this._user.dataUser.code.replace(/ /g, ""),//Numero del Speaker con codigo de pais
      speId: this._user.userID,//UID del speaker
      destination: user.imTel.replace(/ /g, ""),//Numero del Improver, con codigo de pais
      impId: user.iUid,//UID del Improver
      planId: user.planID
    }).subscribe( async (data: any) => {
      if ( data.sid) {        
        
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
                
              }
            }
          ]
        })
        await alert.present();
      }            
    } )
    
    
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
  
    
  async getClientes() {
    try {
      await this.fbstore.collection('perfiles', ref => ref.where('role', '==', 'cliente')).snapshotChanges()
      .subscribe(data => {        
        this.userList = data.map( result => {          
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
    if (this._user.dataUser.lastCall) {
      
      this.fbstore.collection('calls').doc(this._user.dataUser.lastCall).snapshotChanges().subscribe(call => {
        if (!call.payload.data()['calificoImpr'] && call.payload.data()['CallStatus'] == 'completed') {          
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

                            
              let weeks = this.userList[index]['weeks']
              this.userList[index]['semana'] = weeks.findIndex(o => ( hoy.getTime()/1000 >= o.from.seconds && hoy.getTime()/1000 <= o.to.seconds ))
              
              this.filtrados = this.userList.filter(user => user.timeImprover >= '08:00:00' && user.timeImprover <= '20:00:00' && user.minutos == 0 && Math.round(user.minutos/60) < user.weeks[this.userList[index]['semana']].availableMinutesPerWeek && user.enllamada == false)    
              this.filtrados.sort(function(){return 0.5 - Math.random()})              
            })
            
          }           
           
        });
        
      } catch (error) {
        this.toastservice.showToast(error.message, 2000)
      }
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
    this.http.post('https://us-central1-pwa-lf.cloudfunctions.net/createAccount', {
      country: this._user.dataUser.country,
      email: this._user.dataUser.email
    }).subscribe( async (acount: any) => {
      
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
      this.presentLoading('Guardando...');
    }, (error) => {

    }, () => {
      st.snapshot.ref.getDownloadURL().then( (downloadURL) => {
        
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
    const fileName = new Date().getTime() + '.jpeg';    
    var st  = this.fbstorage.storage.ref('fotosPerfil/'+fileName).put(file);
    st.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;      
      this.presentLoading('Guardando...');
    }, (error) => {

    }, () => {
      st.snapshot.ref.getDownloadURL().then( (downloadURL) => {        
        this.guardarFoto(downloadURL);
        
      });
    })
  }

  async guardarFoto(url) {
    await this.fbstore.doc('perfiles/'+this._user.userID).update({foto: url}).then(() => {
      
      window.location.reload();
      
    })
  }

  async getFile() {    
    let url
    await this.fbstore.collection('managerOptions').doc('manual').get().subscribe(manual => {
      url = manual.data()['stripe']
      
      this.http.request('GET', url, {responseType: 'arraybuffer',headers:{'Access-Control-Allow-Origin':'*'}}).subscribe(response => this.downLoadFile(response, "application/pdf"));
      
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
