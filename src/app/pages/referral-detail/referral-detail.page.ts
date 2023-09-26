import { Component, OnInit } from '@angular/core';
import { DataUsuarioService } from '../../services/data-usuario.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-referral-detail',
  templateUrl: './referral-detail.page.html',
  styleUrls: ['./referral-detail.page.scss'],
})
export class ReferralDetailPage implements OnInit {
  color = 'azul';
  referal
  constructor(
    public _user: DataUsuarioService,
    private route: ActivatedRoute,
    private fbstore: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.fbstore.collection('perfiles').doc(param.id).snapshotChanges().subscribe( impro => {
        this.referal = impro.payload.data() 
        this.fbstore.collection('plans', ref => ref.where('uid','==',param.id)).snapshotChanges().subscribe( plans => {
          this.referal['plans'] = plans.map( result => {
            return result.payload.doc.data()
          })
        } )
        
      })
    })
  }

  ionViewWillEnter() {
    if (this._user.dataUser.role === 'cliente') {
      this.color = 'naranja'
    }
  }

}
