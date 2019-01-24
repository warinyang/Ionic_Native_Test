import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import { NewsServiceProvider } from '../../providers/news-service/news-service';
import { News } from '../../model/news';
import { Subscription } from 'rxjs/Subscription';
import { InAppBrowser } from '@ionic-native/in-app-browser';




/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news: Array<News>;
  sub: Subscription;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private newServ: NewsServiceProvider, private loadCtrl: LoadingController,
    private iab: InAppBrowser
  ) {}
  ionViewWillEnter() {
    this.getNews();
  }
  ionViewWillLeave() {
    this.sub.unsubscribe(); //พอเรากลับมันก็จะคืนข้อมูล
  }
   
  private openBrowser(item) {
    let browser = this.iab.create(item.url,'_blank');
    
    // browser.close();

  }

  
  private getNews() {
    let loading = this.loadCtrl.create({
    content: 'กำลังโหลดข้อมูล...',
    spinner: 'dots'
  });
  loading.present();
  
  this.sub = this.newServ.getNews().subscribe( 
    (res) => this.news = res,
    (error) => {
      this.errorMessage = <any> error,
      loading.dismiss()
    },
    () => loading.dismiss()
  );
}
  // private doRefresh(refresher) {
  //   this.sub = this.newServ.getNews().subscribe( 
  //     (res) => this.news = res,
  //     (error) => {
  //       this.errorMessage = <any> error,
  //      refresher.complete()
  //     },
  //     () => refresher.complete()
  //   );
      
  // }
 
}