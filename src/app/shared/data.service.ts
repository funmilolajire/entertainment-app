import { Injectable } from '@angular/core';
import { IData } from './data.type';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private _data: IData[] = [];
  dataChangeSub = new BehaviorSubject<IData[]>([]);

  constructor(private http: HttpClient) {}

  get data(): IData[] {
    return this._data;
  }

  public set data(data: IData[]) {
    this._data = data;
  }

  fetchData() {
    return this.http.get<IData[]>('/data.json').subscribe((data) => {
      this.data = data;
      this.dataChangeSub.next(data);
    });
  }

  // searchData(term: string) {
  //   const search = this.data.filter((data) =>
  //     data.title.toLowerCase().includes(term.toLowerCase())
  //   );
  //   return this.dataChangeSub.next(search);
  // }

  bookmarkControl(id: string) {
    this.data = this.data.map((data) => {
      if (data.id === id) {
        return { ...data, isBookmarked: !data.isBookmarked };
      }
      return data;
    });
    return this.dataChangeSub.next(this.data);
  }
}
