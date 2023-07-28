import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { ComponentsModule } from './components/components.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { CustomScrollDirective } from './directives/custom-scroll.directive';
import { MomentTimezonePickerModule } from 'moment-timezone-picker';




export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('combined-sw.js', {
      enabled: environment.production,
    }),
    ComponentsModule,
    HttpClientModule,
    // HttpClient,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    IonIntlTelInputModule,
    MomentTimezonePickerModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
