import { dataPassService } from './../datapassService';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  successcount: any;
  errcount: any;
  totcount: any;

  constructor(private api: ApiService,
    private readonly dataservice: dataPassService) { }

  async successCount(): Promise<any> {
    this.dataservice.suc_count.subscribe((data: any) => {
      return this.successcount = data;
    })
  }

  async totalSuccessCount(): Promise<any> {
    // this.api.getRowCount().subscribe((res)=>{
    //   console.log(res.data);
    //   return this.totcount = res.data;
    // })
    this.totcount = this.successcount + this.errcount;
  }

  async errCount(): Promise<any> {
    this.dataservice.err_count.subscribe((data: any) => {
      return this.errcount = data;
    })
  }

  ngOnInit(): void {
    this.successCount();
    this.errCount();
    this.totalSuccessCount();
  }

}
