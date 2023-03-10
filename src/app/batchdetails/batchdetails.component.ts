import { ApiService } from './../apiservice';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { dataPassService } from '../datapassService';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-batchdetails',
  templateUrl: './batchdetails.component.html',
  styleUrls: ['./batchdetails.component.scss']
})
export class BatchdetailsComponent {
  successData: MatTableDataSource<any>;
  displayedColumns: string[] = ["batchNo",
    "customerName",
    "customerMobileNo",
    "planId",
    "vehicleBrand",
    "vehicleModel",
    "vehicleRegisterNo",
    "sellerId",
    "lat",
    "lng",
    "planPurchasedDate",
    "processed",
    "status"];
  failData = new MatTableDataSource;
  constructor(private readonly dataservice: dataPassService,
    private api: ApiService) { }
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  ngOnInit(): void {
    this.dataservice.batchId.subscribe((batchid) => {
      this.getByBatch(batchid);
    })


  }
  async getByBatch(batchid): Promise<any> {
    this.api.getSuccessByBatch(batchid).subscribe((res: any) => {
      console.log(res.data);
      
      this.successData = new MatTableDataSource(res.data);
      this.successData.paginator = this.paginator1;
    })

    this.api.getFailedByBatch(batchid).subscribe((res: any) => {
      this.failData = new MatTableDataSource(res.data);
      this.failData.paginator = this.paginator2;
    })
  }

}
