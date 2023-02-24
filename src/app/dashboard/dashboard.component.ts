import { dataPassService } from './../datapassService';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../apiservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // asyncTabs: Observable<any[]>;
  successData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Batch No', 'Customer Name', 'Customer MobileNo', 'Plan Id'];
  successcount: any;
  errcount: any;
  totcount: any;
  tableHeader = [];
  batchdata: any;
  sucData = [];
  failData = new MatTableDataSource;

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;


  ngAfterViewInit() {
    // this.failData.paginator = this.paginator2;

  }

  constructor(private api: ApiService,
    private readonly dataservice: dataPassService) {}

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
    });
  }

  ngOnInit(): void {
    this.getSuccessRec();
    this.successCount();
    this.errCount();
    this.totalSuccessCount();
    this.totCount();
    this.getSqlhead();
    this.getFailRec();
  }

  async totCount(): Promise<any> {
    this.api.getCount().subscribe((res) => {
      // console.log(res.data);
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

  async getSuccessRec(): Promise<any> {
    this.api.getSucRecords().subscribe((res: any) => {
      res.data.reverse();
      this.successData = new MatTableDataSource(res.data);
      this.successData.paginator = this.paginator1;
    });
  }

  async getFailRec(): Promise<any> {
    this.api.getFailRecords().subscribe((res: any) => {
      console.log(res);
      res.data.reverse();
      this.failData = new MatTableDataSource (res.data);
      this.failData.paginator = this.paginator2;
    })
  }  

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

}
