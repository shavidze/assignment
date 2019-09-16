import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class NewsService {
  public constructor(private httpClient: HttpClient) {

  }

  getNewsList() {
    return this.httpClient.get('/news');
  }
}
