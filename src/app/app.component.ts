import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';
import { DataUsuarioService } from './services/data-usuario.service';
import { LanguageService } from './services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  listLang = [
    { text: 'EN', flag: 'assets/imags/flags/us.jpg', lang: 'en' },
    { text: 'ES', flag: 'assets/imags/flags/spain.jpg', lang: 'es' },
  ];
  splitPaneState: any ;
  loader: any;
  current
  constructor(
    private platform: Platform,
    private fbauth: AngularFireAuth,
    private ngroute: Router,
    public _user: DataUsuarioService,
    public languageService: LanguageService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {    
    this.platform.ready().then(() => {
      this.current = languageService.current 
      
    });
  }

  async doLogout() {
    this.loader = await this.loadingCtrl.create({
      message: this.translate.instant('HOME.LOADING'),
      mode: 'ios'
    })
    this.loader.present();
    return this.fbauth.signOut().then(stado => {
      
      
      setTimeout(() => {
        this.loadingCtrl.dismiss();
        
        window.location.reload();
      }, 3000);
      
    });
  }

  setLanguage(lang) {
    
    this.languageService.setLanguage(lang.detail.value);

    
  }
}
