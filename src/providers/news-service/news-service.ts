import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable/throw';

import { News } from '../../model/news';
@Injectable()
export class NewsServiceProvider {
  
  apiKey: string='0b9d67ed58074934814fbbd96c0b44c1';
  source: string = 'cnn';
  apiUrl: string = `https://newsapi.org/v2/top-headlines?sources=${this.source}&apiKey=${this.apiKey}`;
  
  constructor(public http: Http) {
    console.log(this.apiUrl);
  }
  
  getNews():Observable<News[]> {
      return this.http.get(this.apiUrl)
      .map((res:Response) => <News[]> res.json().articles)
      .catch(this.handleError);
  // พอเราได้ json จากเว็บข่าวมา เขาส่ง json ออกมาทั้งก้อนใหญ่ 
  //แต่เราจะใช้แค่ก้อน ariticals  เพราะฉะนั้น เราต้องบอก service ด้วยว่าเราจะเอาแต่ artical 
  // โดยแต่เริ่มข้อมูลที่เราได้มา res.json() คือ ไฟล์ ไฟล์หมด ถ้าอยากได้แค่ artical ก็ .artical เพิ่มระบุว่าเราจะเค้าส่วนนี้
  }
  private handleError(error : any) {
    return Observable.throw(error.json() || 'เกิดข้อผิดพลาดจาก server');
}
}