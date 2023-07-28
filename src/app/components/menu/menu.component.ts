import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController, NavController, LoadingController } from '@ionic/angular';
import { MenuPopComponent } from '../menu-pop/menu-pop.component';

import { DataUsuarioService } from '../../services/data-usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  cookieValue;
  flagvalue;
  countryName;
  lang;
  listLang = [
    { text: 'EN', flag: 'assets/imags/flags/us.jpg', lang: 'en' },
    { text: 'ES', flag: 'assets/imags/flags/spain.jpg', lang: 'es' },
  ];
  langSelec
  loader: any;
  constructor(
    public _user: DataUsuarioService,
    private popoverCtrl: PopoverController,
    public menu: MenuController,
    private fbauth: AngularFireAuth,
    public ngroute: Router,
    public languageService:LanguageService,
    private auThService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) {}
  
  ionViewDidEnter() {}

  ngOnInit() {
    this.langSelec = this.languageService.current
  }

  status() {}

  async showMenuPop( evento ) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();
    const {data} = await popover.onWillDismiss();
    if (data.salir) {
      console.log('salir');
      //this.menu.close();
      // await this.fbauth.signOut().then(() => {
      //   this.ngroute.navigate(['/login'], { replaceUrl: true });
      // });
      this.doLogout()
    }
    //console.log('Padre:', data);
  }

  async doLogout() {
    this.loader = await this.loadingCtrl.create({
      message: 'Procesando...',
      mode: 'ios'
    })
    this.loader.present();
    this.auThService.SignOut().then(()=> {      
      setTimeout(() => {
        this.loadingCtrl.dismiss();
        this.loader.present();  
      }, 2000);
    })
  }

  setLanguage(lang) {
    
    this.languageService.setLanguage(lang.detail.value);

    
  }

  langSelected(a,b) {
    return a
    
  }

}
