import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HandbookService } from '../../providers/handbook-service';
import { OfflineHandbook } from '../../providers/offline-handbook';
import { QaDetialPage } from '../qa-detial/qa-detial';

//slow navingation
// try {animate: false}
// try {}

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers: [HandbookService, OfflineHandbook, QaDetialPage]
})

export class Page2 {
  icons: string[];
  colors: string[];
  faqs: Array<{q: string, c: string, as: string[], es: any[]}>; // object[]?
  qa: {q: string, c: string, as: string[], es: any[]};
  catagories:  Array<{t: string, color: string, icon:string, ion:any}>;
  handbook: any;
  focusC: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public handbookService: HandbookService,
    public offlineHandbook: OfflineHandbook
    ) {

    this.loadOffline();
    this.loadBook();

    this.icons = ['flask', 'paper-plane'];
    this.colors = ['primary', 'secondary', 'dark'];
    this.faqs = [];

    this.focusC = navParams.get('focusC');
  }

  loadOffline(){
    //...
  }

  loadBook(){
     this.handbookService.load()
    .then(data => {
      this.handbook = data;
      this.faqs = data.faqs;
      this.catagories = data.catagories;
      console.log(data);
    });
  }


  itemTapped(event, faq) {
    this.navCtrl.push(QaDetialPage, {
      qa: faq
    })
  }

  cataTapped(event, c) {
    if (c.t != this.focusC.t) {
      this.focusC = c;
   //   this.navCtrl.push(Page2, {
   //     focusC: c
   //   })
    }
  }
}
