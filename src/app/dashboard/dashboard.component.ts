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
  tableHeader = [];
  // totc = [];
  // sc = [];
  // fc = [];
  // batchid =[];
  batchdata: any;

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
      // console.log(data);
      return this.errcount = data;
    })
  }

  ngOnInit(): void {
    this.successCount();
    this.errCount();
    this.totalSuccessCount();
    this.totCount();
    this.getSqlhead();
  }

  async totCount(): Promise<any> {
    this.api.getCount().subscribe((res) => {
      console.log(res.data);
      this.batchdata = res.data;
      // for (let i = 0; i< res.data.length; i++) {
      //   this.batchid.push(res.data[i].id);
      //   this.fc.push(res.data[i].failedCount);
      //   this.sc.push(res.data[i].successCount);
      //   this.totc.push(res.data[i].totalCount);
      // }
      // console.log(this.sc);
    })
  }

  async getSqlhead(): Promise<any> {
    this.api.getFileHeader().subscribe((res: any) => {
      
      for (let i = 0; i < res.data.length; i++) {
        this.tableHeader.push(res.data[i]);
      }
    })
  }

}
