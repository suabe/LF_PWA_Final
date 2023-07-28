import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acount-error',
  templateUrl: './acount-error.page.html',
  styleUrls: ['./acount-error.page.scss'],
})
export class AcountErrorPage implements OnInit {
  color = 'azul';
  generaLink = false;
  linkData
  acountData = false;
  loader
  constructor() { }

  ngOnInit() {
  }

}
