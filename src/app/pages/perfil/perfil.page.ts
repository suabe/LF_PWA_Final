import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { ToastService } from '../../services/toast.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActionSheetController, ModalController, LoadingController } from '@ionic/angular';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil.page';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { DataUsuarioService } from '../../services/data-usuario.service';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/interfaces';
const  { Camera } = Plugins;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  public uId: string;
  userData: any;
  fileData: any;
  userPerfil: User = {};
  color = 'azul';
  speiForm = new FormGroup({
    spei: new FormControl ('', [Validators.required,Validators.minLength(16)]),
  });
  loading: any;
  
  constructor(
    public ngFireAuth: AngularFireAuth,
    private fbstore: AngularFirestore,
    private toastservice: ToastService,
    public addnewFormbuilder: FormBuilder,
    public modalCtrl: ModalController,
    public asControler: ActionSheetController,
    public fbstorage: AngularFireStorage,
    public _user: DataUsuarioService,
    private loadingCtrl: LoadingController
  ) { 
    
    
  }
  
  ngOnInit() {
    
  }
  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
    this.getPerfil();
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

  async getPerfil() {
    try{
      await this.fbstore.collection('perfiles').doc(this._user.userID).snapshotChanges().subscribe(perfil => {
        this.userPerfil = perfil.payload.data()
      })
      console.log('perfil =>',this.userPerfil);
      
    }catch(error) {
      this.toastservice.showToast(error.message, 2000);
    }
  }

  async agregaSpei() {
    let dataSpei = {
      spei: this.speiForm.get('spei').value
    }
    try {
      await this.fbstore.doc('perfiles/'+this.uId).update(dataSpei).then(data => {
        // console.log(data);
        window.location.reload();
      })
    } catch (error) {
      this.toastservice.showToast(error.message, 2000);
    }
  }

  async editarPerfil() {
    const  modal = await this.modalCtrl.create({
      component: EditarPerfilPage,
      animated: true,
      backdropDismiss: false,
      mode: 'ios'
    });

    await modal.present();
    
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

  

}
