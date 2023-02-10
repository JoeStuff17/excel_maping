import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = "http://localhost:3000/api/success-record";
  url1 = "http://localhost:3000/api/batch"
  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();
  get Refresh() {
    return this._refresh;
  }

  getFileHeader(): Observable<any> {
    return this.http.get(this.url + '/fetch');
  }

  getExcelHeaders(): Observable<any> {
    return this.http.get(this.url + '/read');
  }

  addData(payload: any): Observable<any> {
    return this.http.post(this.url + '/create', payload).pipe(
      tap(() => {
        this.Refresh.next();
      })
    )
  }

  addFiles(payload: any): Observable<any> {
    return this.http.post(this.url + '/upload', payload).pipe(
      tap(() => {
        this.Refresh.next();
      })
    )
  }

  getRowCount(): Observable<any> {
    return this.http.get(this.url + '/tot-count');
  }

  getCount(): Observable<any> {
    return this.http.get(this.url1 + '/count');
  }

}

