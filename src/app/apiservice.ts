import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  private _refresh = new Subject<void>();
  get Refresh() {
    return this._refresh;
  }

  getFileHeader(): Observable<any> {
    return this.http.get(this.url + 'success-record/fetch');
  }

  getExcelHeaders(): Observable<any> {
    return this.http.get(this.url + 'success-record/read');
  }

  addData(payload: any): Observable<any> {
    return this.http.post(this.url + 'success-record/create', payload).pipe(
      tap(() => {
        this.Refresh.next();
      })
    )
  }

  addFiles(payload: any): Observable<any> {
    return this.http.post(this.url + 'success-record/upload', payload).pipe(
      tap(() => {
        this.Refresh.next();
      })
    )
  }

  getRowCount(): Observable<any> {
    return this.http.get(this.url + 'success-record/tot-count');
  }

  getCount(): Observable<any> {
    return this.http.get(this.url + 'batch/count');
  }

  getSucRecords(): Observable<any> {
    return this.http.get(this.url + 'success-record/suc-records');
  }

  getFailRecords(): Observable<any> {
    return this.http.get(this.url + 'failed-record/fail-records');
  }

  getBatches(): Observable<any>{
    return this.http.get(this.url + 'batch/records');
  }

  getSuccessByBatch(id): Observable<any>{
    return this.http.get(this.url + `success-record/findById?batch=${id}`);
  }

  getFailedByBatch(id): Observable<any>{
    return this.http.get(this.url + `failed-record/findById?batch=${id}`);
  }

}

