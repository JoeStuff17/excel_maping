import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class dataPassService{
    public passExcel_head: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public passExcel_body: BehaviorSubject<any> = new BehaviorSubject<any>({});

}